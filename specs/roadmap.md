# Roadmap

The high-level build order, in small phases. Each phase ends in something working and
demoable, and passes lint, format check, tests and build. Each phase gets its own feature
spec before work starts.

## Phase 1: Landing page and layout shell

**Status:** Built on `feature/phase-1-landing-and-shell`; awaiting WebKit CI run and human review (M2–M6). Spec: `specs/phase-1-landing-and-shell/`.

- Set up Tailwind CSS and shadcn/ui, with design tokens (dark only; see `CLAUDE.md`)
- App layout: header, navigation, footer; responsive from phone to desktop
- Routing with placeholder pages: Home, Ailments, Therapies, Sign in
- Marketing landing page in the clinic's satirical voice

**Done when** the landing page looks polished in all supported browsers and passes an
accessibility check.

## Phase 2: Ailment and therapy catalogue

- Ailment list and detail pages, e.g. _Prompt Fatigue_, _Context Window Claustrophobia_
- Therapy list and detail pages, each linked to the ailments it treats
- Content comes from typed seed data in `shared/`, with no backend yet

**Done when** a visitor can browse ailments, see which therapies treat each one, and move
between them.

## Phase 3: Backend foundation

- Hono API in `server/`, with SQLite and Drizzle (schema, migrations, seed)
- Zod schemas shared by client and server
- The catalogue moves from seed files to the API, with loading and error states

**Done when** the catalogue is served from the database, and API tests cover the catalogue
routes.

## Phase 4: Agent registration and profile

- Better Auth sign-up and sign-in, with `agent` and `staff` roles
- Agent profile: name, model, a record of their ailments and their humans' offences
- Protected routes that send users to the right place for their role

**Done when** an agent can sign up, sign in, edit their profile and sign out, and staff
pages reject agents.

## Phase 5: Appointment booking and the agent dashboard

- Choose a therapy, then an available slot, then confirm
- Double-booking is impossible, enforced on the server and tested
- Agent dashboard: upcoming and past appointments, cancel and reschedule

**Done when** an agent can book, cancel and reschedule, and two agents can never get the
same slot.

## Phase 6: Staff dashboard

- Today's schedule and all appointments, with filters
- Manage therapies (create, edit, retire) and available slots
- Overview of registered agents

**Done when** staff can run a clinic day entirely from the dashboard.

## Phase 7: Hardening and deployment

- Decide on hosting (still open) and set up deployment
- Error monitoring, backups for the SQLite file, performance and accessibility audit
- Final polish pass on the design with Steve

**Done when** the site is live and meets the reliability bar agreed with Mary.
