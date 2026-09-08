/**
 * app.js — Orchestrator for all views beyond the tracker:
 *   Advent Calendar, Workshop Hub, Letter to Santa,
 *   Nice List Check, Sleigh Customizer, Photo of Santa
 */
import { loadState, saveState } from "./storage.js";
import { GAME_LIST, launchGame, abortActiveGame } from "./games.js";
import { sleighSvgReady } from "./sleigh-loader.js";
import { CHARACTERS, ADVENT_CSS, renderCharacter } from "./advent-characters.js";

let state = loadState();

/* ── Helpers ── */
const $ = (id) => document.getElementById(id);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ── Navigation ── */
const views = ["tracker", "advent", "workshop", "letter", "nicelist", "customizer", "about"];

function showView(id) {
  // Kill any running game when switching views
  abortActiveGame();
  $("game-modal")?.classList.add("hidden");

  for (const v of views) {
    const el = $(`view-${v}`);
    if (el) el.classList.toggle("hidden", v !== id);
  }
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === id);
  });
  // Refresh view-specific content
  if (id === "advent") renderAdvent();
  if (id === "nicelist") refreshNiceList();
  if (id === "customizer") refreshCustomizer();
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

/* ═══════════════════════════════════════════
   ADVENT CALENDAR  — character collectibles
   ═══════════════════════════════════════════ */

// Inject character animation CSS once
{
  const s = document.createElement("style");
  s.textContent = ADVENT_CSS;
  document.head.appendChild(s);
}

let showingCollection = false;

function renderAdvent() {
  const grid = $("advent-grid");
  if (!grid) return;
  grid.innerHTML = "";
  state = loadState();

  if (showingCollection) {
    renderCollection(grid);
    return;
  }

  for (let day = 1; day <= 24; day++) {
    const ch = CHARACTERS[day - 1];
    const opened = !!state.doors[day];
    const door = document.createElement("button");
    door.type = "button";
    door.className = "advent-door unlocked" + (opened ? " opened" : "");
    door.setAttribute("aria-label", `Door ${day} — ${ch.name}${opened ? " (opened)" : ""}`);

    if (opened) {
      const svg = renderCharacter(ch.id, "56px");
      door.appendChild(svg);
      const nameEl = document.createElement("span");
      nameEl.className = "door-char-name";
      nameEl.textContent = ch.name;
      door.appendChild(nameEl);
    } else {
      door.innerHTML = `<span class="door-num">${day}</span>`;
      door.setAttribute("data-sound", "open");
      door.addEventListener("click", () => openAdventDoor(day));
    }
    grid.append(door);
  }
}

function openAdventDoor(day) {
  const ch = CHARACTERS[day - 1];

  // Record
  state = loadState();
  state.doors[day] = { character: ch.id, ts: Date.now() };
  saveState(state);

  // Show character in modal
  const modal = $("game-modal");
  const gameArea = $("game-area");
  const modalTitle = $("game-modal-title");
  modal.classList.remove("hidden");
  modalTitle.textContent = `Door ${day}`;

  gameArea.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "advent-reveal";
  const svg = renderCharacter(ch.id, "140px");
  wrap.appendChild(svg);
  const name = document.createElement("div");
  name.className = "advent-reveal-name";
  name.textContent = ch.name;
  wrap.appendChild(name);
  gameArea.appendChild(wrap);

  // Celebration effect
  if (typeof window.santaSound?.play === "function") window.santaSound.play("celebrate");
  spawnCelebration();

  renderAdvent();
}

function spawnCelebration() {
  const overlay = document.createElement("div");
  overlay.className = "snowflake-overlay";
  document.body.appendChild(overlay);
  const symbols = ["\u2744", "\u2728", "\u2B50", "\u2764"];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("span");
    p.className = "snowflake-particle";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + "%";
    p.style.fontSize = (Math.random() * 18 + 14) + "px";
    p.style.animationDuration = (Math.random() * 1.5 + 1.5) + "s";
    p.style.animationDelay = (Math.random() * 0.6) + "s";
    overlay.appendChild(p);
  }
  setTimeout(() => overlay.remove(), 3000);
}

function renderCollection(grid) {
  grid.className = "collection-grid";
  for (let i = 0; i < 24; i++) {
    const ch = CHARACTERS[i];
    const cell = document.createElement("div");
    cell.className = "collection-cell";
    const svg = renderCharacter(ch.id, "72px");
    cell.appendChild(svg);
    const label = document.createElement("div");
    label.className = "collection-name";
    label.textContent = ch.name;
    cell.appendChild(label);
    grid.appendChild(cell);
  }
}

$("advent-collection-btn")?.addEventListener("click", () => {
  showingCollection = !showingCollection;
  const btn = $("advent-collection-btn");
  if (btn) btn.textContent = showingCollection ? "Back to Calendar" : "My Collection";
  const grid = $("advent-grid");
  if (grid) {
    grid.className = showingCollection ? "collection-grid" : "advent-grid";
  }
  renderAdvent();
});

// Modal close — abort running game so timers/sounds stop
$("game-modal-close")?.addEventListener("click", () => {
  abortActiveGame();
  $("game-modal").classList.add("hidden");
  $("game-area").innerHTML = "";
});

/* ═══════════════════════════════════════════
   WORKSHOP HUB
   ═══════════════════════════════════════════ */
/* Outline SVG icons — 24×24, stroke-based, no emoji */
const ICONS = {
  pencil: '<svg class="card-icon" viewBox="0 0 24 24"><path d="M17 3l4 4L7 21H3v-4L17 3z"/><path d="M14.5 5.5l4 4"/></svg>',
  hash:   '<svg class="card-icon" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16M10 3v18M14 3v18"/></svg>',
  music:  '<svg class="card-icon" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  star1:  '<svg class="card-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>',
  star2:  '<svg class="card-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/><circle cx="12" cy="12" r="3"/></svg>',
  star3:  '<svg class="card-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/><path d="M8 12h8M12 8v8"/></svg>',
};

const WORKSHOP_BUILDINGS = [
  { id: "unscramble", name: "Word Workshop", icon: ICONS.pencil, accent: "coral", desc: "Unscramble Christmas words!" },
  { id: "numberTarget", name: "Number Forge", icon: ICONS.hash, accent: "teal", desc: "Hit the target number!" },
  { id: "rhymeMatch", name: "Rhyme Stable", icon: ICONS.music, accent: "pink", desc: "Match the rhyming words!" },
];

function renderWorkshop() {
  const grid = $("workshop-grid");
  if (!grid) return;
  grid.innerHTML = "";
  state = loadState();

  for (const bldg of WORKSHOP_BUILDINGS) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "workshop-building";
    card.setAttribute("data-accent", bldg.accent);
    const best = state.scores[bldg.id] || 0;
    card.innerHTML = `
      <span class="building-icon">${bldg.icon}</span>
      <span class="building-name">${bldg.name}</span>
      <span class="building-desc">${bldg.desc}</span>
      <span class="building-best">Best: ${best} pts</span>
    `;
    card.setAttribute("aria-label", `${bldg.name} — ${bldg.desc}`);
    card.addEventListener("click", () => launchWorkshopGame(bldg.id));
    grid.append(card);
  }
}

function launchWorkshopGame(gameId) {
  const modal = $("game-modal");
  const gameArea = $("game-area");
  const modalTitle = $("game-modal-title");
  const bldg = WORKSHOP_BUILDINGS.find((b) => b.id === gameId);
  modal.classList.remove("hidden");
  modalTitle.textContent = bldg ? bldg.name : "Mini-Game";

  launchGame(gameArea, gameId).then(({ game, score }) => {
    state = loadState();
    if (!state.scores[game]) state.scores[game] = 0;
    state.scores[game] = Math.max(state.scores[game], score);
    saveState(state);
    modal.classList.add("hidden");
    renderWorkshop();
  });
}

/* ═══════════════════════════════════════════
   LETTER TO SANTA
   ═══════════════════════════════════════════ */
$("letter-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("letter-name").value.trim() || "Friend";
  const wishes = $("letter-wishes").value.trim() || "Something wonderful";
  const deed = $("letter-deed").value.trim() || "Being kind to everyone";

  // Persist name globally + letter draft
  state = loadState();
  if (name && name !== "Friend") state.name = name;
  state.letterDraft = { wishes, goodDeed: deed };
  saveState(state);

  // Update name across the app
  updateNameDisplay();

  // Render the decorated letter
  const preview = $("letter-preview");
  preview.classList.remove("hidden");
  preview.innerHTML = `
    <div class="letter-decorated">
      <div class="letter-border">
        <div class="letter-header">
          <span class="letter-holly">\uD83C\uDF3F</span>
          North Pole Mail
          <span class="letter-holly">\uD83C\uDF3F</span>
        </div>
        <p class="letter-date">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p>Dear Santa,</p>
        <p>My name is <strong>${esc(name)}</strong>.</p>
        <p>This year, I really wish for: <em>${esc(wishes)}</em></p>
        <p>A good deed I did this year: <em>${esc(deed)}</em></p>
        <p>Thank you, Santa! I'll leave cookies and milk for you.</p>
        <p class="letter-sign">With love,<br><strong>${esc(name)}</strong></p>
        <div class="letter-stamp">\uD83C\uDF85</div>
      </div>
      <p class="letter-disclaimer">This letter stays right here on your device. Nothing is sent anywhere!</p>
      <button type="button" class="game-btn" onclick="window.print()">Print My Letter</button>
    </div>
  `;
});

/* ═══════════════════════════════════════════
   NICE LIST CHECK
   ═══════════════════════════════════════════ */
const NICE_VERDICTS = [
  "Definitely on the Nice List! Santa is very impressed!",
  "EXTRA nice! You might get bonus presents this year!",
  "100% Nice List material! The elves are cheering!",
  "So nice, even the reindeer are smiling!",
  "Nice List confirmed! Santa gave a big thumbs up!",
  "One of the nicest! Your kindness lights up the North Pole!",
  "Nice List VIP! You get the golden star treatment!",
  "Absolutely wonderful! Mrs. Claus baked you special cookies!",
];

function refreshNiceList() {
  state = loadState();
  const nameInput = $("nice-name-input");
  if (nameInput && state.name) nameInput.value = state.name;
}

$("nice-check-btn")?.addEventListener("click", () => {
  const nameInput = $("nice-name-input");
  const name = nameInput.value.trim();
  if (!name) { nameInput.focus(); return; }

  // Save name
  state = loadState();
  state.name = name;
  if (!state.niceListChecked.includes(name)) {
    state.niceListChecked.push(name);
  }
  saveState(state);
  updateNameDisplay();

  // Animate the check
  const resultDiv = $("nice-result");
  const anim = $("nice-animation");
  resultDiv.classList.add("hidden");
  anim.classList.remove("hidden");
  anim.innerHTML = '<div class="nice-spinner"></div><div class="nice-checking">Checking the list...</div>';

  setTimeout(() => {
    anim.innerHTML = '<div class="nice-spinner spin2"></div><div class="nice-checking">Checking it twice...</div>';
  }, 1000);

  setTimeout(() => {
    anim.classList.add("hidden");
    resultDiv.classList.remove("hidden");
    const verdict = NICE_VERDICTS[Math.floor(Math.random() * NICE_VERDICTS.length)];
    resultDiv.innerHTML = `
      <div class="nice-result-card">
        <div class="nice-star">\u2B50</div>
        <div class="nice-name">${esc(name)}</div>
        <div class="nice-verdict">${verdict}</div>
        <div class="nice-badge">NICE LIST \u2713</div>
      </div>
    `;
  }, 2200);
});

/* ═══════════════════════════════════════════
   SLEIGH CUSTOMIZER
   ═══════════════════════════════════════════ */
function refreshCustomizer() {
  state = loadState();
  const colorInput = $("sleigh-color-input");
  const nameInput = $("reindeer-name-input");
  if (colorInput) colorInput.value = state.sleighColor || "#cc0000";
  if (nameInput) nameInput.value = state.reindeerName || "Rudolph";
  updateSleighPreview();
}

$("sleigh-color-input")?.addEventListener("input", (e) => {
  state = loadState();
  state.sleighColor = e.target.value;
  saveState(state);
  updateSleighPreview();
  // Notify map.js
  window.dispatchEvent(new CustomEvent("sleigh-updated", { detail: state }));
});

$("reindeer-name-input")?.addEventListener("input", (e) => {
  state = loadState();
  state.reindeerName = e.target.value.trim() || "Rudolph";
  saveState(state);
  updateSleighPreview();
  window.dispatchEvent(new CustomEvent("sleigh-updated", { detail: state }));
});

/* ── Render sleigh.svg to canvas via recoloured SVG blob ── */
/**
 * Build a colourised SVG blob URL and draw it onto a canvas context.
 * Waits for the SVG to be fetched if it hasn't arrived yet.
 * Returns a Promise that resolves once the image is painted.
 */
async function drawSleighOnCanvas(ctx, x, y, scale, color, rName) {
  const svgText = await sleighSvgReady;
  if (!svgText) return;

  // Recolour: replace .sleigh-body fill and .sleigh-scroll stroke
  const svgStr = svgText
    .replace(/(class="sleigh-body"[^>]*fill=")([^"]*)/g, `$1${color}`)
    .replace(/(class="sleigh-scroll"[^>]*stroke=")([^"]*)/g, `$1${color}`);

  const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w = 240 * scale;
      const h = 110 * scale;
      ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
      URL.revokeObjectURL(url);

      // Reindeer name label below the rig
      ctx.fillStyle = "#ffd700";
      ctx.font = `bold ${Math.round(12 * scale)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(rName, x - w * 0.25, y + h / 2 + 14 * scale);

      resolve();
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
    img.src = url;
  });
}

function updateSleighPreview() {
  const canvas = $("sleigh-preview-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = 360;
  const hh = canvas.height = 180;
  ctx.clearRect(0, 0, w, hh);

  const color = state.sleighColor || "#cc0000";
  const rName = state.reindeerName || "Rudolph";

  // Sky
  ctx.fillStyle = "#0a0e27";
  ctx.fillRect(0, 0, w, hh);

  // Stars
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.3})`;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * hh * 0.6, Math.random() + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawSleighOnCanvas(ctx, w / 2, hh / 2 - 10, 1.2, color, rName);
}

/* ═══════════════════════════════════════════
   NAME DISPLAY (used in greeting and panels)
   ═══════════════════════════════════════════ */
function updateNameDisplay() {
  state = loadState();
  const greeting = $("user-greeting");
  if (greeting) {
    greeting.textContent = state.name ? `Hi, ${state.name}!` : "";
  }
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */
renderWorkshop();
updateNameDisplay();
showView("tracker");

// Mount sound control in nav
if (window.santaSound) {
  window.santaSound.createControl($("sound-control-mount"));
}
// Wire music toggle — never autoplay, only from user click
if (window.santaMusic) {
  window.santaMusic.attachToggle($("music-toggle"));
}
// Clear any stale mute state from earlier debugging — one-time reset
try {
  if (localStorage.getItem("santa:sound") === "0") {
    localStorage.removeItem("santa:sound");
    if (window.santaSound) window.santaSound.setEnabled(true);
  }
} catch(e) {}
