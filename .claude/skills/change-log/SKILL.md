---
name: change-log
description: Record project changes in CHANGELOG.md as short, dated, plain-English lines. Use when the user asks to log, record or track changes, update the changelog, or says "/change-log" (optionally with a description of what changed).
---

# Change log

Keep `CHANGELOG.md` at the repo root: a plain-English record of what changed and when.

## Steps

1. **Find what changed since the last entry.**
   - Read `CHANGELOG.md`. The last logged commit is in the marker on its first line:
     `<!-- last-commit: <sha> -->`.
   - Committed changes: `git log --reverse --format="%h %ad %s" --date=short <sha>..HEAD`
     (all history if there's no marker yet).
   - Uncommitted changes: `git status --short` and `git diff --stat`.
   - If the user described the change in their message, use their description as well.
   - If git reports "dubious ownership", add `-c safe.directory=<repo path>` to each git
     command. Don't change global git config.
2. **Write entries** under a `## YYYY-MM-DD` heading for each date (use the commit date for
   commits, today's date for uncommitted work). Newest date at the top. If today's heading
   already exists, add to it. Don't create a second one.
3. **Update the marker** to the current `HEAD` short sha.
4. **Reply** with the lines you added, nothing more.

## Writing rules

- One bullet per change. Plain English, past tense, a short sentence: ideally under 15
  words.
- Say what changed for the project, not how. For example, "Added a mobile menu to the
  header", not "Refactored NavItems.tsx to accept an orientation prop".
- No file paths, class names or jargon unless the user needs them to find the change.
- Group small related edits into one line. Skip pure formatting, typo fixes and lockfile
  churn.
- Never duplicate a line that's already logged.
- Don't invent changes. If nothing changed since the last entry, say so and leave the
  file alone.
- Don't commit the changelog unless the user asks.

## File format

```markdown
<!-- last-commit: 9d5d9ac -->

# Changelog

## 2026-09-29

- Added the landing page with hero, ailments, steps and testimonials.
- Removed the Vite starter page and icons.
```
