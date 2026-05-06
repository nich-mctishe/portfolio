---
name: performance
description: Rules for Lighthouse audits — gated categories (Accessibility, Best Practices, SEO) must score 100; Performance is advisory.
---

# Performance Rules

Run the audit with:
```bash
pnpm build && pnpm test:perf
```

See `.agents/skills/perf-audit/SKILL.md` for full audit documentation.

## Category Tiers

| Tier | Categories | Rule |
|---|---|---|
| **Gated** | Accessibility, Best Practices, SEO | Must score 100 — blocks merge if not |
| **Advisory** | Performance | Always reported, never blocks |

Performance is advisory because a metric-based deficit can land on
`main` undetected. A hard gate would then block all subsequent PRs —
including fix PRs — until the score is restored to 100 in a single
change. Advisory reporting keeps the signal visible without creating
that deadlock.

## Mandatory Rules

- **Gated categories must score 100** before any PR is merged.
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
