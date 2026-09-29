import { hero } from '@/content/landing'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { CommonAilments } from './home/CommonAilments'
import { Hero } from './home/Hero'
import { HowItWorks } from './home/HowItWorks'
import { Testimonials } from './home/Testimonials'

export function HomePage() {
  useDocumentTitle(hero.headline.replace(/\.$/, ''))
  return (
    <>
      <Hero />
      <CommonAilments />
      <HowItWorks />
      <Testimonials />
    </>
  )
}
