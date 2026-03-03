# Technology Stack

**Analysis Date:** 2026-03-02

## Languages

**Primary:**
- HTML5 - Used for all page markup and structure
- CSS3 - Styling for layouts, animations, and responsive design
- JavaScript (vanilla) - Core application logic and interactivity

**Secondary:**
- None detected

## Runtime

**Environment:**
- Browser (client-side only, no backend server)
- Supported browsers: Modern browsers with HTML5, CSS3, and ES6+ support

**Deployment:**
- GitHub Pages (static hosting via `benboro.github.io`)

## Package Manager

**Not detected** - This is a static website without a build system or package manager. No `package.json`, `npm`, yarn, or other dependency managers are present.

## Frameworks

**Core:**
- None - Vanilla JavaScript implementation

**Libraries:**
- jQuery 3.3.1 (via CDN) - DOM manipulation and utilities in `index.html`
  - Source: `https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js`
  - Used in: `/index.html`
- jQuery 1.11.3 (embedded in `lego_demo.html`)
  - Bundled directly in file source code
  - Used in: `/lego_demo.html`
- jQuery 3.6.0 (embedded in `star_spangler_bannon.html`)
  - Bundled directly in file source code
  - Used in: `/star_spangler_bannon.html`
- Vis.js (embedded in `network.html`)
  - Graph visualization library
  - Bundled directly in file source code
  - Used in: `/network.html`

**Custom Code:**
- `/main.js` - Tab navigation, modal handling, tab-based section switching
- `/ssb-player/player.js` - Star Spangled Banner karaoke/tracker player

## External Fonts

**Google Fonts:**
- Roboto (weights: 100, 300, 400, 500)
  - Source: `https://fonts.googleapis.com/css?family=Roboto:400,300,500,100`
  - Used in: Main website (`index.html`)

**Custom Font Files:**
- Atlas Grotesk Light - `assets/styles/AtlasGrotesk-Light.otf`
- LM Roman Regular - `assets/styles/lmroman12-regular.otf`
- LM Roman Italic - `assets/styles/lmroman12-italic.otf`
- Decima Mono - `assets/styles/DecimaMonoBen.otf`

## Build & Development

**Build System:** None - Static files served directly

**Development Tools:** None detected in repository

**Minification:** Inline JavaScript and CSS bundling in some pages

## Configuration

**Environment:**
- Static site - No configuration files or environment variables detected
- CNAME file: `CNAME` - Points to custom domain `borovinsky.com`

**Hosting Configuration:**
- GitHub Pages enabled (detected via git repository structure)
- Custom domain: `borovinsky.com`

## Asset Organization

**Media Files:**
- Images: `assets/img/` (JPG, PNG, SVG formats)
- Fonts: `assets/styles/` (OTF font files)
- SVG Graphics: `assets/svg/` (Icon and decoration SVGs)
- PDF Documents: `assets/pdf/` (Resume and other documents)
- Specialized: `assets/bubble_map/` (Network visualization data)

## Platform Requirements

**Development:**
- No build step required
- Any text editor and git for editing
- Local web server optional for testing (to avoid CORS on file:// protocol)

**Production:**
- GitHub Pages hosting (included with repository)
- Custom domain DNS configuration (borovinsky.com)
- HTTPS provided automatically by GitHub Pages

## Key Performance Characteristics

**Optimization:**
- Static assets - No server-side processing
- Single-page application architecture with jQuery/vanilla JS for tab switching
- Inline bundling of libraries in some pages to reduce HTTP requests
- Local font files for custom typography

**File Sizes:**
- `star_spangler_bannon.html` - ~829 KB (jQuery 3.6.0 embedded)
- `lego_demo.html` - ~2.1 MB (jQuery 1.11.3 embedded, large inline content)
- `network.html` - ~1.1 MB (Vis.js library embedded)
- `index.html` - ~45 KB (main portfolio page)
- `main.js` - ~3.6 KB (JavaScript logic)
- `style.css` - ~19 KB (main stylesheet)
- `ssb-player/player.js` - ~28 KB (player logic)

---

*Stack analysis: 2026-03-02*
