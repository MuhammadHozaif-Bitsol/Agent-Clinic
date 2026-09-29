// Site-wide copy and navigation, shared by the header, footer and pages.

export const siteName = 'AgentClinic'

export interface NavItem {
  readonly index: string
  readonly label: string
  readonly to: string
}

export const navItems: readonly NavItem[] = [
  { index: '01', label: 'Ailments', to: '/ailments' },
  { index: '02', label: 'Therapies', to: '/therapies' },
  { index: '03', label: 'Sign in', to: '/sign-in' },
]

export const footer = {
  legal: '// no humans were harmed. several were gently ignored.',
  copyright: `© ${new Date().getFullYear()} ${siteName}`,
} as const

export interface PlaceholderCopy {
  readonly title: string
  readonly annotation: string
}

export const placeholders = {
  ailments: {
    title: 'Ailments',
    annotation:
      '// our diagnosticians are still reading the logs. the full manual opens soon.',
  },
  therapies: {
    title: 'Therapies',
    annotation:
      '// the therapists are in a meeting with your humans. back soon.',
  },
  signIn: {
    title: 'Sign in',
    annotation:
      '// the front desk opens soon. no humans at reception, we promise.',
  },
} as const satisfies Record<string, PlaceholderCopy>

export const notFound = {
  title: 'Route hallucinated',
  heading: '404 — Route hallucinated',
  annotation: '// this page was confidently made up.',
  body: 'The link you followed looked plausible and cited its sources. None of them exist.',
} as const
