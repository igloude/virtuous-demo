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
- The control `id` defaults to a React `useId()` value; pass `id` to override it. `hint` and `error` render with ids `${id}-hint` / `${id}-error` and are joined into `aria-describedby` — so a custom `id` also changes those derived ids.

## Tokens used

`--color-field-bg`, `--color-field-bg-disabled`, `--color-field-placeholder`, `--color-border-default/-strong/-danger`, `--color-text-primary`, `--color-text-danger`, `--color-text-muted` (hint; see ds/MANIFEST.md → Token layer → Known irregularities), `--color-focus-ring`, `--radius-md`, `--space-1/2/3`, `--font-family-sans`, `--font-size-sm/md`, `--font-weight-medium`, `--line-height-normal`, `--duration-fast`, `--easing-standard`, `--focus-ring-width`
