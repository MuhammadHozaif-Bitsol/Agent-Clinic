import { expect, test, type Page } from '@playwright/test'

/** Tab once and describe the newly focused element, including whether its focus ring shows. */
async function tabTo(page: Page, browserName: string) {
  // WebKit/Safari only tabs to links with Option+Tab by default.
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement
    const style = getComputedStyle(el)
    return {
      text: (el.textContent ?? '').trim(),
      href: el.getAttribute('href'),
      ring:
        style.outlineStyle !== 'none' &&
        Number.parseFloat(style.outlineWidth) >= 2,
    }
  })
}

test.describe('keyboard', () => {
  test('E3: keyboard-only walk through the landing page @desktop', async ({
    page,
    browserName,
  }) => {
    await page.goto('/')

    const expected = [
      { text: 'Skip to content', href: '#main' },
      { text: 'AgentClinic', href: '/' },
      { text: 'Ailments', href: '/ailments' },
      { text: 'Therapies', href: '/therapies' },
      { text: 'Sign in', href: '/sign-in' },
      { text: 'Book a session', href: '/sign-in' },
      { text: 'Browse ailments', href: '/ailments' },
    ]
    for (const step of expected) {
      const focused = await tabTo(page, browserName)
      expect(focused.text).toContain(step.text)
      expect(focused.href).toBe(step.href)
      expect(focused.ring, `focus ring on "${step.text}"`).toBe(true)
    }

    // The last focused element is "Browse ailments"; go back one and activate the primary CTA.
    await page.keyboard.press(
      browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab',
    )
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/sign-in')
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  })

  test('E3b: skip link moves focus to main content @desktop', async ({
    page,
    browserName,
  }) => {
    await page.goto('/')
    await tabTo(page, browserName)
    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })

  test('E4: mobile menu opens, closes on selection, and closes on Esc', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /Menu|Close/ })
    const panel = page.locator('#mobile-nav')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toBeVisible()
    await panel.getByRole('link', { name: 'Therapies' }).click()
    await expect(page).toHaveURL('/therapies')
    await expect(panel).toBeHidden()

    await toggle.click()
    await expect(panel).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })
})
