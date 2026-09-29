# Phase 1: Landing page and layout shell. Validation

Phase 1 is done only when every check below passes. Each check is traced to the
requirements it proves.

## 1. Automated gates (all must pass, locally and in CI)

| Command                | Proves                                                                      |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run lint`         | Zero errors and zero warnings, including `jsx-a11y-x` and `sonarjs` (NFR-8) |
| `npm run format:check` | Prettier formatting (NFR-8)                                                 |
| `npm test`             | Vitest unit and component tests (below)                                     |
| `npm run build`        | Types check and a production build succeeds (NFR-8)                         |
| `npm run test:e2e`     | Playwright in Chromium, Firefox and WebKit (AC-8)                           |
| `npm run test:a11y`    | axe with zero violations (AC-6)                                             |
| `npm run lighthouse`   | Lighthouse budget (AC-7)                                                    |

## 2. Unit and component tests (Vitest + Testing Library)

| ID  | Test                                                                                         | Covers |
| --- | -------------------------------------------------------------------------------------------- | ------ |
| U1  | RootLayout renders the skip link, `header`, `main`, and `footer` in that order               | FR-1   |
| U2  | The skip link is the first tab stop and targets `#main`                                      | FR-6   |
| U3  | The header shows the wordmark link to `/` and the 3 nav items with the correct `href`s       | FR-2   |
| U4  | The nav item for the current route has `aria-current="page"`; the others don't               | FR-3   |
| U5  | The mobile menu button toggles `aria-expanded`; `Esc` closes it and returns focus            | FR-4   |
| U6  | The footer shows the nav links and the legal annotation                                      | FR-5   |
| U7  | Each route sets `document.title` to `<Page> — AgentClinic`                                   | FR-7   |
| U8  | After navigating, focus is on the new page's `h1`                                            | FR-8   |
| U9  | Placeholder pages render an `h1`, the annotation and a home link; `/sign-in` has no inputs   | FR-10  |
| U10 | An unknown path renders the 404 page with home and ailments links                            | FR-11  |
| U11 | Hero: the headline, the cursor (`aria-hidden`), and both CTAs with the correct targets       | FR-12  |
| U12 | Common ailments renders 3–6 boxes from the content module, each with exactly one link        | FR-13  |
| U13 | How it works renders exactly 3 steps, in order                                               | FR-14  |
| U14 | Testimonials renders 3 `figure`/`blockquote`/`figcaption` groups                             | FR-15  |
| U15 | Every landing section's copy comes from `content/landing.ts`: changing it changes the output | FR-16  |
| U16 | Every page renders exactly one `h1`                                                          | NFR-2  |

## 3. End-to-end tests (Playwright: Chromium, Firefox, WebKit + Pixel/iPhone viewports)

| ID  | Scenario                                                                                                                   | Covers       |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ------------ |
| E1  | Clicking each nav item loads its route, updates the URL and marks the item active                                          | AC-3         |
| E2  | "Book a session" leads to `/sign-in`; "Browse ailments" leads to `/ailments`                                               | AC-2         |
| E3  | Keyboard only: Tab through the landing page, check the focus order and that the ring is visible, activate a CTA with Enter | AC-1         |
| E4  | At 375px: open the menu, pick an item, the menu closes; reopen it, press `Esc`, the menu closes                            | AC-4         |
| E5  | Going directly to `/some/made-up/path` shows the 404 page, and its links work                                              | AC-5         |
| E6  | No horizontal scroll at 320, 375, 768, 1024, 1440 and 1920px on every route                                                | NFR-4        |
| E7  | With `prefers-reduced-motion: reduce` emulated, nothing on the page is animating                                           | NFR-6        |
| E8  | No network requests leave `localhost` (no font CDNs, no trackers)                                                          | NFR-7, NFR-9 |
| E9  | No console errors or warnings on any route                                                                                 | NFR-8        |

## 4. Accessibility (axe via `@axe-core/playwright`)

- Run on `/`, `/ailments`, `/therapies`, `/sign-in` and the 404 page, at desktop and mobile
  widths, with the mobile menu both open and closed.
- Rulesets: `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`, and `best-practice`.
- **Pass:** zero violations. Any rule that is disabled needs a written reason in the spec
  file. (AC-6, NFR-2)

## 5. Performance (Lighthouse CI, mobile preset, against `vite preview`)

| Metric         | Budget            |
| -------------- | ----------------- |
| Performance    | ≥ 95              |
| Accessibility  | ≥ 95 (target 100) |
| Best Practices | ≥ 95              |
| LCP            | < 2.5 s           |
| CLS            | < 0.1             |
| TBT            | < 200 ms          |

Take the median of 3 runs on `/`. (AC-7, NFR-5)

## 6. Manual checks

| ID  | Check                                                                                                                                                                   | Covers        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| M1  | Design review against `CLAUDE.md`: dark only, tokens only (no stray hex values), no radius, shadows or gradients, accent used only for the CTA, focus and active states | NFR-1         |
| M2  | Screen reader pass (NVDA + Firefox, VoiceOver + Safari): landmarks announced, headings read in natural case, the cursor is not announced, the menu state is announced   | NFR-2         |
| M3  | 200% zoom and a 320px width: content reflows and nothing is clipped                                                                                                     | NFR-2, NFR-4  |
| M4  | Real-device check on iOS Safari and Android Chrome                                                                                                                      | NFR-3         |
| M5  | Copy review by Steve (Marketing) and Susan (Product): tone matches `specs/mission.md`, and no real people or products are mocked                                        | Open question |
| M6  | **Steve signs off** on screenshots at 375, 768 and 1440px                                                                                                               | AC-9          |

## 7. Definition of done

- [x] Every automated gate in §1 passes (WebKit pending CI, see §8)
- [x] U1–U16 and E1–E9 are implemented and passing
- [x] Zero axe violations (§4)
- [x] Lighthouse budget met (§5)
- [ ] M1–M6 completed and recorded in the PR description
- [ ] `specs/roadmap.md` Phase 1 marked complete

---

## 8. Results (2026-09-29, branch `feature/phase-1-landing-and-shell`)

| Check                                   | Result                                                                                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run lint`                          | Pass: 0 errors, 0 warnings                                                                                                                                                                 |
| `npm run format:check`                  | Pass                                                                                                                                                                                       |
| `npm test`                              | Pass: 28 tests (U1–U16, some parameterised per route)                                                                                                                                      |
| `npm run build`                         | Pass                                                                                                                                                                                       |
| E2E, Chromium + Firefox + mobile Chrome | Pass: 49 tests (E1–E9 + axe)                                                                                                                                                               |
| E2E, WebKit + mobile Safari             | **Not run locally:** see note below                                                                                                                                                        |
| axe (§4)                                | Pass: 0 violations on all 5 routes, desktop and mobile, menu open                                                                                                                          |
| Lighthouse (§5), median of 3            | Performance 98 · Accessibility 100 · Best Practices 100 · LCP 1.85s · CLS 0 · TBT 56ms                                                                                                     |
| M1 design review                        | Done against `CLAUDE.md`. Fixed: mono labels being dropped by `cn()`, oversized cursor, nav wrapping at 768px, cramped 3-column sections at tablet width, broken side rules on short pages |
| M2–M6                                   | **Pending:** need a human (screen readers, real devices, copy review, Steve's sign-off)                                                                                                    |

Screenshots for M6: `screenshots/` (home, ailments, 404 at 375 / 768 / 1440, plus the open mobile menu). Regenerate with `npm run screenshots`.

**WebKit note:** on the development machine, Windows Application Control policy blocks Playwright's WebKit DLLs ("An Application Control policy has blocked this file"), so the `webkit` and `mobile-safari` projects cannot launch there. They stay in `playwright.config.ts` and must pass in CI or on a machine without that policy before merge. Safari is also covered by manual check M4.
