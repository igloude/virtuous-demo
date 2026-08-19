# Plan 006: Rename the manifest's severity-map class keys to ds-drift's vocabulary

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on.
> If any STOP condition occurs, stop and report — do not improvise. When
> done, update this plan's status row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 128dacd..HEAD -- ds/MANIFEST.md .agents/skills/ds-drift/references/audit-playbook.md`
> If either file changed since this plan was written, compare the
> "Current state" excerpts against live content; on mismatch, STOP.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: guidelines
- **Downstream effect**: makes the DS owner's severity decisions actually apply. Today ds-drift never emits three of the seven class keys in the severity map, so those rows are inert and the gate silently uses its defaults — for hand-rolled components that means **blocking** where the owner wrote **should-fix**.
- **Planned at**: commit `128dacd`, 2026-08-19
- **Issue**: —

## Why this matters

ds-drift looks up each finding's class in the manifest's `severity-map` hand zone and falls back to the playbook defaults when the class is absent (`.agents/skills/ds-drift/SKILL.md:20`; `audit-playbook.md:87,93`). Three rows in `ds/MANIFEST.md` use class names that do not exist in the family vocabulary, so they never match. The policy intent is already decided and written; this plan only renames the keys so the gate can find them. No severity value changes.

## Current state

- `ds/MANIFEST.md:56-68` — the `<!-- hand-maintained: severity-map -->` zone. Rows at stake (verbatim):

  ```
  ds/MANIFEST.md:65  | usage.prop.unknown | blocking | Props not in the exported `*Props` interface are hallucinations; typecheck catches most, docs must not contradict types (plans/003) |
  ds/MANIFEST.md:66  | override.internal-selector | should-fix | App CSS targeting `.vds-*` fights the DS; soft until plan 002 has been visible for one release |
  ds/MANIFEST.md:67  | adoption.hand-rolled | should-fix | Hand-rolls are allowed only behind a waiver; unwaived ones are findings |
  ```

- ds-drift's class vocabulary, `.agents/skills/ds-drift/references/audit-playbook.md:96-110` (default severity table). The relevant keys, verbatim:

  ```
  audit-playbook.md:98   | `usage.hallucinated-prop` | blocking | Silently ignored props are bugs |
  audit-playbook.md:99   | `adoption.duplicate` (introduced) | blocking | New parallel implementation of an existing DS component |
  audit-playbook.md:104  | `usage.override-fighting` | should-fix | Fragile now, broken on the next DS release |
  ```

  There is no `usage.prop.unknown`, `override.internal-selector`, or `adoption.hand-rolled` anywhere under `.agents/skills/` (verified with `grep -rn` at `128dacd`).

- The other four rows (`token.palette.raw`, `token.literal.exact`, `token.literal.near`, `token.literal.none`) already use valid keys (`audit-playbook.md:101-102,107`) — leave them untouched.

- Mapping (the decision, already made by the row text — transcribe, do not re-decide):

  | Old key (manifest) | New key (ds-drift) | Severity (unchanged) |
  |---|---|---|
  | `usage.prop.unknown` | `usage.hallucinated-prop` | blocking |
  | `override.internal-selector` | `usage.override-fighting` | should-fix |
  | `adoption.hand-rolled` | `adoption.duplicate` | should-fix |

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Typecheck (repo gate; docs-only change, must still pass) | `npm run typecheck` | exit 0 |
| Gap closed | `grep -n "usage.hallucinated-prop\|usage.override-fighting\|adoption.duplicate" ds/MANIFEST.md` | 3 lines, all inside the severity-map zone |
| Old keys gone | `grep -n "usage.prop.unknown\|override.internal-selector\|adoption.hand-rolled" ds/MANIFEST.md` | no output |
| Scope guard | `git status --porcelain` | only `ds/MANIFEST.md` and `plans/README.md` |

## Scope

**In scope** (the only files you may modify): `ds/MANIFEST.md` — **only the lines between `<!-- hand-maintained: severity-map -->` and the next `<!-- /hand-maintained -->`**; `plans/README.md` (status row).
**Out of scope**: every other zone of `ds/MANIFEST.md` (generated zones are rewritten by `/ds-doctor manifest`; other hand zones hold unrelated policy); `ds/tokens.json`; anything under `src/`, `docs/`, `.agents/`.

## Git workflow

Branch `ds-docs/006-severity-map-class-keys`; one commit, message style matched to `git log` (`docs: …` / `chore: …` prefix as the log shows). Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Rename the three class keys in place
In `ds/MANIFEST.md`, inside the severity-map table only, replace the first column of the three rows per the mapping table in "Current state". Keep the Severity and Why columns exactly as they are; do not reorder rows. Optionally append to the `adoption.duplicate` Why column: ` (class key aligned to ds-drift vocabulary, plan 006)` — a provenance pointer, nothing else.
**Verify**: `grep -n "usage.hallucinated-prop\|usage.override-fighting\|adoption.duplicate" ds/MANIFEST.md` → exactly 3 matches; `grep -c "usage.prop.unknown\|override.internal-selector\|adoption.hand-rolled" ds/MANIFEST.md` → `0`.

### Step 2: Confirm zone integrity
Run `grep -n "hand-maintained\|/hand-maintained\|generated" ds/MANIFEST.md` and confirm the marker lines are unchanged in count and order compared with `git show HEAD:ds/MANIFEST.md | grep -n "hand-maintained\|/hand-maintained\|generated"`.
**Verify**: both commands print the same number of lines.

## Test plan

None — no code changes. The grep gates above are the tests.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] The gap is closed verbatim: `grep -n "usage.hallucinated-prop\|usage.override-fighting\|adoption.duplicate" ds/MANIFEST.md` → 3 lines
- [ ] `grep -n "usage.prop.unknown\|override.internal-selector\|adoption.hand-rolled" ds/MANIFEST.md` → no output
- [ ] No source files modified (`git status` shows `ds/MANIFEST.md` and `plans/README.md` only)
- [ ] plans/README.md status row updated

## STOP conditions

- The severity-map zone in `ds/MANIFEST.md` no longer contains the three rows quoted above (someone already edited it).
- `audit-playbook.md:96-110` no longer lists `usage.hallucinated-prop`, `usage.override-fighting`, `adoption.duplicate` (vocabulary changed — re-audit, don't guess).
- Any edit would land outside the severity-map zone.

## Maintenance notes

- Re-run `/ds-doctor manifest` after this lands: **yes** (it re-stamps the header; hand zones are preserved verbatim, so the renamed rows survive).
- If ds-drift's vocabulary ever adds a distinct "unwaived hand-roll" class, revisit whether `adoption.duplicate` is still the right home for the should-fix decision.
