# Portfolio Project Aims

## Project Overview

A portfolio website for a software engineer. Single-page scrolling application, statically generated and hosted on GitHub Pages (free tier).

## Project Requirements

- Modern, clean, responsive design with a **geometric / bubble-based layout** (see Figma)
- **Dark mode and light mode** — dark mode designed from scratch (not inverted from light)
- Navigation bar with links to page sections
- Footer with social media links
- Content maintained via **YAML and Markdown files** (no CMS)
- Deployed via **GitHub Actions** to **GitHub Pages**
- Colour palette should be easy to swap over the lifetime of the site
- Blog section may be added later (not in v1)
- Well-documented — clear README, deployment guide, and architectural docs
- Modular, maintainable code — easy to update content and styling independently

## Tech Stack (Approved)

See [tech-stack.md](./tech-stack.md) for full rationale and decisions.

| Concern | Choice |
|---|---|
| Framework | **Astro** (static site generator, zero JS by default) |
| Styling | **SCSS modules** (custom, no CSS framework) |
| Animations | **CSS-first** (`@keyframes`, `transition`) + vanilla JS for scroll triggers |
| Content | **Astro Content Collections** (YAML / Markdown, Zod-validated) |
| Dark / light | **CSS custom properties** + `prefers-color-scheme` + toggle |
| Package manager | **pnpm** |
| TypeScript | **Yes** |
| Linting | **ESLint + Prettier** |
| Testing | **Cucumber + Playwright** (BDD) |
| SEO | Astro metadata + **JSON-LD** (`Person` schema) |
| Deployment | **GitHub Actions → GitHub Pages** (`withastro/action`) |
| Changelog | **Keep a Changelog** format |

## Page Structure (from Figma)

1. **Nav & Logo** — name, title, geometric circle navigation
2. **Skills** — Front End, Back End, DevOps, Design, Process, Procedure
3. **Working History** — timeline-style work experience
4. **Education** — qualifications
5. **Highlights Reel** — notable client logos (Apple, HBO, Dior, Heineken, lululemon, WPP)
6. **Side Hustle** — personal projects (future section)

## Design

- Designs sourced from [Figma — Self work](https://www.figma.com/design/6XlzM3Ym7i1JiFutcdPjW4/Self-work?node-id=0-1)
- Three responsive breakpoints: Mobile (~350px), Tablet (768px), Desktop (max)
- No 3rd-party CSS libraries — all custom SCSS
- "Bubble in water" style animations for nav circles
- Serif font for headings, sans-serif (Inter) for body

## Code Quality

- ESLint (flat config) + Prettier for linting and formatting
- TypeScript strict mode
- Cucumber + Playwright for BDD testing
- Changelog via [keepachangelog.com](https://keepachangelog.com)

## Agents

Future CI/CD agent-based checks:
- Changelog manager
- Test coverage checker / suggester
- Visual regression tester
- Accessibility checker
- Performance checker
- SEO checker
