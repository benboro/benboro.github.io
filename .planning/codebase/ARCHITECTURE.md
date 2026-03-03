---
title: "Architecture"
version: "1.0.0"
dependencies: []
last_updated: "2026-03-02"
summary: "Single-page application with vanilla JavaScript, CSS, and static HTML serving a personal portfolio website."
---

# Architecture

**Analysis Date:** 2026-03-02

## Pattern Overview

**Overall:** Single-Page Application (SPA) with server-side rendering and client-side interactivity

**Key Characteristics:**
- Static HTML base with vanilla JavaScript enhancement
- Tab-based section navigation using hash routing
- Modal dialogs for work experience details
- Multiple independent projects embedded as separate HTML documents
- GitHub Pages deployment (static hosting)

## Layers

**Presentation Layer:**
- Purpose: Render UI components and handle visual state
- Location: `index.html`, `style.css`, `ssb-player/index.html`, `ssb-player/style.css`
- Contains: HTML markup, CSS styling, layout structures
- Depends on: Main.js for interactivity
- Used by: Browser DOM rendering

**Interaction Layer:**
- Purpose: Handle user events and DOM manipulation
- Location: `main.js`, `ssb-player/player.js`
- Contains: Event listeners, state transitions, animations
- Depends on: jQuery library (via CDN), vanilla JavaScript APIs
- Used by: User interactions (clicks, form inputs, scrolling)

**Data Layer:**
- Purpose: Store and serve application data
- Location: Embedded in JavaScript files (`ssb-player/player.js` contains SSB_DATA and BREF_DATA arrays)
- Contains: Static JSON-like arrays for lyric timing, sports reference names
- Depends on: None
- Used by: Player logic for karaoke synchronization

**Content Layer:**
- Purpose: House standalone projects and demonstrations
- Location: `lego_demo.html`, `network.html`, `star_spangler_bannon.html`
- Contains: Self-contained project pages with embedded styles and scripts
- Depends on: jQuery, pandoc-generated HTML (for lego_demo.html)
- Used by: Iframe embedding in index.html (network.html) or direct navigation

## Data Flow

**Section Navigation (Tab-based):**

1. User clicks navigation tab (e.g., "Personal", "Education", "Work Experience", "Projects")
2. Event listener in `main.js` captures click on `.section-tab`
3. Hash is set via `window.location.hash`
4. Active tab styling is toggled (active-tab class)
5. Target section slides in with jQuery `.slideDown()`
6. Previous section slides out with jQuery `.slideUp()`
7. Target section receives `section-active` class

**Modal Display (Work Experience Detail):**

1. User clicks grid box with `data-modal-target` attribute
2. `openModal()` function retrieves modal element by CSS selector
3. Modal and overlay receive `active-modal` class
4. CSS opacity/z-index changes make modal visible
5. User can close via close button, overlay click, or back button
6. `closeModal()` removes `active-modal` class

**Karaoke Playback (SSB Player):**

1. User enters duration and toggles optional mode on setup screen
2. Click "Prepare Track" transitions to player screen
3. Player initializes with SSB_DATA or BREF_DATA array
4. Word elements are rendered with timing metadata
5. Play button triggers HTML5 audio playback (external audio file)
6. Progress bar and elapsed time sync with audio
7. Current word is highlighted based on noteLength timing

**State Management:**
- Hash-based routing stores current section in URL (e.g., `#personal`, `#education`)
- DOM classes manage UI state (`.active-tab`, `.section-active`, `.active-modal`)
- JavaScript variables track playback state in SSB player (currentTime, isPlaying)
- No centralized state management (no Redux, Vuex, etc.)

## Key Abstractions

**Section Module:**
- Purpose: Represents a content section (Personal, Education, Work Experience, Projects)
- Examples: `.personal.section`, `.education.section`, `.work-experience.section`, `.projects.section`
- Pattern: CSS classes combined with jQuery selectors for toggling visibility

**Modal Module:**
- Purpose: Displays work experience details in overlay dialog
- Examples: `#modal-sgcp`, `#modal-impac`, `#modal-football`, `#modal-sportsinfo`, `#modal-ss`, `#modal-lenderlive`, `#modal-ow`, `#modal-dt`, `#modal-monster`
- Pattern: HTML structure with data attributes, CSS overlay, JavaScript event handlers

**Lyric Synchronization:**
- Purpose: Maps words to note durations for karaoke-style display
- Examples: `SSB_DATA`, `BREF_DATA` in `ssb-player/player.js`
- Pattern: Array of objects with word text and noteLength in fractional seconds

## Entry Points

**Main Portfolio:**
- Location: `/index.html`
- Triggers: Browser navigation to `borovinsky.com` or GitHub Pages root
- Responsibilities: Load main portfolio content, initialize jQuery, set up navigation tabs, initialize modal system, load external iframe for course network visualization

**SSB Player:**
- Location: `/ssb-player/index.html`
- Triggers: Direct navigation or linked from main site
- Responsibilities: Provide karaoke-style tracker UI for National Anthem performances with synchronized playback

**Standalone Projects:**
- Location: `/lego_demo.html`, `/network.html`, `/star_spangler_bannon.html`
- Triggers: Navigation links from main portfolio or direct URLs
- Responsibilities: Display self-contained analysis/visualization with full styling and interactivity

## Error Handling

**Strategy:** Minimal error handling (typical of static portfolio sites)

**Patterns:**
- jQuery `.load()` uses no error callback (potential silent failures)
- Modal functions check `if (modal == null) return` before DOM manipulation
- No try-catch blocks in production code
- Graceful degradation if jQuery loads late (click handlers may not attach)

## Cross-Cutting Concerns

**Logging:** None - no console logging or observability

**Validation:**
- SSB Player validates input range (duration 30-200 seconds with 0.5 increment)
- No form validation on portfolio sections

**Authentication:** Not applicable - static public website

**Styling:**
- Global font stack: `'Atlas Grotesk Light'`, Arial, Roboto, sans-serif
- Color scheme managed via inline RGB/hex values
- Responsive design via media queries (container margins, header height adjustments)
- Animations: bounce keyframe for scroll indicator, slide transitions via jQuery

---

*Architecture analysis: 2026-03-02*
