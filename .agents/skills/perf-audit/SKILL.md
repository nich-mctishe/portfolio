---
name: perf-audit
description: Run a Lighthouse audit against a local production build. Accessibility, Best Practices, and SEO are hard gates (100/100). Performance is advisory — always reported but never blocks.
---

# Performance Audit Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this
> project (variables, functions, filenames) unless strictly necessary.
> Use full descriptive names like `score` instead of `s`.

Performance audits use **Lighthouse** (Node API) to assess the site
across four categories. Categories are split into two tiers:

| Tier | Categories | Behaviour |
|---|---|---|
| **Gated** | Accessibility, Best Practices, SEO | Must score 100 — exits non-zero if not |
| **Advisory** | Performance | Always reported, never blocks |

Performance is advisory because its score is metric-based and can
regress on `main` without being caught. A hard gate would block
subsequent fix PRs from merging until a perfect score is restored in
a single change — making incremental improvements impossible.

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
code `1` only if a gated category scores below 100.

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
3. Extracts category scores and prints a summary
4. Exits with code `1` if a **gated** category scores below 100, `0` otherwise
   — advisory categories are printed but do not affect the exit code

```ts
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })
const result = await lighthouse('http://localhost:4321/', {
  port: chrome.port,
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  logLevel: 'silent',
})
chrome.kill()
```

---

## Rules

1. **Gated categories must score 100**: Accessibility, Best Practices,
   and SEO must score 100 before any PR is merged. No exceptions.
2. **Performance is advisory**: the Performance score is always
   reported but never blocks a merge. A hard gate would prevent
   incremental fix PRs from landing once a deficit exists on `main`.
3. **Run against a production build**: always run `pnpm build` before
   `pnpm test:perf`. The dev server is unoptimised and will produce
   inaccurate scores.
4. **Self-host fonts**: never load fonts from external CDNs (Google
   Fonts, etc.) — external stylesheets are render-blocking. Use
   `@fontsource-variable/<font-name>` instead.
5. **Lazy-load below-the-fold images**: any `<img>` not visible on
   initial viewport load must have `loading="lazy"`.
6. **No base64-embedded images in SVGs**: SVGs that wrap rasterised
   images (PNG/JPEG encoded as base64) are large and uncompressible.
   Use the raster image format directly.
7. **Fix the root cause**: never suppress Lighthouse audits or use
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
3. Gated categories (Accessibility, Best Practices, SEO) must score
   100. Performance is always reported but advisory.
