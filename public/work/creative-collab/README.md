# Handoff: Creative Collab Case Study

## Overview
A case-study page for the "Creative Collab" product (a collaboration-starting platform for independent creatives). It includes a live, fully interactive mobile prototype embedded via `<iframe>`, plus a design system reference and an iteration log, all cross-linked.

## About the design files — READ THIS FIRST
These `.dc.html` files are **not plain static HTML**. They are "Design Component" files from an internal design tool. Each one:
- Wraps its markup in a custom `<x-dc>` tag with `{{ templateHole }}` bindings (not real HTML/JS — a small template DSL)
- Depends on a runtime script, `support.js` (included in this folder), which parses that template and renders it with React
- Loads React/ReactDOM from a CDN inside the file's own `<head>`

**These files DO work standalone** if opened directly in a browser (double-click / any static file server) — `support.js` has no server dependency, it only needs `window.React`/`window.ReactDOM`, which the files load themselves. So the fastest path to "make it work on my site" is to serve these 4 files + `support.js` + `assets/` as static files, e.g. under `/work/creative-collab/`, and link/iframe them as-is.

**If instead you want this rebuilt as real Next.js/React components** (recommended for long-term maintenance, matching your site's existing design system): treat these files as **visual + behavioral reference only**. Recreate the layout, copy, colors, and interactions in your own components — do not try to reuse the `<x-dc>`/`{{ }}` template syntax or `support.js` in your codebase.

## Fidelity
High-fidelity. Colors, type, spacing, and copy in these files are final — recreate pixel-for-pixel if rebuilding as native components.

## Files in this bundle
- `Creative Collab Case Study.dc.html` — the main case-study page. This is what should render at `/work/creative-collab`. It embeds the prototype via `<iframe src="creative%20collabPrototype%20newest.dc.html">` (twice) and links out to `Design System v2.dc.html` and `Iteration Log.dc.html` via `<a href>`.
- `creative collabPrototype newest.dc.html` — the standalone interactive prototype (mobile screens: Home, Project Detail, Onboarding, Express Interest, Chat, etc.). Must ship alongside the case study at the exact same relative filename/path, since the case study's iframes and the on-page navigation both reference it by that literal filename (spaces included, URL-encoded as `%20` in the src attribute).
- `Design System v2.dc.html` — component/token reference, linked from the case study.
- `Iteration Log.dc.html` — process/changelog document, linked from the case study.
- `support.js` — the runtime all four `.dc.html` files depend on. Must sit next to them (`./support.js`).
- `assets/` — every image referenced by the four files above (avatars, cover photos, moodboards, work samples, before/after screenshots, illustrations). Must sit next to the HTML files as `./assets/...`.

## Keeping links and the prototype "working" on your site
1. **Preserve exact filenames and relative paths.** All four `.dc.html` files, `support.js`, and `assets/` must be deployed together, in the same folder, with unchanged names (including the space in `creative collabPrototype newest.dc.html` — the case study's `<iframe>`/`<a>` tags reference it with `%20` URL-encoding).
2. **Serve them as static files** — e.g. in a Next.js app, put this whole folder under `public/work/creative-collab/` and either:
   - point a route at `Creative Collab Case Study.dc.html` directly (simplest — this file already contains everything needed to render itself), or
   - iframe it from a `/work/creative-collab` page if you want your site's own nav/chrome around it.
3. **Do not rename, minify, or "clean up" the internal file references** — the `<iframe src>` and `<a href>` values in `Creative Collab Case Study.dc.html` must keep matching the actual filenames on disk exactly.
4. Test after deploying: open the case study, confirm both embedded prototype phones load and are clickable, and confirm the "View the full system" / "Iteration Log" links open their target pages correctly.

## Design tokens (for a native rebuild)
- Background (cream): `#f5ede0`; card surfaces: `#fbf6ec` (light) / `#241c15` (dark, inside the prototype)
- Ink/text: `#1c1610`; secondary text: `#5a4f41` / `#7d7263`
- Accent (coral): `#e2683f`; secondary (yellow): `#eab54a`; success (green): `#5bbf88`; destructive (red): `#d64f4f`
- Fonts: Bricolage Grotesque (display/headings), Space Grotesk (body, case study), Instrument Sans (body, prototype/log), IBM Plex Mono / JetBrains Mono (labels, mono accents) — all loaded via Google Fonts `<link>` in each file's own `<head>`
- Radius scale: chips 10px, inputs 16px, cards 24px, sheets 26px, buttons/pills 100px
- Motion: cards never transform on hover (shadow/border only); pressed state scales to 0.985; no bounce/overshoot

## Assets
All in `assets/`. Includes: person avatars (maya, theo, priya, leo, rui, ana, jules, sam, taylor), project cover photos (dance-hero, dinner-hero, moodboard), work-sample images (work-*.png), before/after comparison screenshots used in the Iteration Log section (card-badge-*, iter-*-brand/-card), and two hand-drawn illustrations (filmmaker-girl, filmmaker-crew) used in the case study's "Imagine This" section.
