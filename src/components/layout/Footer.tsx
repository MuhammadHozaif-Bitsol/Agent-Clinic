import { Link } from 'react-router'
import { footer, navItems, siteName } from '@/content/site'
import { Annotation } from '@/components/ui/primitives'

export function Footer() {
  return (
    <footer className="border-line">
      <div className="container-page">
        <div className="grid gap-8 border-line px-4 py-12 md:grid-cols-12 md:border-x md:px-8">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="type-label text-sm font-bold tracking-[0.2em] text-fg"
            >
              {siteName}
            </Link>
            <Annotation className="mt-4 max-w-[40ch]">
              {footer.legal}
            </Annotation>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="type-label inline-flex min-h-11 items-center text-fg underline decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="type-label text-muted md:col-span-3 md:text-right">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
