---
name: perf-audit
description: Run a Lighthouse performance audit against a local production build, targeting 100/100 across all categories.
---

# Performance Audit Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this
> project (variables, functions, filenames) unless strictly necessary.
> Use full descriptive names like `score` instead of `s`.

Performance audits use **Lighthouse** (Node API) to assess the site
across Performance, Accessibility, Best Practices, and SEO. All
categories must score 100/100 before merging to `main`.

```
tests/perf/
  homepage.perf.ts    ← Lighthouse audit script for the homepage
```

Run via:
```bash
# Requires a production build first
pnpm build
pnpm test:perf
```

The script starts a preview server automatically via
`start-server-and-test`, runs the Lighthouse audit, then exits with
code `1` if any category scores below 100.

---

## What the Audit Covers

Four Lighthouse categories are checked:

- **Performance** — Core Web Vitals (FCP, LCP, TBT, CLS, SI) and
  asset delivery (render-blocking resources, image sizes, cache policy)
- **Accessibility** — Lighthouse's built-in axe checks (contrast,
  ARIA, semantic HTML). Use `pnpm test:a11y` for the full axe audit.
- **Best Practices** — HTTPS, no deprecated APIs, no browser errors
- **SEO** — Meta tags, canonical URLs, robots, structured data

---

## Audit Script Structure

Audit scripts live in `tests/perf/*.perf.ts`. Each script:
1. Launches a headless Chrome instance via `chrome-launcher`
2. Runs Lighthouse against the target URL using the Node API
3. Extracts category scores and prints a pass/fail summary
4. Exits with code `1` if any category is below 100, `0` if all pass

```ts
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })
const result = await lighthouse('http://localhost:4321/', {
  port: chrome.port,
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  logLevel: 'silent',
})
await chrome.kill()
```

---

## Rules

1. **100/100 target**: all four categories must score 100 before any
   PR is merged. No exceptions.
2. **Run against a production build**: always run `pnpm build` before
   `pnpm test:perf`. The dev server is unoptimised and will produce
   inaccurate scores.
3. **Self-host fonts**: never load fonts from external CDNs (Google
   Fonts, etc.) — external stylesheets are render-blocking. Use
   `@fontsource-variable/<font-name>` instead.
4. **Lazy-load below-the-fold images**: any `<img>` not visible on
   initial viewport load must have `loading="lazy"`.
5. **No base64-embedded images in SVGs**: SVGs that wrap rasterised
   images (PNG/JPEG encoded as base64) are large and uncompressible.
   Use the raster image format directly.
6. **Fix the root cause**: never suppress Lighthouse audits or use
   performance budgets to hide failures. Resolve the underlying issue.

---

## Common Fixes

| Symptom | Fix |
|---|---|
| Slow FCP / render-blocking resources | Self-host fonts; remove external CSS |
| Large LCP | Lazy-load images; optimise or replace oversized assets |
| High TBT | Move long scripts off the main thread; defer non-critical JS |
| CLS > 0 | Set explicit `width`/`height` on images and embeds |
| Cache policy warnings | GitHub Pages sets cache headers — not actionable |

---

## Adding a New Page Audit

1. Create `tests/perf/<page-name>.perf.ts` following the same
   structure as `homepage.perf.ts`.
2. Add a corresponding `test:perf:<page>` script to `package.json`.
3. All four categories must score 100 before the audit is considered
   passing.
