# Portfolio

Personal portfolio website — statically generated with [Astro](https://astro.build).

## Quick start

```bash
pnpm install
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build static site to dist/
pnpm preview    # Preview production build locally
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview built site |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Run Prettier |

## Project structure

```
src/
├── components/     # Astro components (per-section)
├── content/        # YAML/MD content files
├── layouts/        # Page layouts
├── pages/          # Route pages
└── styles/
    ├── tokens/     # Colour, typography, spacing tokens
    ├── mixins/     # Responsive breakpoint mixins
    └── global.scss # CSS custom properties, reset, base styles
```

## Documentation

- [Project Aims](docs/project-aims.md) — requirements, tech stack, design notes
- [Tech Stack](docs/tech-stack.md) — rationale for each technology choice
- [Task Breakdown](docs/task-breakdown.md) — phased build plan with delegatable tasks
- [Changelog](CHANGELOG.md) — release history

## Tech stack

Astro · SCSS · TypeScript · CSS animations · GitHub Pages

See [docs/tech-stack.md](docs/tech-stack.md) for full details.
