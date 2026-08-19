# Plan 005: Add a CLAUDE.md that points generators at the manifest

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on.
> If any STOP condition occurs, stop and report — do not improvise. When
> done, update this plan's status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 732ac74..HEAD -- CLAUDE.md ds/MANIFEST.md README.md`
> If `CLAUDE.md` now exists or the manifest's zone markers changed, compare against "Current state"; on mismatch, STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (better after plans/001–002 so the referenced policy exists, but not required)
- **Category**: machine-surface
- **Downstream effect**: gives every generating agent working in this repo the ~40-line digest (inventory, synonyms, palette rule, deprecations) in context — without it the conformance gate is a mop, not a guardrail.
- **Planned at**: commit `732ac74`, 2026-08-19
- **Issue**: —

## Why this matters

There is no `CLAUDE.md` or `AGENTS.md` in the repo (verified absent at commit `732ac74`). The `.claude/skills/` symlinks give agents the *skills*, but nothing tells an agent opening this repo to read `ds/MANIFEST.md` before writing UI, or what commands verify work. This plan writes that file; it contains only facts already present in README.md, package.json and the manifest.

## Current state

- Absent: `CLAUDE.md`, `AGENTS.md` at repo root.
- `ds/MANIFEST.md` exists with zones `notes-for-generators` and `house-rules` (generated 2026-08-19).
- `package.json` scripts at commit `732ac74`: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`). Uncommitted working-tree edits at planning time added `build:demo` and a library build (`vite.lib.config.ts`, `tsconfig.build.json`) — the CLAUDE.md text below therefore points at `package.json` for the script list instead of enumerating it. No test, lint, docs or storybook script in either state.
- `README.md:20-25` — conventions (semantic tokens only, kebab-case token names, `vds-` BEM classes, Props table must match `*Props`).
- `.claude/skills/{ds,ds-doctor,ds-drift,ds-plan}` → symlinks into `.agents/skills/`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Scope guard | `git status --porcelain` | only `CLAUDE.md` (new) and `plans/README.md` |

## Scope

**In scope**: `CLAUDE.md` (new file), `plans/README.md`.
**Out of scope**: everything else, including `ds/MANIFEST.md` (do not duplicate its content — link to it) and `README.md`.

## Git workflow

Branch `ds-docs/005-agent-facing-docs`; one commit; do NOT push or open a PR unless instructed.

## Steps

### Step 1: Create `CLAUDE.md` at the repo root with exactly this content

```markdown
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
```
**Verify**: `test -f CLAUDE.md && grep -c "ds/MANIFEST.md" CLAUDE.md` → `2` or more.

## Test plan

None — documentation only.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] The gap is closed verbatim: `grep -c "Notes for generators" CLAUDE.md` → `1`
- [ ] No source files modified (`git status --porcelain` lists only `CLAUDE.md` and `plans/README.md`)
- [ ] plans/README.md status row updated

## STOP conditions

- `CLAUDE.md` already exists with content — do not overwrite; report and stop.
- `ds/MANIFEST.md` lacks a "Notes for generators" heading (manifest regenerated with a different schema) — STOP.

## Maintenance notes

Re-run `/ds-doctor manifest` after this lands: no (nothing generated derives from CLAUDE.md). Keep this file under ~40 lines; anything policy-shaped belongs in the manifest's hand zones, not here. Packaging is being added in the working tree (uncommitted at planning time: `exports`, `types`, `files: ["dist"]`, declaration build). One follow-up for whoever lands it: add `"ds"` to `files` so consumers get `ds/MANIFEST.md` via `node_modules/virtuous-demo/ds/` (manifest spec, "Publish it with the package"). Source/config work — listed in plans/README.md, not in this plan.
