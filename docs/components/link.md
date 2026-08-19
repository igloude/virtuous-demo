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

## Tokens used

`--color-text-link`, `--color-text-link-hover`, `--color-focus-ring`, `--radius-sm`
