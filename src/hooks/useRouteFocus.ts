import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * FR-8: after client-side navigation, move focus to the new page's h1 and scroll to the top,
 * so keyboard and screen-reader users land on the new content. Skipped on first load.
 */
export function useRouteFocus() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)

  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    window.scrollTo(0, 0)
    document.querySelector<HTMLElement>('main h1')?.focus()
  }, [pathname])
}
