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

### Changed

- Refactored `JobHeader` and `ExperienceItem` typography to use standardized `main-title` and `sub-title` mixins.
- Standardized title line heights to `var(--line-height-normal)` (approx 1.0).
- Optimized Experience section layout for 320px minimum width (maintaining single-line date/meta info).
- Improved mobile Job Highlights readability by increasing `max-height` and refining the fade-out mask to prevent text clipping.
- Reduced line-height of `job-description` and `skill-name` for a cleaner text flow.
- Enhanced **Mobile Navigation**: Removed background, added animated hamburger menu, and fixed Hero section overlap on mobile.
- Refactored **Skills.astro** into modular sub-components for improved maintainability.

### Fixed

- Corrected duplicate `mask-*` declarations in `JobHeader.astro` matching Stylelint rules.
- Fixed clipping of "outreach strategy" and long bullet points in mobile Job Highlights.
- Prevented **Skill duration** wrapping on mobile by adjusting grid layout.
- Finalized **Falmouth University logo** to be theme-aware in both light and dark modes.
