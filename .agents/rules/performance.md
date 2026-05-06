---
name: performance
description: Rules for maintaining Lighthouse 100/100 scores across all categories.
---

# Performance Rules

All pages must score **100/100** across Lighthouse Performance,
Accessibility, Best Practices, and SEO before any PR is merged.

Run the audit with:
```bash
pnpm build && pnpm test:perf
```

See `.agents/skills/perf-audit/SKILL.md` for full audit documentation.

## Mandatory Rules

- **Self-host all fonts** — never use external font CDNs (Google
  Fonts, Adobe Fonts, etc.). Use `@fontsource-variable/<name>` and
  import in the layout. External font stylesheets are render-blocking.
- **Lazy-load below-the-fold images** — any `<img>` not visible on
  initial load must have `loading="lazy"`.
- **No base64-embedded images in SVGs** — these are uncompressible and
  large. Use the raster format (PNG/WebP) directly instead.
- **Run against a production build** — `pnpm dev` is unoptimised.
  Always `pnpm build` first.
- **Do not suppress audits** — fix the root cause, do not use
  Lighthouse budgets or ignore rules to paper over failures.
