import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { notFound, placeholders } from '@/content/site'
import { renderRoute } from '@/test/renderRoute'

const main = () => screen.getByRole('main')

describe('placeholder pages', () => {
  it.each([
    ['/ailments', placeholders.ailments],
    ['/therapies', placeholders.therapies],
    ['/sign-in', placeholders.signIn],
  ])('U9: %s renders h1, annotation and a home link', (path, copy) => {
    renderRoute(path)
    expect(
      within(main()).getByRole('heading', { level: 1, name: copy.title }),
    ).toBeTruthy()
    expect(within(main()).getByText(copy.annotation)).toBeTruthy()
    expect(
      within(main())
        .getByRole('link', { name: 'Back to home' })
        .getAttribute('href'),
    ).toBe('/')
  })

  it('U9b: /sign-in has no form fields', () => {
    renderRoute('/sign-in')
    expect(
      main().querySelectorAll('input, select, textarea, form'),
    ).toHaveLength(0)
  })
})

describe('404 page', () => {
  it('U10: unknown path shows the hallucinated-route page with home and ailments links', () => {
    renderRoute('/some/made-up/path')
    expect(
      within(main()).getByRole('heading', { level: 1, name: notFound.heading }),
    ).toBeTruthy()
    const hrefs = within(main())
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
    expect(hrefs).toEqual(['/', '/ailments'])
  })
})

describe('every page', () => {
  it.each(['/', '/ailments', '/therapies', '/sign-in', '/x/y'])(
    'U16: %s renders exactly one h1',
    (path) => {
      renderRoute(path)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    },
  )
})
