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
├── components/     # Astro components
│   ├── skills/     # Sub-components for Skills
│   └── experience/ # Sub-components for Experience
├── content/        # YAML/MD content files
├── layouts/        # Page layouts
├── pages/          # Route pages
└── styles/
    ├── tokens/     # Colour, typography, spacing tokens
    ├── mixins/     # Responsive breakpoint mixins
    └── global.scss # CSS custom properties, reset, base styles
```

## Component Architecture

We follow a strict hierarchy for the `src/components/` directory:

1.  **Root Components**: Components that have a corresponding data file in `src/content/` or serve as main page sections (e.g., `Section.astro`, `Skills.astro`, `Experience.astro`, `SiteHeader.astro`). These live at the **root** of the components folder.
2.  **Sub-Components**: Supporting components that only serve a Root Component are placed in a sub-folder named after that root (e.g., `src/components/experience/JobCard.astro`, `src/components/skills/SkillItem.astro`).
3.  **Global Primitives**: Reusable UI elements like `ThemeToggle.astro` live in the root of the components folder.

See [src/components/README.md](src/components/README.md) for full architectural details.

## Content Management

### Active Flags
All major content collections (Skills, Experience, Education, Clients) support an `active` flag. This allows you to toggle the visibility of specific items without removing them from your data files.

-   **Logic**: Items are visible by default.
-   **Usage**: Add `active: false` to any entry in a `data.yaml` file to hide it.
-   **Nesting**: In the Skills section, the flag can be applied to entire categories, parent skills, or specific sub-skills.

## Documentation

- [Project Aims](docs/project-aims.md) — requirements, tech stack, design notes
- [Tech Stack](docs/tech-stack.md) — rationale for each technology choice
- [Task Breakdown](docs/task-breakdown.md) — phased build plan with delegatable tasks
- [Troubleshooting](docs/troubleshooting.md) — known issues and environment fixes
- [Changelog](CHANGELOG.md) — release history

## Tech stack

Astro · SCSS · TypeScript · CSS animations · GitHub Pages

See [docs/tech-stack.md](docs/tech-stack.md) for full details.
