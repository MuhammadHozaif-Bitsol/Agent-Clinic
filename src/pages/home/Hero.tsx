import { Link } from 'react-router'
import { hero } from '@/content/landing'
import { Button } from '@/components/ui/button'
import { Annotation, Cursor, SectionLabel } from '@/components/ui/primitives'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <div className="container-page">
        <div className="border-line md:border-x">
          <div className="border-b border-line px-4 py-3 md:px-8">
            <SectionLabel index={hero.index} label={hero.label} />
          </div>

          <div className="px-4 pt-12 pb-10 md:px-8 md:pt-20 md:pb-14">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="type-display max-w-[12ch]"
            >
              {hero.headline}
              <Cursor />
            </h1>
            <Annotation className="mt-6 md:mt-8">{hero.annotation}</Annotation>
          </div>

          <div className="grid border-t border-line md:grid-cols-12">
            <p className="max-w-[68ch] px-4 py-8 text-fg md:col-span-7 md:border-r md:border-line md:px-8">
              {hero.intro}
            </p>
            <div className="flex flex-wrap content-center gap-3 border-t border-line px-4 py-8 md:col-span-5 md:border-t-0 md:px-8">
              <Button asChild variant="primary">
                <Link to={hero.primaryCta.to}>
                  {hero.primaryCta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to={hero.secondaryCta.to}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
