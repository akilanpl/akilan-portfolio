# Akilan P L — Engineering Portfolio

A redesigned version of the existing static portfolio. Charcoal-green surfaces, warm off-white editorial sections, lime interaction accents, self-hosted Space Grotesk / Inter / IBM Plex Mono, and lightweight SVG/CSS motion. No frontend framework migration or runtime dependencies.

## Run locally

From this repository:

```sh
npm run dev
```

Open http://127.0.0.1:4173. Node is optional for serving: the equivalent command is `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`.

## Build and checks

```sh
npm run build
npm run check
npm test
```

Python 3 generates static HTML; Node performs JavaScript syntax checking. No npm install is needed. `dist` is committed and immediately serveable.

## Editing

- `src/projects.json`: structured project content, statuses, stacks, sources, and case-study details.
- `scripts/build.py`: reusable navigation, footer, section, project, and visualization components; home and case-study generation.
- `dist/style.css`: responsive design tokens, layouts, interactions, and reduced-motion support.
- `dist/app.js`: mobile menu, active sections, scroll progress, SVG response, and interactive agent/discipline controls.
- `dist/assets`: self-hosted fonts and licenses, authentic NYRC captures, favicon, and original social artwork. Legacy diagrams and vendored Three.js are retained but no longer loaded.
- `dist/work/{rlb,nyrc,sirl,stocksense}/index.html`: generated case studies. Edit source, then rebuild.
- `dist/AKILAN_P_L.pdf`: original résumé, preserved with a visible outdated-content notice.
- `scripts/check.py`: generated page, link, asset, metadata, anchor, and content integrity checks.

## Implemented sections

Interactive engineering hero; four distinct selected-work showcases in RLB / NYRC / SIRL / StockSense order; Engineering Lab; editorial About; KONE and Perplexity timeline; achievements; engineering capabilities; philosophy; contact and footer. Four static case studies include problems, users, architecture, implementation, challenges, limits, and source links. Legacy `#works`, `#vision`, and `#top` links remain supported.

## Content accuracy

Project descriptions were reviewed against public repository READMEs on 8 October 2026. RLB acceptance limits, NYRC RC/platform/hardware limitations, SIRL demo/security scope, and StockSense deployment uncertainty appear in case studies. SIRL's visual values come from the README's synthetic M033 example, not a benchmark. StockSense is an illustrative data-flow interface; NYRC uses an authentic repository image.

PyTorch PR #172743 is **closed and unmerged**. The redesigned site states this correctly. The original résumé still claims merging and contains unsupported performance figures; its download is visibly labeled accordingly. Experience/awards are supported by the existing résumé and portfolio, not independently verified with employers or award organizers. No live availability, adoption, revenue, or performance metrics are invented.

## Deploy to Vercel

The existing `vercel.json` remains valid: Framework **Other**, Output Directory **dist**, no required build command. The generated output is committed, so deploying the repository works without package installation. If source content is edited, run `npm run build` before committing the generated files. Vercel serves directory-index routes such as `/work/rlb/`; no SPA rewrite is needed. Run checks before deployment.

For CLI deployment after signing in:

```sh
npx vercel deploy --prod
```

This task does not publish the site or push to GitHub. Update the canonical origin in `scripts/build.py` if the production domain changes, then rebuild. The social preview references that production origin and will resolve once deployed.

See `VALIDATION.md` for completed checks and remaining limits.
