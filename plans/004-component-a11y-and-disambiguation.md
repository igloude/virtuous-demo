# Plan 004: State the accessibility contract for every component and add Link-vs-Button guidance

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on.
> If any STOP condition occurs, stop and report — do not improvise. When
> done, update this plan's status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 732ac74..HEAD -- docs/components/ src/components/`
> If any in-scope doc or any component source changed since this plan was written, compare the
> "Current state" excerpts against live code; on mismatch, STOP.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/003 (edits the same `docs/components/button.md`; apply 003 first)
- **Category**: contracts
- **Downstream effect**: makes `a11y.*` parity findings measurable (there is a written guarantee to measure against) and makes `usage.wrong-component` between Button and Link adjudicable.
- **Planned at**: commit `732ac74`, 2026-08-19
- **Issue**: —

## Why this matters

Only Input has an "Accessibility" section (`docs/components/input.md:20-24`). Button, Textarea, Link and Form make guarantees in code (focus ring, `role="alert"`, `aria-describedby`, safe `rel`) that nothing documents, so neither a reviewer nor a generator can tell what the component promises vs. what the caller must add (e.g. an accessible name for an external link). Nothing says when to use `Link` vs `Button`. Everything below describes **existing behavior read from source** — no behavior changes.

## Current state

Files and the behavior to document (read-only evidence):

- `src/components/Button/Button.tsx:17` — `type` defaults to `"button"`; `Button.css:18-21` — `:focus-visible` outline via `--focus-ring-*`; `Button.css:23-26` — `:disabled` → `opacity: .5; cursor: not-allowed`. No `href`, no `as` prop.
- `src/components/Textarea/Textarea.tsx:28-43` — identical label/`htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"` wiring to Input; `required` renders an `aria-hidden` `*` (line 30).
- `src/components/Link/Link.tsx:16,21` — `external` adds `target="_blank" rel="noopener noreferrer"` and an `aria-hidden="true"` `↗` glyph; there is **no** screen-reader text for "opens in new tab". `Link.css:9-12` — `:focus-visible` ring.
- `src/components/Form/Form.tsx:26-28` — renders `noValidate`, intercepts submit with `preventDefault`; no `aria-*` added; `actions` is a plain `div`.
- `docs/components/input.md:20-24` — the exemplar "Accessibility" section; match its style:
  ```
  ## Accessibility

  - Label is always rendered and associated with the control.
  - `hint` and `error` are linked via `aria-describedby`.
  - `error` is announced with `role="alert"`.
  ```
- `docs/components/link.md` — has no `## Usage` section; `docs/components/button.md:21-25` — `## Usage` exists.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Scope guard | `git status --porcelain` | only files under `docs/components/` and `plans/README.md` |

## Scope

**In scope**: `docs/components/button.md`, `docs/components/textarea.md`, `docs/components/link.md`, `docs/components/form.md`, `plans/README.md`.
**Out of scope**: all `src/components/**` (the missing SR text on external links is a source a11y gap — report it, do not fix it here); `docs/components/input.md` (already correct); `ds/MANIFEST.md`.

## Git workflow

Branch `ds-docs/004-component-a11y`; commit per step; do NOT push or open a PR unless instructed.

## Steps

### Step 1: Button — accessibility + disambiguation
In `docs/components/button.md`, insert before `## Tokens used`:

```markdown
## Accessibility

- Renders a native `<button>`; `type` defaults to `"button"` so it never submits by accident.
- Keyboard focus shows the `--color-focus-ring` outline on `:focus-visible`.
- `disabled` uses the native attribute (removed from the tab order) and dims to 50% opacity.
- Icon-only buttons must be given an accessible name via `aria-label` by the caller.

## Button or Link?

- **Button** performs an action on the current page (submit, reset, open, toggle, delete).
- **Link** navigates to a URL (`href`). Do not use a `Button` with an `onClick` that only changes location, and do not style a `Link` to look like a button.
```
**Verify**: `grep -c "## Button or Link?" docs/components/button.md` → `1`.

### Step 2: Textarea — accessibility
In `docs/components/textarea.md`, insert before `## Tokens used`:

```markdown
## Accessibility

Same contract as [Input](./input.md): the label is always rendered and associated via `htmlFor`; `hint` and `error` are linked with `aria-describedby`; `error` sets `aria-invalid` and is announced with `role="alert"`; `required` renders a visual `*` that is hidden from assistive tech (the native `required` attribute carries the semantics).
```
**Verify**: `grep -c "## Accessibility" docs/components/textarea.md` → `1`.

### Step 3: Link — usage + accessibility
In `docs/components/link.md`, insert before `## Tokens used`:

```markdown
## Usage

- Use for navigation only; for actions use [Button](./button.md) (see "Button or Link?" there).
- Prefer the default underlined style in body copy; use `subtle` only in dense navigation where underlines add noise.

## Accessibility

- Renders a native `<a>`; always pass `href`.
- `external` adds `target="_blank"` and `rel="noopener noreferrer"`; the ↗ glyph is `aria-hidden`. The component does **not** add "opens in a new tab" text for screen readers — include it in the link text or an `aria-label` until the DS adds it (tracked as a DS source item in plans/README.md).
- Keyboard focus shows the `--color-focus-ring` outline on `:focus-visible`.
```
**Verify**: `grep -c "## Accessibility" docs/components/link.md` → `1`; `grep -c "## Usage" docs/components/link.md` → `1`.

### Step 4: Form — accessibility
In `docs/components/form.md`, insert before `## Tokens used`:

```markdown
## Accessibility

- Renders a native `<form>` with `noValidate`; field-level errors are presented by `Input`/`Textarea` (`aria-invalid` + `role="alert"`), not by browser bubbles. The caller is responsible for computing and passing `error` strings.
- `actions` renders a plain `<div>`; order buttons so the primary action is last in DOM order (it is right-aligned visually).
```
**Verify**: `grep -c "## Accessibility" docs/components/form.md` → `1`.

## Test plan

None — documentation only.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] The gap is closed verbatim: `grep -l "## Accessibility" docs/components/*.md | wc -l` → `5`
- [ ] No source files modified (`git status --porcelain` lists only `docs/components/*.md` and `plans/README.md`)
- [ ] plans/README.md status row updated

## STOP conditions

- Any excerpt in "Current state" no longer matches source (e.g. Link gains SR text, Button gains `href`/`as`) — the drafted text would then be wrong; STOP and report which.
- You find yourself wanting to change a component to make the docs true — STOP; that is a DS source item.

## Maintenance notes

Re-run `/ds-doctor manifest` after this lands: optional (the inventory "Use when" column already carries the Button/Link rule; no generated zone derives from a11y sections). Follow-up source item for the DS owner: visually-hidden "opens in a new tab" text in `Link` when `external` (README of plans/ lists it).
