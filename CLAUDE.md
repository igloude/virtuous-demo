# virtuous-demo — agent notes

This repo *is* the design system (React + TS, CSS custom properties). Read before writing or reviewing UI:

1. `ds/MANIFEST.md` → **Notes for generators** and **House rules** (inventory, synonyms, token policy, deprecations). `ds/tokens.json` is the resolved token map.
2. `README.md` → Conventions. `docs/tokens.md` and `docs/components/*.md` → per-component contracts.

## Commands

- `npm run typecheck` — `tsc --noEmit`; the only automated gate. Run it before finishing any change.
- `npm run dev` — demo at http://localhost:5173 (`src/demo/`).
- Other scripts (`build`, `build:demo`, `preview`): see `package.json` → `scripts`; keep this list in sync when they change.

No tests, lint, docs build or Storybook exist; docs are plain Markdown.

## Rules that are easy to get wrong

- Five components exist: Button, Input, Textarea, Link, Form. Do not invent others; follow the contribution path in `ds/MANIFEST.md` → Policy.
- Color only via `--color-*` semantic tokens. `--palette-*` and raw hex are internal to `src/tokens/tokens.css`.
- A component's doc Props table must match its exported `*Props` interface — update both together.
- Class names are `vds-` BEM; don't target them from outside the component's own CSS file.
- Design-system skills: `/ds-doctor` (audit the DS, regenerate `ds/`), `/ds-plan` (classify a feature against the DS), `/ds-drift` (review a branch for conformance). All are report-only.
- After any change to tokens, exports, or props: run `/ds-doctor manifest` so `ds/` stays current.
