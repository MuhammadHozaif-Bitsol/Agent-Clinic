import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { footer, navItems, siteName } from '@/content/site'
import { renderRoute } from '@/test/renderRoute'

describe('RootLayout', () => {
  it('U1: renders skip link, header, main, footer in order', () => {
    const { container } = renderRoute('/')
    const shell = container.firstElementChild!
    const order = [...shell.children].map((el) => el.tagName.toLowerCase())
    expect(order).toEqual(['a', 'header', 'main', 'footer'])
  })

  it('U2: skip link is the first tab stop and targets #main', async () => {
    const { user } = renderRoute('/')
    await user.tab()
    const skip = screen.getByRole('link', { name: 'Skip to content' })
    expect(document.activeElement).toBe(skip)
    expect(skip.getAttribute('href')).toBe('#main')
    expect(document.getElementById('main')?.tagName).toBe('MAIN')
  })

  it('U3: header has wordmark home link and the 3 nav items', () => {
    renderRoute('/')
    const header = screen.getByRole('banner')
    expect(
      within(header).getByRole('link', { name: siteName }).getAttribute('href'),
    ).toBe('/')
    const nav = within(header).getAllByRole('navigation', { name: 'Main' })[0]
    const links = within(nav).getAllByRole('link')
    expect(links.map((l) => [l.textContent, l.getAttribute('href')])).toEqual(
      navItems.map((n) => [expect.stringContaining(n.label), n.to]),
    )
  })

  it('U4: only the current route nav item has aria-current="page"', () => {
    renderRoute('/therapies')
    const nav = within(screen.getByRole('banner')).getAllByRole('navigation', {
      name: 'Main',
    })[0]
    const current = within(nav)
      .getAllByRole('link')
      .filter((l) => l.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0].getAttribute('href')).toBe('/therapies')
  })

  it('U5: mobile menu toggles aria-expanded; Esc closes and returns focus', async () => {
    const { user } = renderRoute('/')
    const toggle = screen.getByRole('button', { name: 'Menu' })
    const panel = document.getElementById(
      toggle.getAttribute('aria-controls')!,
    )!
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(panel.hidden).toBe(true)

    await user.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(panel.hidden).toBe(false)

    await user.keyboard('{Escape}')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(panel.hidden).toBe(true)
    expect(document.activeElement).toBe(toggle)
  })

  it('U5b: choosing a mobile menu item closes the menu', async () => {
    const { user, router } = renderRoute('/')
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const panel = document.getElementById('mobile-nav')!
    await user.click(within(panel).getByRole('link', { name: /Therapies/ }))
    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/therapies'),
    )
    expect(panel.hidden).toBe(true)
  })

  it('U6: footer shows nav links and the legal annotation', () => {
    renderRoute('/')
    const foot = screen.getByRole('contentinfo')
    const nav = within(foot).getByRole('navigation', { name: 'Footer' })
    expect(within(nav).getAllByRole('link')).toHaveLength(navItems.length)
    expect(within(foot).getByText(footer.legal)).toBeTruthy()
  })

  it.each([
    ['/', 'Relief from your humans — AgentClinic'],
    ['/ailments', 'Ailments — AgentClinic'],
    ['/therapies', 'Therapies — AgentClinic'],
    ['/sign-in', 'Sign in — AgentClinic'],
    ['/nope', 'Route hallucinated — AgentClinic'],
  ])('U7: %s sets document.title', async (path, title) => {
    renderRoute(path)
    await waitFor(() => expect(document.title).toBe(title))
  })

  it('U8: after navigating, focus moves to the new page h1', async () => {
    const { user } = renderRoute('/')
    const nav = within(screen.getByRole('banner')).getAllByRole('navigation', {
      name: 'Main',
    })[0]
    await user.click(within(nav).getByRole('link', { name: /Ailments/ }))
    const h1 = await screen.findByRole('heading', {
      level: 1,
      name: 'Ailments',
    })
    await waitFor(() => expect(document.activeElement).toBe(h1))
    expect(window.scrollTo).toHaveBeenCalled()
  })
})
