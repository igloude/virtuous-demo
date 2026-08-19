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
npm run build
```

## Conventions

- Components consume only semantic tokens (`--color-*`), never primitives (`--palette-*`).
- Token names are kebab-case: `--{category}-{property}-{variant?}-{state?}`.
- Class names use a `vds-` prefix with BEM-style modifiers (`vds-button--primary`).
- Every component doc's Props table must match the component's exported `*Props` interface.
