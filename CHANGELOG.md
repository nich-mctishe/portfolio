# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project scaffolding with Astro (v5)
- SCSS design system (colour tokens, typography, spacing, breakpoint mixins)
- Light & dark mode theming via CSS custom properties
- ESLint (flat config + Astro plugin) and Prettier
- Project documentation (project-aims, tech-stack, task-breakdown)
- Header and footer components
- Skills section with pill-style tags
- Reorganized components directory to follow a strict "Root vs Sub-component" hierarchy.
- Experience section with timeline and accordion-style highlights
- Added `logoAdaptive` property to Experience schema for theme-responsive monochromatic logos.
- Added `logoAdjust` property to Clients schema for theme-responsive light/dark mode logo adjustments.
- Implemented `.agent/skills` for `linting`, `code-review`, `changelog`, and `research` to automate development quality checks and onboarding.
- Documented the project's **Component Architecture** in `README.md` and `src/components/README.md`.
- Updated **Education section** with theme-adaptive institution logos and expandable synopsis.
- Implemented site-wide `active` flag for toggling visibility of Skills, Jobs, Education, and Clients via data YAML.
- Added **Troubleshooting Guide** (`docs/troubleshooting.md`) for common development environment issues.
- Created **Career Highlights section** with numbered markers and interactive list items, positioned above Skills.
- Configured site-wide SEO metadata, Open Graph labels, and JSON-LD schema using `BaseLayout.astro`.
- Created `robots.txt` and integrated `@astrojs/sitemap`.
- Configured E2E testing framework utilising `@playwright/test` and `@cucumber/cucumber` (BDD).
- Configured automated server startup for E2E tests using `start-server-and-test`.
- Resolved CI pipeline failures by orchestrating server startup within testing scripts.
- Renamed all test directories and scripts to match project conventions (e.g., `e2e`, `vrt`).
- Updated Visual Regression Testing (VRT) baselines via Docker to account for recent stylistic and layout fixes.
- Resolved `ERR_CONNECTION_REFUSED` failures in the Cucumber test suite.
- Renamed all test files to follow strict `kebab-case` naming conventions.
- Fixed over 70 stylistic linting errors to comply with the 80-character line length limit.
- Updated `package.json` with dedicated `test:e2e`, `test:e2e:ci`, and `test:e2e:run` scripts.
- Resolved branch coverage gaps in `calculate-skill-duration` and `initiate-highlight-accordions`.
- Built automated Visual Regression Testing (VRT) suite via Playwright configured for multiple viewports.
- Configured initial CI automated testing workflow (`.github/workflows/ci.yml`).
- BDD unit tests for `JobCard.astro` and `ExperienceItem.astro`.
- Project-wide "No Abbreviations" directive to all `.agent/skills` and documentation.
- Added `axe-playwright` accessibility audit script (`tests/a11y/homepage.a11y.ts`) for WCAG 2 AA compliance checks.
- Added `CNAME` file to `public/` to configure custom domain `nicholasheadlong.com` on GitHub Pages.
- Self-hosted Open Sans via `@fontsource-variable/open-sans`, removing the render-blocking Google Fonts external stylesheet.
- Added `loading="lazy"` to below-the-fold logo images in Clients and Education sections.
- Optimised SVG logo assets with SVGO.


### Changed

- Refactored `JobHeader` and `ExperienceItem` typography to use standardized `main-title` and `sub-title` mixins.
- Standardized title line heights to `var(--line-height-normal)` (approx 1.0).
- Optimized Experience section layout for 320px minimum width (maintaining single-line date/meta info).
- Improved mobile Job Highlights readability by increasing `max-height` and refining the fade-out mask to prevent text clipping.
- Reduced line-height of `job-description` and `skill-name` for a cleaner text flow.
- Enhanced **Mobile Navigation**: Removed background, added animated hamburger menu, and fixed Hero section overlap on mobile.
- Refactored **Skills.astro** into modular sub-components for improved maintainability.
- Refactored all `init-*` helper modules to non-abbreviated names: `hero-bubbles.ts`, `initiate-highlight-accordions.ts`, `initiate-education-accordions.ts`, and `theme-manager.ts`.
- Project-wide rename of variables and functions to remove abbreviations (e.g., `sel` -> `selector`, `doc` -> `documentInstance`, `btn` -> `expandButton`, `text` -> `buttonText`, `init` -> `initialize`).
- Renamed `getSkillDuration` to `calculateSkillDuration` and `experience-points` to `determine-full-experience-points`.
- Standardised unit test suite to use a strict Given/When/Then BDD structure, achieving ~83% coverage.
- `ThemeToggle` component now conditionally renders only in development or when `PUBLIC_TEST_MODE=true` is set, hiding it from production builds.
- Renamed environment variable `PUBLIC_IS_TESTING` to `PUBLIC_TEST_MODE` for clarity. Updated `ci.yml`, `Dockerfile`, and all skill documentation.
- Simplified `astro.config.mjs` and `playwright.config.ts` base path logic now that the site uses a custom root domain (no `/portfolio/` subpath needed).
- Darkened `secondary` (`#009900` → `#007700`) and `tertiary` (`#339933` → `#2d7a2d`) colour tokens to meet WCAG AA 4.5:1 contrast ratio for nav bubble text.
- Removed `opacity: 0.8` from `.footer-credits` to prevent the effective text colour falling below the WCAG AA contrast threshold.

### Fixed

- Corrected duplicate `mask-*` declarations in `JobHeader.astro` matching Stylelint rules.
- Fixed clipping of "outreach strategy" and long bullet points in mobile Job Highlights.
- Prevented **Skill duration** wrapping on mobile by adjusting grid layout.
- Finalized **Falmouth University logo** to be theme-aware in both light and dark modes.
- Fixed **Education synopsis chevron** animation to point in the correct direction when expanded.
- Redesigned **Career Highlights** to use a cleaner, list-based aesthetic with custom iconography instead of cards.
- Fixed `image-redundant-alt` WCAG violation in `SiteFooter.astro` — social icon `alt` attribute now correctly set to `""` since the adjacent text label already describes the link.
- Fixed `color-contrast` WCAG violations in `SiteHeader.astro` (nav bubble text) and `SiteFooter.astro` (copyright text).
