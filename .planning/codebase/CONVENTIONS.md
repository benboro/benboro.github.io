# Coding Conventions

**Analysis Date:** 2026-03-02

## Naming Patterns

**Files:**
- JavaScript: `lowercase_with_underscores` or `camelCase` (e.g., `player.js`, `main.js`)
- CSS: `lowercase_with_underscores` (e.g., `style.css`)
- HTML: `lowercase_with_hyphens` (e.g., `index.html`, `ssb-player/index.html`)

**Functions:**
- Use `camelCase` for function names (e.g., `computeTiming()`, `buildLyrics()`, `updateTrackerTitle()`, `formatTime()`)
- Descriptive, action-oriented names that indicate purpose
- Private/internal functions use same convention, no underscore prefix
- Example pattern from `/c/Projects/website/ssb-player/player.js`:
  - `computeTiming(data, duration)`
  - `buildSsbLines(timedData)`
  - `formatTime(totalSeconds)`
  - `togglePlayPause()`

**Variables:**
- `const` for immutable references
- `let` for block-scoped variables
- `var` for older code (seen in `/c/Projects/website/main.js` jQuery-based sections, but deprecated in favor of `const`/`let`)
- Use `camelCase` for all variables (e.g., `timingData`, `flatWords`, `isPlaying`, `startTimestamp`)
- Descriptive names indicating data type/purpose (e.g., `pauseOffset`, `durationMin`, `currentWordIndex`)

**Types/Objects:**
- Object properties use `camelCase` (e.g., `{word: "...", noteLength: 0.25, wordTime: 0.5}`)
- Constants use `UPPER_SNAKE_CASE` for static data (e.g., `SSB_DATA`, `BREF_DATA`, `LINE_WORD_COUNTS`, `BREF_LINKS`, `BREF_LINE_BREAK_WORDS`)
- Element IDs use kebab-case (e.g., `setup-screen`, `duration-slider`, `play-pause-btn`, `progress-bar-container`)
- CSS classes use kebab-case or underscores (e.g., `.screen`, `.active`, `.btn-primary`, `.lyric-line`, `.word-link`)

**DOM Elements:**
- Store DOM references with descriptive names: `const setupScreen = document.getElementById("setup-screen")`
- Reference variables end with descriptive purpose (e.g., `playPauseBtn`, `lyricsContainer`, `progressBarFill`, `timeElapsed`)

## Code Style

**Formatting:**
- No formatting tool configured (no `.prettierrc`, `biome.json`, or similar found)
- Indentation: 4 spaces in JavaScript files
- Line length: No strict limit observed, but code generally keeps lines readable
- Semicolons: Required at end of statements (vanilla JavaScript, not TypeScript)
- Quotes: Double quotes preferred in JavaScript strings (e.g., `"use strict"`)

**Linting:**
- No linter configuration found (no `.eslintrc`, `eslint.config.js`)
- Code follows basic JavaScript best practices by convention

## Import Organization

**Script Loading:**
- HTML uses `<script src="player.js"></script>` at end of document body (see `/c/Projects/website/ssb-player/index.html:59`)
- No module system (no ES6 imports/exports detected)
- IIFE pattern used in `/c/Projects/website/ssb-player/player.js:1` to create module scope: `(function () { ... })()`
- jQuery loaded via CDN in `/c/Projects/website/index.html` (manifest not shown but used in `main.js`)

**No Path Aliases Detected**

## Error Handling

**Pattern: Null Checks**
- Use explicit `== null` or `!= null` comparisons before accessing properties
- Example from `/c/Projects/website/ssb-player/player.js:69-70`:
  ```javascript
  function openModal(modal) {
      if (modal == null) return
      modal.classList.add('active-modal')
  }
  ```
- Used for DOM elements that may not exist: `if (!playerHint) return;` (line 381)

**Pattern: Ternary for Conditional Assignment**
- Use ternary operator for inline conditional values
- Example from `/c/Projects/website/ssb-player/player.js:299`:
  ```javascript
  link: i < BREF_LINKS.length ? BREF_LINKS[i] : null
  ```

**Pattern: No Try-Catch Blocks**
- No exception handling detected in codebase
- Assumes DOM elements are present (fails silently if missing)

**Pattern: Guard Clauses**
- Return early from functions when conditions aren't met
- Example from `/c/Projects/website/ssb-player/player.js:654-657`:
  ```javascript
  if (!activeLine) return;
  if (!playerScreen.classList.contains("active")) return;
  if (!window.matchMedia("(max-width: 600px)").matches) return;
  if (lyricsContainer.clientHeight <= 0) return;
  ```

## Logging

**Framework:** `console` (no external logging library detected)

**Patterns:**
- No `console.log()` statements found in analyzed code
- No logging framework configured
- Recommend adding minimal logging for debugging if needed in future

## Comments

**When to Comment:**
- Section headers for major code blocks (e.g., `// =========================================================================`)
- Algorithm explanations (e.g., `// Binary search: find last word where startTime <= elapsed`)
- Feature warnings (e.g., `// Auto-generated from JSON data. Do not edit manually.`)
- Intent/non-obvious behavior (e.g., `// Already finished, restart`)
- Port references (e.g., `// Format time like anthem_utils.seconds_to_minutes`)

**Style:**
- Use `//` for single-line comments
- Use `/* */` rarely, only for multi-line documentation blocks
- Comment should explain WHY, not WHAT (the code shows the WHAT)
- Examples from `/c/Projects/website/ssb-player/player.js`:
  - Line 228: Section header with equals signs
  - Line 362: Reference to external code being ported
  - Line 565: Algorithm explanation

**JSDoc/TSDoc:**
- Not used in this codebase (no type annotations, no formal JSDoc blocks)

## Function Design

**Size:**
- Most functions are small (under 50 lines)
- Example: `formatTime()` is 4 lines, `play()` is 9 lines
- Longer functions have clear section comments for readability

**Parameters:**
- Minimal parameters (1-2 per function typically)
- Complex state passed through global variables in IIFE scope
- Example: `computeTiming(data, duration)` has 2 params
- Example: `buildLyrics(data)` has 1 param

**Return Values:**
- Functions return objects/arrays (e.g., timing data objects, line arrays)
- Some functions return nothing but modify global state via closure
- Early returns used for guard clauses (return void implicitly)

## Module Design

**Exports:**
- IIFE pattern provides module scope isolation
- `/c/Projects/website/ssb-player/player.js` wraps all code in `(function () { ... })()`
- Global `window` object avoided except for required DOM manipulation
- `/c/Projects/website/main.js` uses jQuery directly (older pattern, no IIFE)

**Barrel Files:**
- Not applicable (no modular import system)

**State Management:**
- Closure-based state in IIFE (module pattern)
- Variables declared at function scope level (lines 349-360 in `player.js`):
  ```javascript
  let timingData = null;
  let flatWords = [];
  let isPlaying = false;
  let startTimestamp = 0;
  ```
- State is isolated per IIFE instance
- No global namespace pollution

## Event Handling

**Pattern:**
- Use `addEventListener()` for all event binding
- Example: `durationSlider.addEventListener("input", function () { ... })`
- Inline function expressions or named functions
- No event delegation library; manual event handling

**Data Attributes:**
- Use `data-*` attributes in HTML for configuration (e.g., `data-modal-target`, `data-class`)
- Access via `element.dataset.modalTarget` or `element.getAttribute()`
- Example from `/c/Projects/website/main.js:4`: `$(this).data('class')`

---

*Convention analysis: 2026-03-02*
