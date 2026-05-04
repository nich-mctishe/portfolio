---
name: a11y-testing
description: Run and maintain WCAG 2 AA accessibility audits using axe-playwright, targeting zero violations on all pages.
---

# Accessibility Testing (a11y) Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this
> project (variables, functions, filenames) unless strictly necessary.
> Use full descriptive names like `violations` instead of `v`.

Accessibility tests use **axe-playwright** to run WCAG 2 AA audits
against live pages using Playwright's Chromium browser. All violations
must be resolved before merging to `main`.

```
tests/a11y/
  homepage.a11y.ts    ← axe audit script for the homepage
```

Run via:
```bash
# Requires dev server running: pnpm dev
pnpm test:a11y

# Against a local production build (requires PUBLIC_TEST_MODE for
# any conditionally-rendered elements):
PUBLIC_TEST_MODE=true pnpm build
pnpm test:a11y:ci
```

---

## What a11y Tests Cover

Audits verify **WCAG 2 AA compliance** using axe-core rules. Focus on:

- **Colour contrast**: foreground/background ratio must be ≥ 4.5:1
  for normal text, ≥ 3:1 for large text (18pt+ or 14pt+ bold)
- **Alternative text**: all meaningful images must have descriptive
  `alt` text; decorative images must have `alt=""`
- **Keyboard navigation**: all interactive elements must be focusable
  and operable via keyboard
- **Semantic HTML**: correct landmark roles (`<main>`, `<nav>`,
  `<header>`, `<footer>`), heading hierarchy, and ARIA attributes

Do NOT use a11y tests for content accuracy — that belongs in E2E
tests. Do NOT use them for visual layout — that belongs in VRT.

---

## Audit Script Structure

Audit scripts live in `tests/a11y/*.a11y.ts`. Each script:
1. Launches a Playwright Chromium browser
2. Navigates to the target page and waits for `networkidle`
3. Injects axe-core via `injectAxe(page)`
4. Collects violations via `getViolations(page)`
5. Prints a detailed report and exits with code `1` if any violations
   are found, `0` if clean

```ts
import { chromium } from '@playwright/test'
import { injectAxe, getViolations } from 'axe-playwright'

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:4321/')
  await page.waitForLoadState('networkidle')
  await injectAxe(page)
  const violations = await getViolations(page)
  // ... report and exit
  await browser.close()
  process.exit(violations.length > 0 ? 1 : 0)
}
```

---

## Rules

1. **Zero tolerance**: the audit must report zero violations before
   any PR is merged. There are no acceptable exceptions.
2. **Fix the root cause**: never suppress violations with
   `axe-core` ignore rules unless there is a documented,
   irresolvable third-party constraint.
3. **Both themes**: if a colour change is made, verify contrast in
   both light and dark modes — dark mode uses different colour tokens.
4. **`alt=""` for decorative images**: when an image is adjacent to
   visible text that already describes it (e.g. a social icon next to
   the platform name), set `alt=""` to avoid redundant announcements.
5. **Do not use `opacity` to mute text**: opacity degrades the
   effective contrast ratio. Use a darker colour token instead.

---

## Colour Contrast Reference

Minimum ratios for WCAG AA:

| Text type | Minimum ratio |
|---|---|
| Normal text (< 18pt / < 14pt bold) | **4.5:1** |
| Large text (≥ 18pt or ≥ 14pt bold) | **3:1** |
| UI components / graphical elements | **3:1** |

Project colour tokens (light mode) and their contrast on `#f5f5f5`:

| Token | Value | Ratio on `#f5f5f5` | Status |
|---|---|---|---|
| `--color-primary` | `#990000` | 8.0:1 | ✅ |
| `--color-secondary` | `#008000` | 4.7:1 | ✅ |
| `--color-tertiary` | `#267326` | 5.4:1 | ✅ |
| `--color-quaternary` | `#006600` | 6.6:1 | ✅ |
| `--color-text` | `#1a1a1a` | 16.7:1 | ✅ |
| `--color-text-muted` | `#666666` | 5.3:1 | ✅ |

> [!WARNING]
> Do NOT apply `opacity` to muted text. `opacity: 0.8` on `#666666`
> renders as `#848484` on near-white surfaces, dropping the ratio
> to ~3.6:1 which fails WCAG AA.

---

## Adding a New Page Audit

1. Create `tests/a11y/<page-name>.a11y.ts` following the same
   structure as `homepage.a11y.ts`.
2. Update `test:a11y:run` in `package.json` to run all scripts,
   or create a separate `test:a11y:<page>` script.
3. Resolve all violations before committing.
4. Both light and dark mode should be tested if the page has
   theme-sensitive colours.
