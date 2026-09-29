import type { PlaceholderCopy } from '@/content/site'
import { StatusPage } from './StatusPage'

/** FR-10: `/ailments`, `/therapies`, `/sign-in` until their phases land. No form fields. */
export function PlaceholderPage({ copy }: Readonly<{ copy: PlaceholderCopy }>) {
  return (
    <StatusPage
      title={copy.title}
      heading={copy.title}
      label="Coming soon"
      annotation={copy.annotation}
      links={[{ label: 'Back to home', to: '/' }]}
    />
  )
}
