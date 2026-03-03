---
title: "Codebase Structure"
version: "1.0.0"
dependencies: []
last_updated: "2026-03-02"
summary: "Static GitHub Pages portfolio with modular project directories and centralized asset management."
---

# Codebase Structure

**Analysis Date:** 2026-03-02

## Directory Layout

```
website/ (root)
├── .git/                          # Git version control
├── .planning/
│   └── codebase/                  # GSD documentation
├── index.html                     # Main portfolio page
├── main.js                        # Global JavaScript for portfolio
├── style.css                      # Global portfolio styles
├── CNAME                          # Custom domain configuration
├── README.md                      # Project metadata
├── assets/                        # All static assets
│   ├── bubble_map/                # Course network visualization assets
│   │   └── horz/
│   │       └── map_classes.pdf
│   ├── img/                       # Images
│   │   ├── background/            # Hero section backgrounds
│   │   ├── bean/                  # Personal photos
│   │   ├── companies/             # Company logos
│   │   ├── projects/              # Project cover images
│   │   ├── Resume_Ben_Borovinsky.png
│   │   ├── bb_icon.png
│   │   ├── vector_faceless.png
│   │   └── map_classes*.png       # Course relationship visualizations
│   ├── pdf/                       # Downloadable documents
│   │   ├── MLB_Player_Value.pdf
│   │   └── Resume_Ben_Borovinsky.pdf
│   ├── styles/                    # Custom fonts (@font-face)
│   │   ├── AtlasGrotesk-Light.otf
│   │   ├── DecimaMonoBen.otf
│   │   ├── lmroman12-italic.otf
│   │   └── lmroman12-regular.otf
│   └── svg/                       # SVG icons and graphics
│       ├── glyphs/                # Small icon glyphs
│       ├── ann.svgz
│       ├── arrow.svg
│       ├── bb_icon.svg
│       ├── bb_rule.svg
│       ├── *_def.svg              # Social icons (default state)
│       ├── *_enabled.svg          # Social icons (hover state)
│       ├── map_classes_svg.svg
│       └── portrait_faceless.svg
├── network.html                   # Course network visualization (embedded in iframe)
├── lego_demo.html                 # LEGO inventory project (pandoc HTML)
├── star_spangler_bannon.html      # National Anthem analysis page
└── ssb-player/                    # Karaoke-style tracker for national anthem
    ├── index.html                 # Player UI
    ├── player.js                  # Player logic and embedded data
    └── style.css                  # Player-specific styles
```

## Directory Purposes

**Root Directory:**
- Purpose: Serve primary portfolio page and host project pages
- Contains: Main HTML entry point, global JavaScript/CSS, configuration files
- Key files: `index.html` (main), `main.js` (interactivity), `style.css` (styling)

**assets/:**
- Purpose: Centralized location for all static resources (images, fonts, PDFs, SVGs)
- Contains: Media files organized by type and content
- Key files: `assets/img/background/sloan_edit.jpg` (hero background)

**assets/svg/:**
- Purpose: Store SVG graphics including social media icons with dual states
- Contains: Icon glyphs, rule elements, portrait SVG, social link icons
- Key files: SVGs organized by state (default `_def.svg`, hover `_enabled.svg`)

**assets/img/companies/:**
- Purpose: Store company logos for work experience section
- Contains: Logo images for 9 companies/organizations
- Pattern: Mix of PNG, SVG formats depending on source

**assets/img/projects/:**
- Purpose: Store cover images for portfolio projects
- Contains: Thumbnail images for MLB, Star Wars/Spotify, LEGO, Star Spangled Banner projects
- Pattern: Responsive sizes (e.g., `ssb_taylor_cover_600.jpg`, `ssb_taylor_cover_1300.jpg`)

**assets/styles/:**
- Purpose: Store custom font files for @font-face definitions
- Contains: OpenType and TTF font files
- Pattern: Fonts referenced in `style.css` via `@font-face` declarations

**ssb-player/:**
- Purpose: Self-contained karaoke-style tracker application
- Contains: Standalone HTML, JavaScript, and CSS for national anthem tracker
- Key files: `player.js` contains embedded SSB_DATA and BREF_DATA arrays (lyric timing)
- Isolation: Can be deployed independently or embedded in parent site

## Key File Locations

**Entry Points:**
- `/index.html`: Main portfolio landing page - renders sections (personal, education, work, projects), initializes navigation
- `/ssb-player/index.html`: National Anthem karaoke tracker - independent application
- `/lego_demo.html`: LEGO inventory analysis - pandoc-generated HTML document
- `/star_spangler_bannon.html`: National Anthem performance analysis - large HTML file with embedded styling

**Configuration:**
- `/CNAME`: GitHub Pages custom domain configuration (borovinsky.com)
- `.gitignore`: Git ignore patterns
- `.planning/codebase/`: GSD documentation (ARCHITECTURE.md, STRUCTURE.md, etc.)

**Core Logic:**
- `/main.js`: Global JavaScript for portfolio - handles tab navigation, modals, read-more toggle, scroll animations
- `/ssb-player/player.js`: Karaoke player logic - manages playback, synchronization, data arrays
- `/style.css`: Global portfolio styles - fonts, layout, animations, responsive design
- `/ssb-player/style.css`: Player-specific styles - controls, player UI, responsive layout

**Testing:**
- Not present - no test files or test directories

**Assets:**
- `/assets/img/background/sloan_edit.jpg`: Hero section background image
- `/assets/pdf/Resume_Ben_Borovinsky.pdf`: Downloadable resume
- `/assets/svg/arrow.svg`: Scroll indicator icon

## Naming Conventions

**Files:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| kebab-case.html | `index.html`, `network.html`, `lego_demo.html` | HTML pages |
| camelCase.js | `main.js`, `player.js` | JavaScript files |
| camelCase.css | `style.css` | CSS stylesheets |
| UPPERCASE | `CNAME`, `README.md` | Configuration/metadata files |
| snake_case | `sloan_edit.jpg`, `lmroman12-italic.otf` | Asset files (mixed conventions from sources) |

**Directories:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| lowercase/ | `assets/`, `ssb-player/` | Directory grouping |
| descriptive lowercase | `bubble_map/`, `companies/`, `projects/` | Content categorization |

**CSS Classes:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| kebab-case | `.section-tab`, `.grid-box`, `.modal-header` | UI components |
| descriptive suffixes | `.section-active`, `.active-tab`, `.active-modal` | State indicators |
| component-child | `.header`, `.container`, `.content` | Structural hierarchy |

**JavaScript Variables:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| camelCase | `classToShow`, `SSB_DATA`, `BREF_DATA` | Variable names |
| UPPER_SNAKE_CASE | `SSB_DATA`, `BREF_DATA` | Constants (data arrays) |

## Where to Add New Code

**New Feature (Enhancement to Portfolio):**
- Primary code: `/main.js`
- Styles: `/style.css`
- HTML structure: Extend section divs in `/index.html`
- Assets: Place in `/assets/` subdirectory matching type (img/, svg/, pdf/)

**New Project Page:**
- Implementation: Create new `.html` file in root (e.g., `new_project.html`)
- Styles: Either embed in `<style>` tag or reference external `.css`
- Scripts: Either embed in `<script>` tag or reference external `.js`
- Link from portfolio: Add project entry in `/index.html` projects section

**New Karaoke/Player Project:**
- Implementation: Create subdirectory like `/ssb-player/` with `index.html`, `player.js`, `style.css`
- Data arrays: Embed in JavaScript file as constants
- Assets: Reference from parent `/assets/` or create subdirectory for project-specific assets

**Utilities/Shared Code:**
- Global utilities: Add to `/main.js` (no separate utility files present)
- Reusable functions: Extract to top of script before usage
- No module system used - all code at global scope or within IIFE closures

## Special Directories

**assets/bubble_map/horz/:**
- Purpose: Contains PDF for course network visualization (D3.js network diagram)
- Generated: No (manually created)
- Committed: Yes

**.planning/codebase/:**
- Purpose: Stores GSD (Get Stuff Done) architecture and quality documentation
- Generated: Yes (by GSD agents)
- Committed: Yes

**.git/:**
- Purpose: Git version control metadata
- Generated: Yes (git init)
- Committed: Not applicable (internal git storage)

## File Size Characteristics

| File | Size | Notes |
|------|------|-------|
| `star_spangler_bannon.html` | ~830 KB | Large HTML file with embedded analysis |
| `lego_demo.html` | ~2.1 MB | Pandoc-generated HTML (R markdown output) |
| `network.html` | ~1.1 MB | D3.js network visualization |
| `index.html` | ~45 KB | Main portfolio page |
| `main.js` | ~3.6 KB | Global JavaScript |
| `style.css` | ~19 KB | Global styles |
| `ssb-player/player.js` | Moderate | Embedded data arrays (SSB_DATA, BREF_DATA) |

## Asset Organization Strategy

**Images:**
- Background images stored in `/assets/img/background/`
- Company logos in `/assets/img/companies/` (mix of PNG/SVG)
- Personal photos in `/assets/img/bean/`
- Project covers in `/assets/img/projects/` (responsive sizes)
- Visualization outputs in `/assets/img/` root

**SVG Icons:**
- Social icons follow state pattern: `{platform}_def.svg` (default), `{platform}_enabled.svg` (hover)
- Glyphs stored in `/assets/svg/glyphs/`

**Fonts:**
- All custom fonts in `/assets/styles/` (@font-face definitions in `style.css`)

---

*Structure analysis: 2026-03-02*
