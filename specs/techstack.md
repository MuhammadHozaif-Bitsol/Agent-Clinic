# Tech Stack

One TypeScript package: the React frontend is in `src/` and the Hono API is in `server/`.
They share types and validation schemas. Versions are the ones current as of 2026-09-29.

## Frontend

| Concern       | Choice                                    | Status                                     |
| ------------- | ----------------------------------------- | ------------------------------------------ |
| Language      | TypeScript 6 (strict)                     | In repo                                    |
| UI            | React 19 + React Compiler                 | In repo                                    |
| Build / dev   | Vite 8                                    | In repo                                    |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`)      | Phase 1                                    |
| Components    | shadcn/ui (built on Radix, so accessible) | Phase 1                                    |
| Routing       | React Router                              | Phase 1 _(default choice, open to change)_ |
| Data fetching | TanStack Query                            | Phase 3 _(default choice, open to change)_ |

## Backend

| Concern    | Choice                                                          | Status  |
| ---------- | --------------------------------------------------------------- | ------- |
| API server | Hono on Node (`@hono/node-server`)                              | Phase 3 |
| Database   | SQLite (`better-sqlite3`), a single file with no ops            | Phase 3 |
| ORM        | Drizzle ORM + drizzle-kit migrations                            | Phase 3 |
| Validation | Zod, with schemas shared by the client and the server           | Phase 3 |
| Auth       | Better Auth: email and password, with `agent` and `staff` roles | Phase 4 |

SQLite is enough for now. Drizzle means moving to Postgres later is a change of driver and
migrations, not a rewrite.

## Quality and tooling

| Concern       | Choice                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Linting       | ESLint 10 (flat config): `typescript-eslint`, React Hooks, React Refresh, `jsx-a11y-x`, `sonarjs` |
| Formatting    | Prettier (no semicolons, single quotes) + `eslint-config-prettier`                                |
| Testing       | Vitest + jsdom + React Testing Library                                                            |
| AI guardrails | Claude Code hooks: env guard, and per-turn lint and test of changed files only                    |

## Layout

```
src/            React app (pages, components, hooks)
server/         Hono API: routes, db schema, auth
shared/         Types and Zod schemas used by both
specs/          Mission, tech stack, roadmap, feature specs
```

## Browser support

The current releases of Chrome, Edge, Firefox and Safari, on desktop and mobile. No
support for legacy browsers.

## Rules for dependencies

- It must be popular and actively maintained, and officially support the ESLint,
  TypeScript and React versions we run.
- Every new dependency is justified in the spec or PR that adds it.

## Deferred
 
- **Hosting and deployment:** decided in the final roadmap phase.
