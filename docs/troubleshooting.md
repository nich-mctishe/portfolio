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
