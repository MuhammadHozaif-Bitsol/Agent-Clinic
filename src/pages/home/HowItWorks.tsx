import { steps, stepsSection } from '@/content/landing'
import { Section } from '@/components/layout/Section'

export function HowItWorks() {
  return (
    <Section id="how-it-works" {...stepsSection}>
      <ol className="grid gap-px border border-line bg-line lg:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4 bg-bg p-6 md:p-8">
            <span
              aria-hidden="true"
              className="font-mono text-5xl font-medium text-muted"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="type-h3">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
