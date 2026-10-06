# Akilan P L — Portfolio

A responsive portfolio with a WebGL opening, a scroll-driven project gallery, project details, professional experience, and a downloadable resume.

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

## Edit

- `dist/index.html`: page content and navigation
- `dist/style.css`: layout and responsive styles
- `dist/app.js`: projects, interactions, and the Three.js scene
- `dist/assets/`: project diagrams and vendored Three.js modules
- `dist/AKILAN_P_L.pdf`: downloadable resume

The website uses static assets and can be hosted by any static web server. The `.openai/hosting.json` file records its existing Sites identity.

Three.js is distributed under the MIT license; see `dist/assets/THREE-LICENSE.txt`.
