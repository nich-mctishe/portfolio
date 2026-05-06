# Troubleshooting

This document tracks known issues and common resolution steps for the project’s development environment.

## Astro Data Store Rename Error (ENOENT)

### Issue
The Astro dev server may crash or display an error similar to:
`ENOENT: no such file or directory, rename '/path/to/project/.astro/data-store.json.tmp' -> '/path/to/project/.astro/data-store.json'`

### Cause
This is a transient issue with Astro's internal cache management. It occurs when the content-syncing layer attempts to write to the data store while the file system is locked or being accessed by another process (common during rapid file saves).

### Resolution
1.  **Restart the Dev Server**: In most cases, stopping the server (`Ctrl+C`) and running `pnpm dev` again resolves the issue.
2.  **Clean Cache**: If the error persists, delete the local Astro cache directory and restart:
    ```bash
    rm -rf .astro
    pnpm dev
    ```
3.  **Run a Clean Build**: To verify that your schema and content are valid, run a production build:
    ```bash
    pnpm build
    ```
    If the build succeeds, the error is purely a dev-server transient issue.

---

## Self-Hosted Variable Fonts Not Applying

### Issue
After replacing a Google Fonts import with `@fontsource-variable/<name>`,
the site renders in the system font instead of the intended typeface.

### Cause
Variable font packages from `@fontsource-variable` register the font
under a different family name — `'<Font Name> Variable'` — rather than
the plain `'<Font Name>'` used by Google Fonts. If the SCSS token still
references the plain name, the browser finds no match and falls back to
`system-ui`.

### Resolution
Update the font family token in `src/styles/tokens/_typography.scss` to
reference the variable name first:

```scss
$font-body: 'Open Sans Variable', 'Open Sans', system-ui, sans-serif;
```

The plain name (`'Open Sans'`) can remain as a fallback for environments
where the variable font fails to load. This pattern applies to any
`@fontsource-variable/*` package.
