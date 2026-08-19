# Plan 002: Write the override policy, contribution path, and severity map into the manifest

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on.
> If any STOP condition occurs, stop and report — do not improvise. When
> done, update this plan's status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 732ac74..HEAD -- ds/MANIFEST.md README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against live code; on mismatch, STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (plans/001 edits a different set of bullets in the same zone; if both run, apply 001 first and re-read the zone)
- **Category**: guidelines
- **Downstream effect**: unblocks the `guidelines` category entirely — ds-drift can adjudicate `override.*` and `adoption.hand-rolled` findings against written rules instead of defaults, and the severity map replaces generic severities with this repo's judgment.
- **Planned at**: commit `732ac74`, 2026-08-19
- **Issue**: —

## Why this matters

No file in this repo says when styling a DS component is acceptable, what a team does when the DS lacks a component, or which violation classes block a merge. `README.md:20-25` covers naming conventions only. Without these, every gap becomes a hand-rolled component and every drift finding is advisory. The decisions below are small and mostly codify what the code already implies (`className` passthrough exists on every component; `vds-` BEM classes are internal).

## Current state

- `ds/MANIFEST.md` — the hand zones `policy`, `severity-map` are seeded and marked "not yet decided — see plans/002" / "(Empty: ds-drift defaults apply. Populate via plans/002.)".
- `README.md:20-25` — "Conventions" list; gets one pointer line.

Excerpts (`ds/MANIFEST.md`, policy zone):
```
- **Overrides**: `className` passthrough exists on every component (it is merged onto the root element). Whether descendant selectors / `!important` against `.vds-*` internals are sanctioned is not yet decided — see plans/002.
- **Contribution path**: not yet written — see plans/002.
```
Severity-map zone:
```
| Class | Severity | Why |
|---|---|---|

(Empty: ds-drift defaults apply. Populate via plans/002.)
```

Evidence the override text relies on (read-only): every component merges `className` onto its root — `src/components/Button/Button.tsx:25`, `Input.tsx:24`, `Textarea.tsx:27`, `Link.tsx:15`, `Form.tsx:27`. Internal class names are `vds-*` BEM (`README.md:24`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Scope guard | `git status --porcelain` | only `ds/MANIFEST.md`, `README.md`, `plans/README.md` |

No docs/Storybook build exists in this repo.

## Scope

**In scope**: `ds/MANIFEST.md` (only inside `<!-- hand-maintained: policy -->` and `<!-- hand-maintained: severity-map -->` zones), `README.md`, `plans/README.md` (status row).
**Out of scope**: every `src/**` file; every `<!-- generated: … -->` zone of the manifest; `docs/**` (plan 001 owns docs/tokens.md).

## Git workflow

Branch `ds-docs/002-guidelines-policy`; commit per step; do NOT push or open a PR unless instructed.

## Steps

### Step 1: Override policy and contribution path
In the `policy` zone of `ds/MANIFEST.md`, replace the `- **Overrides**:` bullet and the `- **Contribution path**:` bullet with:

```markdown
- **Overrides**: `className` passthrough is the only sanctioned styling seam; it is merged onto the component root on every component. Use it for layout (margin, grid placement, width). Do **not** restyle internals: no selectors targeting `.vds-*` classes from app CSS, no `!important` against DS rules, no inline `style` that changes color/typography. If a visual variant is missing, request it (below) rather than override it.
- **Contribution path**: when the DS lacks a component, variant, or token — open an issue labeled `ds-request` describing the use case and the nearest existing component; until it ships, a hand-rolled interim is allowed only with a waiver row (Waivers table below) that names an owner and an expiry ≤ 90 days. Changes land in `src/` with a matching doc page under `docs/components/` whose Props table matches the exported `*Props` interface (README.md:25), then `/ds-doctor manifest` is re-run.
- **Composition**: fields (`Input`, `Textarea`) go inside `Form`; Buttons that submit/reset go in `Form`'s `actions` slot. `Form` replaces native `onSubmit` — do not call `preventDefault` yourself. `Button` for actions, `Link` for navigation.
```
**Verify**: `grep -c "see plans/002" ds/MANIFEST.md` → `0`; `grep -c "ds-request" ds/MANIFEST.md` → `1` or more.

### Step 2: Severity map
Replace the empty table and the "(Empty: …)" line inside the `severity-map` zone with:

```markdown
| Class | Severity | Why |
|---|---|---|
| token.palette.raw | blocking | `--palette-*` is internal to tokens.css (Policy above); it is the cleanest drift signal this DS has |
| token.literal.exact | blocking | A literal that exactly matches a semantic token is a mechanical fix; no reason to ship it |
| token.literal.near | should-fix | Needs a human eye to confirm the intended token (ΔE ≤ 10) |
| token.literal.none | advisory | A real design decision — route to the contribution path, not a codemod |
| usage.prop.unknown | blocking | Props not in the exported `*Props` interface are hallucinations; typecheck catches most, docs must not contradict types (plans/003) |
| override.internal-selector | should-fix | App CSS targeting `.vds-*` fights the DS; soft until plan 002 has been visible for one release |
| adoption.hand-rolled | should-fix | Hand-rolls are allowed only behind a waiver; unwaived ones are findings |
```
**Verify**: `grep -c "Empty: ds-drift defaults apply" ds/MANIFEST.md` → `0`; `grep -c "token.palette.raw | blocking" ds/MANIFEST.md` → `1`.

### Step 3: README pointer
Append to the end of the `## Conventions` list in `README.md` (line 25 at commit `732ac74`; locate by heading, the file may have grown):
`- Override, contribution and severity policy live in \`ds/MANIFEST.md\` (hand-maintained zones) — read it before adding or styling a component.`
**Verify**: `grep -c "ds/MANIFEST.md" README.md` → `1` or more.

## Test plan

None — documentation only.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] The gap is closed verbatim: `grep -c "Contribution path\*\*: when the DS lacks" ds/MANIFEST.md` → `1`
- [ ] Zone markers intact: `grep -c "<!-- hand-maintained:" ds/MANIFEST.md` → `5`, `grep -c "<!-- /hand-maintained -->" ds/MANIFEST.md` → `5`
- [ ] No source files modified (`git status --porcelain` lists only ds/MANIFEST.md, README.md, plans/README.md)
- [ ] plans/README.md status row updated

## STOP conditions

- The `policy` or `severity-map` marker is missing or duplicated in `ds/MANIFEST.md`.
- The DS owner disagrees with a drafted severity (e.g. wants `token.literal.near` blocking) — record the wanted value in the status row and stop; do not choose.
- Plan 001 has modified the same bullets in a way that makes Step 1's target text unfindable — re-read the zone; if the Overrides/Contribution bullets are absent, STOP.

## Maintenance notes

Re-run `/ds-doctor manifest` after this lands: yes (notes-for-generators restates the contribution path). Review the `override.internal-selector` severity after one release; the "soft" rationale expires.
