import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { siteName } from '@/content/site'
import { NavItems } from './NavItems'

const MOBILE_NAV_ID = 'mobile-nav'

export function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  // Close the menu whenever the route changes (e.g. browser back while open).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // FR-4: Esc closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="border-b border-line">
      <div className="container-page">
        <div className="flex h-16 items-stretch justify-between border-line md:border-x">
          <Link
            to="/"
            className="type-label flex items-center px-4 text-sm font-bold tracking-[0.2em] text-fg md:px-8"
          >
            {siteName}
          </Link>

          <nav aria-label="Main" className="hidden md:flex">
            <NavItems orientation="horizontal" />
          </nav>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={MOBILE_NAV_ID}
            onClick={() => setOpen((o) => !o)}
            className="type-label flex min-h-11 min-w-11 items-center border-l border-line px-5 text-fg transition-colors duration-150 hover:bg-fg hover:text-bg md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <nav
        id={MOBILE_NAV_ID}
        aria-label="Main"
        hidden={!open}
        className="border-t border-line md:hidden"
      >
        <NavItems orientation="vertical" onNavigate={() => setOpen(false)} />
      </nav>
    </header>
  )
}
