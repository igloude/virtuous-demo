# Design tokens

Tokens live in `src/tokens/tokens.css` as CSS custom properties and are split into two layers.

## Layers

| Layer | Prefix | Purpose | Consumed by |
|---|---|---|---|
| Primitive | `--palette-*`, `--space-*`, `--radius-*`, `--font-*`, `--duration-*` | Raw values | Semantic tokens only |
| Semantic | `--color-*`, `--focus-ring-*` | Intent-based aliases | Components |

Components must never reference a `--palette-*` token directly.

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

Use `applyTheme("light" | "dark" | "system")` from `src/tokens/theme.ts` to switch at runtime; the choice is persisted to `localStorage`.

## Semantic color tokens

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
| `--color-action-{primary,secondary,danger}-{bg,fg,border}[-hover\|-active]` | Button styling |
| `--color-field-bg` / `-bg-disabled` / `-placeholder` | Inputs & textareas |
| `--color-focus-ring` | Keyboard focus outline |
