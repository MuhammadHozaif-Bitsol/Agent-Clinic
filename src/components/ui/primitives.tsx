import type { ReactNode } from 'react'
import { cn } from 'cn'

/** `[01] Intake`: mono section index. The bracketed number is decorative. */
export function SectionLabel({
  index,
  label,
  className,
}: Readonly<{ index: string; label: string; className?: string }>) {
  return (
    <p className={cn('type-label text-muted', className)}>
      <span aria-hidden="true" className="text-fg">
        [{index}]
      </span>{' '}
      {label}
    </p>
  )
}

/** `// muted mono comment`: the clinic's machine voice. */
export function Annotation({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <p className={cn('type-annotation text-muted', className)}>{children}</p>
  )
}

/** Blinking block cursor. Hidden from assistive tech; solid under reduced motion. */
export function Cursor() {
  return (
    <span
      aria-hidden="true"
      data-testid="cursor"
      // A sized block rather than the █ glyph, so it matches cap height in every font.
      className="animate-blink ml-[0.08em] inline-block h-[0.72em] w-[0.42em] bg-accent align-baseline"
    />
  )
}
