# Akilan P L — Portfolio

A responsive portfolio with a WebGL opening, a scroll-driven project gallery, project details, professional experience, and a downloadable resume.

## How the site works

The page combines a fixed Three.js WebGL scene with ordinary HTML sections. Scroll position drives the opening scene and project gallery; project controls and detail dialogs expose the same project records. Experience, contact links and the resume remain in the document layer. A WebGL fallback supplies a static background, and reduced-motion preferences adjust motion behavior.

Three.js and its environment helper are vendored under `dist/assets/`; there is no application backend or database. Serving over HTTP allows the browser's JavaScript modules and assets to resolve correctly. The project summaries link to their engineering repositories, where current implementation and verification evidence can be inspected.

## Featured projects

- Enterprise RAG Platform
- RLB — Relax Lemme Build
- Intelligent Survey Quality
- NYRC — Not Your Regular Companion

## Run locally

No build step or package installation is required. Serve the static files with Python:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173 in your browser.

## Check changes

```sh
node --check dist/app.js
git diff --check
```

Use the local preview to check the opening with WebGL available and unavailable, reduced-motion behavior, project navigation and detail-dialog keyboard controls. Inspect narrow layouts, contact links and the PDF download. Syntax checks do not establish visual or accessibility acceptance; there is no automated browser suite in this repository.

## Edit

- `dist/index.html`: page content and navigation
- `dist/style.css`: layout and responsive styles
- `dist/app.js`: projects, interactions, and the Three.js scene
- `dist/assets/`: project diagrams and vendored Three.js modules
- `dist/AKILAN_P_L.pdf`: downloadable resume

The website uses static assets and can be hosted by any static web server. The `.openai/hosting.json` file records its existing Sites identity.

Three.js is distributed under the MIT license; see `dist/assets/THREE-LICENSE.txt`.

## Deploy to Vercel

The root `vercel.json` configures a static deployment of `dist` with no framework or build command. From this repository, sign in to Vercel and deploy:

```sh
npx vercel login
npx vercel deploy --prod
```

Documentation basis: [`8241848`](https://github.com/akilanpl/akilan-portfolio/tree/82418485b81dea816cdb4997c8c649db92bad6a6). This README documents the static site's implementation; it does not independently validate the impact metrics in the website's project copy.
