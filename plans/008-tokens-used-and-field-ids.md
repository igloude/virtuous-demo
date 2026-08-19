# Plan 008: Make every "Tokens used" section complete, and document field `id` derivation

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on.
> If any STOP condition occurs, stop and report — do not improvise. When
> done, update this plan's status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 128dacd..HEAD -- docs/components/ src/components/`
> If any in-scope doc or any component CSS/TSX changed since this plan was written, compare the "Current state" excerpts against live code; on mismatch, STOP.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: contracts
- **Downstream effect**: sharpens `token.*` and `a11y.parity-gap` adjudication — a reviewer comparing a hand-rolled field or button against the DS can read the complete token footprint and the id/`aria-describedby` contract from the doc instead of the CSS/TSX.
- **Planned at**: commit `128dacd`, 2026-08-19
- **Issue**: —

## Why this matters

Each component doc ends with a "Tokens used" line, but three of them list roughly half of what the CSS actually consumes (typography, motion, and focus-ring tokens are missing). A partial list reads as complete and misleads the reader into thinking, e.g., Button has no motion tokens. Separately, Input/Textarea auto-generate the control `id` and derive `${id}-hint` / `${id}-error`; callers passing their own `id` change those derived ids — undocumented today. This plan fixes both by transcribing what the source already does. No behaviour changes.

## Current state

### Tokens actually consumed (from CSS, verbatim greps)

- **Button** — `src/components/Button/Button.css`: `--space-2` (5), `--font-family-sans` (6), `--font-weight-medium` (7), `--line-height-tight` (8), `--radius-md` (10), `--duration-fast` + `--easing-standard` (13-15), `--focus-ring-width` + `--color-focus-ring` (19), `--focus-ring-offset` (20), `--font-size-sm/md/lg` + `--space-1/3/2/4/5` (29-31), `--color-action-primary-bg/-fg/-bg-hover/-bg-active` (37-41), `--color-action-secondary-bg/-fg/-border/-bg-hover/-bg-active` (44-49), `--color-action-danger-bg/-fg/-bg-hover` (52-55).
  Doc today, `docs/components/button.md:40`: `` `--color-action-*`, `--radius-md`, `--space-*`, `--font-size-*`, `--focus-ring-*` `` — missing `--color-focus-ring`, `--font-family-sans`, `--font-weight-medium`, `--line-height-tight`, `--duration-fast`, `--easing-standard`.

- **Input / Textarea** — `src/components/field.css`: `--space-1` (4,16), `--font-family-sans` (5), `--font-size-sm` (9,57,62), `--font-weight-medium` (10), `--color-text-primary` (11,23), `--color-text-danger` (15,63), `--font-size-md` (21), `--line-height-normal` (22), `--color-field-bg` (24), `--color-border-default` (25), `--radius-md` (26), `--space-2`/`--space-3` (27), `--duration-fast` + `--easing-standard` (29-30), `--color-field-placeholder` (34), `--color-border-strong` (38), `--focus-ring-width` + `--color-focus-ring` (42,44), `--color-field-bg-disabled` (48), `--color-border-danger` (53), `--color-text-muted` (58 — **note**: this token is undefined; the defined name is `--color-text_muted`, see `ds/MANIFEST.md` Token layer → Known irregularities; list it as written in the CSS and do not "fix" it here). Textarea adds none (`Textarea.css` has no `var()`).
  Doc today, `docs/components/input.md:28`: `` `--color-field-*`, `--color-border-*`, `--color-text-*`, `--radius-md`, `--space-*` `` — missing `--color-focus-ring`, `--focus-ring-width`, `--font-family-sans`, `--font-size-sm/md`, `--font-weight-medium`, `--line-height-normal`, `--duration-fast`, `--easing-standard`. `docs/components/textarea.md:27` says "Same as Input." — stays.

- **Link** — `src/components/Link/Link.css`: `--color-text-link` (2), `--radius-sm` (5), `--duration-fast` + `--easing-standard` (6), `--color-text-link-hover` (8), `--focus-ring-width` + `--color-focus-ring` (10), `--focus-ring-offset` (11).
  Doc today, `docs/components/link.md:32`: `` `--color-text-link`, `--color-text-link-hover`, `--color-focus-ring`, `--radius-sm` `` — missing `--duration-fast`, `--easing-standard`, `--focus-ring-width`, `--focus-ring-offset`.

- **Form** — `src/components/Form/Form.css`: `--space-2/4/6` (2-4,7,9). Doc `docs/components/form.md:31`: `` `--space-*` `` — already complete; no change.

### Field id derivation (Input.tsx / Textarea.tsx, identical logic)

```tsx
Input.tsx:17  const autoId = useId();
Input.tsx:18  const id = idProp ?? autoId;
Input.tsx:19  const hintId = hint ? `${id}-hint` : undefined;
Input.tsx:20  const errorId = error ? `${id}-error` : undefined;
Input.tsx:21  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
Input.tsx:25  <label className="vds-field__label" htmlFor={id}>
Input.tsx:31  id={id}
Input.tsx:35  aria-describedby={describedBy}
```
(`Textarea.tsx:20-24,28,34,39` — same lines, same shape.)

Docs today: `docs/components/input.md:20-24` "Accessibility" says label is associated and hint/error are linked via `aria-describedby`, but not that `id` is auto-generated or how the hint/error ids are derived. `docs/components/textarea.md:23` defers to Input.

### Conventions

- Doc structure exemplar: `docs/components/link.md` (Props → Usage → Accessibility → Tokens used). Keep "Tokens used" as a single line of backticked names, comma-separated, grouped color → layout → type → motion → focus.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck (repo gate) | `npm run typecheck` | exit 0 |
| Button gap closed | `grep -n "duration-fast" docs/components/button.md` | 1 line |
| Input gap closed | `grep -n "line-height-normal" docs/components/input.md` | 1 line |
| Link gap closed | `grep -n "focus-ring-offset" docs/components/link.md` | 1 line |
| Id contract documented | `grep -n "useId\|-hint" docs/components/input.md` | ≥ 1 line |
| Scope guard | `git status --porcelain` | only `docs/components/{button,input,link}.md` and `plans/README.md` |

## Scope

**In scope**: `docs/components/button.md`, `docs/components/input.md`, `docs/components/link.md`, `plans/README.md`.
**Out of scope**: all files under `src/components/` (source — the `--color-text-muted` mismatch in `field.css:58` is a source item tracked in `plans/README.md`, not this plan); `docs/components/form.md` and `textarea.md` (already correct / defer to Input); `ds/MANIFEST.md`.

## Git workflow

Branch `ds-docs/008-tokens-used-and-field-ids`; one commit per step or a single commit, message style matched to `git log`. Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Button "Tokens used"
Replace `docs/components/button.md:40` with:
```
`--color-action-primary-*`, `--color-action-secondary-*`, `--color-action-danger-*`, `--color-focus-ring`, `--radius-md`, `--space-1` … `--space-5`, `--font-family-sans`, `--font-size-sm/md/lg`, `--font-weight-medium`, `--line-height-tight`, `--duration-fast`, `--easing-standard`, `--focus-ring-width`, `--focus-ring-offset`
```
**Verify**: `grep -n "duration-fast" docs/components/button.md` → 1 line.

### Step 2: Input "Tokens used" + id contract
Replace `docs/components/input.md:28` with:
```
`--color-field-bg`, `--color-field-bg-disabled`, `--color-field-placeholder`, `--color-border-default/-strong/-danger`, `--color-text-primary`, `--color-text-danger`, `--color-text-muted` (hint; see ds/MANIFEST.md → Token layer → Known irregularities), `--color-focus-ring`, `--radius-md`, `--space-1/2/3`, `--font-family-sans`, `--font-size-sm/md`, `--font-weight-medium`, `--line-height-normal`, `--duration-fast`, `--easing-standard`, `--focus-ring-width`
```
Then append one bullet to the "Accessibility" list (after line 24):
```
- The control `id` defaults to a React `useId()` value; pass `id` to override it. `hint` and `error` render with ids `${id}-hint` / `${id}-error` and are joined into `aria-describedby` — so a custom `id` also changes those derived ids.
```
**Verify**: `grep -n "line-height-normal" docs/components/input.md` → 1 line; `grep -n "useId" docs/components/input.md` → 1 line.

### Step 3: Link "Tokens used"
Replace `docs/components/link.md:32` with:
```
`--color-text-link`, `--color-text-link-hover`, `--color-focus-ring`, `--radius-sm`, `--duration-fast`, `--easing-standard`, `--focus-ring-width`, `--focus-ring-offset`
```
**Verify**: `grep -n "focus-ring-offset" docs/components/link.md` → 1 line.

## Test plan

None — docs only; no docs build exists.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] The gap is closed verbatim: the three "gap closed" greps above each return 1 line; `grep -n "useId" docs/components/input.md` → 1 line
- [ ] No source files modified (`git status` shows only the three docs and `plans/README.md`)
- [ ] plans/README.md status row updated

## STOP conditions

- Any component CSS gained or lost a `var(--…)` since `128dacd` (drift check) — recompute the lists from the live CSS before editing, or stop.
- `field.css:58` no longer reads `--color-text-muted` (the source rename landed) — adjust the Input line to the defined name and drop the parenthetical, then continue.
- An edit would touch `src/`.

## Maintenance notes

- Re-run `/ds-doctor manifest` after this lands: **yes** (cheap; keeps stamps current even though no generated zone derives from "Tokens used").
- When the `--color-text_muted` → `--color-text-muted` source rename lands, remove the parenthetical added in Step 2.
- Consider generating "Tokens used" mechanically (`grep -o 'var(--[a-z0-9-]*)'` per component CSS) in a future ds-doctor run so these lines cannot drift again.
