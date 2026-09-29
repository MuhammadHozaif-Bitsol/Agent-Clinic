#!/usr/bin/env node
// Full-page screenshots of every Phase 1 route at 375 / 768 / 1440 px for design review
// (validation.md M1, M6). Output: specs/phase-1-landing-and-shell/screenshots/
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { chromium } from '@playwright/test'

const PORT = 4175
const OUT = 'specs/phase-1-landing-and-shell/screenshots'
const WIDTHS = [375, 768, 1440]
const ROUTES = [
  ['home', '/'],
  ['ailments', '/ailments'],
  ['404', '/some/made-up/path'],
]

const node = process.execPath
const vite = 'node_modules/vite/bin/vite.js'
if (spawnSync(node, [vite, 'build'], { stdio: 'inherit' }).status !== 0)
  process.exit(1)
const server = spawn(
  node,
  [vite, 'preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore' },
)

try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/`)).ok) break
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch()
  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce', // freeze the cursor so shots are stable
    })
    for (const [name, path] of ROUTES) {
      await page.goto(`http://localhost:${PORT}${path}`)
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({
        path: `${OUT}/${name}-${width}.png`,
        fullPage: true,
      })
    }
    if (width === 375) {
      await page.goto(`http://localhost:${PORT}/`)
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.screenshot({ path: `${OUT}/menu-open-375.png` })
    }
    await page.close()
  }
  await browser.close()
  console.log(`Screenshots written to ${OUT}/`)
} finally {
  server.kill()
}
