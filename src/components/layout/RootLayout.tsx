import { Outlet } from 'react-router'
import { useRouteFocus } from '@/hooks/useRouteFocus'
import { Footer } from './Footer'
import { Header } from './Header'

const MAIN_ID = 'main'

/** FR-1: skip link → header → main → footer on every page. */
export function RootLayout() {
  useRouteFocus()
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href={`#${MAIN_ID}`}
        className="type-label sr-only z-50 bg-accent px-4 py-3 text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />
      <main
        id={MAIN_ID}
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
