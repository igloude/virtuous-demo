# Input

```tsx
import { Input } from "virtuous-demo";

<Input name="email" label="Email" type="email" hint="Work email preferred." error={errors.email} required />
```

## Props

Extends all native `<input>` attributes except `size`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | **Required.** Visible label, wired via `htmlFor`. |
| `hint` | `string` | — | Supporting text beneath the control. |
| `error` | `string` | — | Error message; marks the field `aria-invalid` and renders in the danger color. |
| `required` | `boolean` | `false` | Adds a required indicator and native validation attribute. |

## Accessibility

- Label is always rendered and associated with the control.
- `hint` and `error` are linked via `aria-describedby`.
- `error` is announced with `role="alert"`.

## Tokens used

`--color-field-*`, `--color-border-*`, `--color-text-*`, `--radius-md`, `--space-*`
