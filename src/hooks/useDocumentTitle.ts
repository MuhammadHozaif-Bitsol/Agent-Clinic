import { useEffect } from 'react'
import { siteName } from '@/content/site'

/** FR-7: `<Page> — AgentClinic`. */
export function useDocumentTitle(page: string) {
  useEffect(() => {
    document.title = `${page} — ${siteName}`
  }, [page])
}
