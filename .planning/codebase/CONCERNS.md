# Codebase Concerns

**Analysis Date:** 2026-03-02

## Security Issues

**DOM Query Injection via URL Hash:**
- Risk: Hash parameter is unsanitized and used in `querySelector()` selector string
- Files: `main.js` (line 86)
- Current code: `const tab = document.querySelector("[data-class=\"" + hash + "\"]")`
- Impact: Malicious URL hashes could break selectors or cause unexpected DOM traversal
- Recommendation: Use `setAttribute` matching or validate hash against known values before selector construction

**Unsafe innerHTML Usage:**
- Risk: `lyricsContainer.innerHTML = ""` clears content, but if data comes from untrusted sources could be injection vector
- Files: `ssb-player/player.js` (line 448)
- Current approach: Currently safe because data is hardcoded, but pattern is fragile if data source changes
- Recommendation: Continue using `textContent` for user-facing content; document that `innerHTML` is only for clearing

## jQuery Dependency & Maintenance Risk

**Outdated jQuery Dependency:**
- Issue: `main.js` uses jQuery for DOM manipulation (`.click()`, `.slideUp()`, `.slideDown()`, `.animate()`)
- Files: `main.js` (lines 3-100)
- Impact: jQuery is not included in repository; dependency on external CDN (no package.json)
- Risk: jQuery will be deprecated in many modern codebases; mixing jQuery and vanilla JS makes code harder to maintain
- Recommendation: Migrate to vanilla JavaScript (`addEventListener`, `Element.animate`, CSS transitions) to eliminate dependency

**Missing AJAX Error Handling:**
- Issue: Line 17 in `main.js`: `$("#PageRefresh").load(" #PageRefresh > *")` has no error handler
- Files: `main.js` (line 17)
- Impact: Silent failures if content loading fails; user gets no feedback
- Recommendation: Add `.done()` and `.fail()` callbacks or migrate to vanilla `fetch()` with proper error handling

## HTML Structural Issues

**Hard-coded CSS Class Selectors:**
- Issue: Class names `section-active`, `active-tab`, `active-modal` are brittle; no single source of truth
- Files: `main.js` (scattered throughout), `index.html`, `ssb-player/index.html`
- Impact: Renaming CSS classes requires changes in multiple files; easy to desync
- Safe modification: Create constant definitions at module top or use data attributes consistently

**Commented-out HTML & Code:**
- Issue: Multiple commented sections in HTML and JavaScript
- Files: `index.html` (lines 33-34, 43-84), `main.js` (line 13)
- Impact: Dead code clutters codebase; unclear if commented-out features are planned or abandoned
- Recommendation: Remove commented code; use git history if recovery needed

## Performance Concerns

**Large HTML Files:**
- Issue: Three embedded visualization/demo files are very large
- Files:
  - `network.html` (5,130 lines, ~unknown KB)
  - `lego_demo.html` (2,884 lines, ~unknown KB)
  - `star_spangler_bannon.html` (2,798 lines, ~unknown KB)
- Impact: Page load time; these files should be lazy-loaded or served separately
- Improvement path:
  1. Move visualizations to separate endpoints
  2. Load on-demand with dynamic script injection
  3. Consider bundling with build tool if complex

**Inline Data in JavaScript:**
- Issue: SSB and BREF song data embedded directly in `player.js`
- Files: `ssb-player/player.js` (lines 10-223, ~850 lines of data)
- Impact: Data bloats JavaScript; difficult to update song data without re-serving JS file
- Improvement path:
  1. Extract data to separate JSON file (e.g., `/ssb-player/data.json`)
  2. Fetch at runtime or during build
  3. Easier to update lyrics/timing without JS changes

**Scroll Animation Inefficiency:**
- Issue: `scrollActiveLineIntoView()` in `ssb-player/player.js` (lines 653-682) recalculates dimensions on every frame during playback
- Files: `ssb-player/player.js` (lines 678-681, uses `lyricsContainer.scrollTo()` with smooth behavior)
- Impact: Smooth scrolling on every frame tick (60fps) may cause jank on mobile devices
- Improvement: Throttle scroll updates or use CSS `scroll-behavior: smooth` with JavaScript only for positioning

## Missing Features & Test Coverage

**No Automated Testing:**
- Files affected: All JavaScript files
- Risk: Refactoring is dangerous; no regression detection
- Priority: Medium (for personal project, but important if shared)
- Recommended approach: Add jest or vitest with basic coverage for:
  - `player.js` timing calculations (`computeTiming`, `buildSsbLines`, `buildBrefLines`)
  - `main.js` tab switching logic
  - Edge cases (duration bounds, empty states)

**No Build/Minification:**
- Issue: JavaScript and CSS served unminified in production
- Files: All `.js` and `.css` files
- Impact: Larger download size; source code visible in browser
- Recommendation: Add build step (esbuild or Vite) to minify and bundle

## Code Quality Issues

**Inconsistent Variable Declaration:**
- Issue: Mix of `var`, `let`, and `const`
- Files: `main.js` (uses `var`), `ssb-player/player.js` (uses `let`/`const`), `main.js` modal code (uses `const`)
- Impact: Older code style; harder to reason about scope
- Recommendation: Standardize on `const` by default, `let` only when reassignment needed

**Magic Numbers Without Comments:**
- Issue: Timing calculations use unexplained multipliers
- Files: `ssb-player/player.js` (line 274-276: `* 10000 / 10000` for rounding)
- Recommendation: Add comment explaining rounding precision (4 decimal places for timing)

**Duplicate Code in Timing Functions:**
- Issue: `buildSsbLines()` and `buildBrefLines()` have similar structure
- Files: `ssb-player/player.js` (lines 259-313)
- Impact: Bug fixes need to be applied twice
- Safe refactor: Extract common line-building logic into shared function with customizable linebreak behavior

**Unused Variables:**
- Issue: `isSeeking` state variable (line 691) tracks seeking but its purpose is subtle
- Files: `ssb-player/player.js` (line 680: only used in scroll behavior check)
- Recommendation: Document why seeking affects scroll behavior (to use `auto` instead of `smooth`)

## Fragile Areas Needing Test Coverage

**Playback State Machine:**
- Files: `ssb-player/player.js` (lines 349-356, 504-590)
- Why fragile: Multiple state variables (`isPlaying`, `pauseOffset`, `startTimestamp`, `currentWordIndex`, `animFrameId`) that must stay in sync
- Risks: Seeking during play, double-clicking play button, rapid pause/play could desynchronize
- Safe modification: Add unit tests for state transitions and edge cases (especially replay button behavior)

**Word Timing Calculations:**
- Files: `ssb-player/player.js` (lines 231-257, 259-313)
- Why fragile: Floating-point arithmetic could accumulate errors; line break word detection is array-based lookup
- Risk: Off-by-one errors if data changes; timing drift if duration calculations change
- Test coverage gap: No tests for time accuracy, cumulative error bounds

**Progress Bar Seeking:**
- Files: `ssb-player/player.js` (lines 693-717)
- Why fragile: Touch and mouse events must stay synchronized; fractional conversion has rounding
- Risk: Seeking bar jumps on rapid clicks; touch events on mobile might miss updates
- Safe modification: Add debounce or throttle if seeking performance is slow

## Known Limitations

**No Responsive Design for SSB Player:**
- Issue: Progress bar and controls may not scale properly on ultra-wide or ultra-narrow screens
- Files: `ssb-player/index.html`, `ssb-player/style.css`
- Workaround: Tested on 600px breakpoint (line 656), but design may break below that
- Recommendation: Test on actual mobile devices, adjust breakpoints

**No Keyboard Accessibility:**
- Issue: Space key only works for play/pause when player active; no arrow keys for seeking
- Files: `ssb-player/player.js` (lines 755-760)
- Impact: Limited keyboard-only navigation
- Recommendation: Add arrow key seeking, enter for play/pause on setup screen

**Baseball Reference Links Brittle:**
- Issue: If Baseball Reference changes URL structure, all links break
- Files: `ssb-player/player.js` (lines 160-223: hardcoded BREF_LINKS array)
- Impact: Dead links; no way to batch-update without code change
- Recommendation: Store as external JSON file that can be updated independently

## Data Validation Issues

**No Input Validation on Duration:**
- Issue: `normalizeDuration()` handles invalid input but doesn't warn user
- Files: `ssb-player/player.js` (lines 399-410)
- Scenario: User types "abc" in duration field; quietly resets to min value
- Recommendation: Add visual feedback (error message or input validation)

**No Bounds Checking on Timing Data:**
- Issue: `buildBrefLines()` assumes `BREF_LINKS` and `BREF_DATA` have matching indices
- Files: `ssb-player/player.js` (line 299: `i < BREF_LINKS.length ? BREF_LINKS[i] : null`)
- Risk: If data is updated incorrectly, links could map to wrong names
- Recommendation: Add assertion that array lengths match during data initialization

## Documentation Gaps

**No README for SSB Player:**
- Files: `/ssb-player/` directory
- Issue: How to generate timing data from CSV/JSON not documented
- Impact: Difficult for collaborators to update song data
- Recommendation: Create `ssb-player/README.md` documenting:
  - How timing data is generated
  - Format of data objects
  - How to add new songs

**Comments in Generated Data Are Misleading:**
- Files: `ssb-player/player.js` (lines 4-8)
- Issue: Says "Auto-generated from JSON data. Do not edit manually" but comments below suggest it's not actually auto-generated
- Recommendation: Clarify build process or remove misleading comment

---

*Concerns audit: 2026-03-02*
