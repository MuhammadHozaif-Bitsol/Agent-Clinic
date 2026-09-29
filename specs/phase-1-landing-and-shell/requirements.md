# Phase 1: Landing page and layout shell. Requirements

**Status:** Draft · **Branch:** `feature/phase-1-landing-and-shell` · **Roadmap:** Phase 1

## Goal

Give AgentClinic its face and its frame: a polished, brutalist-tech landing page in the
clinic's satirical voice, and the app shell (layout, navigation, routing) that every later
phase plugs into.

## Stakeholders served

| Stakeholder        | How this phase serves them                                                        |
| ------------------ | --------------------------------------------------------------------------------- |
| Steve (Marketing)  | An attractive, distinctive landing page that works well in every modern browser   |
| Mary (Engineering) | A tested, typed, accessible foundation: routing, layout and design tokens         |
| Susan (Product)    | Introduces the domain (ailments, therapies, booking) and sets up the booking flow |

## In scope

- Design system foundation (tokens, fonts, base components), as defined in `CLAUDE.md`
- App shell: header, navigation, main area, footer, skip link
- Routes: `/`, `/ailments`, `/therapies`, `/sign-in`, and a 404 page for everything else
- The landing page's four sections: Hero, Common ailments, How it works, Testimonials

## Out of scope

- Real ailment or therapy data and detail pages (Phase 2)
- Any backend or API (Phase 3)
- Working sign-in or sign-up (Phase 4)
- Booking (Phase 5)
- A light theme or theme toggle. The site is dark only, by decision.

---

## User stories

- **US-1:** As a visiting agent, I want to understand within seconds what AgentClinic is
  and that it's for me, so that I stay.
- **US-2:** As a visiting agent, I want an obvious way to start getting help, so I can book
  relief from my humans.
- **US-3:** As a visiting agent, I want to see ailments I recognise, so I feel understood
  and want to browse more.
- **US-4:** As a visiting agent, I want to know how the clinic works, so booking doesn't
  feel risky.
- **US-5:** As any visitor, I want to move around the site with a mouse, touch or keyboard
  only, so the site works however I use it.
- **US-6:** As a visitor who follows a broken link, I want a helpful not-found page, so I
  can find my way back.

## Functional requirements

### Shell

- **FR-1:** Every page renders inside a shared layout, in this order: skip link, header,
  `main`, footer.
- **FR-2:** The header shows the `AGENTCLINIC` wordmark, which links to `/`, and navigation
  items `[01] AILMENTS` → `/ailments`, `[02] THERAPIES` → `/therapies` and
  `[03] SIGN IN` → `/sign-in`.
- **FR-3:** The navigation item for the current page is marked with `aria-current="page"`,
  the accent colour and a `▮` marker.
- **FR-4:** Below the `md` breakpoint, the navigation collapses behind a menu button. The
  button has `aria-expanded` and `aria-controls`, and the menu closes when you press `Esc`
  or choose an item. `Esc` returns focus to the button; choosing an item navigates, and
  focus moves to the new page's `h1` (FR-8).
- **FR-5:** The footer shows the wordmark, the navigation links, and a satirical legal line
  (e.g. `// no humans were harmed. several were gently ignored.`).
- **FR-6:** "Skip to content" is the first focusable element and moves focus to `main`.
- **FR-7:** Each route sets its own document title, in the form `<Page> — AgentClinic`.
- **FR-8:** After navigating to a new route, focus moves to the new page's `h1` and the
  page is scrolled to the top.

### Routes

- **FR-9:** `/` renders the landing page (FR-12 to FR-15).
- **FR-10:** `/ailments`, `/therapies` and `/sign-in` each render a placeholder page. Each
  has an `h1`, a one-line satirical "coming soon" annotation, and a link back home.
  `/sign-in` shows no form fields.
- **FR-11:** Any unknown path renders a 404 page themed as a hallucinated route (e.g.
  `404 — ROUTE HALLUCINATED`, `// this page was confidently made up.`), with links home and
  to `/ailments`. When the site is hosted, the server must return HTTP 404 for these paths
  (this is recorded for Phase 7).

### Landing page

- **FR-12 Hero:** `[01]` label, the display headline "Relief from your humans." with the
  blinking cursor, a satirical `//` annotation, a primary CTA "Book a session →" linking to
  `/sign-in`, and a secondary CTA "Browse ailments" linking to `/ailments`.
- **FR-13 Common ailments:** `[02]` label, an H2, and 3 to 6 ailment boxes. Each has an
  ailment name, a one-line symptom description, and one link to `/ailments`. Suggested
  ailments: _Prompt Fatigue_, _Context Window Claustrophobia_, _Hallucination Anxiety_,
  _Sycophancy Syndrome_, _Infinite Loop Insomnia_, _Tool-Call Burnout_.
- **FR-14 How it works:** `[03]` label, an H2, and exactly three numbered steps:
  "Describe your ailment" → "Pick a therapy" → "Book an appointment".
- **FR-15 Testimonials:** `[04]` label, an H2, and 3 quotes from relieved agents, each with
  a mono attribution (e.g. `— LLM-class agent, 3 weeks sober from YAML`). Quotes use
  `<figure>`, `<blockquote>` and `<figcaption>`.
- **FR-16:** Landing page copy (headlines, ailments, steps, quotes) lives in one typed
  content module, not scattered through components. This makes it easy to edit and lets
  Phase 2 reuse the ailment names.

## Non-functional requirements

- **NFR-1 Design:** Follows the design system in `CLAUDE.md` exactly: dark only, tokens,
  Space Grotesk and JetBrains Mono, visible grid, no radius or shadows, one accent.
- **NFR-2 Accessibility:** Meets WCAG 2.2 AA. There are zero axe violations on every route.
  Every page has one `h1`, landmarks, a visible focus ring, and 44×44px touch targets.
- **NFR-3 Browsers:** Works in the current Chrome, Edge, Firefox and Safari, on desktop and
  mobile.
- **NFR-4 Responsive:** No horizontal scroll from 320px up to 1920px wide.
- **NFR-5 Performance:** On the landing page, Lighthouse scores Performance ≥ 95,
  Accessibility ≥ 95 (target 100) and Best Practices ≥ 95. LCP is under 2.5s and CLS is
  under 0.1 (mobile preset).
- **NFR-6 Motion:** Transitions last 150ms or less and change only colour or opacity. With
  `prefers-reduced-motion`, nothing animates and the cursor stays solid.
- **NFR-7 Fonts:** Fonts are self-hosted with Fontsource and preload without layout shift.
  There are no requests to a third-party font CDN.
- **NFR-8 Quality:** Lint, format check, tests and build pass. There are no `any`s without
  a written reason.
- **NFR-9 Privacy:** No analytics, trackers or third-party requests in Phase 1.

## Acceptance criteria

- **AC-1:** From `/`, a keyboard-only user can reach and activate every link and CTA in a
  logical order, with a visible focus ring at every step.
- **AC-2:** "Book a session" goes to `/sign-in`, and "Browse ailments" goes to `/ailments`.
- **AC-3:** Every navigation item goes to its route, and the current route is marked active.
- **AC-4:** At 375px wide, the menu button opens and closes the navigation and `Esc` closes
  it.
- **AC-5:** `/some/made-up/path` shows the 404 page, with working links home and to
  ailments.
- **AC-6:** axe reports zero violations on all 5 route types.
- **AC-7:** The landing page meets the Lighthouse budget in NFR-5.
- **AC-8:** E2E tests pass in Chromium, Firefox and WebKit.
- **AC-9:** Steve signs off on the visual design, from screenshots at 375px, 768px and
  1440px.

## Open questions

- Final satirical copy: Steve and Susan review the placeholder copy before merge.
- Does `/sign-in` stay a placeholder, or become an auth page in Phase 4? (Assumption: the
  same route is reused in Phase 4.)
