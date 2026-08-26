# Akilan P L — Portfolio

A multi-page personal site built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion. Content-driven: everything specific to you lives in `/content` as JSON (and one MDX blog post), not hardcoded into components.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Deploying on Vercel

1. Push this folder to a GitHub repo.
2. Import it in Vercel — zero config needed, it's a standard Next.js app.
3. Set `SITE_URL` in `src/lib/metadata.ts` to your real domain before deploying (it's currently a placeholder: `https://akilanpl.dev`).

## What's real vs. placeholder

Every fact on this site — the KONE internship, the Perplexity campus ambassador role, the RAG platform, the SIH 2024 finalist result, the PyTorch PR, skills, education, certificates — comes directly from your resume, in `/content/*.json`.

Sections your resume didn't have data for are **clearly marked as placeholders** rather than invented:
- **Gallery, Media, Startup Ideas** — empty "coming soon" states (`src/components/shared/ComingSoon.tsx`)
- **Publications** — your one confirmed paper (Climate Detection Using AI) plus a reserved slot for the second IJITRA co-authored paper, since only the venue was in the resume, not the title/DOI/abstract
- **About → Interests** — reserved, since the resume only lists technical skills, not personal interests
- **Blog** — one sample post in `content/blog/on-prem-rag-lessons.mdx`, marked `draft: true`, written from your actual KONE RAG work as a starting draft for you to edit and publish

To add real content later, edit the relevant JSON file in `/content` — no component code changes needed. To add a new blog post, drop a new `.mdx` file in `content/blog/` and add its metadata to `content/blog.json`.

## Design decisions worth knowing about

- **Fonts:** Geist Sans (display/headlines) + Inter (body) + Geist Mono (labels, tags, metadata — the small-caps mono treatment used throughout is the site's signature detail, echoing an academic paper's header). Geist ships self-hosted via the `geist` package; Inter loads via `next/font/google` and needs network access at build time.
- **Hero background:** a lightweight canvas-based neural-network particle animation (`src/components/home/NeuralBackground.tsx`) instead of Three.js/React Three Fiber. It achieves the same "subtle neural network" effect the brief asked for with far less bundle weight and no WebGL dependency risk — swap in R3F later if you want a heavier 3D treatment.
- **UI primitives:** hand-built `Button`/`Card`/`Badge` components styled in the shadcn/ui spirit (Tailwind + class-variance-authority) rather than pulling in the shadcn CLI scaffold, to keep the dependency footprint minimal.
- **Search:** a ⌘K command palette (`src/components/layout/CommandPalette.tsx`) that filters across all site pages — not a full-text content search engine.

## Contact form

The form in `/contact` currently opens a pre-filled `mailto:` link — it works with zero configuration, but the message is composed client-side, not sent from a server. To wire up real server-side delivery:

1. `npm install resend` (or `@emailjs/browser`)
2. Add an API route at `src/app/api/contact/route.ts` that accepts the form POST and calls Resend's API with your `RESEND_API_KEY`
3. Update `src/components/contact/ContactForm.tsx` to `fetch("/api/contact", ...)` instead of setting `window.location.href`

## Known gaps / next steps

- **Icons & OG image:** `public/og-image.png`, `public/icon-192.png`, `public/icon-512.png`, and `public/favicon.ico` are referenced but not generated — add real image assets before relying on social previews or the PWA manifest.
- **Analytics:** no analytics package is wired in. Add Vercel Analytics (`@vercel/analytics`) or Plausible when ready.
- **GitHub API / Scholar / ORCID integrations:** the Open Source and Research pages have clearly-marked spots designed for these (see the "GitHub activity" card in `/open-source`), but no live API calls are wired up yet — this was intentionally left for you to connect with your own API keys/tokens.
- **Lighthouse/accessibility:** the site follows solid fundamentals (semantic HTML, focus-visible rings, `prefers-reduced-motion` support, alt text on interactive icons, skip-to-content link), but hasn't been run through an actual Lighthouse audit — do that once deployed and tune from there.

## Project structure

```
content/            All personal data — JSON + one MDX blog post. Edit here, not in components.
src/app/            Next.js App Router pages — one folder per route.
src/components/     UI primitives, layout (nav/footer), and page-specific components.
src/lib/            Content loaders, nav config, metadata builder, utils.
public/resume/      Your resume PDF (served for the download button).
```
