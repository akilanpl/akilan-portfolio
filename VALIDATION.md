# Validation and handoff — 8 October 2026

## Audit

The repository was cloned from `akilanpl/akilan-portfolio` into this task's outputs directory. Its existing implementation was served and inspected before replacement. All application files and existing assets were inventoried; there were no repository AGENTS.md instructions, framework, router, package scripts, test runner, or dependency installation step. The application was static HTML/CSS/JavaScript with vendored Three.js, an ambient-sound banner, a scroll-driven gallery, an HTML dialog, and a local résumé PDF. Vercel's existing static `dist` output configuration was preserved. Legacy media and Three.js files remain available but are not requested by the redesigned pages.

The redesign uses dependency-free generated static pages with shared Python components and structured JSON content. Python is a development/build tool only; the deployed site requires no server runtime. The public application uses SVG, CSS, and a small vanilla JavaScript file. No npm/runtime dependencies were added.

## Automated checks — passed

- `npm run build`: generated homepage, four static case studies, custom 404, robots.txt, and sitemap.xml.
- `npm run check`: 6 HTML pages and 97 local references validated; JavaScript syntax passed `node --check`.
- `npm test`: page IDs, one H1 per page, metadata, canonical URLs, image alt/dimensions, local assets, anchor targets, project order, original PDF signature, and corrected contribution/resume notices passed.
- `git diff --check`: passed.
- HTTP checks: all four featured GitHub repositories, the Enterprise RAG repository, RLB project site, and NYRC project site returned HTTP 200. This verifies endpoint reachability, not product acceptance or every external route. LinkedIn was not independently tested.

## Browser checks — passed

The application was checked in the Codex browser. The desktop hero, mobile hero, selected work, and case-study opening compositions were visually inspected, with saved screenshots alongside the repository deliverable.

Homepage layout checks after final CSS refinement: **320, 375, 390, 430, 768, 1024, 1440, 1920px**. No horizontal overflow or offscreen headings/interactive controls was found in the inspected layouts. A contact-arrow overflow found during development was fixed.

Case studies: RLB at 320/768/1440px; NYRC, SIRL, StockSense at 320/390/768/1440px. No horizontal overflow was found. These are browser viewport checks, not physical-device testing.

Interactions checked:

- Hero discipline controls update their explanation and pressed state.
- RLB Coder and Tester controls update the illustrated workflow explanation.
- Keyboard Tab navigation works between agent controls.
- Mobile menu opening focuses its first link and locks body scrolling.
- Escape dismisses the menu, unlocks scrolling, and restores focus to the menu button.
- Tab from the final mobile navigation link wraps to Close.
- Selecting About closes the menu and navigates to the correct anchor.
- Home-to-case-study navigation and unique page titles work.
- Runtime browser logs contained no captured errors or warnings during the tested flows.

## Accessibility implementation and limits

Semantic main/nav/section/article/figure/footer structure, ordered headings, skip link, real buttons and links, image alt text, visible focus styles, pressed/expanded states, live explanation regions, inert background during the menu, and keyboard focus containment are implemented. No required information depends on hover. The menu uses Escape dismissal and focus restoration.

Reduced-motion support was reviewed in CSS and JavaScript: initial reveals, pulses, transitions, smooth scrolling, and pointer transforms are suppressed. Reduced-motion emulation and a screen-reader session were **not** run. Safe-area styles are implemented but were not tested on a physical notched device. There is no automated axe or full WCAG audit, and no measured Lighthouse report. Do not interpret these checks as accessibility certification or claim 90+ Lighthouse scores.

## Content and remaining limitations

- Project case studies use repository README content; project suites themselves were not executed.
- SIRL's risk visual uses the documented synthetic M033 example; it is not a real customer dataset or benchmark.
- NYRC captures are authentic repository assets; physical hardware remains planned.
- StockSense visual is an explicitly illustrative operations/data-flow composition, not an application screenshot or live dataset.
- PyTorch PR #172743 was checked through the upstream GitHub record: closed, `merged: false`, `merged_at: null`.
- The original résumé is preserved and marked outdated because of its merged-PR statement and unsupported performance figures. It must be revised before being presented as a current résumé.
- Internship, campus activities, education, and awards are sourced from the existing portfolio/résumé. No employer or organizer confirmation was obtained. Unsupported metrics and publications were omitted.
- Production Vercel deployment, cache behavior, production social-image fetching, and real mobile browsers were not tested. The repository has not been pushed, and the live website has not been changed.

## Local and deployment instructions

Run `npm run dev`, then open http://127.0.0.1:4173. For source-content edits, run `npm run build` and `npm run check`; commit the generated `dist` pages along with source changes.

Use Vercel's existing `dist` output configuration with Framework Other and no required build command. Run `npx vercel deploy --prod` from the repository after authentication when ready to publish. No new environment variables are required. If changing domain, update `ORIGIN` in `scripts/build.py` and rebuild.
