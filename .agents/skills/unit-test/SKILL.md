---
name: unit-test
description: Write and maintain BDD-style Vitest unit tests for Astro components and TypeScript helpers, targeting ≥80% code coverage.
---

# Unit Testing Skill

## Overview

> [!IMPORTANT]
> **No Abbreviations**: Refrain from abbreviating anything in this project (variables, functions, filenames) unless strictly necessary, as it clouds clarity. Use full descriptive names like `initialize` instead of `init`.

Unit tests live **colocated** next to their source file:
- `src/helpers/get-skill-duration.ts` → `src/helpers/get-skill-duration.test.ts`
- `src/components/Section.astro` → `src/components/Section.test.ts`

The test runner is **Vitest** configured in `vitest.config.ts` with `happy-dom` environment. Run via:
```bash
pnpm test --run              # all unit tests once
pnpm test                    # watch mode
pnpm test --coverage         # with coverage report (target ≥80%)
```

---

## BDD Structure (mandatory)

Every test file MUST follow this nested `describe` pattern:

```ts
describe('Testing <ComponentName prop1:type prop2:type>', () => {
  // Top-level: clear any side-effects between scenarios
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given <specific inputs / state that defines this scenario>', () => {
    // Declare all inputs for this scenario. Be specific — list actual values.
    const input1 = 'actual static value'
    let rendered: string | null = null

    beforeEach(async () => {
      // Set up mocks or compute dynamic values here
      rendered = await render(Component, { prop1: input1 })
    })

    afterEach(() => {
      rendered = null
    })

    describe('When <one specific action is performed>', () => {
      // ↑ "When" describes the action: rendering, calling a function, clicking

      it('Then it should <expected outcome>', () => {
        expect(rendered).toContain('something')
      })

      it('And it should not <undesired outcome>', () => {
        expect(rendered).not.toContain('something else')
      })
    })
  })

  // Error scenario — no beforeEach/afterEach required
  describe('When an invalid call is made', () => {
    it('Then it should throw', async () => {
      await expect(async () => {
        await render(Component, { requiredProp: undefined as any })
      }).rejects.toThrow()
    })
  })
})
```

### Rules

1. **Be specific in `Given`**: name the actual prop values, e.g. `Given role="Senior Engineer" and company="Lululemon"`, not `Given default props`.
2. **If there are no meaningful props**, use `Given any scenario`.
3. **Only `When` blocks may be `async`**. `Then` (`it`) blocks are synchronous assertions only.
4. **`beforeEach` must have a matching `afterEach`** that nulls/resets any mutable state.
5. **Error scenarios** (`rejects.toThrow()`) may skip `beforeEach`/`afterEach`.
6. `vi.clearAllMocks()` goes in the outermost `beforeEach`.

---

## Rendering Astro Components

Use the shared `render` utility from `src/tests/utils.ts`:

```ts
import { render } from '../tests/utils.ts'    // adjust depth
import Component from './MyComponent.astro'
```

The utility uses `experimental_AstroContainer` and returns `{ html: string, container: HTMLElement }`.

### Components that use `astro:content`

Mock `astro:content` at the **module level** above all `describe` blocks:

```ts
vi.mock('astro:content', () => ({
  getEntry: vi.fn().mockResolvedValue({
    data: {
      /* provide realistic mock data matching your Zod schema */
    }
  })
}))
```

Components requiring this mock:
`CareerHighlights`, `Clients`, `Education`, `Experience`, `Hero`, `Skills`, `SiteHeader`, `SiteFooter`, `BaseLayout`, `index` (page)

---

## Coverage Target

| Metric     | Target |
|------------|--------|
| Statements | ≥ 80%  |
| Branches   | ≥ 80%  |
| Functions  | ≥ 80%  |
| Lines      | ≥ 80%  |

Run `pnpm test --coverage` and check `coverage/index.html`.

---

## Checklist: Writing a New Test File

- [ ] File is colocated next to the source (`*.test.ts` alongside `*.ts` / `*.astro`)
- [ ] Top-level `describe` names the subject with concrete prop types
- [ ] `vi.clearAllMocks()` in outermost `beforeEach`
- [ ] All `Given` blocks name specific values, not "default props"
- [ ] All mutable `let` variables are nulled in `afterEach`
- [ ] Only `When` blocks have `async` / `await`
- [ ] At least one error/edge-case scenario per file
- [ ] `pnpm test --run` passes green before committing
