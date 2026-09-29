#!/usr/bin/env node
// Stop hook: lint (with --fix) and test ONLY the files Claude changed this turn.
// If problems remain, block the stop once so Claude gets exactly one attempt to fix them.
// On the next stop it reports to the user instead of blocking again.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, extname, sep } from 'node:path'
import { spawnSync } from 'node:child_process'

const input = JSON.parse(readFileSync(0, 'utf8') || '{}')
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()
const stateFile = join(
  root,
  '.claude',
  '.turn-state',
  `${String(input.session_id || 'default').replace(/[^\w-]/g, '')}.json`,
)
if (!existsSync(stateFile)) process.exit(0)
const state = JSON.parse(readFileSync(stateFile, 'utf8'))

const CODE = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts',
])
const SKIP_DIRS = new Set(['node_modules', 'dist', '.claude'])
const files = state.files
  .filter((f) => existsSync(f) && CODE.has(extname(f)))
  .map((f) => relative(root, f))
  .filter(
    (f) => !f.startsWith('..') && !f.split(sep).some((p) => SKIP_DIRS.has(p)),
  )
if (files.length === 0) process.exit(0)

const run = (args) =>
  spawnSync(process.execPath, args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
const problems = []

// 0. Prettier on the changed files only (ESLint 10 has no formatting rules; eslint-config-prettier
//    turns off any that would conflict, so formatting is Prettier's job).
const fmt = run([
  'node_modules/prettier/bin/prettier.cjs',
  '--write',
  '--ignore-unknown',
  '--log-level',
  'warn',
  ...files,
])
if (fmt.status !== 0)
  problems.push(
    `prettier failed (likely a syntax error):\n${fmt.stderr.slice(0, 2000)}`,
  )

// 1. ESLint --fix on the changed files only, then collect whatever could not be auto-fixed.
const lint = run([
  'node_modules/eslint/bin/eslint.js',
  '--fix',
  '--no-warn-ignored',
  '--format',
  'json',
  ...files,
])
try {
  for (const r of JSON.parse(lint.stdout)) {
    for (const m of r.messages) {
      const sev = m.severity === 2 ? 'error' : 'warning'
      problems.push(
        `lint ${relative(root, r.filePath)}:${m.line}:${m.column} ${sev} ${m.message} (${m.ruleId ?? 'parse'})`,
      )
    }
  }
} catch {
  problems.push(
    `eslint failed to run:\n${(lint.stderr || lint.stdout).slice(0, 2000)}`,
  )
}

// 2. Vitest: only tests that import the changed files (directly or transitively) + changed test files.
const test = run([
  'node_modules/vitest/vitest.mjs',
  'related',
  '--run',
  '--passWithNoTests',
  '--reporter=dot',
  ...files,
])
if (test.status !== 0) {
  const tail = (test.stdout + test.stderr).split('\n').slice(-60).join('\n')
  problems.push(`tests failed:\n${tail}`)
}

if (problems.length === 0) {
  process.stdout.write(
    JSON.stringify({
      systemMessage: `Lint + related tests passed for ${files.length} changed file(s).`,
    }),
  )
  process.exit(0)
}

const report = problems.join('\n')
if (state.attempts < 1 && !input.stop_hook_active) {
  state.attempts = 1
  writeFileSync(stateFile, JSON.stringify(state))
  process.stdout.write(
    JSON.stringify({
      decision: 'block',
      reason:
        `Checks on the files you changed this turn failed (auto-fixable lint issues were already fixed). ` +
        `Fix the remaining issues, touching only these files or their tests: ${files.join(', ')}. ` +
        `You get ONE attempt.\n\n${report}`,
    }),
  )
} else {
  process.stdout.write(
    JSON.stringify({
      systemMessage: `Lint/tests still failing after the one allowed fix attempt (not retrying):\n${report.slice(0, 4000)}`,
    }),
  )
}
process.exit(0)
