# virtuous-demo Conformance Manifest

<!-- generated: header -->
- **Manifest schema**: 2
- **Package**: virtuous-demo@0.1.0
- **API hash**: sha256:074d86afd9f5d4e8174094d94d084eb2c12b19cf4708195971e5e40a959275e6
  - *Recipe (fallback)*: the package emits no `.d.ts` (`tsconfig.json` has `noEmit: true`; no `types`/`exports` in `package.json`), so the hash is over the public source types instead:
    `find src -name '*.ts' -o -name '*.tsx' | grep -v '^src/demo' | LC_ALL=C sort | xargs cat | sha256sum`.
    Switch to the spec's `.d.ts` recipe once declarations are emitted (see plans/README.md, READY-09). *At generation time, uncommitted working-tree changes adding `exports`/`types`, `tsconfig.build.json` and a lib build were present — once they are committed and `npm run build` emits `dist/*.d.ts`, re-run `/ds-doctor manifest` to switch the hash to the spec recipe.*
- **Generated**: 2026-08-19, commit `732ac74` (+ uncommitted doc-plan edits 001–005), by ds-doctor v0.5.0
- **Token source**: src/tokens/tokens.css → ds/tokens.json (resolved)
<!-- /generated -->

<!-- generated: inventory -->
## Component inventory

All components are exported from `src/index.ts`; source of record for props is the exported `*Props` interface in each file.

| Component | Status | Variants | Use when | Synonyms |
|---|---|---|---|---|
| Button | stable | `variant`: primary, secondary, danger · `size`: sm, md, lg · `fullWidth` | Triggering an action (submit, reset, open, confirm). One `primary` per view; `danger` only for destructive, hard-to-undo actions. Not for navigation — no `href`. | Btn, IconButton*, CTA |
| Input | stable | — (`label` required; `hint`, `error`, `required`) | Single-line text entry with a visible label; `error` marks invalid + announces via `role="alert"` | TextField, TextInput, FormField |
| Textarea | stable | `resize`: none, vertical, both · `rows` (default 4) | Multi-line text entry; same `label`/`hint`/`error` contract as Input | TextArea, MultilineInput |
| Link | stable | `external` (new tab + safe rel + ↗) · `subtle` (underline on hover only) | Navigation to a URL. Not for actions — use Button. | Anchor, A, NavLink |
| Form | stable | `spacing`: compact, normal, relaxed · `actions` slot | Wrapping fields; owns `preventDefault`, `noValidate`, and hands `onSubmit` a `Record<string, FormDataEntryValue>` | FormWrapper |

\*IconButton does not exist; reaching for it is an extension request (see Policy → Contribution path). Props above are the full public surface beyond native element attributes (`Button.tsx:7-14`, `Input.tsx:4-11`, `Textarea.tsx:5-14`, `Link.tsx:4-9`, `Form.tsx:4-11`).

Also exported (token layer, `src/tokens/theme.ts`): `type Theme = "light" | "dark" | "system"`, `applyTheme(theme)`, `getStoredTheme()`.

No deprecated exports as of generation.
<!-- /generated -->

<!-- generated: token-policy-facts -->
## Token layer

- Semantic color tokens: 28 (`--color-*`), each with a full dark counterpart (`@dark` entries in ds/tokens.json). Themes: light (`:root, [data-theme="light"]`), dark (`[data-theme="dark"]` and `prefers-color-scheme: dark` fallback — byte-identical sets). Full parity: 28/28.
- Scale tokens (single tier, consumed directly by components): `--space-{0,1,2,3,4,5,6,8}`, `--radius-{sm,md,lg,full}`, `--font-size-{sm,md,lg}`, `--font-weight-{regular,medium,semibold}`, `--font-family-sans`, `--line-height-{tight,normal}`, `--duration-{fast,normal}`, `--easing-standard`, `--focus-ring-{width,offset}` — 26 entries, typed in ds/tokens.json (`dimension`, `duration`, `fontFamily`, `fontWeight`, `number`, `cubicBezier`).
- Primitives (`--palette-*`, 21 entries) are **excluded** from ds/tokens.json on purpose: components may not consume them (README.md:22), so nearest-token matching must not propose them.
- All references resolve; no unresolvable references as of generation. 82 entries total in ds/tokens.json.
- Known irregularities (facts, not policy — see plans/README.md):
  - `--color-text_muted` is spelled with an underscore in `src/tokens/tokens.css:96,139,184`; `docs/tokens.md:45`, `src/components/field.css:58`, and `src/demo/demo.css:13` reference `--color-text-muted` (hyphen), which is **undefined** — hint text currently inherits its color. ds/tokens.json carries the name as defined (`color-text_muted`). Source fix required (READY-03).
  - Dark-theme `--color-text-danger`, `--color-border-danger`, `--color-action-danger-bg-hover` are the raw literal `#ff7b7b` (no primitive). They resolve, but bypass the two-tier rule stated in `src/tokens/tokens.css:5-7` (READY-06).
- **Enforcement scope**: ds-drift's mechanical gate (nearest_token.mjs) polices **color** only. Spacing, radius, typography, motion and focus-ring tokens are policed by docs and review, not the gate — a conformance PASS says nothing about them.
<!-- /generated -->

<!-- hand-maintained: policy -->
## Policy

- **Primitive tokens** (`--palette-*`): internal to `src/tokens/tokens.css`. Forbidden in components and in consuming app code.
- **Raw color literals** (hex / rgb() / hsl() / named colors): forbidden outside `src/tokens/tokens.css`; `transparent` is permitted. Class `token.literal.*` and `token.palette.raw` apply to app code and `src/components/**` alike.
- **Scale tokens** (`--space-*`, `--radius-*`, `--font-*`, `--duration-*`, `--focus-ring-*`): preferred over literals; not mechanically gated (see Token layer → Enforcement scope).
- **Overrides**: `className` passthrough is the only sanctioned styling seam; it is merged onto the component root on every component. Use it for layout (margin, grid placement, width). Do **not** restyle internals: no selectors targeting `.vds-*` classes from app CSS, no `!important` against DS rules, no inline `style` that changes color/typography. If a visual variant is missing, request it (below) rather than override it.
- **Contribution path**: when the DS lacks a component, variant, or token — open an issue labeled `ds-request` describing the use case and the nearest existing component; until it ships, a hand-rolled interim is allowed only with a waiver row (Waivers table below) that names an owner and an expiry ≤ 90 days. Changes land in `src/` with a matching doc page under `docs/components/` whose Props table matches the exported `*Props` interface (README.md:25), then `/ds-doctor manifest` is re-run.
- **Composition**: fields (`Input`, `Textarea`) go inside `Form`; Buttons that submit/reset go in `Form`'s `actions` slot. `Form` replaces native `onSubmit` — do not call `preventDefault` yourself. `Button` for actions, `Link` for navigation.
<!-- /hand-maintained -->

<!-- hand-maintained: severity-map -->
## Severity map (overrides ds-drift defaults)

| Class | Severity | Why |
|---|---|---|
| token.palette.raw | blocking | `--palette-*` is internal to tokens.css (Policy above); it is the cleanest drift signal this DS has |
| token.literal.exact | blocking | A literal that exactly matches a semantic token is a mechanical fix; no reason to ship it |
| token.literal.near | should-fix | Needs a human eye to confirm the intended token (ΔE ≤ 10) |
| token.literal.none | advisory | A real design decision — route to the contribution path, not a codemod |
| usage.prop.unknown | blocking | Props not in the exported `*Props` interface are hallucinations; typecheck catches most, docs must not contradict types (plans/003) |
| override.internal-selector | should-fix | App CSS targeting `.vds-*` fights the DS; soft until plan 002 has been visible for one release |
| adoption.hand-rolled | should-fix | Hand-rolls are allowed only behind a waiver; unwaived ones are findings |
<!-- /hand-maintained -->

<!-- hand-maintained: waivers -->
## Waivers

| Id | Scope (glob) | Class | Rationale | Owner | Expires |
|---|---|---|---|---|---|
<!-- /hand-maintained -->

<!-- hand-maintained: exclusions -->
## Exclusions

| Scope (glob) | Reason | Owner | Expires |
|---|---|---|---|
<!-- /hand-maintained -->

<!-- generated: notes-for-generators -->
## Notes for generators

Read this section before writing any UI in a consuming repo.

- Components: use the inventory above; the Synonyms column lists the names you might reach for — the component in column one is what exists here. Five components exist: Button, Input, Textarea, Link, Form. Nothing else (no Select, Checkbox, Dialog, Card, IconButton).
- Props: only the props listed in the inventory plus native element attributes. Button has **no** `loading` prop; Input omits native `size`; Form replaces native `onSubmit` with `(values, event)`.
- Active deprecations: none.
- Colors come from semantic tokens only (`--color-*`, see ds/tokens.json); never `--palette-*`, never raw hex. Never invent a token name — the defined muted-text token is currently spelled `--color-text_muted` (see Token layer).
- Theme: call `applyTheme("light" | "dark" | "system")`; do not set `data-theme` by hand.
- Spacing/radius/type use the `--space-*`, `--radius-*`, `--font-*` scale tokens directly.
- Class names are `vds-` prefixed BEM (`vds-button--primary`); do not target them from app CSS.
- If the DS lacks what you need, follow the contribution path in Policy — do not hand-roll a parallel component.
<!-- /generated -->

<!-- hand-maintained: house-rules -->
## House rules

- Use `Form` around every group of `Input`/`Textarea` so submit handling and `noValidate` are consistent; put Buttons in the `actions` slot.
- Always pass `label` to Input/Textarea (it is required by the type); use `hint`/`error` rather than ad-hoc helper text.
- `Button` for actions, `Link` for navigation — never a Button with an `onClick` that only changes location.
<!-- /hand-maintained -->
