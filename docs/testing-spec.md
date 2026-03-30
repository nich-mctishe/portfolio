# BDD Testing Specification

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this project (variables, functions, filenames) unless strictly necessary, as it clouds clarity.

**Status**: Active  
**Coverage Targets**: Unit ≥80% | E2E ≥10% | VRT ≥10%  
**Last Updated**: 2026-03-29

---

## Toolchain

| Type | Tool | Config | Run Command |
|------|------|--------|-------------|
| Unit | Vitest + happy-dom | `vitest.config.ts` | `pnpm test --run` |
| E2E | Cucumber.js + Playwright | `tests/e2e/cucumber.mjs` | `pnpm test:e2e` |
| VRT | Playwright screenshots | `playwright.config.ts` | `pnpm test:vrt` |

---

## BDD Structure (all test types)

All tests follow **Given / When / Then** nesting. See skills for full rules:
- `.agent/skills/unit-test/SKILL.md`
- `.agent/skills/e2e-testing/SKILL.md`
- `.agent/skills/vrt/SKILL.md`

---

## Unit Tests — Full Scenario Inventory

Tests are colocated: `src/path/to/Component.astro` → `src/path/to/Component.test.ts`

### Helpers

#### `src/helpers/get-skill-duration.test.ts`
| Given | When | Then |
|-------|------|------|
| `since=2010`, `end=2015` | called | returns `5` |
| `since=2020`, no end, system date mocked to 2026 | called | returns `6` |
| `since=2026`, no end, system date mocked to 2026 | called | returns `1` (minimum floor) |
| `since=2020`, `end=2020` | called | returns `1` (minimum floor) |

#### `src/helpers/determine-full-experience-points.test.ts`
| Given | When | Then |
|-------|------|------|
| empty array `[]` | called | returns `0` |
| flat list `[{since:2020}, {since:2015}]` with mocked durations | called | returns max (`11`) |
| nested children `[{since:2025, children:[{since:2010}]}]` | called | returns max from children (`16`) |

---

### Components — Root

#### `src/components/CareerHighlights.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` mocked to return `[]` highlights | rendered | produces valid HTML string |
| `getEntry` mocked to return 3 highlights | rendered | HTML contains all 3 highlight texts |
| `getEntry` mocked to return highlights with `active:false` | rendered | inactive items are excluded |
| `getEntry` returns `null` | rendered | does not throw; yields HTML |

#### `src/components/Clients.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns empty clients list | rendered | produces valid HTML string |
| `getEntry` returns 2 active clients | rendered | HTML contains both client names |
| `getEntry` returns clients with `active:false` | rendered | inactive clients excluded |

#### `src/components/Education.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns `[]` qualifications | rendered | produces valid HTML string |
| `getEntry` returns 1 qualification with synopsis | rendered | HTML contains degree title |
| `getEntry` returns qualification with `active:false` | rendered | inactive item excluded |

#### `src/components/Experience.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns `[]` jobs | rendered | produces valid HTML string |
| `getEntry` returns 1 job | rendered | HTML contains company name |
| `getEntry` returns job with `active:false` | rendered | inactive job excluded |

#### `src/components/Hero.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns personal data with name, title, description | rendered | HTML contains the name |
| `getEntry` returns personal data with 2 socials | rendered | HTML contains 2 social links |
| `getEntry` returns `null` | rendered | falls back to defaults; does not throw |

#### `src/components/Skills.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns empty categories | rendered | produces valid HTML string |
| `getEntry` returns 2 categories with items | rendered | HTML contains category names |
| `getEntry` returns skill with `active:false` | rendered | inactive skill excluded |

#### `src/components/SiteHeader.test.ts`
| Given | When | Then |
|-------|------|------|
| `getEntry` returns personal with `showThemeToggle:false` | rendered | no theme toggle button in HTML |
| `getEntry` returns personal with `showThemeToggle:true` | rendered | theme toggle button present |
| `getEntry` returns `null` | rendered | falls back to defaults; does not throw |

#### `src/components/SiteFooter.test.ts`
| Given | When | Then |
|-------|------|------|
| any scenario (no props) | rendered | produces valid HTML string |

#### `src/components/ThemeToggle.test.ts`
| Given | When | Then |
|-------|------|------|
| any scenario (no props) | rendered | HTML contains `#theme-toggle` button |
| any scenario (no props) | rendered | HTML contains both sun and moon SVG icons |

#### `src/components/Section.test.ts`
| Given | When | Then |
|-------|------|------|
| `id="career-highlights"` | rendered | section element has that id |
| `isFullWidth=true` | rendered | HTML contains `full-width` class |
| no props | rendered | produces valid HTML without throwing |

---

### Components — Experience Sub-components

These do NOT require `astro:content` mocks.

#### `src/components/experience/JobHeader.test.ts`
| Given | When | Then |
|-------|------|------|
| `role="Senior Engineer"`, `company="Lululemon"` | rendered | HTML contains both strings |
| `role="Dev"`, `company="Aesop"`, `logoUrl="/logo.svg"`, `logoAdaptive=false` | rendered | HTML contains `<img>` tag |
| `role="Dev"`, `company="Aesop"`, `logoUrl="/logo.svg"`, `logoAdaptive=true` | rendered | HTML uses `adaptive-logo` class, no `<img>` |
| `role="Dev"`, `company="Co"`, `description="Great role"` | rendered | HTML contains description text |
| `role="Dev"`, `company="Co"`, no description | rendered | no `<p class="job-description">` in output |

#### `src/components/experience/TimelineEvent.test.ts`
| Given | When | Then |
|-------|------|------|
| `startDate="Jan 2020"`, no `endDate` | rendered | HTML contains `"Present"` |
| `startDate="Jan 2020"`, `endDate="Dec 2023"` | rendered | HTML contains `"Dec 2023"` |
| `startDate="Jan 2020"`, `location="Vancouver, BC"` | rendered | HTML contains location string |
| `startDate="Jan 2020"`, no location | rendered | no location element in output |

#### `src/components/experience/JobSkills.test.ts`
| Given | When | Then |
|-------|------|------|
| `skills=["TypeScript","React"]` | rendered | HTML contains both strings |
| `skills=[]` | rendered | returns empty string (early return) |
| no props | rendered | returns empty string without throwing |

#### `src/components/experience/JobHighlights.test.ts`
| Given | When | Then |
|-------|------|------|
| `highlights=["Led migration","Cut costs 30%"]`, `scrollTarget="#job-1"` | rendered | HTML contains both highlights |
| single highlight `["Achieved X"]`, `scrollTarget="#job-2"` | rendered | `data-expandable="false"` (only one item) |
| two highlights, `scrollTarget="#job-3"` | rendered | `data-expandable="true"` |
| `highlights=[]`, `scrollTarget="#job-4"` | rendered | returns empty string (early return) |

---

### Layouts & Pages

#### `src/layouts/BaseLayout.test.ts`
| Given | When | Then |
|-------|------|------|
| `title="Nicholas Headlong — Portfolio"` | rendered | HTML `<title>` contains the string |
| `description="Custom description"` | rendered | meta description matches |
| no description prop | rendered | falls back to personal.description first line |

#### `src/pages/index.test.ts`
| Given | When | Then |
|-------|------|------|
| any scenario (page has no props) | rendered | produces valid HTML string |

---

## E2E Scenario Inventory

Feature files live in `tests/e2e/features/`. All require the dev server (`pnpm dev`).

| Feature File | Scenario | Steps file |
|---|---|---|
| `navigation.feature` | Site loads all 6 primary sections | `navigation.ts` |
| `interactions.feature` | Dark mode toggles and persists after page reload | `interactions.ts` |
| `interactions.feature` | Experience highlights expand/collapse | `interactions.ts` |
| `interactions.feature` | Education synopsis accordion opens and chevron rotates | `interactions.ts` |
| `interactions.feature` | Hamburger menu opens and closes on mobile (375px) | `interactions.ts` |
| `interactions.feature` | JSON-LD Person schema contains correct name and jobTitle | `interactions.ts` |

---

## VRT Scenario Inventory

Files live in `tests/vrt/`. Run via `pnpm test:vrt` against `pnpm preview` build.

| File | Scenario | Viewports |
|---|---|---|
| `homepage.vrt.ts` | Full homepage layout — light mode | Desktop Chrome + iPhone 13 |
| `homepage.vrt.ts` | Full homepage layout — dark mode | Desktop Chrome + iPhone 13 |

---

## Change Process

1. Add new source code → add/extend a colocated unit test.
2. Add a new user-facing interaction → add a Cucumber scenario.
3. Make a visual design change → run `pnpm test:vrt:update`, commit new snapshots.
4. CI runs all three suites on every push to `main`.
