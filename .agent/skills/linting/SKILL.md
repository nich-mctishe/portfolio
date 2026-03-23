---
name: linting
description: Ensures code adheres to project ESLint and Stylelint rules.
---

### Purpose
To verify that all changes follow the project's coding standards as defined in `eslint.config.js` and `stylelint.config.mjs`.

### Instructions
1.  **Before submitting any code changes**, you MUST run the project's linter.
2.  Use the command: `pnpm run lint`.
3.  If the linter reports errors, try to fix them automatically using: `pnpm run format`.
4.  Manually address any remaining errors that `format` cannot handle.

### Key Rules (ESLint)
-   **Indentation**: 2 spaces.
-   **Semicolons**: Do NOT use semicolons (`semi: never`).
-   **Quotes**: Use single quotes (`quotes: single`).
-   **Line Length**: Max 80 characters.
-   **Filenames**:
    -   Global default: `kebab-case` (e.g., `theme-toggle.ts`).
    -   Astro Components & Layouts: `PascalCase` (e.g., `SiteHeader.astro`).

### Key Rules (Stylelint)
-   **No `px` units**: Disallowed in components, layouts, and global styles. Use `rem` or CSS variables.
-   **No named colors**: Use hex, HSL, or variables.
-   **Hex format**: Use long-form hex codes (e.g., `#ffffff`).

### Conventions
-   Always prefer CSS variables from `src/styles/tokens/` for colors, spacing, and typography.
-   Ensure all interactive elements have unique, descriptive IDs.
