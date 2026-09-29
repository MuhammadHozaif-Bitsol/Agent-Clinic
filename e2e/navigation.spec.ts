import { expect, test } from '@playwright/test'
import { mainNav } from './helpers'

const NAV = [
  { name: 'Ailments', path: '/ailments' },
  { name: 'Therapies', path: '/therapies' },
  { name: 'Sign in', path: '/sign-in' },
]

test.describe('navigation', () => {
  for (const item of NAV) {
    test(`E1: nav item "${item.name}" loads its route and is marked active`, async ({
      page,
    }, testInfo) => {
      await page.goto('/')
      const nav = await mainNav(page, testInfo)
      await nav.getByRole('link', { name: item.name }).click()
      await expect(page).toHaveURL(item.path)
      await expect(
        page.getByRole('heading', { level: 1, name: item.name }),
      ).toBeVisible()

      const active = (await mainNav(page, testInfo)).locator(
        'a[aria-current="page"]',
      )
      await expect(active).toHaveCount(1)
      await expect(active).toHaveAttribute('href', item.path)
    })
  }

  test('E2: hero CTAs go to sign-in and ailments', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Book a session/ }).click()
    await expect(page).toHaveURL('/sign-in')

    await page.goto('/')
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Browse ailments' })
      .click()
    await expect(page).toHaveURL('/ailments')
  })

  test('E5: an unknown URL shows the 404 page with working links', async ({
    page,
  }) => {
    await page.goto('/some/made-up/path')
    await expect(
      page.getByRole('heading', { level: 1, name: /Route hallucinated/ }),
    ).toBeVisible()
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Browse ailments' })
      .click()
    await expect(page).toHaveURL('/ailments')

    await page.goto('/some/made-up/path')
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Back to home' })
      .click()
    await expect(page).toHaveURL('/')
  })
})
