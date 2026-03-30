# BDD Test Implementation Plan

**Status**: Approved — Ready for Execution  
**Coverage Targets**: Unit ≥80% | E2E ≥10% | VRT ≥10%  
**Last Updated**: 2026-03-29

> **For agents picking this up**: Read this file first, then read `docs/testing-spec.md` for the full
> per-file scenario tables. See `.agent/skills/unit-test/SKILL.md`, `.agent/skills/e2e-testing/SKILL.md`,
> and `.agent/skills/vrt/SKILL.md` for structure rules before writing any test.

---

## What Has Already Been Done ✅

| Item | Location |
|------|----------|
| Vitest + happy-dom config | `vitest.config.ts` |
| AstroContainer render util | `src/tests/utils.ts` |
| Vitest setup file | `src/tests/setup.ts` |
| Playwright config | `playwright.config.ts` |
| Cucumber config | `tests/e2e/cucumber.mjs` |
| Cucumber world + hooks | `tests/e2e/support/world.ts`, `hooks.ts` |
| E2E feature files | `tests/e2e/features/navigation.feature`, `interactions.feature` |
| E2E step definitions | `tests/e2e/steps/navigation.ts`, `interactions.ts` |
| VRT test file | `tests/vrt/homepage.vrt.ts` |
| CI pipeline | `.github/workflows/ci.yml` |
| Unit-test skill | `.agent/skills/unit-test/SKILL.md` |
| E2E skill | `.agent/skills/e2e-testing/SKILL.md` |
| VRT skill | `.agent/skills/vrt/SKILL.md` |
| Persistent test spec | `docs/testing-spec.md` |

---

## What Still Needs To Be Done

### Step 1 — Rewrite existing unit tests in BDD format

Rewrite all files from flat `it(...)` style to `Given/When/Then` nested `describe` blocks.

---

#### `src/helpers/calculate-skill-duration.test.ts`

```
describe('Testing calculateSkillDuration(since: number, end?: number)')
```

| Given | When | Then |
|-------|------|------|
| `since=2010`, `end=2015`, system date irrelevant | called | returns `5` |
| `since=2020`, no `end`, system date mocked to `2026` | called | returns `6` |
| `since=2026`, no `end`, system date mocked to `2026` | called | returns `1` (floor — cannot be 0) |
| `since=2020`, `end=2020` | called | returns `1` (floor — end equals start) |

> Use `vi.useFakeTimers()` + `vi.setSystemTime(new Date('2026-06-01T12:00:00Z'))` in top-level `beforeEach`. Reset in `afterEach`.

---

#### `src/helpers/determine-full-experience-points.test.ts`

```
describe('Testing determineFullExperiencePoints(skills: SkillItem[])')
```

| Given | When | Then |
|-------|------|------|
| `skills = []` | called | returns `0` |
| `skills = [{name:"A", since:2020}, {name:"B", since:2015}]` with mocked durations `6` and `11` | called | returns `11` (max) |
| `skills = [{name:"B", since:2025, children:[{name:"C", since:2010}]}]` with durations `1` and `16` | called | returns `16` (recurses into children) |

> Mock `./calculate-skill-duration` at module level. Mock returns `end ? end - since : 2026 - since`.

---

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this project (variables, functions, filenames) unless strictly necessary, as it clouds clarity. (e.g., use `initialize` instead of `init`).

## Component Specifications

#### `src/components/Section.test.ts`

```
describe('Testing <Section id?:string isFullWidth?:boolean />')
```

| Given | When | Then |
|-------|------|------|
| `id="career-highlights"`, no other props | rendered | `<section>` has `id="career-highlights"` |
| `isFullWidth=true`, `id="test"` | rendered | HTML contains class `full-width` |
| no props at all | rendered | does not throw; returns a non-empty HTML string |

---

#### `src/components/ThemeToggle.test.ts`

```
describe('Testing <ThemeToggle /> (no props)')
```

| Given | When | Then |
|-------|------|------|
| any scenario | rendered | HTML contains element with `id="theme-toggle"` |
| any scenario | rendered | HTML contains both a sun SVG icon and a moon SVG icon |

---

#### `src/components/SiteFooter.test.ts`

```
describe('Testing <SiteFooter /> — uses astro:content getEntry("personal", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ name:"Nicholas Headlong", socials:[{platform:"GitHub",url:"https://github.com/nich-mctishe", icon:"..."},{platform:"LinkedIn",url:"https://linkedin.com/in/nicholas-headlong", icon:"..."}] }` | rendered | HTML contains 2 social link `href` values (`github.com` and `linkedin.com`) |
| `getEntry` returns personal data with 2 socials | rendered | HTML contains `"Nicholas Headlong"` in the credits paragraph |
| `getEntry` returns personal data with 2 socials | rendered | HTML contains the current year (e.g. `"2026"`) in the credits paragraph |
| `getEntry` returns `null` | rendered | does not throw; renders with empty socials list and no name |

---

#### `src/components/experience/JobHeader.test.ts`

```
describe('Testing <JobHeader role:string company:string logoUrl?:string logoAdaptive?:boolean description?:string />')
```

| Given | When | Then |
|-------|------|------|
| `role="Senior Engineer"`, `company="Lululemon"` | rendered | HTML contains `"Senior Engineer"` and `"Lululemon"` |
| `role="Dev"`, `company="Aesop"`, `logoUrl="/logos/aesop.svg"`, `logoAdaptive=false` | rendered | HTML contains an `<img>` element |
| `role="Dev"`, `company="Aesop"`, `logoUrl="/logos/aesop.svg"`, `logoAdaptive=true` | rendered | HTML contains class `adaptive-logo`; no `<img>` tag |
| `role="Dev"`, `company="Co"`, `description="A great role at a great company"` | rendered | HTML contains `"A great role at a great company"` |
| `role="Dev"`, `company="Co"`, no `description` | rendered | HTML does not contain `class="job-description"` |

---

#### `src/components/CareerHighlights.test.ts`

```
describe('Testing <CareerHighlights /> — uses astro:content getEntry("career-highlights", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ 'career-highlights': [] }` | rendered | produces valid HTML string |
| `getEntry` returns 3 highlights `["Led X", "Built Y", "Grew Z"]` | rendered | HTML contains all three strings |
| `getEntry` returns highlights where one has `active: false` | rendered | inactive item text absent from HTML |
| `getEntry` returns `null` | rendered | does not throw; falls back to empty list |

---

#### `src/components/Hero.test.ts`

```
describe('Testing <Hero /> — uses astro:content getEntry("personal", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ name:"Nicholas Headlong", title:"...", socials:[{url:"https://github.com/..."},{url:"https://linkedin.com/..."}] }` | rendered | HTML contains `"Nicholas Headlong"` and 2 social link `href` values |
| `getEntry` returns `null` | rendered | does not throw; uses fallback name, title, and empty socials |

---

#### `src/components/SiteHeader.test.ts`

```
describe('Testing <SiteHeader /> — uses astro:content getEntry("personal", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns personal data with `showThemeToggle: true` | rendered | HTML contains element with class `theme-toggle` |
| `getEntry` returns personal data with `showThemeToggle: false` | rendered | HTML does NOT contain class `theme-toggle` |
| `getEntry` returns `null` | rendered | does not throw; renders with fallback name |

---

#### `src/components/Skills.test.ts`

```
describe('Testing <Skills /> — uses astro:content getEntry("skills", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ categories: [{name:"Frontend", items:[{name:"TypeScript",since:2016,active:true}]}] }` | rendered | HTML contains `"Frontend"` and `"TypeScript"` |
| `getEntry` returns a category with one item having `active: false` | rendered | inactive item name absent from HTML |

---

#### `src/components/Clients.test.ts`

```
describe('Testing <Clients /> — uses astro:content getEntry("clients", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ clients: [] }` | rendered | produces valid HTML string |
| `getEntry` returns 2 clients `[{name:"Lululemon",...},{name:"HBO",...}]` both active | rendered | HTML contains both client names |
| `getEntry` returns a client with `active: false` | rendered | inactive client name absent from HTML |

---

#### `src/components/Education.test.ts`

```
describe('Testing <Education /> — uses astro:content getEntry("education", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ qualifications: [] }` | rendered | produces valid HTML string |
| `getEntry` returns 1 qualification `{degree:"BSc Computer Science", institution:"Falmouth"}` | rendered | HTML contains `"BSc Computer Science"` |
| `getEntry` returns a qualification with `active: false` | rendered | inactive qualification absent from HTML |

---

#### `src/components/Experience.test.ts`

```
describe('Testing <Experience /> — uses astro:content getEntry("experience", "data")')
```

| Given | When | Then |
|-------|------|------|
| `getEntry` returns `{ jobs: [] }` | rendered | produces valid HTML string |
| `getEntry` returns 1 job `{company:"Lululemon", role:"Senior Engineer", active:true}` | rendered | HTML contains `"Lululemon"` |
| `getEntry` returns a job with `active: false` | rendered | inactive job's company name absent from HTML |

---

#### `src/layouts/BaseLayout.test.ts`

```
describe('Testing <BaseLayout title:string description?:string />')
```

Uses `astro:content` mock for the personal data lookup.

| Given | When | Then |
|-------|------|------|
| `title="Nicholas Headlong — Portfolio"` | rendered | HTML `<title>` tag contains `"Nicholas Headlong — Portfolio"` |
| `title="..."`, `description="Custom meta description"` | rendered | `<meta name="description">` content equals `"Custom meta description"` |
| `title="..."`, no `description` prop | rendered | meta description falls back to first line of personal `description` field |

---

#### `src/pages/index.test.ts`

```
describe('Testing <index /> (portfolio homepage — no props)')
```

| Given | When | Then |
|-------|------|------|
| any scenario (mocked content collections) | rendered | produces a valid non-empty HTML string without throwing |

---

### Step 2 — Create 3 missing colocated test files

These sub-components have no test file yet:

#### `src/components/experience/TimelineEvent.test.ts` *(create new)*

```
describe('Testing <TimelineEvent startDate:string endDate?:string location?:string />')
```

| Given | When | Then |
|-------|------|------|
| `startDate="Jan 2020"`, no `endDate` | rendered | HTML contains `"Present"` |
| `startDate="Jan 2020"`, `endDate="Dec 2023"` | rendered | HTML contains `"Dec 2023"` and NOT `"Present"` |
| `startDate="Jan 2020"`, `endDate="Dec 2023"`, `location="Vancouver, BC"` | rendered | HTML contains `"Vancouver, BC"` |
| `startDate="Jan 2020"`, no `location` | rendered | HTML does not contain a location element |

---

#### `src/components/experience/JobSkills.test.ts` *(create new)*

```
describe('Testing <JobSkills skills?:string[] />')
```

| Given | When | Then |
|-------|------|------|
| `skills=["TypeScript","React","Node.js"]` | rendered | HTML contains all three strings |
| `skills=[]` | rendered | returns empty string (early return — no DOM output) |
| no props passed | rendered | returns empty string without throwing |

---

#### `src/components/experience/JobHighlights.test.ts` *(create new)*

```
describe('Testing <JobHighlights highlights?:string[] scrollTarget:string />')
```

| Given | When | Then |
|-------|------|------|
| `highlights=["Led platform migration","Reduced costs by 30%"]`, `scrollTarget="#job-1"` | rendered | HTML contains both highlight strings |
| `highlights=["Single highlight"]`, `scrollTarget="#job-2"` | rendered | container has `data-expandable="false"` (only 1 item) |
| `highlights=["Item 1","Item 2"]`, `scrollTarget="#job-3"` | rendered | container has `data-expandable="true"` (2+ items) |
| `highlights=[]`, `scrollTarget="#job-4"` | rendered | returns empty string without throwing (early return) |

---

### Step 3 — E2E Tests (Cucumber + Playwright)

> All scenarios already have feature files and step definitions. Ensure they pass against a running dev server (`pnpm dev`).

**`tests/e2e/features/navigation.feature`**

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Site loads all primary sections | homepage open at `http://localhost:4321/` | page loads | `#hero`, `#career-highlights`, `#skills`, `#experience`, `#education`, `#clients` all visible |

**`tests/e2e/features/interactions.feature`**

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Dark mode persists | homepage open | click `.theme-btn` | `<html data-theme="dark">` + `localStorage.theme === "dark"` |
| Dark mode persists after reload | dark mode active | `page.reload()` | `<html>` still has `data-theme="dark"` |
| Highlights expand | homepage open | scroll to `#experience`, click button on first `[data-expandable="true"]` card | `data-expanded="true"` on that container |
| Highlights collapse | highlights expanded | click button again | `data-expanded="false"` |
| Education accordion opens | homepage open | scroll to `#education`, click `.expand-btn` on first `[data-expandable="true"]` card | `data-expanded="true"` |
| Mobile hamburger opens | viewport `375×667`, homepage open | click `.hamburger` | `.bubble-nav` has class `is-open` |
| Mobile hamburger closes | menu open | click `.hamburger` again | `.bubble-nav` does NOT have class `is-open` |
| JSON-LD schema present | homepage open | — | `script[type="application/ld+json"]` attached to DOM |
| JSON-LD schema correct | schema present | parse JSON | `@type="Person"`, `name="Nicholas Headlong"`, `jobTitle` contains `"Engineer"` |

**Content assertions — `tests/e2e/features/content.feature`** *(new feature file)*

> These scenarios verify that real content from the YAML data files is actually rendered in the DOM. They guard against silent data-loading failures.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Clients section shows real client names | homepage open | scroll to `#clients` | at least one `.client-name` or `aria-label` containing `"Lululemon"` is visible |
| Education section shows degree title | homepage open | scroll to `#education` | text `"BSc"` or `"Computer Science"` is present in `#education` |
| Education section shows institution name | homepage open | scroll to `#education` | institution name (e.g. `"Falmouth"`) is present in `#education` |
| Experience section shows job company name | homepage open | scroll to `#experience` | company name `"Lululemon"` is present in `#experience` |
| Experience section shows job role | homepage open | scroll to `#experience` | role text (e.g. `"Engineer"`) is present in `#experience` |
| Footer shows social links | homepage open | scroll to `footer` | `<a href="https://github.com/nich-mctishe">` is present |
| Footer shows LinkedIn link | homepage open | scroll to `footer` | `<a href="https://linkedin.com/in/nicholas-headlong">` is present |
| Footer shows copyright name | homepage open | scroll to `footer` | `"Nicholas Headlong"` is present in the footer credits |

---

### Step 4 — VRT Tests (Playwright screenshots)

> Tests already exist for the homepage. Section-specific shots below need to be **added** to `tests/vrt/homepage.vrt.ts`. Run `pnpm test:vrt:update` once to generate baselines.

**`tests/vrt/homepage.vrt.ts`** — existing tests

| Scenario | Setup | Expected DOM at snapshot time | Snapshot file |
|----------|-------|-------------------------------|---------------|
| Light mode full page | navigate `/`, wait `networkidle` + `1000ms` | `<html>` no `data-theme` or `data-theme="light"`, all 6 sections visible | `homepage-layout.png` |
| Dark mode full page | navigate `/`, click `button[aria-label="Toggle theme"]`, wait `500ms` | `<html data-theme="dark">`, all sections visible with dark surfaces | `homepage-darkmode.png` |

**`tests/vrt/homepage.vrt.ts`** — section-level tests to add

Use `page.locator('#section-id').screenshot()` (element screenshot, not full page) for these, so changes elsewhere don't cause false positives.

| Scenario | Setup | Section to screenshot | Expected content | Snapshot file |
|----------|-------|-----------------------|------------------|---------------|
| Clients section — light mode | navigate `/`, `networkidle` + `1000ms` | `#clients` | Client logo grid visible, at minimum 1 logo element present | `clients-light.png` |
| Clients section — dark mode | navigate `/`, toggle dark, wait `500ms` | `#clients` | Logos visible; adaptive logos pick up primary colour | `clients-dark.png` |
| Education section — light mode | navigate `/`, `networkidle` + `1000ms` | `#education` | At least one course card visible | `education-light.png` |
| Experience section — light mode | navigate `/`, `networkidle` + `1000ms` | `#experience` | At least one job card visible with company logo area | `experience-light.png` |
| Footer — light mode | navigate `/`, scroll to `footer` | `footer` | Social bubble links visible; credits paragraph visible | `footer-light.png` |
| Footer — dark mode | navigate `/`, toggle dark, scroll to `footer` | `footer` | Same as above with dark surface colour | `footer-dark.png` |

All scenarios run on **Desktop Chrome (1280px)** and **iPhone 13 (390px)** via `playwright.config.ts` projects.

### Step 5 — Verify coverage

```bash
pnpm test --run        # must pass with 0 failures
pnpm test --coverage   # all metrics ≥80%
```

If coverage is below 80%, identify the uncovered branches and add targeted `Given` scenarios.

### Step 6 — Lint

```bash
pnpm lint
```

Fix any `@stylistic/max-len` or `unicorn/filename-case` errors in test files.

---

## `astro:content` Mock Template

Use this at module level in any component that calls `getEntry`:

```ts
vi.mock('astro:content', () => ({
  getEntry: vi.fn().mockResolvedValue({
    data: {
      // Populate with realistic values matching the component's Zod schema
    }
  })
}))
```

To test the null-fallback case, override per-test:

```ts
vi.mocked(getEntry).mockResolvedValueOnce(null)
```

---

## BDD Template (quick reference)

```ts
describe('Testing <ComponentName prop1:Type>', () => {
  beforeEach(() => { vi.clearAllMocks() })

  describe('Given <specific inputs with actual values>', () => {
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, { prop: 'value' })).html
    })

    afterEach(() => { rendered = null })

    describe('When the component is rendered', () => {
      it('Then it should contain the expected output', () => {
        expect(rendered).toContain('expected string')
      })

      it('And it should not contain unwanted output', () => {
        expect(rendered).not.toContain('excluded string')
      })
    })
  })

  describe('When called with no props', () => {
    it('Then it should not throw', async () => {
      await expect(render(Component)).resolves.toBeDefined()
    })
  })
})
```
