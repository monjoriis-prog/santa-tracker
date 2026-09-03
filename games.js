/**
 * Three self-contained mini-games. Each returns a Promise<{game,score}>.
 * All render into a provided container element and clean up after themselves.
 */

/* ── Shared helpers ── */
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  }
  for (const c of children) {
    el.append(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return el;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── Abort signal for active games ── */
let activeAbort = null;

function createAbortSignal() {
  const signal = { aborted: false };
  signal.abort = () => { signal.aborted = true; };
  return signal;
}

/** Call to kill any running game — stops timers, silences sounds, cancels delayed callbacks. */
export function abortActiveGame() {
  if (activeAbort) {
    activeAbort.abort();
    activeAbort = null;
  }
}

/** Wraps setTimeout so it respects the abort signal. */
function safeTimeout(fn, ms, signal) {
  const id = setTimeout(() => {
    if (!signal.aborted) fn();
  }, ms);
  return id;
}

function timerBar(container, seconds, onDone, signal) {
  const bar = h("div", { class: "game-timer-bar" });
  const fill = h("div", { class: "game-timer-fill" });
  bar.append(fill);
  container.prepend(bar);
  const start = Date.now();
  const ms = seconds * 1000;
  let stopped = false;
  function tick() {
    if (stopped || signal.aborted) return;
    const elapsed = Date.now() - start;
    const pct = Math.max(0, 1 - elapsed / ms) * 100;
    fill.style.width = pct + "%";
    if (elapsed >= ms) { onDone(); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  return () => { stopped = true; };
}

/* ── Sound effects via Web Audio API ── */
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* no audio */ }
  }
  return audioCtx;
}

function playCelebration() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  // Bright ascending chime: C5 → E5 → G5 → C6
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.12);
    osc.stop(ctx.currentTime + i * 0.12 + 0.5);
  });
  // Extra sparkle burst
  const sparkle = ctx.createOscillator();
  const sg = ctx.createGain();
  sparkle.type = "sine";
  sparkle.frequency.value = 1568;
  sg.gain.setValueAtTime(0.15, ctx.currentTime + 0.5);
  sg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
  sparkle.connect(sg).connect(ctx.destination);
  sparkle.start(ctx.currentTime + 0.5);
  sparkle.stop(ctx.currentTime + 1.0);
}

function playWompWomp() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  // Three descending low tones: womp womp womp
  const freqs = [250, 220, 180];
  const times = [0, 0.3, 0.6];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i]);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + times[i] + 0.28);
    gain.gain.setValueAtTime(0.18, ctx.currentTime + times[i]);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + 0.28);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + times[i]);
    osc.stop(ctx.currentTime + times[i] + 0.3);
  });
}

/* ── Snowflake celebration overlay ── */
function snowflakeCelebration() {
  const overlay = document.createElement("div");
  overlay.className = "snowflake-overlay";
  const flakes = ["\u2744", "\u2745", "\u2746", "\u2727", "\u2735"];
  for (let i = 0; i < 50; i++) {
    const s = document.createElement("span");
    s.className = "snowflake-particle";
    s.textContent = flakes[Math.floor(Math.random() * flakes.length)];
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
    s.style.animationDelay = (Math.random() * 0.8) + "s";
    s.style.fontSize = (Math.random() * 18 + 12) + "px";
    s.style.opacity = (Math.random() * 0.5 + 0.5).toString();
    overlay.append(s);
  }
  document.body.append(overlay);
  setTimeout(() => overlay.remove(), 3500);
}

/* ── 1. Word Unscramble ── */
const XMAS_WORDS = [
  "snowflake", "reindeer", "chimney", "stocking", "present", "tinsel",
  "gingerbread", "mistletoe", "ornament", "snowman", "caroling", "wreath",
  "nutcracker", "evergreen", "sleighbell", "icicle", "blizzard", "mittens",
  "fireplace", "eggnog", "peppermint", "fruitcake", "candycane", "workshop",
  "toymaker", "starlight", "jingle", "garland", "holiday", "festive",
];

export function wordUnscramble(container) {
  return new Promise((resolve) => {
    abortActiveGame();
    const signal = createAbortSignal();
    activeAbort = signal;
    container.innerHTML = "";
    let score = 0;
    let round = 0;
    const maxRounds = 5;
    const MAX_WRONG = 3;

    function nextRound() {
      if (signal.aborted) return;
      if (round >= maxRounds) { finish(); return; }
      container.innerHTML = "";
      const word = pick(XMAS_WORDS);
      let scrambled = shuffle(word.split("")).join("");
      while (scrambled === word && word.length > 1) scrambled = shuffle(word.split("")).join("");
      round++;
      let wrongCount = 0;
      let hintShown = false;
      let roundOver = false;

      const title = h("div", { class: "game-round" }, `Round ${round}/${maxRounds}`);
      const prompt = h("div", { class: "game-prompt" }, `Unscramble: ${scrambled.toUpperCase()}`);
      const hintBtn = h("button", { type: "button", class: "game-btn game-hint-btn" }, "Show Hint");
      const hintText = h("div", { class: "game-hint" });
      const input = h("input", { type: "text", class: "game-input", placeholder: "Type your answer...", autocomplete: "off" });
      const btnRow = h("div", { class: "game-btn-row" });
      const btn = h("button", { type: "button", class: "game-btn" }, "Submit");
      btnRow.append(btn, hintBtn);
      const feedback = h("div", { class: "game-feedback" });

      container.append(title, prompt, hintText, input, btnRow, feedback);

      // Build progressive hints
      const blanks = word.split("").map((ch, i) => i === 0 ? ch.toUpperCase() : "_").join(" ");
      hintBtn.addEventListener("click", () => {
        if (hintShown || signal.aborted) return;
        hintShown = true;
        hintText.textContent = `Hint: ${blanks}  (${word.length} letters, starts with "${word[0].toUpperCase()}")`;
        hintBtn.disabled = true;
        hintBtn.style.opacity = "0.5";
      });

      let stopTimer = timerBar(container, 30, () => {
        if (roundOver || signal.aborted) return;
        roundOver = true;
        revealAnswer();
      }, signal);

      function revealAnswer() {
        if (signal.aborted) return;
        playWompWomp();
        feedback.innerHTML = `<span style="color:var(--accent)">The answer was: <strong>${word.toUpperCase()}</strong></span>`;
        input.disabled = true;
        btn.disabled = true;
        safeTimeout(nextRound, 2000, signal);
      }

      function check() {
        if (roundOver || signal.aborted) return;
        const ans = input.value.trim().toLowerCase();
        if (!ans) { input.focus(); return; }

        if (ans === word) {
          roundOver = true;
          score += 10;
          feedback.textContent = "Correct!";
          feedback.style.color = "var(--green)";
          stopTimer();
          input.disabled = true;
          btn.disabled = true;
          playCelebration();
          snowflakeCelebration();
          safeTimeout(nextRound, 2000, signal);
        } else {
          wrongCount++;
          playWompWomp();
          if (wrongCount >= MAX_WRONG) {
            roundOver = true;
            stopTimer();
            revealAnswer();
          } else {
            feedback.innerHTML = `<span style="color:var(--accent)">Not quite! ${MAX_WRONG - wrongCount} tries left.</span>`;
            input.value = "";
            input.focus();
            // Auto-show hint after 2 wrong attempts
            if (wrongCount >= 2 && !hintShown) {
              hintShown = true;
              hintText.textContent = `Hint: ${blanks}  (${word.length} letters, starts with "${word[0].toUpperCase()}")`;
              hintBtn.disabled = true;
              hintBtn.style.opacity = "0.5";
            }
          }
        }
      }

      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      input.focus();
    }

    function finish() {
      if (signal.aborted) return;
      container.innerHTML = "";
      const msg = h("div", { class: "game-result" }, `You scored ${score} points!`);
      if (score > 0) {
        playCelebration();
        snowflakeCelebration();
      }
      const btn = h("button", { type: "button", class: "game-btn" }, "Done");
      btn.addEventListener("click", () => resolve({ game: "unscramble", score }));
      container.append(msg, btn);
      btn.focus();
    }

    nextRound();
  });
}

/* ── 2. Number Target ── */
export function numberTarget(container) {
  return new Promise((resolve) => {
    abortActiveGame();
    const signal = createAbortSignal();
    activeAbort = signal;
    container.innerHTML = "";
    let score = 0;
    let round = 0;
    const maxRounds = 3;

    function nextRound() {
      if (signal.aborted) return;
      if (round >= maxRounds) { finish(); return; }
      container.innerHTML = "";
      round++;

      // Generate 4 numbers and a reachable target
      const nums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 12) + 1);
      const target = generateTarget(nums);

      const title = h("div", { class: "game-round" }, `Round ${round}/${maxRounds}`);
      const prompt = h("div", { class: "game-prompt" },
        `Make ${target} using: ${nums.join(", ")}  (+ \u2212 \u00D7 \u00F7)`);
      const hint = h("div", { class: "game-hint" }, "Type an expression like: 3 + 5 * 2 - 1");
      const input = h("input", { type: "text", class: "game-input", placeholder: "e.g. 3 + 5 * 2", autocomplete: "off" });
      const btn = h("button", { type: "button", class: "game-btn" }, "Submit");
      const feedback = h("div", { class: "game-feedback" });

      container.append(title, prompt, hint, input, btn, feedback);

      let roundOver = false;
      let stopTimer = timerBar(container, 30, () => {
        if (roundOver || signal.aborted) return;
        roundOver = true;
        playWompWomp();
        feedback.innerHTML = `<span style="color:var(--accent)">Time's up!</span>`;
        input.disabled = true;
        btn.disabled = true;
        safeTimeout(nextRound, 1500, signal);
      }, signal);

      function check() {
        if (roundOver || signal.aborted) return;
        const expr = input.value.trim();
        if (!/^[\d\s+\-*/().]+$/.test(expr)) {
          feedback.textContent = "Use only numbers and + - * /";
          feedback.style.color = "var(--accent)";
          playWompWomp();
          return;
        }
        const usedNums = expr.match(/\d+/g);
        if (!usedNums) { feedback.textContent = "Enter an expression!"; return; }
        const available = [...nums];
        let valid = true;
        for (const n of usedNums) {
          const idx = available.indexOf(parseInt(n));
          if (idx === -1) { valid = false; break; }
          available.splice(idx, 1);
        }
        if (!valid) {
          feedback.textContent = "Only use the given numbers (each once)!";
          feedback.style.color = "var(--accent)";
          playWompWomp();
          return;
        }
        try {
          const result = Function(`"use strict"; return (${expr.replace(/[^0-9+\-*/().]/g, "")})`)();
          if (Math.abs(result - target) < 0.001) {
            roundOver = true;
            score += 20;
            feedback.textContent = "Correct!";
            feedback.style.color = "var(--green)";
            stopTimer();
            input.disabled = true;
            btn.disabled = true;
            playCelebration();
            snowflakeCelebration();
            safeTimeout(nextRound, 2000, signal);
          } else {
            feedback.textContent = `That equals ${result}, not ${target}. Try again!`;
            feedback.style.color = "var(--accent)";
            playWompWomp();
            input.value = "";
            input.focus();
          }
        } catch {
          feedback.textContent = "Invalid expression!";
          feedback.style.color = "var(--accent)";
          playWompWomp();
        }
      }

      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      input.focus();
    }

    function finish() {
      if (signal.aborted) return;
      container.innerHTML = "";
      const msg = h("div", { class: "game-result" }, `You scored ${score} points!`);
      if (score > 0) {
        playCelebration();
        snowflakeCelebration();
      }
      const btn = h("button", { type: "button", class: "game-btn" }, "Done");
      btn.addEventListener("click", () => resolve({ game: "numberTarget", score }));
      container.append(msg, btn);
      btn.focus();
    }

    nextRound();
  });
}

function generateTarget(nums) {
  // Try random expressions to find a reachable integer target
  const ops = ["+", "-", "*"];
  for (let attempt = 0; attempt < 100; attempt++) {
    const perm = shuffle(nums);
    const op1 = pick(ops), op2 = pick(ops), op3 = pick(ops);
    try {
      const val = Function(`"use strict"; return (${perm[0]} ${op1} ${perm[1]} ${op2} ${perm[2]} ${op3} ${perm[3]})`)();
      if (Number.isInteger(val) && val > 0 && val < 200) return val;
    } catch { /* skip */ }
  }
  return nums[0] + nums[1]; // fallback
}

/* ── 3. Rhyme Match ── */
const RHYME_PAIRS = [
  ["snow", "glow", "blow", "flow"],
  ["bell", "tell", "well", "spell"],
  ["light", "night", "bright", "sight"],
  ["tree", "free", "glee", "spree"],
  ["star", "far", "jar", "car"],
  ["cold", "gold", "bold", "told"],
  ["sing", "ring", "bring", "king"],
  ["cheer", "deer", "near", "year"],
  ["merry", "berry", "cherry", "ferry"],
  ["frost", "lost", "cost", "tossed"],
  ["sleigh", "play", "day", "way"],
  ["gift", "drift", "lift", "swift"],
  ["jolly", "holly", "polly", "golly"],
  ["flake", "cake", "lake", "make"],
  ["wrap", "snap", "clap", "tap"],
];

const DISTRACTOR_WORDS = [
  "house", "chair", "purple", "lunch", "window", "orange", "basket",
  "pencil", "garden", "river", "button", "cloud", "feather", "marble",
  "trumpet", "blanket", "castle", "dragon", "forest", "hammer",
];

export function rhymeMatch(container) {
  return new Promise((resolve) => {
    abortActiveGame();
    const signal = createAbortSignal();
    activeAbort = signal;
    container.innerHTML = "";
    let score = 0;
    let round = 0;
    const maxRounds = 6;
    const usedGroups = new Set();

    function nextRound() {
      if (signal.aborted) return;
      if (round >= maxRounds) { finish(); return; }
      container.innerHTML = "";
      round++;

      // Pick a rhyme group we haven't used
      let groupIdx;
      do { groupIdx = Math.floor(Math.random() * RHYME_PAIRS.length); }
      while (usedGroups.has(groupIdx) && usedGroups.size < RHYME_PAIRS.length);
      usedGroups.add(groupIdx);

      const group = RHYME_PAIRS[groupIdx];
      const targetWord = group[0];
      const correctAnswer = pick(group.slice(1));
      // 3 distractors
      const distractors = shuffle(DISTRACTOR_WORDS).slice(0, 3);
      const options = shuffle([correctAnswer, ...distractors]);

      const title = h("div", { class: "game-round" }, `Round ${round}/${maxRounds}`);
      const prompt = h("div", { class: "game-prompt" }, `Which word rhymes with "${targetWord}"?`);
      const optionsDiv = h("div", { class: "game-options" });

      container.append(title, prompt, optionsDiv);

      let answered = false;
      let stopTimer = timerBar(container, 30, () => {
        if (answered || signal.aborted) return;
        answered = true;
        playWompWomp();
        for (const b of optionsDiv.children) {
          if (b.textContent === correctAnswer) b.style.background = "var(--green)";
          b.disabled = true;
        }
        safeTimeout(nextRound, 1500, signal);
      }, signal);

      for (const opt of options) {
        const btn = h("button", { type: "button", class: "game-option-btn" }, opt);
        btn.addEventListener("click", () => {
          if (answered || signal.aborted) return;
          answered = true;
          stopTimer();
          if (opt === correctAnswer) {
            score += 10;
            btn.style.background = "var(--green)";
            playCelebration();
            snowflakeCelebration();
            for (const b of optionsDiv.children) b.disabled = true;
            safeTimeout(nextRound, 2000, signal);
          } else {
            btn.style.background = "var(--accent)";
            playWompWomp();
            for (const b of optionsDiv.children) {
              if (b.textContent === correctAnswer) b.style.background = "var(--green)";
              b.disabled = true;
            }
            safeTimeout(nextRound, 1500, signal);
          }
        });
        optionsDiv.append(btn);
      }
    }

    function finish() {
      if (signal.aborted) return;
      container.innerHTML = "";
      const msg = h("div", { class: "game-result" }, `You scored ${score} points!`);
      if (score > 0) {
        playCelebration();
        snowflakeCelebration();
      }
      const btn = h("button", { type: "button", class: "game-btn" }, "Done");
      btn.addEventListener("click", () => resolve({ game: "rhymeMatch", score }));
      container.append(msg, btn);
      btn.focus();
    }

    nextRound();
  });
}

/** Launch a random game, or a specific one by name */
export const GAME_LIST = [
  { id: "unscramble", name: "Word Unscramble", fn: wordUnscramble, icon: "\uD83D\uDD24" },
  { id: "numberTarget", name: "Number Target", fn: numberTarget, icon: "\uD83D\uDD22" },
  { id: "rhymeMatch", name: "Rhyme Match", fn: rhymeMatch, icon: "\uD83C\uDFB5" },
];

export function launchGame(container, gameId) {
  const game = gameId
    ? GAME_LIST.find((g) => g.id === gameId)
    : pick(GAME_LIST);
  return game.fn(container);
}
