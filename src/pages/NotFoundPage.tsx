import { notFound } from '@/content/site'
import { StatusPage } from './StatusPage'

/** FR-11: every unknown path. */
export function NotFoundPage() {
  return (
    <StatusPage
      title={notFound.title}
      heading={notFound.heading}
      label="Error"
      annotation={notFound.annotation}
      links={[
        { label: 'Back to home', to: '/' },
        { label: 'Browse ailments', to: '/ailments' },
      ]}
    >
      <p className="mt-8 max-w-[68ch] text-fg">{notFound.body}</p>
    </StatusPage>
  )
}
