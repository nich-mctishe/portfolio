# Task Breakdown

Delegatable task list for building the portfolio site. Each task is self-contained enough to be picked up by an agent or contributor with the context provided.

> **Reference docs**: [project-aims.md](./project-aims.md) · [tech-stack.md](./tech-stack.md)
>
> **Figma**: [Self work](https://www.figma.com/design/6XlzM3Ym7i1JiFutcdPjW4/Self-work?node-id=0-1)

---

## Phase 1 — Project Scaffolding

- [x] **1.1** Scaffold Astro project with `pnpm create astro@latest ./` (TypeScript, strict mode)
- [x] **1.2** Configure SCSS — install `sass`, set up global SCSS entry point, create folder structure (`styles/`, `styles/tokens/`, `styles/mixins/`)
- [x] **1.3** Set up ESLint (flat config + Astro plugin) and Prettier
- [x] **1.4** Set up `CHANGELOG.md` with Keep a Changelog format
- [x] **1.5** Create initial folder structure for content (`src/content/`) and components (`src/components/`)
- [x] **1.6** Configure Astro for static output and GitHub Pages base path

---

## Phase 2 — Design System & Theming

- [x] **2.1** Define SCSS colour tokens — light mode palette (red `#990000`, green, bg `#F0F0F0`, text `#000000`)
- [x] **2.2** Design dark mode palette from scratch — choose complementary dark colours with accessible contrast ratios
- [x] **2.3** Implement CSS custom property theming — `:root` (light) + `[data-theme="dark"]` (dark) rulesets
- [x] **2.4** Build dark/light toggle component — `localStorage` persistence, `prefers-color-scheme` detection, no-flash on load
- [x] **2.5** Define typography tokens — serif heading font, Inter for body, responsive font scale
- [x] **2.6** Create responsive breakpoint mixins — mobile (~350px), tablet (768px), desktop (max)
- [x] **2.7** Set up global reset / base styles

---

## Phase 3 — Content Layer

- [x] **3.1** Define Astro Content Collection schemas in `src/content/config.ts` (Zod)
- [x] **3.2** Create `src/content/skills.yaml` — skill categories (Front End, Back End, DevOps, Design, Process, Procedure) with entries
- [x] **3.3** Create `src/content/experience.yaml` — work history entries (company, role, dates, description)
- [x] **3.4** Create `src/content/education.yaml` — qualifications
- [x] **3.5** Create `src/content/highlights.yaml` — client logos and metadata
- [x] **3.6** Create `src/content/personal.yaml` — name, title, contact info, social links

---

## Phase 4 — Layout & Navigation

- [x] **4.1** Build main page layout (`src/layouts/BaseLayout.astro`) — `<head>` metadata, semantic HTML structure, responsive viewport
- [x] **4.2** Build Nav & Logo section — name, title ("Software Engineer & Solution Architect"), geometric circle navigation
- [x] **4.3** Implement hamburger menu for mobile breakpoint
- [x] **4.4** Implement full navigation for desktop breakpoint
- [x] **4.5** Build footer with social media links

---

## Phase 5 — Page Sections

- [x] **5.1** Build Skills section — skill categories as styled blocks/circles, responsive layout
- [x] **5.2** Build Working History section — vertical timeline with circular nodes
- [x] **5.3** Build Education section
- [x] **5.4** Build Highlights Reel section — client logos grid
- [ ] **5.5** Build Side Hustle section (placeholder / future section)
- [x] **5.6** Build Hero section — floating bubbles, dynamic name/title, CTA button

---

## Phase 6 — Animations

- [x] **6.1** Implement bubble-in-water CSS animations for nav circles — `@keyframes` float, sway, and subtle scale
- [x] **6.2** Add staggered `animation-delay` for organic multi-bubble movement
- [x] **6.3** Implement scroll-triggered entrance animations — `IntersectionObserver` vanilla JS island
- [x] **6.4** Add hover transitions for interactive elements (nav links, logo circles, social links)
- [x] **6.5** Implement responsive layout transitions — smooth circle repositioning across breakpoints

---

## Phase 7 — SEO & Metadata

- [ ] **7.1** Set up Astro `<head>` metadata — `<title>`, `<meta description>`, Open Graph tags
- [ ] **7.2** Implement JSON-LD structured data — `Person` schema generated from `personal.yaml`
- [ ] **7.3** Add semantic HTML landmarks — `<main>`, `<section>`, `<nav>`, `<footer>`, proper heading hierarchy
- [ ] **7.4** Configure Astro sitemap integration
- [ ] **7.5** Add `robots.txt` and `favicon`

---

## Phase 8 — Deployment

- [ ] **8.1** Create GitHub Actions workflow (`.github/workflows/deploy.yml`) using `withastro/action`
- [ ] **8.2** Configure GitHub Pages in repo settings (source: GitHub Actions)
- [ ] **8.3** Test deployment pipeline end-to-end
- [ ] **8.4** (Optional) Set up custom domain with CNAME

---

## Phase 9 — Testing

- [ ] **9.1** Install and configure Playwright + cucumber-js
- [ ] **9.2** Write BDD feature files for key user journeys:
  - [ ] Nav visible on load, sections reachable
  - [ ] Dark/light mode toggle works and persists
  - [ ] All content sections render correctly
  - [ ] Responsive layout at each breakpoint
- [ ] **9.3** Set up Playwright visual regression (screenshot comparison)
- [ ] **9.4** Add test step to GitHub Actions CI pipeline

---

## Phase 10 — Polish & QA

- [ ] **10.1** Cross-browser testing (Chrome, Firefox, Safari)
- [ ] **10.2** Accessibility audit (colour contrast, keyboard nav, screen reader)
- [ ] **10.3** Performance audit (Lighthouse 100/100 target)
- [ ] **10.4** Final content review — all YAML/MD content is accurate
- [ ] **10.5** README.md — project overview, local dev setup, deployment guide, content editing guide

---

## Future (Not in v1)

- [ ] Blog section (new content collection, routing, index page)
- [ ] CI agent suite (changelog, test coverage, VRT, a11y, perf, SEO)
- [ ] Analytics integration
