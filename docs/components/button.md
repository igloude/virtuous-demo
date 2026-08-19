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
| `disabled` | `boolean` | `false` | Native disabled state. |

## Usage

- Use one `primary` button per view for the main action.
- Use `danger` only for destructive, hard-to-undo actions.
- While a submit is in flight, set `disabled` on the submit button (there is no `loading` prop); keep the label text stable so the button does not change width.

## Accessibility

- Renders a native `<button>`; `type` defaults to `"button"` so it never submits by accident.
- Keyboard focus shows the `--color-focus-ring` outline on `:focus-visible`.
- `disabled` uses the native attribute (removed from the tab order) and dims to 50% opacity.
- Icon-only buttons must be given an accessible name via `aria-label` by the caller.

## Button or Link?

- **Button** performs an action on the current page (submit, reset, open, toggle, delete).
- **Link** navigates to a URL (`href`). Do not use a `Button` with an `onClick` that only changes location, and do not style a `Link` to look like a button.

## Tokens used

`--color-action-*`, `--radius-md`, `--space-*`, `--font-size-*`, `--focus-ring-*`
