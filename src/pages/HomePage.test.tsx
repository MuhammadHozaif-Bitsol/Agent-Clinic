import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  ailments,
  ailmentsSection,
  hero,
  steps,
  stepsSection,
  testimonials,
  testimonialsSection,
} from '@/content/landing'
import { renderRoute } from '@/test/renderRoute'

const section = (heading: string) =>
  screen.getByRole('region', { name: heading })

describe('HomePage', () => {
  it('U11: hero has headline, hidden cursor and both CTAs', () => {
    renderRoute('/')
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain(hero.headline)
    const cursor = within(h1).getByTestId('cursor')
    expect(cursor.getAttribute('aria-hidden')).toBe('true')

    const region = screen.getByRole('region', { name: hero.headline })
    const book = within(region).getByRole('link', {
      name: new RegExp(hero.primaryCta.label),
    })
    const browse = within(region).getByRole('link', {
      name: hero.secondaryCta.label,
    })
    expect(book.getAttribute('href')).toBe('/sign-in')
    expect(browse.getAttribute('href')).toBe('/ailments')
  })

  it('U12: common ailments renders 3–6 boxes, each with exactly one link', () => {
    renderRoute('/')
    const items = within(section(ailmentsSection.heading)).getAllByRole(
      'listitem',
    )
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items.length).toBeLessThanOrEqual(6)
    expect(items).toHaveLength(ailments.length)
    for (const [i, item] of items.entries()) {
      const links = within(item).getAllByRole('link')
      expect(links).toHaveLength(1)
      expect(links[0].textContent).toBe(ailments[i].name)
      expect(links[0].getAttribute('href')).toBe('/ailments')
    }
  })

  it('U13: how it works renders exactly 3 steps in order', () => {
    renderRoute('/')
    const list = within(section(stepsSection.heading)).getByRole('list')
    expect(list.tagName).toBe('OL')
    const titles = within(list)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    expect(titles).toEqual([
      'Describe your ailment',
      'Pick a therapy',
      'Book an appointment',
    ])
    expect(steps).toHaveLength(3)
  })

  it('U14: testimonials renders 3 figure/blockquote/figcaption groups', () => {
    renderRoute('/')
    const figures = section(testimonialsSection.heading).querySelectorAll(
      'figure',
    )
    expect(figures).toHaveLength(3)
    for (const [i, fig] of [...figures].entries()) {
      expect(fig.querySelector('blockquote')?.textContent).toContain(
        testimonials[i].quote,
      )
      expect(fig.querySelector('figcaption')?.textContent).toContain(
        testimonials[i].attribution,
      )
    }
  })

  it('U15: section copy comes from the content module', () => {
    renderRoute('/')
    for (const heading of [
      ailmentsSection.heading,
      stepsSection.heading,
      testimonialsSection.heading,
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name: heading }),
      ).toBeTruthy()
    }
    expect(screen.getByText(hero.annotation)).toBeTruthy()
    expect(screen.getByText(hero.intro)).toBeTruthy()
  })
})
