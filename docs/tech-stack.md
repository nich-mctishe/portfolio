# Tech Stack Decisions

This document records the technology choices for the portfolio site and the reasoning behind each one. It serves as a reference for any agent or contributor working on the project.

> **Figma designs**: [Self work](https://www.figma.com/design/6XlzM3Ym7i1JiFutcdPjW4/Self-work?node-id=0-1)

---

## Framework — Astro

**Chosen over**: Next.js, Nuxt/Vue, Astro, Ghost, plain HTML/JS

| Factor | Astro | Next.js |
|---|---|---|
| JS shipped to browser | Zero by default | React runtime (~85KB+) |
| Build speed (static) | ~3× faster | Slower (React hydration pipeline) |
| Lighthouse score | Trivially 100/100 | Requires optimisation effort |
| Content collections | Built-in (YAML/MD + Zod) | Manual setup (grey-matter/remark) |
| GitHub Pages deploy | Official action (`withastro/action`) | Manual workflow |
| Island architecture | Yes — JS only where explicitly opted in | Full-page hydration |
| SCSS support | Native (`sass` package) | Native |

**Why Astro wins here**: This is a content-driven static portfolio. There's no app state, no auth, no API routes. Astro is purpose-built for this — it ships zero JavaScript unless you explicitly add interactive islands, which is exactly what we want for the bubble animations (CSS-first, with a small vanilla JS island for scroll triggers and the dark mode toggle).

---

## Styling — SCSS Modules

**Chosen over**: Tailwind CSS, CSS-in-JS, plain CSS

- **Project requirement**: No 3rd-party CSS libraries — all custom in-house
- SCSS gives us variables, maps, nesting, and mixins without a runtime dependency
- Astro scopes `<style>` blocks per component by default; SCSS extends this with reusable design tokens
- Colour palette stored in SCSS maps → easy to swap the entire palette later
- Breakpoint mixins for the three responsive sizes (mobile ~350px, tablet 768px, desktop max)

---

## Animations — CSS-first + Vanilla JS

**Chosen over**: Framer Motion, GSAP, anime.js

- **Performance priority**: CSS animations run on the compositor thread, no JS overhead
- `@keyframes` + `animation` for bubble-in-water floating effects on nav circles
- `transition` for hover states and colour shifts
- `transform` + `translate` for responsive circle repositioning
- `animation-delay` with staggered values for organic multi-bubble movement
- **Vanilla JS** (in Astro `<script>` tags) only for:
  - `IntersectionObserver` — scroll-triggered entrance animations
  - Dark/light mode toggle logic
  - Any orchestration that CSS alone can't express

No animation library. Keeps the bundle at effectively zero KB for animations.

---

## Content — Astro Content Collections

**Chosen over**: Headless CMS (Sanity, Contentful), manual JSON, raw markdown

- YAML files for structured data: `skills.yaml`, `experience.yaml`, `education.yaml`
- Markdown files for any longer-form content (e.g., project descriptions)
- Zod schemas in `src/content/config.ts` for build-time validation
- Type-safe access in Astro components
- No blog infrastructure in v1 — will bolt on later as a separate content collection

---

## Dark / Light Mode

- **Designed from scratch** — not a colour inversion of light mode
- CSS custom properties define all colour tokens
- SCSS generates `:root` (light) and `[data-theme="dark"]` (dark) rulesets from separate colour maps
- Toggle button persisted via `localStorage`
- Respects `prefers-color-scheme` on first visit (no flash)
- Red + green palette on dark backgrounds will need careful contrast work

---

## Package Manager — pnpm

Already configured in `package.json` (`"packageManager": "pnpm@10.29.1"`). No change needed.

---

## TypeScript

Astro has built-in TypeScript support. We'll use strict mode for:
- Content collection schemas (Zod)
- Component props
- Utility functions

---

## Linting & Formatting — ESLint + Prettier

- ESLint flat config with Astro plugin
- Prettier for consistent formatting
- Run in CI via GitHub Actions

---

## Testing — Cucumber + Playwright

- **Playwright** for browser automation (fast, modern, built-in assertions)
- **cucumber-js** for BDD-style `.feature` files
- Example: "Given I am on the portfolio page, When I scroll to Skills, Then I should see 6 skill categories"
- Visual regression via Playwright screenshot comparison

---

## SEO

- Astro `<head>` metadata exports for `<title>`, `<meta>`, Open Graph tags
- JSON-LD structured data using `Person` schema, generated from YAML content
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>`
- Sitemap generation at build time (Astro sitemap integration)

---

## Deployment — GitHub Actions → GitHub Pages

- Push to `main` triggers build
- `withastro/action` builds the site
- Deploys to GitHub Pages (free hosting)
- Custom domain support via CNAME in `/public`

---

## Node & Runtime

- **Node**: v20 (already installed, LTS)
- **pnpm**: v10.29.1 (already installed)
