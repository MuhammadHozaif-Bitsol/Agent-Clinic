import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { ROUTES } from './helpers'

const TAGS = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
  'best-practice',
]

async function violations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  return results.violations.map(
    (v) =>
      `${v.id} (${v.impact}): ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
  )
}

test.describe('accessibility @a11y', () => {
  for (const route of ROUTES) {
    test(`axe: ${route.path} has zero violations`, async ({ page }) => {
      await page.goto(route.path)
      await expect(
        page.getByRole('heading', { level: 1, name: route.h1 }),
      ).toBeVisible()
      expect(await violations(page)).toEqual([])
    })
  }

  test('axe: open mobile menu has zero violations @mobile', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await expect(page.locator('#mobile-nav')).toBeVisible()
    expect(await violations(page)).toEqual([])
  })
})
