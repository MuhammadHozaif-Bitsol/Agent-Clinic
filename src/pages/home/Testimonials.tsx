import { testimonials, testimonialsSection } from '@/content/landing'
import { Section } from '@/components/layout/Section'

export function Testimonials() {
  return (
    <Section id="testimonials" {...testimonialsSection}>
      <ul className="grid gap-px border border-line bg-line lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.attribution} className="flex bg-bg">
            <figure className="flex flex-col justify-between gap-8 p-6 md:p-8">
              <blockquote className="type-h3">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="type-annotation text-muted">
                — {t.attribution}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
