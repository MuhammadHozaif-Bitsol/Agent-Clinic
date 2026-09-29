import type { ReactNode } from 'react'
import { SectionLabel } from '@/components/ui/primitives'

interface SectionProps {
  readonly id: string
  readonly index: string
  readonly label: string
  readonly heading: string
  readonly children: ReactNode
}

/** A full-width band framed by grid rules, with a `[NN] Label` header row and an h2. */
export function Section({ id, index, label, heading, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-b border-line"
    >
      <div className="container-page">
        <div className="border-line md:border-x">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-8">
            <SectionLabel index={index} label={label} />
            <span aria-hidden="true" className="type-label text-muted">
              // sec.{index}
            </span>
          </div>
          <div className="px-4 py-12 md:px-8 md:py-16">
            <h2 id={headingId} className="type-h2 max-w-[22ch]">
              {heading}
            </h2>
            <div className="mt-10 md:mt-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
