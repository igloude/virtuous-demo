# Form

```tsx
import { Form, Input, Button } from "virtuous-demo";

<Form
  onSubmit={(values) => api.save(values)}
  actions={<Button type="submit">Save</Button>}
>
  <Input name="title" label="Title" required />
</Form>
```

## Props

Extends all native `<form>` attributes except `onSubmit`. Renders with `noValidate` so the design system owns error presentation.

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSubmit` | `(values, event) => void` | — | Called with a `Record<string, FormDataEntryValue>` built from `FormData`; `preventDefault` is already applied. |
| `spacing` | `"compact" \| "normal" \| "relaxed"` | `"normal"` | Vertical gap between children. |
| `actions` | `ReactNode` | — | Right-aligned footer, typically the submit/cancel buttons. |

## Tokens used

`--space-*`
