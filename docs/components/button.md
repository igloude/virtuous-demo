# Button

```tsx
import { Button } from "virtuous-demo";

<Button variant="primary" size="md" onClick={save}>Save</Button>
```

## Props

Extends all native `<button>` attributes. `type` defaults to `"button"`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "danger"` | `"primary"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and padding. |
| `fullWidth` | `boolean` | `false` | Stretch to the container width. |
| `loading` | `boolean` | `false` | Shows a spinner, sets `aria-busy`, and disables interaction while an async action runs. |
| `disabled` | `boolean` | `false` | Native disabled state. |

## Usage

- Use one `primary` button per view for the main action.
- Use `danger` only for destructive, hard-to-undo actions.
- Pass `loading` while a submit is in flight instead of toggling `disabled` manually, so the button keeps its width and announces the busy state.

## Tokens used

`--color-action-*`, `--radius-md`, `--space-*`, `--font-size-*`, `--focus-ring-*`
