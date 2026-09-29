#!/usr/bin/env node
// PostToolUse (Edit|Write|MultiEdit|NotebookEdit): record every file Claude
// changed in the current turn.
// UserPromptSubmit (--reset): a new turn starts, clear the list and the retry counter.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const input = JSON.parse(readFileSync(0, 'utf8') || '{}')
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()
const dir = join(root, '.claude', '.turn-state')
mkdirSync(dir, { recursive: true })
const stateFile = join(
  dir,
  `${String(input.session_id || 'default').replace(/[^\w-]/g, '')}.json`,
)

if (process.argv.includes('--reset')) {
  writeFileSync(stateFile, JSON.stringify({ files: [], attempts: 0 }))
  process.exit(0)
}

const state = existsSync(stateFile)
  ? JSON.parse(readFileSync(stateFile, 'utf8'))
  : { files: [], attempts: 0 }
const ti = input.tool_input ?? {}
const f = ti.file_path ?? ti.notebook_path ?? input.tool_response?.filePath
if (f) {
  const abs = resolve(root, f)
  if (!state.files.includes(abs)) state.files.push(abs)
  writeFileSync(stateFile, JSON.stringify(state))
}
process.exit(0)
