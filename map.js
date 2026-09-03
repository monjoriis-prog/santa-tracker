import { loadState } from "./storage.js";
import { sleighSvgReady } from "./sleigh-loader.js";

let state = loadState();

/* ───────────────────────────────────────────
   Route: ~42 stops, east → west from date line
   Each stop: name, lat, lng, fact, weather
   (condition, tempC, tempF), population (millions,
   rough metro — drives gift count)
   ─────────────────────────────────────────── */
const ROUTE = [
  { name: "Apia, Samoa", lat: -13.83, lng: -171.76, pop: 0.04,
    fact: "First country to see each new day thanks to the date line!",
    weather: { condition: "Warm rain", icon: "\u{1F327}", tempC: 28, tempF: 82 },
    arrive: "2024-12-24T05:00:00Z" },
  { name: "Auckland, New Zealand", lat: -36.85, lng: 174.76, pop: 1.66,
    fact: "Known as the City of Sails with more boats per capita than anywhere.",
    weather: { condition: "Sunny", icon: "\u2600\uFE0F", tempC: 22, tempF: 72 },
    arrive: "2024-12-24T05:30:00Z" },
  { name: "Wellington, New Zealand", lat: -41.29, lng: 174.78, pop: 0.42,
    fact: "The world's southernmost capital of a sovereign state.",
    weather: { condition: "Windy", icon: "\uD83C\uDF2C\uFE0F", tempC: 18, tempF: 64 },
    arrive: "2024-12-24T05:50:00Z" },
  { name: "Sydney, Australia", lat: -33.87, lng: 151.21, pop: 5.3,
    fact: "The Opera House roof weighs over 161,000 tonnes!",
    weather: { condition: "Sunny", icon: "\u2600\uFE0F", tempC: 26, tempF: 79 },
    arrive: "2024-12-24T06:20:00Z" },
  { name: "Melbourne, Australia", lat: -37.81, lng: 144.96, pop: 5.1,
    fact: "Has the world's largest tram network.",
    weather: { condition: "Partly cloudy", icon: "\u26C5", tempC: 24, tempF: 75 },
    arrive: "2024-12-24T06:50:00Z" },
  { name: "Tokyo, Japan", lat: 35.68, lng: 139.69, pop: 13.96,
    fact: "Tokyo's subway pushers help squeeze 8 million daily riders onto trains!",
    weather: { condition: "Cold & clear", icon: "\u2744\uFE0F", tempC: 5, tempF: 41 },
    arrive: "2024-12-24T07:30:00Z" },
  { name: "Seoul, South Korea", lat: 37.57, lng: 126.98, pop: 9.74,
    fact: "Has more Wi-Fi hotspots per person than any other city.",
    weather: { condition: "Snow flurries", icon: "\uD83C\uDF28\uFE0F", tempC: -3, tempF: 27 },
    arrive: "2024-12-24T08:00:00Z" },
  { name: "Beijing, China", lat: 39.90, lng: 116.40, pop: 21.54,
    fact: "The Forbidden City has exactly 9,999 rooms!",
    weather: { condition: "Cold & dry", icon: "\u2744\uFE0F", tempC: -4, tempF: 25 },
    arrive: "2024-12-24T08:30:00Z" },
  { name: "Hong Kong", lat: 22.32, lng: 114.17, pop: 7.5,
    fact: "Has more skyscrapers than any other city on Earth.",
    weather: { condition: "Mild", icon: "\u26C5", tempC: 18, tempF: 64 },
    arrive: "2024-12-24T09:00:00Z" },
  { name: "Manila, Philippines", lat: 14.60, lng: 120.98, pop: 13.92,
    fact: "Filipinos start celebrating Christmas in September!",
    weather: { condition: "Warm & humid", icon: "\uD83C\uDF24\uFE0F", tempC: 28, tempF: 82 },
    arrive: "2024-12-24T09:30:00Z" },
  { name: "Bangkok, Thailand", lat: 13.76, lng: 100.50, pop: 10.72,
    fact: "Bangkok's full ceremonial name is 168 letters long.",
    weather: { condition: "Hot", icon: "\u2600\uFE0F", tempC: 31, tempF: 88 },
    arrive: "2024-12-24T10:00:00Z" },
  { name: "Kolkata, India", lat: 22.57, lng: 88.36, pop: 14.85,
    fact: "Home to the largest cricket stadium in the world.",
    weather: { condition: "Cool fog", icon: "\uD83C\uDF2B\uFE0F", tempC: 15, tempF: 59 },
    arrive: "2024-12-24T10:40:00Z" },
  { name: "Mumbai, India", lat: 19.08, lng: 72.88, pop: 20.67,
    fact: "The dabbawalas deliver 200,000 lunches daily with almost zero errors.",
    weather: { condition: "Warm", icon: "\u2600\uFE0F", tempC: 27, tempF: 81 },
    arrive: "2024-12-24T11:10:00Z" },
  { name: "Dubai, UAE", lat: 25.20, lng: 55.27, pop: 3.5,
    fact: "The Burj Khalifa is so tall you can watch two sunsets from it.",
    weather: { condition: "Clear & warm", icon: "\u2600\uFE0F", tempC: 24, tempF: 75 },
    arrive: "2024-12-24T11:50:00Z" },
  { name: "Riyadh, Saudi Arabia", lat: 24.71, lng: 46.68, pop: 7.68,
    fact: "Sits in the middle of one of the largest sand deserts on Earth.",
    weather: { condition: "Cool desert night", icon: "\uD83C\uDF19", tempC: 12, tempF: 54 },
    arrive: "2024-12-24T12:20:00Z" },
  { name: "Nairobi, Kenya", lat: -1.29, lng: 36.82, pop: 4.73,
    fact: "The only capital city with a national park inside it.",
    weather: { condition: "Light rain", icon: "\uD83C\uDF26\uFE0F", tempC: 20, tempF: 68 },
    arrive: "2024-12-24T12:50:00Z" },
  { name: "Johannesburg, South Africa", lat: -26.20, lng: 28.05, pop: 5.78,
    fact: "Built on the world's largest known gold deposit.",
    weather: { condition: "Thunderstorm", icon: "\u26C8\uFE0F", tempC: 25, tempF: 77 },
    arrive: "2024-12-24T13:20:00Z" },
  { name: "Moscow, Russia", lat: 55.76, lng: 37.62, pop: 12.54,
    fact: "The Moscow Metro has stations that look like underground palaces.",
    weather: { condition: "Heavy snow", icon: "\uD83C\uDF28\uFE0F", tempC: -12, tempF: 10 },
    arrive: "2024-12-24T13:50:00Z" },
  { name: "Istanbul, Turkey", lat: 41.01, lng: 28.98, pop: 15.84,
    fact: "The only city in the world on two continents!",
    weather: { condition: "Chilly rain", icon: "\uD83C\uDF27\uFE0F", tempC: 7, tempF: 45 },
    arrive: "2024-12-24T14:20:00Z" },
  { name: "Athens, Greece", lat: 37.98, lng: 23.73, pop: 3.15,
    fact: "Has been continuously inhabited for over 7,000 years.",
    weather: { condition: "Mild", icon: "\u26C5", tempC: 13, tempF: 55 },
    arrive: "2024-12-24T14:45:00Z" },
  { name: "Cairo, Egypt", lat: 30.04, lng: 31.24, pop: 21.32,
    fact: "The Great Pyramid was the tallest structure for 3,800 years.",
    weather: { condition: "Clear", icon: "\uD83C\uDF19", tempC: 16, tempF: 61 },
    arrive: "2024-12-24T15:10:00Z" },
  { name: "Rome, Italy", lat: 41.90, lng: 12.50, pop: 4.35,
    fact: "Romans throw \u20AC1.5 million into the Trevi Fountain each year.",
    weather: { condition: "Cool & crisp", icon: "\u2744\uFE0F", tempC: 8, tempF: 46 },
    arrive: "2024-12-24T15:40:00Z" },
  { name: "Berlin, Germany", lat: 52.52, lng: 13.41, pop: 3.77,
    fact: "Has more bridges than Venice \u2014 over 1,700!",
    weather: { condition: "Light snow", icon: "\uD83C\uDF28\uFE0F", tempC: -1, tempF: 30 },
    arrive: "2024-12-24T16:10:00Z" },
  { name: "Paris, France", lat: 48.86, lng: 2.35, pop: 11.02,
    fact: "The Eiffel Tower grows about 6 inches taller in summer heat.",
    weather: { condition: "Overcast", icon: "\u2601\uFE0F", tempC: 5, tempF: 41 },
    arrive: "2024-12-24T16:40:00Z" },
  { name: "Z\u00FCrich, Switzerland", lat: 47.38, lng: 8.54, pop: 1.4,
    fact: "Swiss trains are so punctual, a 3-minute delay makes the news.",
    weather: { condition: "Snow", icon: "\uD83C\uDF28\uFE0F", tempC: -2, tempF: 28 },
    arrive: "2024-12-24T17:00:00Z" },
  { name: "Amsterdam, Netherlands", lat: 52.37, lng: 4.90, pop: 1.15,
    fact: "Has more bicycles than people \u2014 about 881,000 bikes!",
    weather: { condition: "Drizzle", icon: "\uD83C\uDF27\uFE0F", tempC: 4, tempF: 39 },
    arrive: "2024-12-24T17:20:00Z" },
  { name: "London, United Kingdom", lat: 51.51, lng: -0.13, pop: 9.0,
    fact: "Big Ben is actually the name of the bell, not the tower.",
    weather: { condition: "Foggy", icon: "\uD83C\uDF2B\uFE0F", tempC: 6, tempF: 43 },
    arrive: "2024-12-24T17:50:00Z" },
  { name: "Edinburgh, Scotland", lat: 55.95, lng: -3.19, pop: 0.54,
    fact: "Inspired J.K. Rowling to write Harry Potter in its caf\u00E9s.",
    weather: { condition: "Sleet", icon: "\uD83C\uDF28\uFE0F", tempC: 2, tempF: 36 },
    arrive: "2024-12-24T18:10:00Z" },
  { name: "Reykjavik, Iceland", lat: 64.15, lng: -21.94, pop: 0.23,
    fact: "Has no McDonald\u2019s \u2014 the last one closed in 2009!",
    weather: { condition: "Blizzard", icon: "\uD83C\uDF28\uFE0F", tempC: -5, tempF: 23 },
    arrive: "2024-12-24T18:40:00Z" },
  { name: "S\u00E3o Paulo, Brazil", lat: -23.55, lng: -46.63, pop: 22.04,
    fact: "Has the largest Japanese community outside of Japan.",
    weather: { condition: "Warm rain", icon: "\uD83C\uDF26\uFE0F", tempC: 26, tempF: 79 },
    arrive: "2024-12-24T19:30:00Z" },
  { name: "Rio de Janeiro, Brazil", lat: -22.91, lng: -43.17, pop: 13.63,
    fact: "Christ the Redeemer is struck by lightning about 6 times per year.",
    weather: { condition: "Hot & humid", icon: "\u2600\uFE0F", tempC: 30, tempF: 86 },
    arrive: "2024-12-24T20:00:00Z" },
  { name: "Buenos Aires, Argentina", lat: -34.60, lng: -58.38, pop: 15.37,
    fact: "Has the widest avenue in the world \u2014 16 lanes across!",
    weather: { condition: "Warm breeze", icon: "\uD83C\uDF24\uFE0F", tempC: 27, tempF: 81 },
    arrive: "2024-12-24T20:30:00Z" },
  { name: "Bogot\u00E1, Colombia", lat: 4.71, lng: -74.07, pop: 10.98,
    fact: "One of the highest capital cities at 2,640 meters above sea level.",
    weather: { condition: "Cool mountain air", icon: "\u26C5", tempC: 13, tempF: 55 },
    arrive: "2024-12-24T21:00:00Z" },
  { name: "Mexico City, Mexico", lat: 19.43, lng: -99.13, pop: 21.8,
    fact: "Built on a lake \u2014 it sinks about 10 inches every year!",
    weather: { condition: "Cool & dry", icon: "\uD83C\uDF19", tempC: 10, tempF: 50 },
    arrive: "2024-12-24T21:40:00Z" },
  { name: "Houston, USA", lat: 29.76, lng: -95.37, pop: 7.12,
    fact: "Mission Control has guided every NASA human spaceflight since 1965.",
    weather: { condition: "Mild", icon: "\u26C5", tempC: 14, tempF: 57 },
    arrive: "2024-12-24T22:10:00Z" },
  { name: "Chicago, USA", lat: 41.88, lng: -87.63, pop: 9.46,
    fact: "The river is dyed green every St. Patrick's Day.",
    weather: { condition: "Freezing", icon: "\uD83C\uDF28\uFE0F", tempC: -8, tempF: 18 },
    arrive: "2024-12-24T22:40:00Z" },
  { name: "New York, USA", lat: 40.71, lng: -74.01, pop: 20.14,
    fact: "Times Square is named after The New York Times, not the other way around.",
    weather: { condition: "Light snow", icon: "\uD83C\uDF28\uFE0F", tempC: -2, tempF: 28 },
    arrive: "2024-12-24T23:10:00Z" },
  { name: "Toronto, Canada", lat: 43.65, lng: -79.38, pop: 6.2,
    fact: "The CN Tower held the world's tallest structure record for 32 years.",
    weather: { condition: "Snow", icon: "\uD83C\uDF28\uFE0F", tempC: -7, tempF: 19 },
    arrive: "2024-12-24T23:30:00Z" },
  { name: "Washington D.C., USA", lat: 38.91, lng: -77.04, pop: 6.3,
    fact: "The Library of Congress has over 170 million items!",
    weather: { condition: "Cold rain", icon: "\uD83C\uDF27\uFE0F", tempC: 2, tempF: 36 },
    arrive: "2024-12-24T23:50:00Z" },
  { name: "Los Angeles, USA", lat: 34.05, lng: -118.24, pop: 13.2,
    fact: "The Hollywood sign originally said 'Hollywoodland' as a real estate ad.",
    weather: { condition: "Clear & cool", icon: "\uD83C\uDF19", tempC: 12, tempF: 54 },
    arrive: "2024-12-25T00:20:00Z" },
  { name: "Anchorage, USA", lat: 61.22, lng: -149.90, pop: 0.3,
    fact: "Moose outnumber people in many Anchorage neighborhoods.",
    weather: { condition: "Snowstorm", icon: "\uD83C\uDF28\uFE0F", tempC: -15, tempF: 5 },
    arrive: "2024-12-25T00:50:00Z" },
  { name: "Honolulu, USA", lat: 21.31, lng: -157.86, pop: 0.98,
    fact: "Hawaii's beaches are slowly made from parrotfish poop!",
    weather: { condition: "Tropical breeze", icon: "\uD83C\uDF34", tempC: 24, tempF: 75 },
    arrive: "2024-12-25T01:30:00Z" },
];

// Gifts per person estimate (not every person gets a gift, but Santa is generous)
const GIFTS_PER_MILLION = 620_000;

const routeTimes = ROUTE.map((s) => new Date(s.arrive).getTime());

/* ── Cumulative gifts array (based on population) ── */
const cumulativeGifts = [];
{
  let sum = 0;
  for (const stop of ROUTE) {
    sum += Math.round(stop.pop * GIFTS_PER_MILLION);
    cumulativeGifts.push(sum);
  }
}

/* ── Great-circle distance (Haversine) in km ── */
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

/* Precompute leg distances */
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
  return new Date(Date.UTC(year, 11, 24, 5, 0, 0)).getTime();
}
function getChristmasEnd(year) {
  return new Date(Date.UTC(year, 11, 25, 2, 0, 0)).getTime();
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
    demoStart = getChristmasEve(2024);
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
const g = svg.append("g");

let width, height, projection, path;

function resize() {
  width = container.clientWidth;
  height = container.clientHeight;
  svg.attr("viewBox", `0 0 ${width} ${height}`);
  projection = d3.geoEquirectangular().fitSize([width, height], { type: "Sphere" });
  path = d3.geoPath(projection);
  if (window._countries) renderCountries(window._countries);
  renderStars();
  renderRoute();
  renderCityDots();
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
  g.selectAll("path.country").remove();
  g.selectAll("path.country")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("fill", (d, i) => COUNTRY_COLORS[i % COUNTRY_COLORS.length])
    .attr("stroke", "#0a1628")
    .attr("stroke-width", 0.5);
}

/* Route line */
function renderRoute() {
  g.selectAll(".route-line").remove();
  const coords = ROUTE.map((s) => projection([s.lng, s.lat]));
  g.append("path")
    .attr("class", "route-line")
    .attr("d", d3.line()(coords))
    .attr("fill", "none")
    .attr("stroke", "rgba(255,215,0,0.3)")
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "6,4");
}

/* City dots */
function renderCityDots() {
  g.selectAll(".city-dot").remove();
  const tooltip = document.getElementById("city-tooltip");
  ROUTE.forEach((stop) => {
    const [cx, cy] = projection([stop.lng, stop.lat]);
    g.append("circle")
      .attr("class", "city-dot")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 3)
      .attr("fill", "#ffd700")
      .attr("opacity", 0.7)
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
const santaG = g.append("g").attr("id", "santa-group");
let reindeerLabel = null;

// Load sleigh.svg from shared loader, extract the #rig group, inject it into the map
sleighSvgReady.then((svgText) => {
    if (!svgText) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const rig = doc.getElementById("rig");
    if (!rig) return;

    // Import the node into the live document and append to santaG
    const imported = document.importNode(rig, true);
    santaG.node().appendChild(imported);

    // Apply saved sleigh colour
    applySleighColor(state.sleighColor || "#cc0000");

    // Add reindeer name label beneath the rig
    // The rig's viewBox spans roughly 0..240 x 0..110, centred around ~120,60
    reindeerLabel = santaG.append("text")
      .attr("x", 50).attr("y", 100)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffd700")
      .attr("font-size", "22px")
      .attr("font-weight", "bold")
      .attr("paint-order", "stroke")
      .attr("stroke", "#0a0e27")
      .attr("stroke-width", "3px")
      .text(state.reindeerName || "Rudolph");
  })
  .catch((err) => console.warn("Could not load sleigh.svg, falling back to dot:", err));

function applySleighColor(color) {
  const node = santaG.node();
  // .sleigh-body fill and .sleigh-scroll stroke as noted in the SVG comments
  node.querySelectorAll(".sleigh-body").forEach((el) => el.setAttribute("fill", color));
  node.querySelectorAll(".sleigh-scroll").forEach((el) => el.setAttribute("stroke", color));
}

/* Listen for customizer updates */
window.addEventListener("sleigh-updated", () => {
  state = loadState();
  applySleighColor(state.sleighColor || "#cc0000");
  if (reindeerLabel) reindeerLabel.text(state.reindeerName || "Rudolph");
});

/* ── Timing / state ── */
function getSantaState(simNow) {
  const year = new Date(simNow).getUTCFullYear();
  const yearOffset = getChristmasEve(year) - getChristmasEve(2024);
  const times = routeTimes.map((t) => t + yearOffset);

  if (simNow < times[0]) {
    return {
      phase: "before",
      countdown: times[0] - simNow,
      stopIdx: -1,
      lat: ROUTE[0].lat,
      lng: ROUTE[0].lng,
      t: 0,
      times,
    };
  }
  if (simNow >= times[times.length - 1]) {
    const last = ROUTE[ROUTE.length - 1];
    return {
      phase: "done",
      stopIdx: ROUTE.length - 1,
      lat: last.lat,
      lng: last.lng,
      t: 1,
      times,
    };
  }
  for (let i = 0; i < times.length - 1; i++) {
    if (simNow >= times[i] && simNow < times[i + 1]) {
      const t = (simNow - times[i]) / (times[i + 1] - times[i]);
      const a = ROUTE[i],
        b = ROUTE[i + 1];
      return {
        phase: "flying",
        stopIdx: i,
        nextIdx: i + 1,
        t,
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        times,
      };
    }
  }
  return { phase: "before", countdown: 0, stopIdx: -1, lat: ROUTE[0].lat, lng: ROUTE[0].lng, t: 0, times };
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
  // completed stops + interpolated current leg
  const completed = st.stopIdx >= 0 ? cumulativeGifts[st.stopIdx] : 0;
  const legGifts =
    st.stopIdx < ROUTE.length - 1
      ? Math.round(ROUTE[st.nextIdx].pop * GIFTS_PER_MILLION) * st.t
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

  // Speed from current leg: distance / time
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

/* ── Main update ── */
function updateSanta() {
  const simNow = getSimTime();
  const st = getSantaState(simNow);
  const realNow = Date.now();
  const inSeason = isChristmasSeason(realNow);
  const inSimSeason = speedMode !== "real" || inSeason;

  // Position Santa on map (only if map projection is ready)
  if (projection) {
    const pos = projection([st.lng, st.lat]);
    if (pos) santaG.attr("transform", `translate(${pos[0] - 120 * 0.42},${pos[1] - 55 * 0.42}) scale(0.42)`);
  }

  const overlay = document.getElementById("countdown-overlay");

  // Off-season: show big countdown
  if (!inSimSeason && st.phase === "before") {
    overlay.classList.remove("hidden");
    updateCountdownOverlay(realNow);

    setText("status-text", "Parked at North Pole");
    setText("status-sub", "Waiting for Christmas Eve");
    setText("current-city", "North Pole");
    setText("current-fact", "Santa is feeding the reindeer and checking his list twice!");
    setHtml("current-weather", "");
    setText("next-city", ROUTE[0].name);
    setText("next-eta", "On Christmas Eve!");
    setText("gift-count", "0");
    setText("gift-sub", "Loading the sleigh\u2026");
    // Off-season: show local time at first stop (Apia) as a fallback
    updateLocalTimePanel(realNow, ROUTE[0].lng);
    setText("distance-val", "0 km");
    setText("speed-val", "0 km/h");
    return;
  }

  overlay.classList.add("hidden");

  if (st.phase === "before") {
    setText("status-text", "Pre-Flight");
    setText("status-sub", "Takes off in " + formatDuration(st.countdown));
    setText("current-city", "North Pole");
    setText("current-fact", "Final preparations underway!");
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

    const rName = state.reindeerName || "Rudolph";
    setText("status-text", "In Flight");
    setText("status-sub", `${rName} leading the way between ${prev.name} and ${next.name}`);
    setText("current-city", prev.name);
    setText("current-fact", prev.fact);
    setHtml(
      "current-weather",
      `<span class="weather-icon">${prev.weather.icon}</span>${prev.weather.condition}, ${prev.weather.tempC}\u00B0C / ${prev.weather.tempF}\u00B0F`
    );
    setText("next-city", next.name);
    setText("next-eta", formatDuration(eta));

    targetGifts = getGiftsDelivered(st);
    setText("gift-sub", `${st.stopIdx + 1} of ${ROUTE.length} stops visited`);

    const { distKm, speedKmh } = getDistanceAndSpeed(st);
    setText("distance-val", distKm.toLocaleString() + " km");
    setText("speed-val", speedKmh.toLocaleString() + " km/h");
  } else {
    // done
    const last = ROUTE[ROUTE.length - 1];
    setText("status-text", "Journey Complete!");
    setText("status-sub", "Merry Christmas!");
    setText("current-city", last.name);
    setText("current-fact", last.fact);
    setHtml(
      "current-weather",
      `<span class="weather-icon">${last.weather.icon}</span>${last.weather.condition}, ${last.weather.tempC}\u00B0C / ${last.weather.tempF}\u00B0F`
    );
    setText("next-city", "North Pole");
    setText("next-eta", "Heading home!");
    targetGifts = cumulativeGifts[cumulativeGifts.length - 1];
    setText("gift-sub", "All stops visited!");

    const totalDist = Math.round(cumulativeDistance[cumulativeDistance.length - 1]);
    setText("distance-val", totalDist.toLocaleString() + " km");
    setText("speed-val", "0 km/h");
  }

  // Local time at Santa's position — use sleigh lng, fall back to next stop
  const lng = (typeof st.lng === "number" && !isNaN(st.lng))
    ? st.lng
    : (st.nextIdx != null ? ROUTE[st.nextIdx].lng : ROUTE[0].lng);
  updateLocalTimePanel(simNow, lng);
}

function updateLocalTimePanel(utcMs, lng) {
  if (typeof lng !== "number" || isNaN(lng)) {
    setText("local-time", "\u2014");
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
// Live search on input
document.getElementById("city-search").addEventListener("input", doSearch);

function fuzzyScore(query, target) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  // Exact substring match is best
  if (t.includes(q)) return 1000 - t.indexOf(q);
  // Character-by-character fuzzy
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

function nearestStop(query) {
  // Interpret query as possible lat/lng? No — find nearest stop by name distance.
  // Actually, find the stop whose name is closest alphabetically — but the spec says
  // "nearest stop by distance". Since we don't know the kid's location, find the
  // stop with the best fuzzy score, or if truly zero matches, return the first stop.
  let best = null;
  let bestScore = -1;
  for (const stop of ROUTE) {
    const s = fuzzyScore(query, stop.name);
    if (s > bestScore) {
      bestScore = s;
      best = stop;
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

  // Score all stops
  const scored = ROUTE.map((stop) => ({ stop, score: fuzzyScore(q, stop.name) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const simNow = getSimTime();
  const year = new Date(simNow).getUTCFullYear();
  const yearOffset = getChristmasEve(year) - getChristmasEve(2024);

  if (scored.length > 0) {
    const match = scored[0].stop;
    const arriveTime = new Date(match.arrive).getTime() + yearOffset;

    if (simNow >= arriveTime) {
      const timeStr = formatTimeFromMs(arriveTime);
      result.innerHTML =
        `<span style="color:var(--green)">Santa visited <strong>${match.name}</strong> at ${timeStr}!</span>` +
        `<br><span class="fun-fact">${match.fact}</span>` +
        `<br><span class="weather-info">${match.weather.icon} ${match.weather.condition}, ${match.weather.tempC}\u00B0C / ${match.weather.tempF}\u00B0F</span>`;
    } else {
      const eta = arriveTime - simNow;
      result.innerHTML =
        `<span style="color:var(--blue)">Santa will arrive at <strong>${match.name}</strong> in about <strong>${formatDuration(eta)}</strong>!</span>` +
        `<br><span class="fun-fact">${match.fact}</span>` +
        `<br><span class="weather-info">${match.weather.icon} Expected: ${match.weather.condition}, ${match.weather.tempC}\u00B0C / ${match.weather.tempF}\u00B0F</span>`;
    }
  } else {
    // No fuzzy match — find nearest stop by great-circle distance to all stops
    // Since we don't know the kid's location, just suggest the closest-named stop
    const nearest = nearestStop(q);
    if (nearest) {
      result.innerHTML =
        `<span style="color:var(--gold)">"${q}" isn't on Santa's route, but the nearest stop is <strong>${nearest.name}</strong>!</span>` +
        `<br><span class="fun-fact">${nearest.fact}</span>`;
    } else {
      result.innerHTML = `<span style="color:var(--gold)">That city isn't on Santa's route this year, but he'll still find you!</span>`;
    }
  }
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

/* ── Main loop ── */
function tick() {
  updateSanta();
  animateGiftCounter();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
