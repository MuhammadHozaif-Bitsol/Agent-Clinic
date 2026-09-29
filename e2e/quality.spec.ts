import { expect, test } from '@playwright/test'
import { ROUTES } from './helpers'

const WIDTHS = [320, 375, 768, 1024, 1440, 1920]

test.describe('responsive and runtime quality', () => {
  test('E6: no horizontal scroll at any width on any route @desktop', async ({
    page,
  }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      for (const route of ROUTES) {
        await page.goto(route.path)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        )
        expect(overflow, `${route.path} at ${width}px`).toBeLessThanOrEqual(0)
      }
    }
  })

  test('E7: nothing animates with reduced motion; cursor blinks without it', async ({
    browser,
  }) => {
    for (const reducedMotion of ['reduce', 'no-preference'] as const) {
      const context = await browser.newContext({ reducedMotion })
      const page = await context.newPage()
      await page.goto('/')
      await expect(page.getByTestId('cursor')).toBeVisible()
      const running = await page.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === 'running')
            .length,
      )
      if (reducedMotion === 'reduce') expect(running).toBe(0)
      else expect(running).toBeGreaterThan(0)
      await context.close()
    }
  })

  test('E8: no requests leave localhost', async ({ page }) => {
    const external: string[] = []
    page.on('request', (req) => {
      const url = new URL(req.url())
      if (url.protocol === 'data:') return
      if (!['localhost', '127.0.0.1'].includes(url.hostname))
        external.push(req.url())
    })
    for (const route of ROUTES) {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')
    }
    expect(external).toEqual([])
  })

  test('E9: no console errors or warnings on any route', async ({ page }) => {
    const messages: string[] = []
    page.on('console', (msg) => {
      if (['error', 'warning'].includes(msg.type()))
        messages.push(`${msg.type()}: ${msg.text()}`)
    })
    page.on('pageerror', (err) => messages.push(`pageerror: ${err.message}`))
    for (const route of ROUTES) {
      await page.goto(route.path)
      await expect(
        page.getByRole('heading', { level: 1, name: route.h1 }),
      ).toBeVisible()
    }
    expect(messages).toEqual([])
  })
})
