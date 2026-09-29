import { NavLink } from 'react-router'
import { cn } from 'cn'
import { navItems } from '@/content/site'

interface NavItemsProps {
  readonly orientation: 'horizontal' | 'vertical'
  readonly onNavigate?: () => void
}

/** `[01] AILMENTS` items. NavLink sets aria-current="page" on the active item (FR-3). */
export function NavItems({ orientation, onNavigate }: NavItemsProps) {
  return (
    <ul
      className={cn(
        'flex',
        orientation === 'horizontal'
          ? 'items-stretch'
          : 'flex-col divide-y divide-line',
      )}
    >
      {navItems.map((item) => (
        <li key={item.to} className="flex">
          <NavLink
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group type-label flex min-h-11 w-full items-center gap-2 whitespace-nowrap transition-colors duration-150',
                orientation === 'horizontal'
                  ? 'border-l border-line px-3 hover:bg-fg hover:text-bg lg:px-5'
                  : 'px-4 py-4 hover:bg-fg hover:text-bg',
                isActive ? 'text-accent' : 'text-fg',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    'w-[1ch]',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  ▮
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted group-hover:text-bg"
                >
                  [{item.index}]
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
