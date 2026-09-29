#!/usr/bin/env node
// PreToolUse guard: deny any tool call that would read/write .env files or
// dump/read environment variables. Template files (.env.example/.sample/.template) are allowed.
import { readFileSync } from 'node:fs'

const input = JSON.parse(readFileSync(0, 'utf8') || '{}')
const tool = input.tool_name ?? ''
const ti = input.tool_input ?? {}

const TEMPLATE = /^\.env\.(example|sample|template)$/i
// Any token whose last path segment is ".env" or ".env.<suffix>" (.env.local, .env.production, ...)
const ENV_TOKEN =
  /(?:^|[\\/\s"'=:*(`])(\.env(?:\.[\w.-]+)?)(?=$|[\\/\s"';|&)>*`])/gi

function envFileRef(value) {
  if (!value) return false
  for (const m of String(value).matchAll(ENV_TOKEN)) {
    if (!TEMPLATE.test(m[1])) return true
  }
  return false
}

const SHELL_ENV_ACCESS = [
  /(^|[;&|(\s])(env|printenv)(\s|$|[;&|)])/, // env / printenv
  /(^|[;&|(\s])set\s*($|[;&|)])/, // bare `set` dumps all vars
  /(^|[;&|(\s])export\s+-p\b/,
  /(^|[;&|(\s])declare\s+-[a-z]*x/,
  /\/proc\/\S*\/environ/,
  /\$env:/i, // PowerShell $env:VAR
  /\benv:[\\/]?/i, // Get-ChildItem env:, dir env:
  /\[(System\.)?Environment\]::GetEnvironmentVariables?/i,
  /\bprocess\.env\b/, // node -e "console.log(process.env...)"
  /\bos\.environ\b|\bos\.getenv\b/, // python -c
  /\bENV\[/, // ruby
  // $API_KEY, ${GITHUB_TOKEN}, $DB_PASSWORD ...
  /\$\{?[A-Z_][A-Z0-9_]*(KEY|TOKEN|SECRET|PASSWORD|PASSWD|CREDENTIALS?|AUTH|PRIVATE)[A-Z0-9_]*\}?/i,
]

let reason = null
if (tool === 'Bash' || tool === 'PowerShell') {
  const cmd = String(ti.command ?? '')
  if (envFileRef(cmd)) reason = 'references a .env file'
  else if (SHELL_ENV_ACCESS.some((re) => re.test(cmd)))
    reason = 'reads environment variables'
} else {
  const fields = [
    ti.file_path,
    ti.path,
    ti.notebook_path,
    ti.glob,
    tool === 'Glob' ? ti.pattern : null,
  ]
  if (fields.some(envFileRef)) reason = 'targets a .env file'
}

if (reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `Blocked by project policy: this ${tool} call ${reason}. Environment files and variables must never be accessed. Document variable names in .env.example instead.`,
      },
    }),
  )
}
process.exit(0)
