import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Slot } from 'radix-ui'

// shadcn/ui Button, restyled to the brutalist-tech design system (CLAUDE.md → Components).
const buttonVariants = cva(
  [
    'inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border px-6',
    'type-label whitespace-nowrap select-none',
    'transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'border-accent bg-accent text-accent-fg hover:bg-bg hover:text-accent',
        secondary: 'border-fg bg-transparent text-fg hover:bg-fg hover:text-bg',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (e.g. a router <Link>) with button styling. */
    asChild?: boolean
  }

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: Readonly<ButtonProps>) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- shadcn convention: variants are shared with other components
export { Button, buttonVariants }
