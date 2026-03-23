# Component Architecture

This folder contains all Astro components for the portfolio site. We follow a strict hierarchy to maintain organization and scalability.

## Hierarchy Rules

### 1. Root Components
Components that serve as top-level page sections or have a directly corresponding data file in `src/content/` are considered **Root Components**. These must live directly in this root directory.
- `Skills.astro` (serves `src/content/skills/data.yaml`)
- `Experience.astro` (serves `src/content/experience/data.yaml`)
- `SiteHeader.astro` (global section)
- `SiteFooter.astro` (global section)

### 2. Sub-Components
Supporting components that strictly serve a single Root Component are stored in a sub-folder named after that Root Component.
- `experience/JobCard.astro`
- `experience/TimelineEvent.astro`
- `skills/SkillItem.astro`

### 3. Shared/Utility Primitives
Reusable UI primitives that are shared across multiple sections live at the root of this folder.
- `Section.astro`
- `ThemeToggle.astro`

## Styling
All components use **scoped SCSS** within their respective `.astro` files to ensure modularity. Shared styles should be imported from `@/styles/mixins` or `@/styles/tokens`.
