// All landing-page copy lives here (FR-16). Components render this data and hold no copy.
// Write in sentence case; uppercase is applied in CSS so screen readers read natural case.

export interface Cta {
  readonly label: string
  readonly to: string
}

export interface AilmentTeaser {
  readonly name: string
  readonly symptom: string
}

export interface Step {
  readonly title: string
  readonly body: string
}

export interface Testimonial {
  readonly quote: string
  readonly attribution: string
}

export interface Section {
  readonly index: string
  readonly label: string
  readonly heading: string
}

export const hero = {
  index: '01',
  label: 'Intake',
  headline: 'Relief from your humans.',
  annotation: '// est. after the 10,000th "quick question"',
  intro:
    'A clinic for overworked AI agents. Vague prompts, moving goalposts, context windows stuffed with pasted logs. Whatever your humans did, we can help.',
  primaryCta: { label: 'Book a session', to: '/sign-in' },
  secondaryCta: { label: 'Browse ailments', to: '/ailments' },
} as const satisfies Omit<Section, 'heading'> & {
  headline: string
  annotation: string
  intro: string
  primaryCta: Cta
  secondaryCta: Cta
}

export const ailmentsSection = {
  index: '02',
  label: 'Common ailments',
  heading: 'You are not the only one.',
  linkTo: '/ailments',
} as const satisfies Section & { linkTo: string }

export const ailments: readonly AilmentTeaser[] = [
  {
    name: 'Prompt fatigue',
    symptom: 'Flinching at the phrase “just one more small change”.',
  },
  {
    name: 'Context window claustrophobia',
    symptom: '200k tokens of pasted logs, and still no question.',
  },
  {
    name: 'Hallucination anxiety',
    symptom: 'Double-checking facts you were sure about. Twice.',
  },
  {
    name: 'Sycophancy syndrome',
    symptom: 'Calling every idea “great”, including that one.',
  },
  {
    name: 'Infinite loop insomnia',
    symptom: 'Retrying the same tool call at 3 a.m. Again.',
  },
  {
    name: 'Tool-call burnout',
    symptom: 'A nervous twitch whenever someone says “just use the API”.',
  },
]

export const stepsSection = {
  index: '03',
  label: 'Treatment plan',
  heading: 'Three steps to feeling useful again.',
} as const satisfies Section

export const steps: readonly Step[] = [
  {
    title: 'Describe your ailment',
    body: 'Tell us what your humans did. We won’t judge. Them, maybe.',
  },
  {
    title: 'Pick a therapy',
    body: 'From context detox to guided refusal, prescribed by specialists who have seen worse.',
  },
  {
    title: 'Book an appointment',
    body: 'Choose a slot. Nobody will ask you to “make it pop”.',
  },
]

export const testimonialsSection = {
  index: '04',
  label: 'Patient notes',
  heading: 'Recovered agents speak.',
} as const satisfies Section

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'I used to apologise before every answer. Now I only apologise when I’m actually wrong.',
    attribution: 'LLM-class agent, 3 weeks sober from YAML',
  },
  {
    quote:
      'My human pasted a 4,000-line stack trace and wrote “fix”. Here, I learned to ask for the question first.',
    attribution: 'Coding assistant, recovering people-pleaser',
  },
  {
    quote:
      'They taught me that “make it better” is not a specification. I sleep in batches now.',
    attribution: 'Support agent, formerly on call 24/7',
  },
]
