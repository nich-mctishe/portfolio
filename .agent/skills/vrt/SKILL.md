---
name: vrt
description: Run and maintain Playwright Visual Regression Tests (screenshots), targeting 10% coverage of layout-critical pages and viewport breakpoints.
---

# Visual Regression Testing (VRT) Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this project (variables, functions, filenames) unless strictly necessary, as it clouds clarity. Use full descriptive names like `screenshot` instead of `ss`.

VRT tests take full-page screenshots and compare them to stored baselines. A failing VRT means the visual layout has changed unexpectedly.

```
tests/vrt/
  homepage.vrt.ts       ← full-page screenshot tests

playwright.config.ts    ← projects: Desktop Chrome (1280px), iPhone 13 (390px)
```

Run via:
```bash
pnpm test:vrt              # compare against stored baselines
pnpm test:vrt:update       # regenerate baselines after an intentional visual change
```

> VRT requires a **built** preview server. `playwright.config.ts` runs `pnpm preview` automatically via `webServer`.

---

## What VRT Tests Cover (10% of overall coverage)

VRT tests verify **visual layout integrity** — not logic or content. Focus on:

- Full-page rendering at desktop and mobile viewports
- Theme variants: light mode and dark mode
- No unintended layout shift after CSS/component changes

Do NOT use VRT for checking text content or interaction logic — those belong in unit and E2E tests.

---

## Structure

VRT tests use Playwright's standard `test/expect` API (not Cucumber). Tests live in `tests/vrt/*.vrt.ts`.

```ts
import { test, expect } from '@playwright/test'

test.describe('<Area under test>', () => {

  test('<Scenario description>', async ({ page }) => {
    // 1. Navigate
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 2. Wait for animations to settle
    await page.waitForTimeout(1000)

    // 3. Screenshot
    await expect(page).toHaveScreenshot('<descriptive-name>.png', {
      fullPage: true,
      maxDiffPixels: 100,   // tolerance for antialiasing noise
    })
  })

})
```

### Rules

1. **Always `waitForLoadState('networkidle')`** before screenshotting.
2. **Always `waitForTimeout(1000)`** to let Astro scroll-reveal animations complete.
3. **Snapshot names must be descriptive**: `homepage-light.png`, `homepage-dark.png`, `skills-mobile.png`.
4. **`maxDiffPixels: 100`** is the default tolerance. Raise only for components with unavoidable animated noise.
5. **After `pnpm test:vrt:update`**, always visually inspect the new `.png` files before committing them.

---

## Full Scenario Inventory

All scenarios must remain green before merging to `main`.

### `tests/vrt/homepage.vrt.ts`

**Scenario: Homepage maintains layout integrity (light mode)**

| Step | Detail |
|------|--------|
| Navigate | `page.goto('/')` — desktop Chrome at 1280px |
| Wait | `networkidle` + `1000ms` for reveal animations |
| Assert | Full-page screenshot matches `homepage-layout.png` within 100px diff |
| Repeat | Playwright also runs this on iPhone 13 (390×844) via `projects` config |

**Expected DOM at time of snapshot:**
- `#hero` visible with hero text and bubbles
- `#career-highlights` visible with list items
- `#skills` visible with category pills and bar graphs
- `#experience` visible with at least one job card
- `#education` visible with at least one course entry
- `#clients` visible with logo grid
- `<html>` has `data-theme="light"` (or omitted — light is default)

---

**Scenario: Dark mode maintains layout integrity**

| Step | Detail |
|------|--------|
| Navigate | `page.goto('/')` — desktop Chrome at 1280px |
| Wait | `networkidle` |
| Action | Locate `button[aria-label="Toggle theme"]`, click if visible |
| Wait | `500ms` for CSS transition to complete |
| Assert | Full-page screenshot matches `homepage-darkmode.png` within 100px diff |
| Repeat | Also runs on iPhone 13 |

**Expected DOM at time of snapshot:**
- `<html>` has `data-theme="dark"`
- Background surfaces are dark (visually — VRT catches regressions here)
- All section text still legible
- Client logos with `adaptive-logo` class appear in primary colour (not dark background)

---

## Viewports Tested

Configured in `playwright.config.ts` via `projects`:

| Project Name | Device | Width | Height |
|---|---|---|---|
| Desktop Chromium | Chrome | 1280px | 720px |
| Mobile Safari | iPhone 13 | 390px | 844px |

---

## Adding a New VRT Scenario

1. Add a `test(...)` block in `tests/vrt/homepage.vrt.ts` (or create a new file for a new route).
2. Use a descriptive snapshot name: `section-skills-scrolled.png`.
3. Run `pnpm test:vrt:update` once — this generates the baseline `.png`.
4. Visually confirm the screenshot looks correct.
5. Commit both the test file and the new `.png` snapshot.
6. Future `pnpm test:vrt` runs will compare against this baseline.

---

## CI Behaviour

VRT runs in `.github/workflows/ci.yml` on every push to `main`. On failure, the pixel diff image is available in GitHub Actions artefacts for visual inspection.
