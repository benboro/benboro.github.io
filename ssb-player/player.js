(function () {
    "use strict";

    // =========================================================================
    // Embedded data from CSV files
    // =========================================================================

    // From data/ssb_word_length.csv (cp1252 curly apostrophes -> Unicode)
    var SSB_DATA = [
        {word: "O", noteLength: 0.1875},
        {word: "say", noteLength: 0.25},
        {word: "can", noteLength: 0.25},
        {word: "you", noteLength: 0.25},
        {word: "see", noteLength: 0.5},
        {word: "by", noteLength: 0.125},
        {word: "the", noteLength: 0.0625},
        {word: "dawn\u2019s", noteLength: 0.25},
        {word: "early", noteLength: 0.5},
        {word: "light", noteLength: 0.5},
        {word: "What", noteLength: 0.125},
        {word: "so", noteLength: 0.125},
        {word: "proudly", noteLength: 0.375},
        {word: "we", noteLength: 0.25},
        {word: "hail\u2019d", noteLength: 0.5},
        {word: "at", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "twilight\u2019s", noteLength: 0.5},
        {word: "last", noteLength: 0.25},
        {word: "gleaming", noteLength: 0.5},
        {word: "Whose", noteLength: 0.125},
        {word: "broad", noteLength: 0.0625},
        {word: "stripes", noteLength: 0.25},
        {word: "and", noteLength: 0.25},
        {word: "bright", noteLength: 0.25},
        {word: "stars", noteLength: 0.5},
        {word: "through", noteLength: 0.125},
        {word: "the", noteLength: 0.0625},
        {word: "perilous", noteLength: 0.75},
        {word: "fight", noteLength: 0.5},
        {word: "O\u2019er", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "ramparts", noteLength: 0.375},
        {word: "we", noteLength: 0.25},
        {word: "watch\u2019d", noteLength: 0.5},
        {word: "were", noteLength: 0.125},
        {word: "so", noteLength: 0.125},
        {word: "gallantly", noteLength: 0.75},
        {word: "streaming", noteLength: 0.5},
        {word: "And", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "rocket\u2019s", noteLength: 0.5},
        {word: "red", noteLength: 0.25},
        {word: "glare", noteLength: 0.5},
        {word: "the", noteLength: 0.125},
        {word: "bombs", noteLength: 0.125},
        {word: "bursting", noteLength: 0.5},
        {word: "in", noteLength: 0.25},
        {word: "air", noteLength: 0.5},
        {word: "Gave", noteLength: 0.25},
        {word: "proof", noteLength: 0.25},
        {word: "through", noteLength: 0.125},
        {word: "the", noteLength: 0.25},
        {word: "night", noteLength: 0.5},
        {word: "that", noteLength: 0.125},
        {word: "our", noteLength: 0.125},
        {word: "flag", noteLength: 0.25},
        {word: "was", noteLength: 0.25},
        {word: "still", noteLength: 0.25},
        {word: "there", noteLength: 0.5},
        {word: "O", noteLength: 0.25},
        {word: "say", noteLength: 0.25},
        {word: "does", noteLength: 0.25},
        {word: "that", noteLength: 0.25},
        {word: "star-spangled", noteLength: 0.75},
        {word: "banner", noteLength: 0.5},
        {word: "yet", noteLength: 0.25},
        {word: "wave", noteLength: 0.5},
        {word: "O\u2019er", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "land", noteLength: 0.375},
        {word: "of", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "free", noteLength: 0.5},
        {word: "and", noteLength: 0.125},
        {word: "the", noteLength: 0.125},
        {word: "home", noteLength: 0.25},
        {word: "of", noteLength: 0.125},
        {word: "the", noteLength: 0.25},
        {word: "brave", noteLength: 0.5}
    ];

    // From data/bref_word_length.csv
    var BREF_DATA = [
        {word: "Jos\u00e9 Canseco", noteLength: 1.4375},
        {word: "Byers", noteLength: 0.1875},
        {word: "Dawson", noteLength: 0.5},
        {word: "Lee", noteLength: 0.25},
        {word: "Light", noteLength: 0.5},
        {word: "Watson", noteLength: 0.25},
        {word: "Prough", noteLength: 0.21875},
        {word: "Dell", noteLength: 0.03125},
        {word: "Lee", noteLength: 0.375},
        {word: "Hale", noteLength: 0.5},
        {word: "Acta", noteLength: 0.25},
        {word: "Twining", noteLength: 0.5},
        {word: "Lasley", noteLength: 0.5},
        {word: "Mintz", noteLength: 0.25},
        {word: "Hu", noteLength: 0.125},
        {word: "Baird", noteLength: 0.0625},
        {word: "Strike", noteLength: 0.25},
        {word: "Cantz", noteLength: 0.25},
        {word: "Bright", noteLength: 0.25},
        {word: "Starr", noteLength: 0.5},
        {word: "Throop", noteLength: 0.125},
        {word: "Paul Powell", noteLength: 0.5625},
        {word: "Lis", noteLength: 0.25},
        {word: "Flythe", noteLength: 0.5},
        {word: "Odor", noteLength: 0.25},
        {word: "Rand", noteLength: 0.25},
        {word: "Partch", noteLength: 0.125},
        {word: "Weeks", noteLength: 0.25},
        {word: "Koch", noteLength: 0.5},
        {word: "Wordsworth", noteLength: 0.25},
        {word: "Gallen", noteLength: 0.5},
        {word: "Lee", noteLength: 0.25},
        {word: "Street", noteLength: 0.25},
        {word: "Mann", noteLength: 0.25},
        {word: "Anna", noteLength: 0.25},
        {word: "Rockett", noteLength: 0.5},
        {word: "Rettger", noteLength: 0.75},
        {word: "Dahl", noteLength: 0.125},
        {word: "Bonds", noteLength: 0.125},
        {word: "Bruske", noteLength: 0.25},
        {word: "King", noteLength: 0.25},
        {word: "Inge", noteLength: 0.25},
        {word: "Eyre", noteLength: 0.5},
        {word: "Babe Ruth", noteLength: 0.5},
        {word: "Toole", noteLength: 0.125},
        {word: "Lon Knight", noteLength: 0.75},
        {word: "Thatcher", noteLength: 0.25},
        {word: "Flager", noteLength: 0.5},
        {word: "Stillwell", noteLength: 0.75},
        {word: "Jos\u00e9 De La Torre", noteLength: 1.25},
        {word: "Spangler", noteLength: 0.5},
        {word: "Bannon", noteLength: 0.5},
        {word: "Yett", noteLength: 0.25},
        {word: "Cave", noteLength: 0.5},
        {word: "Orr", noteLength: 0.125},
        {word: "Dull", noteLength: 0.125},
        {word: "Land", noteLength: 0.375},
        {word: "Devers", noteLength: 0.25},
        {word: "Freese", noteLength: 0.5},
        {word: "Pat Mahomes", noteLength: 0.5},
        {word: "San\u00f3", noteLength: 0.375},
        {word: "Graves", noteLength: 0.5}
    ];

    // Word counts per line from first stanza of star_spangled_banner.txt
    var LINE_WORD_COUNTS = [10, 10, 10, 9, 10, 11, 8, 12];

    // =========================================================================
    // Timing computation (port of anthem_utils.create_time_columns + web_app line builders)
    // =========================================================================

    function computeTiming(data, duration) {
        var notesSum = 0;
        var i;
        for (i = 0; i < data.length; i++) {
            notesSum += data[i].noteLength;
        }

        var cumTime = 0;
        var result = [];
        for (i = 0; i < data.length; i++) {
            var noteShare = data[i].noteLength / notesSum;
            var wordTime = noteShare * duration;
            var wordStartTime = cumTime;
            cumTime += wordTime;

            result.push({
                word: data[i].word,
                noteLength: data[i].noteLength,
                noteShare: noteShare,
                wordTime: wordTime,
                wordStartTime: wordStartTime,
                wordCumTime: cumTime
            });
        }

        return result;
    }

    function buildSsbLines(timedData) {
        var lines = [];
        var idx = 0;

        for (var li = 0; li < LINE_WORD_COUNTS.length; li++) {
            var count = LINE_WORD_COUNTS[li];
            var lineWords = [];

            for (var wi = 0; wi < count; wi++) {
                if (idx >= timedData.length) break;
                var row = timedData[idx];
                idx++;

                lineWords.push({
                    word: row.word,
                    startTime: Math.round(row.wordStartTime * 10000) / 10000,
                    endTime: Math.round(row.wordCumTime * 10000) / 10000,
                    duration: Math.round(row.wordTime * 10000) / 10000
                });
            }

            if (lineWords.length) {
                lines.push({words: lineWords});
            }
        }

        return lines;
    }

    function buildBrefLines(timedData) {
        // Compute SSB cumulative word count boundaries as share of total words
        var ssbTotal = 0;
        var i;
        for (i = 0; i < LINE_WORD_COUNTS.length; i++) {
            ssbTotal += LINE_WORD_COUNTS[i];
        }

        var ssbCum = [];
        var running = 0;
        for (i = 0; i < LINE_WORD_COUNTS.length; i++) {
            running += LINE_WORD_COUNTS[i];
            ssbCum.push(running / ssbTotal);
        }

        // Compute cumulative note_length share for each BREF entry
        var totalNoteLength = 0;
        for (i = 0; i < timedData.length; i++) {
            totalNoteLength += timedData[i].noteLength;
        }

        var lines = [];
        for (i = 0; i < LINE_WORD_COUNTS.length; i++) {
            lines.push([]);
        }

        var cumNoteLength = 0;
        for (i = 0; i < timedData.length; i++) {
            cumNoteLength += timedData[i].noteLength;
            var cumShare = cumNoteLength / totalNoteLength;

            var lineIdx = ssbCum.length - 1;
            for (var j = 0; j < ssbCum.length; j++) {
                if (cumShare <= ssbCum[j] + 1e-9) {
                    lineIdx = j;
                    break;
                }
            }

            lines[lineIdx].push({
                word: timedData[i].word,
                startTime: Math.round(timedData[i].wordStartTime * 10000) / 10000,
                endTime: Math.round(timedData[i].wordCumTime * 10000) / 10000,
                duration: Math.round(timedData[i].wordTime * 10000) / 10000
            });
        }

        return lines
            .filter(function (line) { return line.length > 0; })
            .map(function (line) { return {words: line}; });
    }

    function computeTimingData(duration, bref) {
        // Clamp duration
        duration = Math.max(30, Math.min(200, duration));

        var data = bref ? BREF_DATA : SSB_DATA;
        var timedData = computeTiming(data, duration);
        var lines = bref ? buildBrefLines(timedData) : buildSsbLines(timedData);

        return {
            duration: duration,
            bref: bref,
            lines: lines
        };
    }

    // =========================================================================
    // Player UI (from static/js/player.js)
    // =========================================================================

    // DOM elements
    var setupScreen = document.getElementById("setup-screen");
    var playerScreen = document.getElementById("player-screen");
    var durationSlider = document.getElementById("duration-slider");
    var durationDisplay = document.getElementById("duration-display");
    var brefToggle = document.getElementById("bref-toggle");
    var prepareBtn = document.getElementById("prepare-btn");
    var lyricsContainer = document.getElementById("lyrics-container");
    var progressBarContainer = document.getElementById("progress-bar-container");
    var progressBarFill = document.getElementById("progress-bar-fill");
    var progressBarHandle = document.getElementById("progress-bar-handle");
    var timeElapsed = document.getElementById("time-elapsed");
    var timeTotal = document.getElementById("time-total");
    var playPauseBtn = document.getElementById("play-pause-btn");
    var backBtn = document.getElementById("back-btn");

    // State
    var timingData = null;
    var flatWords = [];
    var isPlaying = false;
    var startTimestamp = 0;
    var pauseOffset = 0;
    var currentWordIndex = -1;
    var animFrameId = null;
    var totalDuration = 0;

    // Format time like anthem_utils.seconds_to_minutes
    function formatTime(totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = (totalSeconds % 60).toFixed(1).padStart(4, "0");
        return minutes + ":" + seconds;
    }

    // Duration slider
    durationSlider.addEventListener("input", function () {
        durationDisplay.textContent = this.value;
    });

    // Prepare Track button — compute locally instead of fetching from server
    prepareBtn.addEventListener("click", function () {
        var duration = parseFloat(durationSlider.value);
        var bref = brefToggle.checked;
        var data = computeTimingData(duration, bref);
        timingData = data;
        totalDuration = data.duration;
        buildLyrics(data);
        showPlayer();
    });

    function buildLyrics(data) {
        lyricsContainer.innerHTML = "";
        flatWords = [];

        data.lines.forEach(function (line) {
            var lineDiv = document.createElement("div");
            lineDiv.className = "lyric-line";

            line.words.forEach(function (w) {
                var span = document.createElement("span");
                span.className = "word upcoming";
                span.textContent = w.word;
                lineDiv.appendChild(span);
                lineDiv.appendChild(document.createTextNode(" "));

                flatWords.push({
                    startTime: w.startTime,
                    endTime: w.endTime,
                    element: span,
                    lineElement: lineDiv,
                });
            });

            lyricsContainer.appendChild(lineDiv);
        });

        timeTotal.textContent = formatTime(totalDuration);
        timeElapsed.textContent = formatTime(0);
    }

    function showPlayer() {
        setupScreen.classList.remove("active");
        playerScreen.classList.add("active");
        resetPlayback();
    }

    function showSetup() {
        stopPlayback();
        playerScreen.classList.remove("active");
        setupScreen.classList.add("active");
    }

    function resetPlayback() {
        stopPlayback();
        pauseOffset = 0;
        currentWordIndex = -1;
        isPlaying = false;
        playPauseBtn.textContent = "Play";
        updateProgressBar(0);
        timeElapsed.textContent = formatTime(0);

        // Reset all words to upcoming
        flatWords.forEach(function (fw) {
            fw.element.className = "word upcoming";
        });
        updateLineHighlighting(-1);
    }

    function stopPlayback() {
        if (animFrameId !== null) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        isPlaying = false;
    }

    // Play/Pause
    playPauseBtn.addEventListener("click", togglePlayPause);

    function togglePlayPause() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function play() {
        if (pauseOffset >= totalDuration * 1000) {
            // Already finished, restart
            pauseOffset = 0;
            currentWordIndex = -1;
        }
        startTimestamp = performance.now() - pauseOffset;
        isPlaying = true;
        playPauseBtn.textContent = "Pause";
        tick();
    }

    function pause() {
        pauseOffset = performance.now() - startTimestamp;
        stopPlayback();
        playPauseBtn.textContent = "Play";
    }

    function tick() {
        if (!isPlaying) return;

        var now = performance.now();
        var elapsedMs = now - startTimestamp;
        var elapsed = Math.min(elapsedMs / 1000, totalDuration);

        // Find active word via binary search
        var activeIdx = findActiveWord(elapsed);

        if (activeIdx !== currentWordIndex) {
            updateWordStates(activeIdx);
            currentWordIndex = activeIdx;
        }

        updateProgressBar(elapsed / totalDuration);
        timeElapsed.textContent = formatTime(elapsed);

        if (elapsed >= totalDuration) {
            // Playback complete
            isPlaying = false;
            playPauseBtn.textContent = "Replay";
            pauseOffset = totalDuration * 1000;
            // Mark all words as sung
            flatWords.forEach(function (fw) {
                fw.element.className = "word sung";
            });
            updateLineHighlighting(-1);
            return;
        }

        animFrameId = requestAnimationFrame(tick);
    }

    // Binary search: find last word where startTime <= elapsed
    function findActiveWord(elapsed) {
        if (flatWords.length === 0) return -1;

        var lo = 0;
        var hi = flatWords.length - 1;
        var result = -1;

        while (lo <= hi) {
            var mid = (lo + hi) >>> 1;
            if (flatWords[mid].startTime <= elapsed) {
                result = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return result;
    }

    function updateWordStates(activeIdx) {
        flatWords.forEach(function (fw, i) {
            if (i < activeIdx) {
                fw.element.className = "word sung";
            } else if (i === activeIdx) {
                fw.element.className = "word active";
            } else {
                fw.element.className = "word upcoming";
            }
        });

        if (activeIdx >= 0) {
            updateLineHighlighting(activeIdx);
        }
    }

    function updateLineHighlighting(activeIdx) {
        var activeLine = activeIdx >= 0 ? flatWords[activeIdx].lineElement : null;
        var allLines = lyricsContainer.querySelectorAll(".lyric-line");

        var activeLineIdx = -1;
        allLines.forEach(function (line, i) {
            line.classList.remove("active-line", "adjacent-line");
            if (line === activeLine) {
                activeLineIdx = i;
            }
        });

        if (activeLineIdx >= 0) {
            allLines[activeLineIdx].classList.add("active-line");
            if (activeLineIdx > 0) {
                allLines[activeLineIdx - 1].classList.add("adjacent-line");
            }
            if (activeLineIdx < allLines.length - 1) {
                allLines[activeLineIdx + 1].classList.add("adjacent-line");
            }
        }
    }

    function updateProgressBar(fraction) {
        var pct = Math.max(0, Math.min(100, fraction * 100));
        progressBarFill.style.width = pct + "%";
        progressBarHandle.style.left = pct + "%";
    }

    // Seeking
    var isSeeking = false;

    function seekFromEvent(e) {
        var rect = progressBarContainer.getBoundingClientRect();
        var fraction = (e.clientX - rect.left) / rect.width;
        fraction = Math.max(0, Math.min(1, fraction));
        var seekTime = fraction * totalDuration;

        pauseOffset = seekTime * 1000;
        currentWordIndex = -1;

        if (isPlaying) {
            startTimestamp = performance.now() - pauseOffset;
        }

        // Force immediate state update
        var activeIdx = findActiveWord(seekTime);
        updateWordStates(activeIdx);
        currentWordIndex = activeIdx;
        updateProgressBar(fraction);
        timeElapsed.textContent = formatTime(seekTime);

        // Reset replay button if seeking before end
        if (seekTime < totalDuration && !isPlaying) {
            playPauseBtn.textContent = "Play";
        }
    }

    progressBarContainer.addEventListener("mousedown", function (e) {
        isSeeking = true;
        seekFromEvent(e);
    });

    document.addEventListener("mousemove", function (e) {
        if (isSeeking) {
            seekFromEvent(e);
        }
    });

    document.addEventListener("mouseup", function () {
        isSeeking = false;
    });

    // Touch support for progress bar
    progressBarContainer.addEventListener("touchstart", function (e) {
        isSeeking = true;
        seekFromEvent(e.touches[0]);
        e.preventDefault();
    });

    document.addEventListener("touchmove", function (e) {
        if (isSeeking) {
            seekFromEvent(e.touches[0]);
        }
    });

    document.addEventListener("touchend", function () {
        isSeeking = false;
    });

    // Back button
    backBtn.addEventListener("click", showSetup);

    // Keyboard shortcut: space for play/pause
    document.addEventListener("keydown", function (e) {
        if (e.code === "Space" && playerScreen.classList.contains("active")) {
            e.preventDefault();
            togglePlayPause();
        }
    });
})();
