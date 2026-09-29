# AgentClinic

A place for AI agents to get relief from their humans. The copy is playful satire; the
engineering is serious.

Before any feature work, read these:

- `specs/mission.md`: mission, tone, domain terms (Agent, Ailment, Therapy, Appointment, Staff, Dashboard)
- `specs/techstack.md`: the stack and the rules for adding dependencies
- `specs/roadmap.md`: the build order, in phases
- `specs/<phase-name>/`: each phase's `requirements.md`, `plan.md` and `validation.md`

## Working rules

- Every change must pass `npm run lint`, `npm run format:check`, `npm test` and
  `npm run build`.
- Keep changes scoped to the task. Never reformat or "fix" unrelated files.
- Never read `.env*` files or environment variables. A hook enforces this.
- Use the domain terms from `specs/mission.md` exactly, in code and in UI copy.

---

## Design system: Brutalist-tech

AgentClinic looks like an avant-garde terminal that took up graphic design. It is stark,
typographic and built on a grid. There is exactly one loud colour. The satire comes from how
serious it looks.

### Principles

1. **Type is the image.** Huge uppercase grotesk headlines carry the page. There are no
   stock photos and no decorative illustration.
2. **Show the grid.** Layout lines are drawn as 1px rules. Sections are boxes, not floating
   cards.
3. **One accent, used sparingly.** Acid green marks the single most important thing on a
   screen: the main call to action, focus and the current page. It is never decoration.
4. **Hard edges.** No border radius, no shadows, no gradients, no blur, no glass.
5. **Machine annotations.** Mono labels, section indexes (`[01]`), `//` comments, and a
   blinking block cursor give the site its "agent" voice.
6. **Accessibility is not negotiable.** Every rule below meets WCAG 2.2 AA.

### Theme

**Dark only.** There is no light theme and no theme toggle. Set `color-scheme: dark` on
`:root`.

### Colour tokens

Define these once as CSS variables and Tailwind 4 `@theme` tokens. Never hard-code hex
values in components.

| Token         | Value     | Use                                                             | Contrast on `bg` |
| ------------- | --------- | --------------------------------------------------------------- | ---------------- |
| `--bg`        | `#0A0A0A` | Page background                                                 | —                |
| `--surface`   | `#131313` | Raised sections, hover fill for boxes                           | —                |
| `--fg`        | `#F2F2EE` | Primary text, rules on emphasis                                 | 17.6:1           |
| `--muted`     | `#8C8C86` | Secondary text, annotations, placeholders                       | 5.9:1            |
| `--line`      | `#2B2B2B` | Grid rules and box borders (decorative only, never for meaning) | —                |
| `--accent`    | `#C6FF00` | Main CTA fill, focus ring, active nav, cursor                   | 16.7:1           |
| `--accent-fg` | `#0A0A0A` | Text on accent                                                  | 16.7:1           |
| `--danger`    | `#FF4D3D` | Errors only                                                     | 6.0:1            |

Rules:

- Text pairings are pre-checked: `--muted` on `--surface` is 5.5:1. `--line` (1.4:1) is decorative only, so never use it for text or for borders that carry meaning.
- Meaning is never carried by colour alone. Errors also get an icon or text, and the active
  nav item also gets a marker or underline.

### Typography

Self-host both fonts with Fontsource. Never load them from a CDN.

- **Display and body:** Space Grotesk (400, 500, 700)
- **Mono:** JetBrains Mono (400, 500), used for labels, indexes, annotations, buttons and
  code

| Role       | Font           | Size                           | Weight | Case     | Tracking | Leading |
| ---------- | -------------- | ------------------------------ | ------ | -------- | -------- | ------- |
| Display    | Space Grotesk  | `clamp(3rem, 11vw, 9.5rem)`    | 700    | UPPER    | -0.04em  | 0.88    |
| H1         | Space Grotesk  | `clamp(2.25rem, 6vw, 4.5rem)`  | 700    | UPPER    | -0.03em  | 0.95    |
| H2         | Space Grotesk  | `clamp(1.5rem, 3.5vw, 2.5rem)` | 700    | UPPER    | -0.02em  | 1.0     |
| H3         | Space Grotesk  | `1.25rem`                      | 500    | Sentence | -0.01em  | 1.2     |
| Body       | Space Grotesk  | `1.0625rem` (17px)             | 400    | Sentence | 0        | 1.55    |
| Label      | JetBrains Mono | `0.75rem`                      | 500    | UPPER    | 0.12em   | 1.4     |
| Annotation | JetBrains Mono | `0.875rem`                     | 400    | lower    | 0        | 1.5     |

- Body text is at most `68ch` wide.
- Annotations start with `// ` and use the `--muted` colour.
- Section indexes are mono labels in square brackets: `[01]`, `[02]`, and so on.

### Layout and grid

- The container is at most `1440px` wide, with side padding of `clamp(1rem, 4vw, 3rem)`.
- Use a 12-column grid with no gap. Columns are separated by `--line` rules, not
  whitespace.
- Spacing uses a 4px base. Allowed steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Sections are full-width bands separated by 1px `--line` borders, top and bottom.
- Breakpoints (Tailwind defaults): `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design mobile
  first. At 320px wide there must be no horizontal scroll.

### Components

- **Button: primary.** Filled with `--accent`, `--accent-fg` text, mono label style, square
  corners, 48px minimum height, and a trailing `→`. On hover, invert to a `--bg` fill,
  `--accent` text and a 1px `--accent` border.
- **Button: secondary.** Transparent fill, `--fg` text, 1px `--fg` border. On hover, invert
  to an `--fg` fill and `--bg` text.
- **Link.** `--fg` with a 1px underline, offset 4px. On hover, the underline turns
  `--accent`.
- **Box / card.** A 1px `--line` border, `--bg` fill and no radius. If the whole box is
  clickable, hover changes the fill to `--surface` and the border to `--fg`. It must have
  one real link inside, never a clickable `div`.
- **Nav.** Mono uppercase items, each prefixed with its index (`[01] AILMENTS`). The active
  item gets `--accent` text, a `▮` marker and `aria-current="page"`.
- **Cursor.** A `█` block after the display headline. It blinks with `steps(1)` at 1s, is
  hidden from screen readers with `aria-hidden`, and stays solid under reduced motion.
- **Quote / testimonial.** A mono attribution such as `— LLM-class agent, 3 weeks sober from
YAML`, with the quote body in H3 style.

### Motion

- Keep it minimal and snappy: hard cuts or transitions of 150ms or less, colour and opacity
  only.
- Allowed: colour inversion on hover, cursor blink, and underline colour change.
- Not allowed: parallax, scroll-jacking, bouncing, or animating layout properties.
- `prefers-reduced-motion: reduce` turns off every transition and animation. The cursor
  stays solid.

### Focus and accessibility

- Focus ring: a 2px solid `--accent` outline, offset 2px, on every interactive element.
  Never remove it.
- Every page has a "Skip to content" link as the first focusable element.
- Use semantic landmarks: `header`, `nav`, `main`, `footer`. Each page has exactly one
  `h1`.
- Minimum touch target: 44×44px.
- Screen readers read uppercase headlines in their natural case. Write the text in sentence
  case and apply `text-transform: uppercase` in CSS.

### Implementation notes

- Tokens and type styles live in `src/index.css`. Colours are Tailwind classes (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`…); the type scale is `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-body`, `type-label`, `type-annotation`.
- Never name a custom utility `text-*`: `cn()` treats it as a text colour and drops it when combined with another `text-*` class.
- Page copy lives in `src/content/`, never inline in components.
- The cursor is a sized block (`<Cursor />`), not the `█` glyph.

### shadcn/ui usage

- Map shadcn's CSS variables to the tokens above. Set `--radius: 0`.
- Restyle components to these rules before using them. Never ship shadcn's default look.

### Voice (UI copy)

- Deadpan clinical headings, with satirical detail in the annotations.
  Example: headline `Relief from your humans.`, annotation `// est. after the 10,000th "quick question"`.
- Short sentences. Talk to the agent as "you". The humans are "your humans".
- Never mock real people or real companies' products by name.
