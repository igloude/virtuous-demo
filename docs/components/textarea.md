# Textarea

```tsx
import { Textarea } from "virtuous-demo";

<Textarea name="bio" label="Bio" rows={6} resize="none" />
```

## Props

Extends all native `<textarea>` attributes. Shares the `label` / `hint` / `error` API with [Input](./input.md).

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | **Required.** Visible label. |
| `hint` | `string` | — | Supporting text. |
| `error` | `string` | — | Error message; marks the field invalid. |
| `resize` | `"none" \| "vertical" \| "both"` | `"vertical"` | Which directions the user can drag-resize. |
| `rows` | `number` | `4` | Initial visible rows. |

## Tokens used

Same as Input.
