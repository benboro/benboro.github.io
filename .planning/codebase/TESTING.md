# Testing Patterns

**Analysis Date:** 2026-03-02

## Test Framework

**Status:** No automated testing framework detected

**What's Missing:**
- No test runner configured (Jest, Vitest, Mocha, etc.)
- No assertion library (Chai, Expect, etc.)
- No test files (`.test.js`, `.spec.js`) in codebase
- No testing configuration files (`jest.config.js`, `vitest.config.ts`, etc.)

**Why This Matters:**
- This is a frontend-focused website with interactive components (karaoke player, tab navigation, modals)
- Complex business logic exists in `/c/Projects/website/ssb-player/player.js` (timing calculations, word highlighting, playback control)
- Complex business logic exists in `/c/Projects/website/main.js` (tab switching, scroll animations, modal management)
- No test safety net for refactoring or fixing bugs

## Current Testing Approach

**Manual Testing Only:**
- Code is tested by running the website and interacting with it
- No regression test suite exists
- Changes risk breaking existing functionality

**Browser DevTools Usage:**
- Developers must manually verify functionality in the browser
- Check console for errors (no error boundaries)
- Manual interaction testing required for:
  - Play/pause functionality
  - Word highlighting during playback
  - Progress bar seeking
  - Tab navigation
  - Modal open/close

## Test Candidates (If Testing Framework Were Added)

### Unit Test Targets

**From `/c/Projects/website/ssb-player/player.js`:**

1. **`computeTiming(data, duration)`** (lines 231-257)
   - Pure function that calculates timing for lyrics
   - Inputs: array of `{word, noteLength}`, duration in seconds
   - Outputs: array of timed objects with `wordStartTime`, `wordCumTime`, `noteShare`, `wordTime`
   - Currently untested - could cause subtle bugs in word synchronization

2. **`buildSsbLines(timedData)`** (lines 259-286)
   - Organizes timed words into lines based on `LINE_WORD_COUNTS`
   - Pure function - good test candidate
   - Easy to test with sample data

3. **`buildBrefLines(timedData)`** (lines 288-313)
   - Organizes timed words into lines with line breaks at specific words
   - Pure function - testable
   - Different from `buildSsbLines()` - separate test cases needed

4. **`formatTime(totalSeconds)`** (lines 363-367)
   - Format utility function
   - Pure function - excellent test candidate
   - Test cases: 0 seconds, 59.9 seconds, 60 seconds, 120 seconds, etc.

5. **`normalizeDuration(value)`** (lines 399-410)
   - Validates and constrains duration input
   - Pure function
   - Handles edge cases: invalid input, out of range, finite check
   - Current implementation could be tested with edge cases

6. **`findActiveWord(elapsed)`** (lines 593-611)
   - Binary search algorithm to find current word
   - Pure function - good test candidate
   - Critical for playback correctness
   - Test edge cases: empty array, start of array, end of array, between values

**From `/c/Projects/website/main.js`:**

1. **`changeReadMore()`** (lines 103-114)
   - DOM manipulation function
   - Harder to test without DOM setup
   - Could be tested with jsdom or manual testing

### Integration Test Targets

1. **SSB Player Flow (End-to-End)**
   - User adjusts duration → prepares track → lyrics build correctly
   - User plays → words highlight in sequence → timing is accurate
   - User seeks → active word updates correctly
   - User toggles Baseball Reference mode → display changes

2. **Tab Navigation**
   - Click tab → active tab class applied
   - Section content slides down/up
   - URL hash updates
   - Page refresh with hash loads correct tab

3. **Modal System**
   - Click modal button → modal opens
   - Click overlay → modal closes
   - Click close button → modal closes
   - Multiple modals don't overlap incorrectly

## What Should Be Tested

**High Priority (Complex Logic):**
- Timing calculation algorithm in `computeTiming()` - affects entire playback
- Word state transitions (upcoming → active → sung) - visual feedback critical
- Progress bar seeking logic - user interaction critical
- Binary search in `findActiveWord()` - correctness affects playback accuracy

**Medium Priority (Utility Functions):**
- Time formatting with edge cases
- Duration normalization with invalid inputs
- Line-building algorithms with varying data

**Low Priority (DOM Manipulation):**
- Modal open/close (tested manually easily)
- Tab switching (tested manually easily)
- Element visibility toggles

## Recommended Testing Setup

If testing were to be added:

```javascript
// Example structure (not currently in codebase)

// Using Vitest + DOM testing library
import { describe, it, expect, beforeEach } from 'vitest';
import { computeTiming, formatTime, buildSsbLines } from './player.js';

describe('SSB Player Timing', () => {
    describe('computeTiming', () => {
        it('should compute correct timing for single note', () => {
            const data = [{word: "test", noteLength: 1}];
            const result = computeTiming(data, 100);
            expect(result[0].wordTime).toBeCloseTo(100, 1);
        });

        it('should distribute time proportionally to note lengths', () => {
            const data = [
                {word: "a", noteLength: 1},
                {word: "b", noteLength: 2}
            ];
            const result = computeTiming(data, 300);
            expect(result[1].wordTime).toBeCloseTo(200, 1);
        });
    });

    describe('formatTime', () => {
        it('should format seconds to M:SS.S', () => {
            expect(formatTime(0)).toBe('0:00.0');
            expect(formatTime(59.9)).toBe('0:59.9');
            expect(formatTime(60.5)).toBe('1:00.5');
        });
    });

    describe('buildSsbLines', () => {
        it('should organize words into lines per LINE_WORD_COUNTS', () => {
            // Test data construction and line grouping
        });
    });
});
```

## Test Coverage Gaps

**Critical Gaps:**
- No tests for timing calculations → risk of playback sync issues
- No tests for word state management → visual bugs go undetected
- No tests for seeking logic → can break user interaction
- No tests for duration normalization → invalid input handling untested

**Why It Matters:**
- `/c/Projects/website/ssb-player/player.js` has 761 lines of untested code
- Changes to timing or state logic risk breaking the entire player
- New features (like speed control) would be risky without tests

## Running Tests (Once Framework Added)

```bash
# Would typically be:
npm test              # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Generate coverage report
```

**Current Status:** These commands do not exist (no test setup).

## Test Fixtures/Data

**Current Approach:**
- No test fixtures or factories exist
- Data is hardcoded in files (SSB_DATA, BREF_DATA arrays - lines 10-156, 93-156)
- These could become fixtures if testing framework added

**Example Data Structure:**
```javascript
const SSB_DATA = [
    {word: "O", noteLength: 0.1875},
    {word: "say", noteLength: 0.25},
    // ... more entries
];

const BREF_DATA = [
    {word: "José Canseco", noteLength: 1.4375},
    // ... more entries
];
```

**Suggested Fixture Approach:**
- Create `test/fixtures/ssb-data.js` with sample data
- Create factory functions for generating test timing data
- Use smaller datasets in tests than production data

## Mocking Strategy (If Added)

**What to Mock:**
- `document.getElementById()` → use jsdom or @testing-library/dom
- `requestAnimationFrame()` → use fake timers (jest.useFakeTimers)
- `performance.now()` → mock to control time in tests
- DOM event listeners → simulate click/touch events

**What NOT to Mock:**
- Core algorithm functions (computeTiming, formatTime)
- State management (should test real state)
- Binary search (findActiveWord) - test real implementation

**Example (Not Currently Used):**
```javascript
// Using jest fake timers
beforeEach(() => {
    jest.useFakeTimers();
});

it('should play and advance word after duration', () => {
    play();
    jest.advanceTimersByTime(1000); // 1 second
    expect(currentWordIndex).toBeGreaterThan(-1);
});
```

## Missing Test Infrastructure

**Not Present:**
- `.env.test` or test configuration
- `test/` or `__tests__/` directories
- Mock utilities or test helpers
- CI/CD test runner configuration
- Coverage reporting setup

**Risk:** Without test infrastructure, adding tests requires significant setup work. A testing framework (Vitest recommended for modern JavaScript) should be configured before tests are written.

---

*Testing analysis: 2026-03-02*
