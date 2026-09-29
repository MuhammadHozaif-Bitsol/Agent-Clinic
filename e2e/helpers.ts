import type { Page, TestInfo } from '@playwright/test'

export const ROUTES = [
  { path: '/', h1: /Relief from your humans/ },
  { path: '/ailments', h1: 'Ailments' },
  { path: '/therapies', h1: 'Therapies' },
  { path: '/sign-in', h1: 'Sign in' },
  { path: '/some/made-up/path', h1: /Route hallucinated/ },
] as const

export const isMobile = (testInfo: TestInfo) =>
  testInfo.project.name.startsWith('mobile')

/** The visible main navigation: the desktop bar, or the mobile panel once opened. */
export async function mainNav(page: Page, testInfo: TestInfo) {
  if (isMobile(testInfo)) {
    await page.getByRole('button', { name: 'Menu' }).click()
    return page.locator('#mobile-nav')
  }
  return page.getByRole('banner').getByRole('navigation', { name: 'Main' })
}
