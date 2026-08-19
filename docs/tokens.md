# Design tokens

Tokens live in `src/tokens/tokens.css` as CSS custom properties and are split into two layers.

## Layers

| Layer | Prefix | Purpose | Consumed by |
|---|---|---|---|
| Color primitive | `--palette-*` | Raw palette values | Semantic color tokens only — never components, never app code |
| Semantic color | `--color-*` | Intent-based color aliases (surface, text, border, action, field, focus) | Components and app code |
| Scale | `--space-*`, `--radius-*`, `--font-*`, `--line-height-*`, `--duration-*`, `--easing-*`, `--focus-ring-*` | Single-tier spacing, radius, typography, motion and focus values | Components and app code, directly |

Rules:

- `--palette-*` is internal to `src/tokens/tokens.css`. Nothing outside that file — no component, no demo, no consuming app — may reference it.
- Color in components and app code comes only from `--color-*` tokens. Raw color literals (hex, rgb(), hsl(), named colors) are not permitted outside `src/tokens/tokens.css`. The only exception is `transparent`.
- Spacing, radius, typography and motion use the scale tokens directly. Literal `px`/`rem`/`em` values are discouraged but not gated; prefer a scale token when one is within the same step.
- Need a color the semantic layer lacks? Add a semantic token (and a primitive if required) in `tokens.css` via the contribution path in `ds/MANIFEST.md` → Policy; do not reach for `--palette-*` or a literal.

## Naming convention

```
--{category}-{property}-{variant?}-{state?}
```

All segments are lowercase kebab-case. Examples:

- `--color-text-primary`
- `--color-action-primary-bg-hover`
- `--color-border-danger`
- `--space-4`

## Theming

Semantic tokens are defined three times:

1. `:root, [data-theme="light"]` — light (default)
2. `[data-theme="dark"]` — explicit dark
3. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` — follows the OS when no explicit theme is set

Switch themes at runtime with the exported theme API (imported from the package, not by file path):

```tsx
import { applyTheme, getStoredTheme, type Theme } from "virtuous-demo";

const initial: Theme = getStoredTheme(); // "system" until the user picks one
applyTheme(initial);
```

### Theme API

| Export | Type | Description |
|---|---|---|
| `Theme` | `"light" \| "dark" \| "system"` | The three accepted values. |
| `applyTheme` | `(theme: Theme) => void` | Sets `data-theme="light"`/`"dark"` on `<html>`; `"system"` removes the attribute so `prefers-color-scheme` applies. Persists the choice to `localStorage` under the key `"vds-theme"`; storage failures are ignored. |
| `getStoredTheme` | `() => Theme` | Reads `"vds-theme"` from `localStorage`; returns `"system"` when unset, unreadable, or not one of the three values. |

Do not set `data-theme` by hand — always go through `applyTheme` so the stored preference stays in sync.

## Semantic color tokens

The authoritative, resolved list is ds/tokens.json (28 tokens per theme); the table below is the human summary.

| Token | Meaning |
|---|---|
| `--color-surface-default` | Page background |
| `--color-surface-subtle` | Slightly recessed background |
| `--color-surface-raised` | Cards, panels |
| `--color-text-primary` | Body text |
| `--color-text-muted` | Secondary / hint text |
| `--color-text-inverse` | Text on inverted surfaces |
| `--color-text-link` / `-hover` | Link color |
| `--color-text-danger` | Error text |
| `--color-border-default` / `-strong` / `-danger` | Borders |
| `--color-action-primary-bg` / `-bg-hover` / `-bg-active` / `-fg` | Primary button |
| `--color-action-secondary-bg` / `-bg-hover` / `-bg-active` / `-fg` / `-border` | Secondary button |
| `--color-action-danger-bg` / `-bg-hover` / `-fg` | Danger button |
| `--color-field-bg` / `-bg-disabled` / `-placeholder` | Inputs & textareas |
| `--color-focus-ring` | Keyboard focus outline |
