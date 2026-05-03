---
name: e2e-testing
description: Write and maintain BDD-style end-to-end tests using Cucumber.js + Playwright, targeting 10% coverage of all key user journeys.
---

# E2E Testing Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this project (variables, functions, filenames) unless strictly necessary, as it clouds clarity. Use full descriptive names like `scrollIntoView` instead of `scroll`.

E2E tests use **Cucumber.js** (Gherkin feature files) with **Playwright** as the browser driver.

```
tests/e2e/
  features/        ← .feature files (Gherkin scenarios)
  steps/           ← TypeScript step definitions
  support/
    hooks.ts       ← browser lifecycle (BeforeAll/AfterAll/Before/After)
    world.ts       ← CustomWorld with page/context/browser
  cucumber.mjs     ← Cucumber config
```

Run via:
```bash
# Requires dev server running: pnpm dev
pnpm test:e2e

# Against a deployed build:
BASE_URL=https://nich-mctishe.github.io/portfolio pnpm test:e2e
```

---

## What E2E Tests Cover (10% of overall coverage)

E2E tests verify **user journeys** — things a real user does in a real browser. Focus on:

- **Navigation**: all sections visible on load
- **Interactive state changes**: theme toggle, accordion expand/collapse
- **Content accuracy**: key text matches expected values (name, JSON-LD schema)
- **Responsive layout**: mobile viewport behaviours (hamburger menu)

Do NOT use E2E for logic coverage — that belongs in unit tests.

---

## Step Definition Rules

1. **Steps live in `tests/e2e/steps/`**, one file per feature area (e.g. `navigation.ts`, `interactions.ts`).
2. **All steps use `CustomWorld`** typed with `this: CustomWorld`.
3. **`Given` steps** navigate to pages or set viewport — always `await this.page!.goto(...)` + `waitForLoadState('networkidle')`.
4. **`When` steps** perform exactly one action: click, scroll, reload, keypress.
5. **`Then` steps** assert using `expect` from `@playwright/test`. No actions.
6. **Mobile viewport** scenarios create a fresh context with `viewport: { width: 375, height: 667 }`.
7. Use `await page.waitForLoadState('networkidle')` after navigation, not arbitrary `waitForTimeout`.

---

## Gherkin Structure (mandatory)

```gherkin
Feature: <Feature area name>
  As a <persona>
  I want to <goal>
  So I can <benefit>

  Scenario: <concise description of this journey>
    Given <specific initial state — include URL or viewport>
    When <one specific action — include selector or label>
    Then <specific observable outcome — include selector or value>
    And <additional assertion on same state (optional)>
```

---

## Full Scenario Inventory

All scenarios must remain green before merging to `main`.

### `tests/e2e/features/navigation.feature`

**Scenario: Site loads all primary sections**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio homepage (`http://localhost:4321/`) |
| `Then` | `#hero` section is visible |
| `And` | `#career-highlights` section is visible |
| `And` | `#skills` section is visible |
| `And` | `#experience` section is visible |
| `And` | `#education` section is visible |
| `And` | `#clients` section is visible |

Implementation: `tests/e2e/steps/navigation.ts` — uses `page.locator('#<id>').toBeVisible()`

---

### `tests/e2e/features/interactions.feature`

**Scenario: Dark Mode Persistence & Validation**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio homepage |
| `When` | I click `.theme-btn` (the theme toggle button) |
| `Then` | `<html>` element has `data-theme="dark"` |
| `And` | `localStorage.getItem('theme')` returns `"dark"` |
| `When` | I reload the page (`page.reload()`) |
| `Then` | `<html>` still has `data-theme="dark"` (persisted via localStorage) |

---

**Scenario: Experience Highlights Expansion**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio homepage |
| `When` | I scroll `#experience` into view |
| `And` | I click the button inside `.experience-card [data-expandable="true"]` (first card) |
| `Then` | That container's `data-expanded` attribute equals `"true"` |
| `And` | The chevron icon has a rotation transform applied (visual state) |
| `When` | I click the button again (now labelled "Show less") |
| `Then` | `data-expanded` attribute equals `"false"` |

---

**Scenario: Education Synopsis Accordion**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio homepage |
| `When` | I scroll `#education` into view |
| `And` | I click `.expand-btn` on the first `.education-card[data-expandable="true"]` |
| `Then` | That card's `data-expanded` attribute equals `"true"` |
| `And` | The synopsis content area is visible |

---

**Scenario: Mobile Hamburger Menu Toggles Properly**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio on a mobile device (viewport: `375 × 667`) |
| `When` | I click `.hamburger` |
| `Then` | `.bubble-nav` has class `is-open` |
| `When` | I click `.hamburger` again |
| `Then` | `.bubble-nav` does NOT have class `is-open` |

---

**Scenario: JSON-LD Matches Expected Content**

| Step | Detail |
|------|--------|
| `Given` | I open the portfolio homepage |
| `Then` | `script[type="application/ld+json"]` is attached to the DOM |
| `And` | Parsing the script content as JSON yields `@type: "Person"` |
| `And` | `name` equals `"Nicholas Headlong"` |
| `And` | `jobTitle` contains `"Engineer"` |

---

## Adding a New Scenario

1. Add a `Scenario:` block to the appropriate `.feature` file (or create a new one).
2. Implement any missing step definitions in `tests/e2e/steps/`.
3. Start `pnpm dev`, then run `pnpm test:e2e`.
4. All existing scenarios must still pass before pushing.
