import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Annotation, SectionLabel } from '@/components/ui/primitives'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export interface StatusLink {
  readonly label: string
  readonly to: string
}

interface StatusPageProps {
  readonly title: string
  readonly heading: string
  readonly label: string
  readonly annotation: string
  readonly links: readonly StatusLink[]
  readonly children?: ReactNode
}

/** Shared frame for placeholder pages (FR-10) and the 404 page (FR-11). */
export function StatusPage({
  title,
  heading,
  label,
  annotation,
  links,
  children,
}: StatusPageProps) {
  useDocumentTitle(title)
  return (
    <section
      aria-labelledby="page-heading"
      className="flex flex-1 flex-col border-b border-line"
    >
      <div className="container-page flex flex-1 flex-col">
        <div className="flex-1 border-line md:border-x">
          <div className="border-b border-line px-4 py-3 md:px-8">
            <SectionLabel index="--" label={label} />
          </div>
          <div className="px-4 py-16 md:px-8 md:py-24">
            <h1 id="page-heading" tabIndex={-1} className="type-h1">
              {heading}
            </h1>
            <Annotation className="mt-6">{annotation}</Annotation>
            {children}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {links.map((link, i) => (
                <Button
                  key={link.to}
                  asChild
                  variant={i === 0 ? 'primary' : 'secondary'}
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
