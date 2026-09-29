#!/usr/bin/env node
// Lighthouse budget check (validation.md §5): mobile preset, median of 3 runs on `/`,
// against the production build served by `vite preview`.
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { chromium } from '@playwright/test'

const PORT = 4174
const URL_UNDER_TEST = `http://localhost:${PORT}/`
const RUNS = 3
const BUDGET = {
  scores: { performance: 95, accessibility: 95, 'best-practices': 95 },
  metrics: {
    'largest-contentful-paint': 2500, // ms
    'cumulative-layout-shift': 0.1,
    'total-blocking-time': 200, // ms
  },
}

const node = process.execPath
const build = spawnSync(node, ['node_modules/vite/bin/vite.js', 'build'], {
  stdio: 'inherit',
})
if (build.status !== 0) process.exit(build.status ?? 1)

const server = spawn(
  node,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--port',
    String(PORT),
    '--strictPort',
  ],
  { stdio: 'ignore' },
)

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(URL_UNDER_TEST)).ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('vite preview did not start')
}

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]

let chrome
let failed = false
try {
  await waitForServer()
  chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless=new', '--no-sandbox'],
  })

  const runs = []
  for (let i = 0; i < RUNS; i++) {
    const result = await lighthouse(URL_UNDER_TEST, {
      port: chrome.port,
      output: 'html',
      logLevel: 'error',
      onlyCategories: Object.keys(BUDGET.scores),
    })
    runs.push(result.lhr)
    if (i === RUNS - 1) {
      mkdirSync('.lighthouse', { recursive: true })
      writeFileSync('.lighthouse/report.html', result.report)
    }
  }

  const rows = []
  for (const [cat, min] of Object.entries(BUDGET.scores)) {
    const value = Math.round(
      median(runs.map((r) => r.categories[cat].score)) * 100,
    )
    rows.push({ check: cat, value, budget: `≥ ${min}`, pass: value >= min })
  }
  for (const [audit, max] of Object.entries(BUDGET.metrics)) {
    const value = median(runs.map((r) => r.audits[audit].numericValue))
    rows.push({
      check: audit,
      value: Math.round(value * 1000) / 1000,
      budget: `< ${max}`,
      pass: value < max,
    })
  }
  console.table(rows)
  failed = rows.some((r) => !r.pass)
  console.log(
    failed ? 'Lighthouse budget FAILED' : 'Lighthouse budget passed',
    '(report: .lighthouse/report.html)',
  )
} finally {
  try {
    await chrome?.kill()
  } catch {
    // Windows: Chrome may still hold its temp profile while exiting; cleanup is best-effort.
  }
  server.kill()
}
process.exit(failed ? 1 : 0)
