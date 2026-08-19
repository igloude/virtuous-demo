# Virtuous Demo Design System

A small React + TypeScript design system built to demonstrate AI-assisted design-system workflows.

## What's here

- **Token layer** (`src/tokens/`) — primitive + semantic CSS custom properties with light/dark theming. See [docs/tokens.md](docs/tokens.md).
- **Components** (`src/components/`) — `Button`, `Input`, `Textarea`, `Link`, `Form`. Each has a doc page in [docs/components/](docs/components/).
- **Demo app** (`src/demo/`) — renders every component with a theme switcher.

## Getting started

```sh
npm install
npm run dev        # demo at http://localhost:5173
npm run typecheck
npm run build      # library build -> dist/ (ESM + .d.ts + virtuous-demo.css)
npm run build:demo # demo site build -> dist-demo/
```

## Consuming as a package

`npm run build` produces a publishable package layout in `dist/`, exposed via
the `exports` map in `package.json`:

```tsx
import { Button, applyTheme } from "virtuous-demo";
import "virtuous-demo/styles.css"; // tokens + component styles, once at app entry
```

React 18 is a peer dependency. The package is not published to a registry;
local consumers install it with `"virtuous-demo": "file:../virtuous-demo"`
(see the sibling `virtuous-demo-app` repo).

## Conventions

- Color comes only from semantic tokens (`--color-*`) — in components *and* in consuming app code. `--palette-*` and raw color literals are internal to `src/tokens/tokens.css`. Full policy: docs/tokens.md and ds/MANIFEST.md → Policy.
- Token names are kebab-case: `--{category}-{property}-{variant?}-{state?}`.
- Class names use a `vds-` prefix with BEM-style modifiers (`vds-button--primary`).
- Every component doc's Props table must match the component's exported `*Props` interface.
- Override, contribution and severity policy live in `ds/MANIFEST.md` (hand-maintained zones) — read it before adding or styling a component.
