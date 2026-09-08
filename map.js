import { loadState } from "./storage.js";
import { sleighSvgReady } from "./sleigh-loader.js";
import { ROUTE } from "./route.js";
import { CITIES } from "./cities.js";
import { SEARCHABLE_CITIES } from "./city-search-data.js";

let state = loadState();

const routeTimes = ROUTE.map((s) => new Date(s.arrive).getTime());

const GIFT_SCALE = 16.89;
const cumulativeGifts = [];
{
  let sum = 0;
  for (const stop of ROUTE) {
    sum += stop.gifts;
    cumulativeGifts.push(Math.round(sum * GIFT_SCALE));
  }
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const legDistances = [];
for (let i = 0; i < ROUTE.length - 1; i++) {
  legDistances.push(
    haversineKm(ROUTE[i].lat, ROUTE[i].lng, ROUTE[i + 1].lat, ROUTE[i + 1].lng)
  );
}
const cumulativeDistance = [];
{
  let sum = 0;
  cumulativeDistance.push(0);
  for (const d of legDistances) {
    sum += d;
    cumulativeDistance.push(sum);
  }
}

/* ── Time helpers ── */
function getChristmasEve(year) {
  return new Date(Date.UTC(year, 11, 24, 10, 0, 0)).getTime();
}
function getChristmasEnd(year) {
  return new Date(Date.UTC(year, 11, 25, 10, 0, 0)).getTime();
}

/* ── Speed / demo ── */
let speedMode = "real";
let demoStart = null;
let demoRealStart = null;
const DEMO_SPEEDS = { slow: 900, fast: 7200 };

function getSimTime() {
  const now = Date.now();
  if (speedMode === "real") return now;
  if (!demoStart) {
    demoStart = getChristmasEve(new Date(now).getUTCFullYear());
    demoRealStart = now;
  }
  return demoStart + (now - demoRealStart) * DEMO_SPEEDS[speedMode];
}

/* ── Palette ── */
const COUNTRY_COLORS = [
  "#2d5a3d","#3a6b4e","#1e4d3a","#4a7c5c","#2b6e4f",
  "#3d7a5e","#1a5c3b","#4e8c6a","#2a6347","#357552",
  "#1f5e3e","#468060","#325f45","#3b7354","#286149",
  "#4b8566","#2e6d50","#397058","#1c5639","#43795b",
];

/* ── Map setup ── */
const container = document.getElementById("map-container");
const svg = d3.select(container).append("svg").attr("aria-label", "World map showing Santa's flight path");
const defs = svg.append("defs");
const g = svg.append("g");

/* Layered groups — appended in z-order (later = on top) */
const countriesG = g.append("g");
const overlayG = g.append("g").style("pointer-events", "none");
const dimDotsG = g.append("g").style("pointer-events", "none");
const litDotsG = g.append("g").style("pointer-events", "none");
const stopMarkersG = g.append("g");
const boundaryG = g.append("g").style("pointer-events", "none");
const santaG = g.append("g").attr("id", "santa-group");

let width, height, projection, path;

/* Clip path — lit city dots only show in the delivered region */
const deliveredClip = defs.append("clipPath").attr("id", "delivered-clip");
const clipRect = deliveredClip.append("rect");
litDotsG.attr("clip-path", "url(#delivered-clip)");

/* Overlay gradient — dims undelivered land, warms delivered land */
const overlayGrad = defs.append("linearGradient")
  .attr("id", "overlay-grad")
  .attr("gradientUnits", "userSpaceOnUse");

const gStops = [
  overlayGrad.append("stop").attr("stop-color", "rgba(5,8,25,0.38)"),
  overlayGrad.append("stop").attr("stop-color", "rgba(5,8,25,0.32)"),
  overlayGrad.append("stop").attr("stop-color", "rgba(0,0,0,0)"),
  overlayGrad.append("stop").attr("stop-color", "rgba(255,180,60,0.08)"),
  overlayGrad.append("stop").attr("stop-color", "rgba(255,150,40,0.12)"),
];

const overlayRect = overlayG.append("rect");

/* Antarctica mask — keeps the continent dark regardless of delivered state */
const antarcticaMaskG = g.insert("g", ":nth-child(3)").style("pointer-events", "none");
const antarcticaMask = antarcticaMaskG.append("rect")
  .attr("fill", "rgba(5,8,25,0.45)");

/* Boundary glow — soft vertical line at Santa's longitude */
const boundaryLine = boundaryG.append("rect")
  .attr("fill", "rgba(255,210,80,0.25)")
  .style("filter", "blur(6px)");

function resize() {
  width = container.clientWidth;
  height = container.clientHeight;
  svg.attr("viewBox", `0 0 ${width} ${height}`);
  projection = d3.geoEquirectangular()
    .rotate([-22.6, 0])
    .fitSize([width, height], { type: "Sphere" });
  path = d3.geoPath(projection);

  overlayGrad.attr("x1", 0).attr("y1", 0).attr("x2", width).attr("y2", 0);
  overlayRect.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height)
    .attr("fill", "url(#overlay-grad)");
  clipRect.attr("y", 0).attr("height", height);

  const antarcticaY = projection([0, -60]);
  if (antarcticaY) {
    antarcticaMask.attr("x", 0).attr("y", antarcticaY[1])
      .attr("width", width).attr("height", height - antarcticaY[1]);
  }

  if (window._countries) renderCountries(window._countries);
  renderStars();
  renderCityDots();
  renderStopMarkers();
  updateSanta();
}

/* Stars */
function renderStars() {
  svg.selectAll(".star").remove();
  const n = Math.floor((width * height) / 3000);
  for (let i = 0; i < n; i++) {
    svg
      .insert("circle", ":first-child")
      .attr("class", "star")
      .attr("cx", Math.random() * width)
      .attr("cy", Math.random() * height)
      .attr("r", Math.random() * 1.5 + 0.3)
      .style("--dur", Math.random() * 3 + 2 + "s")
      .style("--delay", Math.random() * 5 + "s");
  }
}

/* Countries */
function renderCountries(countries) {
  countriesG.selectAll("path.country").remove();
  countriesG.selectAll("path.country")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill", (d, i) => COUNTRY_COLORS[i % COUNTRY_COLORS.length])
    .attr("stroke", "#0a1628")
    .attr("stroke-width", 0.5);
}

/* City dots — 937 world cities, dim everywhere + lit in delivered region */
function renderCityDots() {
  dimDotsG.selectAll("*").remove();
  litDotsG.selectAll("*").remove();

  CITIES.forEach(([lng, lat]) => {
    if (lat < -60) return;
    const p = projection([lng, lat]);
    if (!p) return;
    dimDotsG.append("circle")
      .attr("cx", p[0]).attr("cy", p[1])
      .attr("r", 1.0)
      .attr("fill", "#3a5060")
      .attr("opacity", 0.3);
    litDotsG.append("circle")
      .attr("cx", p[0]).attr("cy", p[1])
      .attr("r", 1.4)
      .attr("fill", "#ffcc44")
      .attr("opacity", 0.65);
  });
}

/* Route stop markers — 87 stops, appear when visited */
function renderStopMarkers() {
  stopMarkersG.selectAll("*").remove();
  const tooltip = document.getElementById("city-tooltip");

  ROUTE.forEach((stop, i) => {
    const p = projection([stop.lng, stop.lat]);
    if (!p) return;
    stopMarkersG.append("circle")
      .attr("class", "stop-marker")
      .attr("data-idx", i)
      .attr("cx", p[0]).attr("cy", p[1])
      .attr("r", 3)
      .attr("fill", "#ffd700")
      .attr("opacity", 0)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseenter", function (e) {
        tooltip.textContent = stop.name;
        tooltip.classList.add("show");
        const rect = container.getBoundingClientRect();
        tooltip.style.left = e.clientX - rect.left + 10 + "px";
        tooltip.style.top = e.clientY - rect.top - 30 + "px";
      })
      .on("mouseleave", function () {
        tooltip.classList.remove("show");
      });
  });
}

/* ── Santa SVG from external asset ── */
sleighSvgReady.then((svgText) => {
    if (!svgText) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const rig = doc.getElementById("rig");
    if (!rig) return;
    const imported = document.importNode(rig, true);
    santaG.node().appendChild(imported);
    applySleighColor(state.sleighColor || "#cc0000");
  })
  .catch((err) => console.warn("Could not load sleigh.svg, falling back to dot:", err));

function applySleighColor(color) {
  const node = santaG.node();
  node.querySelectorAll(".sleigh-body").forEach((el) => el.setAttribute("fill", color));
  node.querySelectorAll(".sleigh-scroll").forEach((el) => el.setAttribute("stroke", color));
}

window.addEventListener("sleigh-updated", () => {
  state = loadState();
  applySleighColor(state.sleighColor || "#cc0000");
});

/* ── Timing / state ── */
function getSantaState(simNow) {
  const year = new Date(simNow).getUTCFullYear();
  const yearOffset = getChristmasEve(year) - getChristmasEve(2026);
  const times = routeTimes.map((t) => t + yearOffset);

  if (simNow < times[0]) {
    return {
      phase: "before",
      countdown: times[0] - simNow,
      stopIdx: -1,
      lat: 84,
      lng: 0,
      t: 0,
      times,
    };
  }
  if (simNow >= times[times.length - 1]) {
    return {
      phase: "done",
      stopIdx: ROUTE.length - 1,
      lat: 84,
      lng: 0,
      t: 1,
      times,
    };
  }
  for (let i = 0; i < times.length - 1; i++) {
    if (simNow >= times[i] && simNow < times[i + 1]) {
      const t = (simNow - times[i]) / (times[i + 1] - times[i]);
      const a = ROUTE[i],
        b = ROUTE[i + 1];
      let dlng = b.lng - a.lng;
      if (dlng > 180) dlng -= 360;
      if (dlng < -180) dlng += 360;
      return {
        phase: "flying",
        stopIdx: i,
        nextIdx: i + 1,
        t,
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + dlng * t,
        times,
      };
    }
  }
  return { phase: "before", countdown: 0, stopIdx: -1, lat: 84, lng: 0, t: 0, times };
}

function isChristmasSeason(now) {
  const d = new Date(now);
  return d.getUTCMonth() === 11 && (d.getUTCDate() === 24 || d.getUTCDate() === 25);
}

function getNextChristmasEve() {
  const year = new Date().getUTCFullYear();
  const eve = getChristmasEve(year);
  return Date.now() > getChristmasEnd(year) ? getChristmasEve(year + 1) : eve;
}

/* ── Formatting ── */
function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatDuration(ms) {
  if (ms <= 0) return "Arriving!";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

function formatTimeFromMs(ms) {
  const d = new Date(ms);
  let h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${pad2(m)} ${ampm}`;
}

/* ── Animated gift counter ── */
let displayedGifts = 0;
let targetGifts = 0;

function getGiftsDelivered(st) {
  if (st.phase === "before") return 0;
  if (st.phase === "done") return cumulativeGifts[cumulativeGifts.length - 1];
  const completed = st.stopIdx >= 0 ? cumulativeGifts[st.stopIdx] : 0;
  const legGifts =
    st.stopIdx < ROUTE.length - 1
      ? Math.round(ROUTE[st.nextIdx].gifts * GIFT_SCALE * st.t)
      : 0;
  return Math.floor(completed + legGifts);
}

function animateGiftCounter() {
  if (displayedGifts === targetGifts) return;
  const diff = targetGifts - displayedGifts;
  const step = Math.max(1, Math.ceil(Math.abs(diff) / 20));
  displayedGifts += diff > 0 ? Math.min(step, diff) : -Math.min(step, -diff);
  const el = document.getElementById("gift-count");
  el.textContent = displayedGifts.toLocaleString();
  el.classList.remove("count-tick");
  void el.offsetWidth;
  el.classList.add("count-tick");
}

/* ── Distance & speed ── */
function getDistanceAndSpeed(st) {
  if (st.phase === "before") return { distKm: 0, speedKmh: 0 };
  if (st.phase === "done") {
    return { distKm: Math.round(cumulativeDistance[cumulativeDistance.length - 1]), speedKmh: 0 };
  }
  const completedDist = cumulativeDistance[st.stopIdx];
  const legDist = legDistances[st.stopIdx];
  const distKm = Math.round(completedDist + legDist * st.t);
  const legTimeMs = st.times[st.nextIdx] - st.times[st.stopIdx];
  const legTimeH = legTimeMs / 3_600_000;
  const speedKmh = legTimeH > 0 ? Math.round(legDist / legTimeH) : 0;
  return { distKm, speedKmh };
}

/* ── Countdown overlay (off-season) ── */
function updateCountdownOverlay(realNow) {
  const nextEve = getNextChristmasEve();
  const diff = Math.max(0, nextEve - realNow);
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  document.getElementById("cd-days").textContent = days;
  document.getElementById("cd-hours").textContent = pad2(hours);
  document.getElementById("cd-mins").textContent = pad2(mins);
  document.getElementById("cd-secs").textContent = pad2(secs);
}

/* ── Delivered-region boundary ── */
function getDeliveredBoundaryX(st) {
  if (st.phase === "before") return width;
  if (st.phase === "done") return 0;

  const pos = projection([st.lng, st.lat]);
  if (!pos) return width;

  const departPos = projection([ROUTE[st.stopIdx].lng, ROUTE[st.stopIdx].lat]);
  if (!departPos) return pos[0];

  // If projected x jumped far rightward, the path crossed the map seam.
  if (pos[0] > departPos[0] + width * 0.3) {
    return Math.max(0, departPos[0] * (1 - st.t));
  }
  return pos[0];
}

function updateDelivered(bx, phase, visitedStops) {
  const frac = Math.max(0, Math.min(1, bx / width));
  const edge = 0.04;
  gStops[0].attr("offset", "0%");
  gStops[1].attr("offset", `${Math.max(0, frac - edge) * 100}%`);
  gStops[2].attr("offset", `${frac * 100}%`);
  gStops[3].attr("offset", `${Math.min(1, frac + edge) * 100}%`);
  gStops[4].attr("offset", "100%");

  clipRect.attr("x", bx).attr("width", Math.max(0, width - bx));

  stopMarkersG.selectAll(".stop-marker").each(function () {
    const idx = parseInt(this.getAttribute("data-idx"));
    this.setAttribute("opacity", idx <= visitedStops ? "0.85" : "0");
  });

  if (phase === "flying") {
    boundaryLine
      .attr("x", bx - 5).attr("y", 0)
      .attr("width", 10).attr("height", height)
      .attr("opacity", 0.7);
  } else {
    boundaryLine.attr("opacity", 0);
  }
}

/* ── Main update ── */
function updateSanta() {
  const simNow = getSimTime();
  const st = getSantaState(simNow);
  const realNow = Date.now();
  const inSeason = isChristmasSeason(realNow);
  const inSimSeason = speedMode !== "real" || inSeason;

  if (projection) {
    const pos = projection([st.lng, st.lat]);
    if (pos) {
      santaG.attr("transform", `translate(${pos[0] - 120 * 0.42},${pos[1] - 55 * 0.42}) scale(0.42)`);
      const bx = getDeliveredBoundaryX(st);
      updateDelivered(bx, st.phase, st.stopIdx);
    }
  }

  const overlay = document.getElementById("countdown-overlay");

  if (!inSimSeason && st.phase === "before") {
    overlay.classList.remove("hidden");
    updateCountdownOverlay(realNow);
    setText("status-text", "Parked at North Pole");
    setText("status-sub", "Waiting for Christmas Eve");
    setText("current-city", "North Pole");
    setText("current-fact", "The reindeer are being fed and the list is being double-checked.");
    setHtml("current-weather", "");
    setText("next-city", ROUTE[0].name);
    setText("next-eta", "On Christmas Eve!");
    setText("gift-count", "0");
    setText("gift-sub", "Loading the sleigh…");
    updateLocalTimePanel(realNow, 0);
    setText("distance-val", "0 km");
    setText("speed-val", "0 km/h");
    return;
  }

  overlay.classList.add("hidden");

  if (st.phase === "before") {
    setText("status-text", "Pre-Flight");
    setText("status-sub", "Takes off in " + formatDuration(st.countdown));
    setText("current-city", "North Pole");
    setText("current-fact", "Loading the sleigh…");
    setHtml("current-weather", "");
    setText("next-city", ROUTE[0].name);
    setText("next-eta", formatDuration(st.countdown));
    targetGifts = 0;
    setText("gift-sub", "All packed and ready!");
    setText("distance-val", "0 km");
    setText("speed-val", "0 km/h");
  } else if (st.phase === "flying") {
    const prev = ROUTE[st.stopIdx];
    const next = ROUTE[st.nextIdx];
    const eta = st.times[st.nextIdx] - simNow;

    setText("status-text", "In Flight");
    setText("status-sub", `En route from ${prev.name} to ${next.name}`);
    setText("current-city", prev.name);
    setText("current-fact", prev.fact);
    setHtml("current-weather", "");
    setText("next-city", next.name);
    setText("next-eta", formatDuration(eta));

    targetGifts = getGiftsDelivered(st);
    setText("gift-sub", `${st.stopIdx + 1} of ${ROUTE.length} stops visited`);

    const { distKm, speedKmh } = getDistanceAndSpeed(st);
    setText("distance-val", distKm.toLocaleString() + " km");
    setText("speed-val", speedKmh.toLocaleString() + " km/h");
  } else {
    const last = ROUTE[ROUTE.length - 1];
    setText("status-text", "Journey Complete!");
    setText("status-sub", "Merry Christmas!");
    setText("current-city", "North Pole");
    setText("current-fact", "Back home, safe and sound!");
    setHtml("current-weather", "");
    setText("next-city", `Last delivery: ${last.name}`);
    setText("next-eta", "—");
    targetGifts = cumulativeGifts[cumulativeGifts.length - 1];
    setText("gift-sub", "All stops visited!");
    const totalDist = Math.round(cumulativeDistance[cumulativeDistance.length - 1]);
    setText("distance-val", totalDist.toLocaleString() + " km");
    setText("speed-val", "0 km/h");
  }

  const lng = (typeof st.lng === "number" && !isNaN(st.lng))
    ? st.lng
    : (st.nextIdx != null ? ROUTE[st.nextIdx].lng : ROUTE[0].lng);
  updateLocalTimePanel(simNow, lng);
}

function updateLocalTimePanel(utcMs, lng) {
  if (typeof lng !== "number" || isNaN(lng)) {
    setText("local-time", "—");
    setText("local-tz", "");
    return;
  }
  const offsetHours = Math.round(lng / 15);
  const localMs = utcMs + offsetHours * 3600000;
  const d = new Date(localMs);
  let h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const s = d.getUTCSeconds();
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  setText("local-time", `${h}:${pad2(m)}:${pad2(s)} ${ampm}`);
  setText("local-tz", `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`);
}

/* DOM helpers */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ── Speed toggle ── */
document.querySelectorAll("#speed-toggle button").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll("#speed-toggle button").forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const newSpeed = this.dataset.speed;
    if (newSpeed !== speedMode) {
      speedMode = newSpeed;
      demoStart = null;
      demoRealStart = null;
    }
  });
});

/* ── City search with fuzzy matching ── */
document.getElementById("search-btn").addEventListener("click", doSearch);
document.getElementById("city-search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});
document.getElementById("city-search").addEventListener("input", doSearch);

function fuzzyScore(query, target) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 1000 - t.indexOf(q);
  let qi = 0;
  let score = 0;
  let consecutive = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      qi++;
      consecutive++;
      score += consecutive * 2;
    } else {
      consecutive = 0;
    }
  }
  return qi === q.length ? score : 0;
}

function nearestStop(lat, lng) {
  let best = null;
  let bestDist = Infinity;
  for (const stop of ROUTE) {
    const d = haversineKm(lat, lng, stop.lat, stop.lng);
    if (d < bestDist) {
      bestDist = d;
      best = stop;
    }
  }
  return best;
}

function findCity(query) {
  const q = query.toLowerCase().trim();
  if (SEARCHABLE_CITIES[q]) return { name: q, coords: SEARCHABLE_CITIES[q] };
  let best = null;
  for (const [name, coords] of Object.entries(SEARCHABLE_CITIES)) {
    if (name.startsWith(q) || q.startsWith(name)) {
      if (!best || name.length < best.name.length) best = { name, coords };
    } else if (!best && (name.includes(q) || q.includes(name))) {
      best = { name, coords };
    }
  }
  return best;
}

function doSearch() {
  const q = document.getElementById("city-search").value.trim();
  const result = document.getElementById("search-result");
  if (!q) {
    result.innerHTML = "";
    return;
  }

  const scored = ROUTE.map((stop) => ({ stop, score: fuzzyScore(q, stop.name) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const simNow = getSimTime();
  const year = new Date(simNow).getUTCFullYear();
  const yearOffset = getChristmasEve(year) - getChristmasEve(2026);

  if (scored.length > 0) {
    const match = scored[0].stop;
    const arriveTime = new Date(match.arrive).getTime() + yearOffset;

    if (simNow >= arriveTime) {
      const timeStr = formatTimeFromMs(arriveTime);
      result.innerHTML =
        `<span style="color:var(--green)">Santa visited <strong>${match.name}</strong> at ${timeStr}!</span>` +
        `<br><span class="fun-fact">${match.fact}</span>`;
    } else {
      const eta = arriveTime - simNow;
      result.innerHTML =
        `<span style="color:var(--blue)">Santa will arrive at <strong>${match.name}</strong> in about <strong>${formatDuration(eta)}</strong>!</span>` +
        `<br><span class="fun-fact">${match.fact}</span>`;
    }
    return;
  }

  const city = findCity(q);
  if (city) {
    const [lat, lng] = city.coords;
    const displayName = city.name.replace(/\b\w/g, c => c.toUpperCase());
    const closest = nearestStop(lat, lng);
    const arriveTime = new Date(closest.arrive).getTime() + yearOffset;

    if (simNow >= arriveTime) {
      result.innerHTML =
        `<span style="color:var(--green)">Santa has delivered to <strong>${displayName}</strong>! ` +
        `The nearest route stop was <strong>${closest.name}</strong>.</span>` +
        `<br><span class="fun-fact">${closest.fact}</span>`;
    } else {
      const eta = arriveTime - simNow;
      result.innerHTML =
        `<span style="color:var(--blue)">Santa is on his way to <strong>${displayName}</strong>! ` +
        `He'll be near there in about <strong>${formatDuration(eta)}</strong> ` +
        `(stopping at <strong>${closest.name}</strong>).</span>` +
        `<br><span class="fun-fact">${closest.fact}</span>`;
    }
    return;
  }

  result.innerHTML = `<span style="color:var(--gold)">We couldn't find "${q}", but don't worry — Santa knows where everyone lives!</span>`;
}

/* ── Load map data ── */
d3.json("assets/vendor/countries-110m.json")
  .then((world) => {
    const countries = topojson.feature(world, world.objects.countries);
    window._countries = countries;
    resize();
  })
  .catch((err) => {
    console.error("Failed to load map data:", err);
    resize();
  });

window.addEventListener("resize", resize);

setText("countdown-first-stop", `First stop: ${ROUTE[0].name}`);

/* ── Main loop ── */
function tick() {
  updateSanta();
  animateGiftCounter();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
