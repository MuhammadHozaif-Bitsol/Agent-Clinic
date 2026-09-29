import { Link } from 'react-router'
import { ailments, ailmentsSection } from '@/content/landing'
import { Section } from '@/components/layout/Section'

export function CommonAilments() {
  return (
    <Section id="ailments" {...ailmentsSection}>
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {ailments.map((ailment, i) => (
          <li
            key={ailment.name}
            className="relative flex flex-col gap-4 bg-bg p-6 transition-colors duration-150 hover:bg-surface md:p-8"
          >
            <span aria-hidden="true" className="type-label text-muted">
              A-{String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="type-h3">
              {/* Stretched link: the whole box is clickable, with one real link inside. */}
              <Link
                to={ailmentsSection.linkTo}
                className="after:absolute after:inset-0 hover:underline hover:decoration-accent hover:underline-offset-4"
              >
                {ailment.name}
              </Link>
            </h3>
            <p className="text-muted">{ailment.symptom}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
