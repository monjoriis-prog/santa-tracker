/* hero.js — procedural decoration for the landing hero SVG:
   stars, string-light bulbs, glowing windows, chimney smoke, snowflakes,
   countdown text, and the "Start tracking" scroll button. */

const ns = "http://www.w3.org/2000/svg";
function el(t, a) {
  const e = document.createElementNS(ns, t);
  for (const k in a) e.setAttribute(k, a[k]);
  return e;
}

/* Stars */
const st = document.getElementById("hero-stars");
if (st) {
  for (let i = 0; i < 55; i++) {
    const c = el("circle", {
      cx: (Math.random() * 800).toFixed(1),
      cy: (Math.random() * 230).toFixed(1),
      r: (Math.random() * 1.2 + 0.4).toFixed(1),
      fill: "#DCE8F7",
    });
    c.style.animation = `twk ${(2 + Math.random() * 3).toFixed(1)}s ease-in-out infinite`;
    c.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;
    st.appendChild(c);
  }
}

/* String-light bulbs along the swag path */
const swag = document.getElementById("hero-swag");
const bg = document.getElementById("hero-bulbs");
if (swag && bg) {
  const cols = ["#FF6B6B", "#FFD277", "#5DCAA5", "#7FB3D5", "#F49BC1"];
  const L = swag.getTotalLength();
  for (let b = 0; b < 26; b++) {
    const p = swag.getPointAtLength(L * (b + 0.5) / 26);
    bg.appendChild(el("line", { x1: p.x.toFixed(1), y1: p.y.toFixed(1), x2: p.x.toFixed(1), y2: (p.y + 3).toFixed(1), stroke: "#2B3F5E", "stroke-width": "1" }));
    const bulb = el("circle", { cx: p.x.toFixed(1), cy: (p.y + 5).toFixed(1), r: 3.4, fill: cols[b % cols.length] });
    bulb.setAttribute("class", "hero-bulb");
    bulb.style.animation = `glow ${(1.8 + Math.random() * 2).toFixed(1)}s ease-in-out infinite`;
    bulb.style.animationDelay = `${(Math.random() * 2).toFixed(1)}s`;
    bg.appendChild(bulb);
  }
}

/* Glowing windows */
document.querySelectorAll(".hero-win").forEach((w) => {
  w.style.animation = `glow ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite`;
  w.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;
});

/* Chimney smoke */
const curls = [
  "M0 0 C -5 -6, 5 -11, 0 -17 C -5 -23, 4 -27, -1 -31",
  "M0 0 C 5 -6, -5 -11, 0 -17 C 5 -23, -4 -27, 1 -31",
  "M0 0 C -4 -7, 5 -12, 1 -18 C -4 -24, 4 -28, 0 -32",
];
const sm = document.getElementById("hero-smoke");
if (sm) {
  [[110, 304], [386, 298], [652, 304]].forEach((p, idx) => {
    for (let j = 0; j < 4; j++) {
      const pos = el("g", { transform: `translate(${p[0]},${p[1]})` });
      const w = el("path", { d: curls[j % curls.length], stroke: "#D8E6F3", fill: "none", "stroke-width": (2.2 + Math.random()).toFixed(1), "stroke-linecap": "round", opacity: "0" });
      w.setAttribute("class", "hero-wisp");
      w.style.animation = `wisp ${(3 + j * 0.3).toFixed(1)}s ease-out infinite`;
      w.style.animationDelay = `${(j * 0.8 + idx * 0.4).toFixed(1)}s`;
      pos.appendChild(w);
      sm.appendChild(pos);
    }
  });
}

/* Snowflakes */
const FLAKE = "M0 -6 L0 6 M-5.2 -3 L5.2 3 M-5.2 3 L5.2 -3 M0 -3.6 L-1.7 -5.2 M0 -3.6 L1.7 -5.2 M0 3.6 L-1.7 5.2 M0 3.6 L1.7 5.2 M-3.1 -1.8 L-4.5 -1.1 M-3.1 -1.8 L-3.3 -3.4 M3.1 1.8 L4.5 1.1 M3.1 1.8 L3.3 3.4 M-3.1 1.8 L-4.5 1.1 M-3.1 1.8 L-3.3 3.4 M3.1 -1.8 L4.5 -1.1 M3.1 -1.8 L3.3 -3.4";
const sn = document.getElementById("hero-snow");
if (sn) {
  for (let k = 0; k < 78; k++) {
    const x = (Math.random() * 800).toFixed(1);
    const y = (-Math.random() * 80).toFixed(1);
    const pos = el("g", { transform: `translate(${x},${y})` });
    const outer = el("g", {});
    outer.setAttribute("class", "hero-sn");
    outer.style.animation = `hero-fall ${(8 + Math.random() * 10).toFixed(1)}s linear infinite`;
    outer.style.animationDelay = `${(Math.random() * 12).toFixed(1)}s`;
    const mid = el("g", {});
    mid.setAttribute("class", "hero-sw");
    mid.style.animation = `hero-sway ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite`;
    mid.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;
    let shape;
    if (Math.random() < 0.45) {
      const s = (0.35 + Math.random() * 0.55).toFixed(2);
      shape = el("path", { d: FLAKE, stroke: "#FFFFFF", fill: "none", "stroke-width": (1.5 / s).toFixed(2), "stroke-linecap": "round", transform: `scale(${s})`, opacity: (0.55 + Math.random() * 0.4).toFixed(2) });
      shape.setAttribute("class", "hero-flake");
      shape.style.animation = `hero-spin ${(9 + Math.random() * 14).toFixed(1)}s linear infinite`;
    } else {
      shape = el("circle", { cx: 0, cy: 0, r: (Math.random() * 1.7 + 0.7).toFixed(1), fill: "#FFFFFF", opacity: (0.45 + Math.random() * 0.45).toFixed(2) });
    }
    mid.appendChild(shape);
    outer.appendChild(mid);
    pos.appendChild(outer);
    sn.appendChild(pos);
  }
}

/* "Start tracking" scrolls to map */
document.getElementById("start-tracking")?.addEventListener("click", () => {
  document.getElementById("map-container")?.scrollIntoView({ behavior: "smooth" });
});

/* Countdown in hero */
function updateHeroCountdown() {
  const el = document.getElementById("hero-countdown");
  if (!el) return;
  const now = new Date();
  const year = now.getUTCFullYear();
  let eve = new Date(Date.UTC(year, 11, 24, 5, 0, 0)).getTime();
  if (Date.now() > new Date(Date.UTC(year, 11, 25, 2, 0, 0)).getTime()) {
    eve = new Date(Date.UTC(year + 1, 11, 24, 5, 0, 0)).getTime();
  }
  const diff = Math.max(0, eve - Date.now());
  if (diff === 0) { el.textContent = "Santa is flying right now!"; return; }
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  el.textContent = `${d} days, ${h} hours, ${m} minutes until takeoff`;
}
updateHeroCountdown();
setInterval(updateHeroCountdown, 10000);
