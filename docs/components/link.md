# Link

```tsx
import { Link } from "virtuous-demo";

<Link href="/docs">Docs</Link>
<Link href="https://example.com" external>Example</Link>
```

## Props

Extends all native `<a>` attributes.

| Prop | Type | Default | Description |
|---|---|---|---|
| `external` | `boolean` | `false` | Opens in a new tab, adds `rel="noopener noreferrer"`, and appends an ↗ glyph. |
| `subtle` | `boolean` | `false` | Underline only on hover. |

## Usage

- Use for navigation only; for actions use [Button](./button.md) (see "Button or Link?" there).
- Prefer the default underlined style in body copy; use `subtle` only in dense navigation where underlines add noise.

## Accessibility

- Renders a native `<a>`; always pass `href`.
- `external` adds `target="_blank"` and `rel="noopener noreferrer"`; the ↗ glyph is `aria-hidden`. The component does **not** add "opens in a new tab" text for screen readers — include it in the link text or an `aria-label` until the DS adds it (tracked as a DS source item in plans/README.md).
- Keyboard focus shows the `--color-focus-ring` outline on `:focus-visible`.

## Tokens used

`--color-text-link`, `--color-text-link-hover`, `--color-focus-ring`, `--radius-sm`, `--duration-fast`, `--easing-standard`, `--focus-ring-width`, `--focus-ring-offset`
