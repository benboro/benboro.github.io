# Architecture

## Project Overview

Personal website for Ben Borovinsky — a static, single-page portfolio served from GitHub Pages at `borovinsky.com` (CNAME). Showcases bio, education, work history, and a handful of self-contained data/analytics projects (PDF, R-rendered HTML widgets, and one JS mini-app).

## Tech Stack

- **HTML/CSS/JS** — hand-written, no build step.
- **jQuery 3.3.1** (CDN) — DOM/animation helpers used by `main.js`.
- **GitHub Pages** — static hosting; `CNAME` points `borovinsky.com` and `www.borovinsky.com` at the repo.
- **R / `visNetwork` / HTMLWidgets** — `network.html`, `lego_demo.html`, and `star_spangler_bannon.html` are R-generated standalone widget pages embedded as `<iframe>`s. The R source that produced them is not in this repo; the rendered HTML is committed directly.
- **Custom fonts** under `assets/styles/` (Atlas Grotesk, LM Roman, DecimaMono).

## Directory Map

```
index.html                  -- main single-page site (header, nav, sections, modals)
main.js                     -- tab switching, smooth scroll, modal open/close, "Read More"
style.css                   -- all site styling, @font-face declarations
network.html                -- R/visNetwork course graph; iframed by Education section
CNAME                       -- GitHub Pages custom domain
README.md                   -- one-line pointer to borovinsky.com

projects/                   -- project deliverables linked from the Projects section
  lego_demo.html              R-rendered widget for the "LEGO Store Inventory" project
  star_spangler_bannon.html   R-rendered widget for the SSB analysis project
  MLB_Player_Value.pdf        MLB player value paper
  ssb-player/                 self-contained "Star Spangled Banner Tracker" mini-app
    index.html                  setup + player screens
    player.js                   timing/playback logic
    style.css                   scoped styling

resume/                     -- resume PDFs linked from the Personal section
  resume_ats.pdf
  resume_visual.pdf

assets/                     -- site chrome only (no content deliverables)
  img/                      -- bio photos, company logos, project covers, backgrounds
  svg/                      -- icons (social, glyphs, arrows, portrait)
  styles/                   -- .otf font files referenced by style.css @font-face
  bubble_map/horz/          -- additional asset bundle (bubble map visuals)
```

## Key Abstractions & Data Flow

The site is a single document with content split into sections and toggled in-place:

1. `index.html` defines a fixed nav (`.section-tab`s) and parallel content `<div class="<name> section">` blocks (Personal, Education, Work Experience, Projects). Only one section carries `.section-active` at a time.
2. `main.js` listens for nav clicks, slides the active section out, swaps `section-active`, and slides the new one in. It also reads `window.location.hash` on load so deep links like `#projects` open directly.
3. Work Experience uses a grid of `.grid-box` tiles with `data-modal-target="#modal-…"`; `main.js` toggles `.active-modal` on the matching `<div class="modal">` and a shared `#overlay`.
4. The Education section iframes `network.html` (course graph). The Projects section links to PDFs and to the R-rendered HTML widgets (`lego_demo.html`, `star_spangler_bannon.html`) as standalone pages.
5. `projects/ssb-player/` is independent: its own HTML/JS/CSS, linked to from the main site but with no shared code.

## Entry Points

- **Local preview:** open `index.html` directly in a browser, or serve the repo root with any static server (e.g., `python -m http.server 8000`).
- **Build:** none — files are served as-is.
- **Deploy:** push to `master`. GitHub Pages serves the repo; `CNAME` controls the custom domain.
- **Resumes:** `resume/resume_ats.pdf` and `resume/resume_visual.pdf` are updated periodically (see recent commits) and linked from the Personal section.
- **Project artifacts:** project HTML pages and PDFs live in `projects/` (e.g., `projects/MLB_Player_Value.pdf`, `projects/star_spangler_bannon.html`) and are linked from the Projects section.

## Design Philosophy & Tradeoffs

- **No build, no framework.** Plain static files keep deploys trivial (push to master) at the cost of some duplication in `index.html` (e.g., per-job modal markup).
- **Sections-as-tabs in one document** rather than separate pages, so navigation is instant and the URL hash drives state.
- **R-rendered widgets are committed as HTML**, not regenerated at build time. Treat `network.html`, `lego_demo.html`, and `star_spangler_bannon.html` as opaque artifacts — edit the upstream R source (not in this repo) and replace the file rather than hand-editing.
- **jQuery is intentional** for the small interactions in `main.js`; rewriting in vanilla JS would be possible but isn't a goal.
- `.gitignore` excludes design source files (`*.ai`, `*.psd`, `*.ico`, `*.docx`) and `.vscode/`.
