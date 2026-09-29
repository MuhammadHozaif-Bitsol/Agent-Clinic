# Phase 1: Landing page and layout shell. Plan

This describes how to build `requirements.md`. The design rules are in `CLAUDE.md`, under
"Design system".

## New dependencies

| Package                               | Why                                                    | Kind |
| ------------------------------------- | ------------------------------------------------------ | ---- |
| `tailwindcss`, `@tailwindcss/vite`    | Styling, with tokens defined in `@theme` (tech stack)  | dev  |
| `shadcn` (CLI)                        | Adds the component sources we need; nothing at runtime | dev  |
| `react-router`                        | Client-side routing (tech stack)                       | prod |
| `@fontsource-variable/space-grotesk`  | Self-hosted display and body font                      | prod |
| `@fontsource-variable/jetbrains-mono` | Self-hosted mono font                                  | prod |
| `@playwright/test`                    | E2E tests in Chromium, Firefox and WebKit              | dev  |
| `@axe-core/playwright`                | Automated accessibility checks inside E2E tests        | dev  |
| `@lhci/cli`                           | Lighthouse budget check                                | dev  |
| `@testing-library/user-event`         | Realistic keyboard and click tests                     | dev  |

Before installing anything, check each package against the dependency rules in
`specs/techstack.md`, including compatibility with ESLint 10, TypeScript 6 and React 19.

## File structure

```
src/
  main.tsx                    Router provider and font imports
  index.css                   Tailwind import, @theme tokens, base layer
  routes.tsx                  Route table (createBrowserRouter)
  content/landing.ts          Typed copy for the landing page (FR-16)
  components/
    layout/
      RootLayout.tsx          Skip link, Header, <main>, Footer, <Outlet/>
      Header.tsx              Wordmark, desktop nav, mobile menu button
      MobileMenu.tsx          Disclosure panel (FR-4)
      NavItems.tsx            Shared [01]/[02]/[03] items with active state
      Footer.tsx
      SkipLink.tsx
    ui/
      Button.tsx              primary | secondary variants, renders <Link> or <button>
      Box.tsx                 Bordered grid cell
      SectionLabel.tsx        [01]-style mono index
      Annotation.tsx          // muted mono comment
      Cursor.tsx              Blinking block, aria-hidden
  pages/
    HomePage.tsx
    home/
      Hero.tsx
      CommonAilments.tsx
      HowItWorks.tsx
      Testimonials.tsx
    PlaceholderPage.tsx       Shared by /ailments, /therapies, /sign-in
    NotFoundPage.tsx
  hooks/
    useDocumentTitle.ts       FR-7
    useRouteFocus.ts          FR-8: focus the h1 and scroll to top on navigation
e2e/
  navigation.spec.ts
  keyboard.spec.ts
  a11y.spec.ts
  responsive.spec.ts
playwright.config.ts
lighthouserc.json
```

## Approach

### 1. Design tokens and base styles

- In `index.css`, add `@import "tailwindcss";`, then an `@theme` block that maps every
  `CLAUDE.md` token (colours, font families, the type scale as custom properties, spacing
  steps). Set `--radius: 0` and remove the default shadows.
- The base layer sets the `:root` `color-scheme: dark` and the `bg`/`fg` colours, the body
  font, a global `:focus-visible` ring, and a `prefers-reduced-motion` reset.
- Replace the current minimal `index.css` entirely.

### 2. Fonts

- Import both Fontsource variable fonts in `main.tsx`.
- Use `font-display: swap` with metric-matched fallbacks (`size-adjust`) to keep CLS under
  0.1.
- Preload the Space Grotesk subset used by the hero headline.

### 3. Routing and shell

- `createBrowserRouter` has one `RootLayout` route. Its children are `index` (HomePage),
  `ailments`, `therapies` and `sign-in` (each a PlaceholderPage with its own props), and
  `*` (NotFoundPage).
- `NavItems` uses `NavLink` for the active state. `NavLink` already sets
  `aria-current="page"`, and we add the `▮` marker and accent styling.
- `useRouteFocus` focuses the page `h1` (`tabIndex={-1}`) and scrolls to the top when the
  location changes. It does not do this on first load.
- The mobile menu is a disclosure pattern: a `button[aria-expanded][aria-controls]` and a
  `nav` panel. It is not a modal dialog, so there is no focus trap. It closes on `Esc` and
  on route change, and returns focus to the button.

### 4. Landing page

- `content/landing.ts` exports typed objects (`hero`, `ailments[]`, `steps[]`,
  `testimonials[]`). Components receive this data and contain no inline copy.
- Every section is a full-width band inside a 12-column grid, using `Box` cells with
  `--line` rules.
- Hero: the display headline fills most of the width, `Cursor` sits inline, and the CTAs
  use `Button` variants.

### 5. shadcn/ui

- Initialise it with the CLI, and map its CSS variables to our tokens with radius 0.
- Phase 1 only needs Button-style primitives, so start with our own `Button`. Only pull in
  shadcn components where they add accessible behaviour, for example `Sheet` or `Dialog`
  in later phases. Nothing in Phase 1 may keep shadcn's default look.

### 6. Tests and tooling

- Vitest component tests sit next to their components (`*.test.tsx`).
- Playwright runs `vite preview` against a production build, in 3 browser projects plus a
  mobile viewport project.
- Add npm scripts: `test:e2e`, `test:a11y` (the axe specs), and `lhci`.
- Add ESLint and tsconfig coverage for `e2e/` and `playwright.config.ts`.

## Implementation order (small steps; each ends green)

1. Install Tailwind, add tokens, base styles and fonts. Restyle the current `App` to prove
   the tokens work.
2. Install React Router. Add RootLayout, Header, Footer, SkipLink, and the routes with
   empty pages.
3. Add NavItems with the active state, and the mobile menu.
4. Add PlaceholderPage and NotFoundPage, plus the `useDocumentTitle` and `useRouteFocus`
   hooks.
5. Add the UI primitives: Button, Box, SectionLabel, Annotation, Cursor.
6. Add the landing content module and the Hero.
7. Add the CommonAilments, HowItWorks and Testimonials sections.
8. Set up Playwright with the navigation, keyboard and responsive specs.
9. Add axe specs for all routes, and fix any violations.
10. Add the Lighthouse CI budget, and tune fonts and LCP.
11. Capture screenshots at 375, 768 and 1440 for Steve's review.

## Risks

| Risk                                                    | Mitigation                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Huge display type overflows on small screens            | Use `clamp()` sizes, test at 320px, and set `overflow-wrap: anywhere` on the display |
| Web fonts hurt LCP and CLS                              | Variable fonts, subset preload, metric-matched fallbacks                             |
| Tailwind 4 or shadcn conflicts with ESLint 10 or Vite 8 | Check peer ranges before installing (same process as `jsx-a11y-x`)                   |
| An acid accent overused until it means nothing          | Design review against rule 3 of the design system ("one accent, used sparingly")     |
| SPA 404s return HTTP 200 once hosted                    | Recorded for Phase 7 hosting config                                                  |
