# Portfolio Agent Guide

This is the Portfolio Agent Guide for the Portfolio project.

## Project Overview


### Tech Stack

- **Astro** (v5)
- **SCSS** (Sass)
- **ESLint** (flat config + Astro plugin)
- **Prettier**
- **Playwright** (e2e testing)
- **Cucumber** (BDD testing)

### Project Structure

```
/src
  /components
    /global-clients
    /experience
      /components
        /career-highlights
        /experience-item
        /job-card
        /job-header
        /job-timeline
    /skills
      /components
        /skill-category
        /skill-item
    /base-layout
    /clients
    /education
    /header
    /hero
    /sections
  /layouts
  /content (YAML data)
  /assets
    /fonts
    /logos
```

### Component Architecture

- **Root Components**: Live in `src/components/`. These are the main building blocks of the site.
- **Sub-Components**: Live in `src/components/<Root-Component-Name>/components`. These are the sub-components of the root component.

## Rules and Constraints

- **Testing:** All new features MUST include a test file. Any new code must be testable, and pass all existing tests. This includes unit, e2e and visual regression testing.
    - **Unit Testing:** jest - use @.agents/skills/unit-testing/SKILL.md
    - **E2E Testing:** Playwright - use @.agents/skills/e2e-testing/SKILL.md
    - **Visual Regression Testing:** Playwright - use @.agents/skills/vrt/SKILL.md
- **Linting:** All new code must pass all linting rules. Use @.agents/skills/linting/SKILL.md when linting the project.
- **Stylelint:** All new code must pass all stylelint rules. Use @.agents/skills/linting/SKILL.md when stylelinting the project.
- **Changelog:** All new features MUST update the CHANGELOG.md file following the Keep a Changelog format. See @.agents/skills/changelog/SKILL.md.
- **Implementation Plan:** All new features MUST update the Implementation Plan (if the item exists in the plan).
- **TODO:** All items must remain in the TODO.md file until they are completed. Once a TODO is completed, it MUST be checked off of the TODO.md file.
- **Site Copy:** All copy must be stored as YAML files in the src/content folder. 
- **Future Work:** Any items that are not to be completed in the current version MUST be added to the Future Work section of the TODO.md file.
- **Project Updates:** All project updates MUST be added to the project-aims.md file.
- **Project Documentation:** All project documentation MUST be added to the docs folder.
- **Code Reviews:** All code reviews MUST be completed on any changes made to the project. See @.agents/skills/code-review/SKILL.md
- **Research:** All research MUST be completed on any plan mode, or on requested any changes made to the project. See @.agents/skills/research/SKILL.md

## Communication
- Keep explanations brief.
- If a task is ambiguous, list 3 options before starting.
