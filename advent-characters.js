/* ============================================================
   ADVENT CHARACTERS — 24 collectable kawaii characters
   ============================================================

   Drop this file into the santa-tracker project as advent-characters.js
   and load it as a module.

   Every character is inline SVG in a 64 x 80 viewBox. No image files.

   HOUSE RULES used for all 24 — keep these if you add more:
     - round open eyes with a white highlight (never curved-line eyes)
     - a small two-curve smile (never an open mouth)
     - subtle blush, 50-80% opacity
     - 2px #0A2140 outline on every shape
     - limbs drawn twice: a fat dark stroke, then a thinner colour stroke
       on top, which leaves an outline showing
     - a soft ground shadow, outside the dance group so it stays put
     - presents sit on the floor, never in a character's hands

   ============================================================ */

export const ADVENT_CSS = `
.adv-svg { display:block; overflow:visible }
.dance,.blink,.el,.er,.fl,.fr,.al,.ar,.head,.wing,.sp,.fin { transform-box: fill-box }

.dance { transform-origin:50% 95%; animation: adv-dance 1.44s ease-in-out infinite }
@keyframes adv-dance {
  0%   { transform: translateY(0) rotate(0) scaleY(1) }
  15%  { transform: translateY(-4px) rotate(-4deg) scaleY(1.03) }
  35%  { transform: translateY(0) rotate(0) scaleY(.97) }
  50%  { transform: translateY(0) rotate(0) scaleY(1) }
  65%  { transform: translateY(-4px) rotate(4deg) scaleY(1.03) }
  85%  { transform: translateY(0) rotate(0) scaleY(.97) }
  100% { transform: translateY(0) rotate(0) scaleY(1) }
}
.head { transform-origin:50% 100%; animation: adv-head 1.44s ease-in-out infinite }
@keyframes adv-head { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(5deg)} 70%{transform:rotate(-5deg)} }
.al { transform-origin:right top; animation: adv-arml 1.44s ease-in-out infinite }
.ar { transform-origin:left top;  animation: adv-armr 1.44s ease-in-out infinite }
@keyframes adv-arml { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(-26deg)} 70%{transform:rotate(10deg)} }
@keyframes adv-armr { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(-10deg)} 70%{transform:rotate(26deg)} }
.wing { transform-origin:78% 22%; animation: adv-wing 1.44s ease-in-out infinite }
@keyframes adv-wing { 0%,50%,100%{transform:rotate(0)} 25%{transform:rotate(-13deg)} 75%{transform:rotate(7deg)} }
.fin { transform-origin:right center; animation: adv-fin 1.44s ease-in-out infinite }
@keyframes adv-fin { 0%,50%,100%{transform:rotate(0)} 25%{transform:rotate(-14deg)} 75%{transform:rotate(7deg)} }
.el { transform-origin:center bottom; animation: adv-earl 1.44s ease-in-out infinite }
.er { transform-origin:center bottom; animation: adv-earr 1.44s ease-in-out infinite }
@keyframes adv-earl { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(-13deg)} 70%{transform:rotate(7deg)} }
@keyframes adv-earr { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(-7deg)} 70%{transform:rotate(13deg)} }
.fl { transform-origin:center top; animation: adv-flopl 1.44s ease-in-out infinite }
.fr { transform-origin:center top; animation: adv-flopr 1.44s ease-in-out infinite }
@keyframes adv-flopl { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(9deg)} 70%{transform:rotate(-5deg)} }
@keyframes adv-flopr { 0%,50%,100%{transform:rotate(0)} 20%{transform:rotate(5deg)} 70%{transform:rotate(-9deg)} }
.blink { animation: adv-blink 3.2s infinite; transform-origin:center }
@keyframes adv-blink { 0%,88%,100%{transform:scaleY(1)} 94%{transform:scaleY(.08)} }
.sp { animation: adv-sparkle 1.44s ease-in-out infinite; transform-origin:center }
.sp2 { animation-delay:.48s } .sp3 { animation-delay:.96s }
@keyframes adv-sparkle {
  0%,100% { transform: scale(.5); opacity:.35 }
  40%     { transform: scale(1.15); opacity:1 }
  70%     { transform: scale(.7); opacity:.6 }
}
@media (prefers-reduced-motion: reduce) {
  .dance,.head,.al,.ar,.wing,.fin,.el,.er,.fl,.fr,.blink,.sp { animation: none !important; opacity: 1 }
}
`;

/* Shared building blocks, so every face matches ------------------ */

const EYES = (lx, rx, y) => `
<ellipse cx="${lx}" cy="${y}" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
<ellipse cx="${rx}" cy="${y}" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
<circle cx="${lx + 1.7}" cy="${y - 1.1}" r="1" fill="#fff"/>
<circle cx="${rx + 1.7}" cy="${y - 1.1}" r="1" fill="#fff"/>`;

const BLUSH = (lx, rx, y, col = '#C0334E', op = '.5') => `
<ellipse cx="${lx}" cy="${y}" rx="3" ry="2" fill="${col}" opacity="${op}"/>
<ellipse cx="${rx}" cy="${y}" rx="3" ry="2" fill="${col}" opacity="${op}"/>`;

const SMILE = (x, y) => `
<path d="M${x} ${y} Q${x - 3.5} ${y + 3.5} ${x - 6} ${y + 1.5}
         M${x} ${y} Q${x + 3.5} ${y + 3.5} ${x + 6} ${y + 1.5}"
      fill="none" stroke="#0A2140" stroke-width="1.6" stroke-linecap="round"/>`;

const SHADOW = (cx = 32, rx = 14) =>
  `<ellipse cx="${cx}" cy="76" rx="${rx}" ry="3" fill="#0A2140" opacity=".18"/>`;

const FEET = (col) => `
<ellipse cx="24" cy="72" rx="5.5" ry="4" fill="${col}" stroke="#0A2140" stroke-width="2"/>
<ellipse cx="40" cy="72" rx="5.5" ry="4" fill="${col}" stroke="#0A2140" stroke-width="2"/>`;

const ARMS = (col) => `
<g class="al"><path d="M21 51 Q17 57 15 61" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
<path d="M21 51 Q17 57 15 61" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
<g class="ar"><path d="M43 51 Q47 57 49 61" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
<path d="M43 51 Q47 57 49 61" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;

const BODY = (col, belly) => `
<ellipse cx="32" cy="58" rx="14" ry="14" fill="${col}" stroke="#0A2140" stroke-width="2.2"/>
<ellipse cx="32" cy="61" rx="8" ry="8.5" fill="${belly}" stroke="#0A2140" stroke-width="1.4"/>`;

const SANTA_HAT = `
<path d="M18 20 Q23 5 40 7 Q50 9 47 18 Q44 23 41 19 Z" fill="#E24B4A" stroke="#0A2140" stroke-width="2"/>
<rect x="16" y="18" width="33" height="5.6" rx="2.8" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
<circle cx="49" cy="8" r="4.6" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>`;

const BOBBLE_HAT = (col) => `
<path d="M17 20 Q20 7 32 7 Q44 7 47 20 Z" fill="${col}" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
<rect x="15" y="18" width="34" height="5.6" rx="2.8" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.8"/>
<circle cx="32" cy="5" r="4.4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.8"/>`;

const SCARF = (col, stripe) => `
<path d="M15 45 Q32 53 49 45 L49 51 Q32 59 15 51 Z" fill="${col}" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
<path d="M23 47.4 L23 53.4 M41 47.4 L41 53.4" stroke="${stripe}" stroke-width="2.2"/>`;

const WREATH = `
<path d="M15 47 Q32 55 49 47" stroke="#0A2140" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M15 47 Q32 55 49 47" stroke="#2E7D4F" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="22" cy="49.6" r="1.9" fill="#E24B4A" stroke="#0A2140" stroke-width="1"/>
<circle cx="32" cy="51.8" r="1.9" fill="#E24B4A" stroke="#0A2140" stroke-width="1"/>
<circle cx="42" cy="49.6" r="1.9" fill="#E24B4A" stroke="#0A2140" stroke-width="1"/>`;

/* The 24 characters ---------------------------------------------- */

export const CHARACTERS = [
  { id:'bear', name:'Barnaby', svg:
    SHADOW() + `<g class="dance">` + FEET('#8A5A33') + ARMS('#A9714B') + BODY('#A9714B','#EBD3B4') + `
    <g class="head">
      <circle cx="17" cy="30" r="6" fill="#A9714B" stroke="#0A2140" stroke-width="2" class="el"/>
      <circle cx="47" cy="30" r="6" fill="#A9714B" stroke="#0A2140" stroke-width="2" class="er"/>
      <circle cx="32" cy="34" r="16" fill="#B87F52" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="40" rx="9" ry="7" fill="#EBD3B4" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,32) + BLUSH(19,45,37,'#F09595','.75') + `
      <ellipse cx="32" cy="38" rx="2.8" ry="2.1" fill="#0A2140"/>` + SMILE(32,41) + SANTA_HAT + `</g></g>` },

  { id:'fox', name:'Ember', svg:
    SHADOW() + `<g class="dance">` + FEET('#3A2A20') + `
    <path d="M45 52 Q60 55 55 69 Q49 58 41 56 Z" fill="#E8763F" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
    <path d="M51 62 Q57 63 55 69 Q51 66 49 64 Z" fill="#FFF4EA" stroke="#0A2140" stroke-width="1.3"/>`
    + ARMS('#E8763F') + BODY('#E8763F','#FFF4EA') + `
    <g class="head">
      <polygon points="18,27 21,12 30,25" fill="#D85A30" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="el"/>
      <polygon points="46,27 43,12 34,25" fill="#D85A30" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="er"/>
      <ellipse cx="32" cy="33" rx="16" ry="13" fill="#E8763F" stroke="#0A2140" stroke-width="2.2"/>
      <path d="M32 34 Q23 40 26.5 44 Q32 47 37.5 44 Q41 40 32 34 Z" fill="#FFF4EA" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,31) + BLUSH(19,45,35.5) + `
      <circle cx="32" cy="41" r="2.4" fill="#0A2140"/>` + SMILE(32,43.6) + BOBBLE_HAT('#1F7A8C') + `</g>`
      + SCARF('#FAEEDA','#D8C6A6') + `</g>` },

  { id:'reindeer', name:'Comet', svg:
    SHADOW() + `<g class="dance">` + FEET('#6B4A2F') + ARMS('#A9714B') + BODY('#A9714B','#C89A6E') + `
    <g class="head">
      <path d="M19 19 C17 12 12 11 9 6 M16 14 L10 12 M19 19 C21 12 26 10 27 5 M23 13 L28 11" stroke="#0A2140" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      <path d="M19 19 C17 12 12 11 9 6 M16 14 L10 12 M19 19 C21 12 26 10 27 5 M23 13 L28 11" stroke="#E8DCC8" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M45 19 C47 12 52 11 55 6 M48 14 L54 12 M45 19 C43 12 38 10 37 5 M41 13 L36 11" stroke="#0A2140" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      <path d="M45 19 C47 12 52 11 55 6 M48 14 L54 12 M45 19 C43 12 38 10 37 5 M41 13 L36 11" stroke="#E8DCC8" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="16" cy="27" rx="4.6" ry="6.4" fill="#8A5A33" stroke="#0A2140" stroke-width="2" class="el"/>
      <ellipse cx="48" cy="27" rx="4.6" ry="6.4" fill="#8A5A33" stroke="#0A2140" stroke-width="2" class="er"/>
      <circle cx="32" cy="33" r="15.5" fill="#A9714B" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="39" rx="9" ry="7" fill="#C89A6E" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,31) + BLUSH(19,45,36) + `
      <circle cx="32" cy="38" r="4" fill="#E24B4A" stroke="#0A2140" stroke-width="1.6"/>
      <circle cx="30.7" cy="36.8" r="1.2" fill="#F09595"/>` + SMILE(32,41.5) + `</g>` + WREATH + `</g>` },

  { id:'cardinal', name:'Scarlet', svg:
    SHADOW(32,13) + `<g class="dance">
    <path d="M46 56 Q60 58 62 70 Q54 68 44 62 Z" fill="#9E2323" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="27" cy="73" rx="4" ry="3" fill="#E0A53C" stroke="#0A2140" stroke-width="1.7"/>
    <ellipse cx="37" cy="73" rx="4" ry="3" fill="#E0A53C" stroke="#0A2140" stroke-width="1.7"/>
    <ellipse cx="32" cy="55" rx="17" ry="17" fill="#D93B3B" stroke="#0A2140" stroke-width="2.2"/>
    <g class="wing">
      <path d="M42 46 Q52 50 50 62 Q45 66 39 62 Q36 54 42 46 Z" fill="#B32B2B" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
      <path d="M43 52 Q48 55 47 61 M41 55 Q45 58 44 62" stroke="#8E2020" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="head">
      <path d="M23 22 Q26 8 33 12 Q38 7 41 20 Q34 16 23 22 Z" fill="#D93B3B" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="14.5" fill="#E24B4A" stroke="#0A2140" stroke-width="2.2"/>
      <path d="M24 34 Q27 25 32 25 Q37 25 40 34 Q36 39 32 39 Q28 39 24 34 Z" fill="#2A2438" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="26.5" cy="30" r="4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="37.5" cy="30" r="4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <ellipse cx="26.5" cy="30" rx="2.2" ry="2.5" fill="#0A2140" class="blink"/>
      <ellipse cx="37.5" cy="30" rx="2.2" ry="2.5" fill="#0A2140" class="blink"/>
      <circle cx="27.5" cy="29" r="1" fill="#fff"/><circle cx="38.5" cy="29" r="1" fill="#fff"/>
      <path d="M32 33 L25.5 36 Q32 39.6 38.5 36 Z" fill="#FFD277" stroke="#0A2140" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M16 22 Q20 10 33 11 Q42 13 39 21 Z" fill="#2E7D4F" stroke="#0A2140" stroke-width="1.9"/>
      <rect x="14" y="20" width="28" height="5.2" rx="2.6" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.7"/>
      <circle cx="41" cy="12" r="4.1" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.7"/>
    </g></g>` },

  { id:'penguin', name:'Waddles', svg:
    SHADOW() + `<g class="dance">
    <ellipse cx="23" cy="73" rx="7" ry="4" fill="#FFD277" stroke="#0A2140" stroke-width="2"/>
    <ellipse cx="41" cy="73" rx="7" ry="4" fill="#FFD277" stroke="#0A2140" stroke-width="2"/>
    <ellipse cx="32" cy="48" rx="18" ry="23" fill="#2A3557" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="52" rx="11.5" ry="16" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.5"/>
    <g class="al"><ellipse cx="13" cy="50" rx="6" ry="12" fill="#3A4770" stroke="#0A2140" stroke-width="2.2"/></g>
    <g class="ar"><ellipse cx="51" cy="50" rx="6" ry="12" fill="#3A4770" stroke="#0A2140" stroke-width="2.2"/></g>
    <g class="head">` + EYES(26,38,33) + BLUSH(18.5,45.5,38,'#F09595','.7') + `
      <polygon points="32,37 27,42 37,42" fill="#FFD277" stroke="#0A2140" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M17 22 Q22 8 37 10 Q46 12 43 21 Z" fill="#E24B4A" stroke="#0A2140" stroke-width="2"/>
      <rect x="15" y="20" width="31" height="5.6" rx="2.8" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
      <circle cx="45" cy="11" r="4.4" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
    </g></g>` },

  { id:'unicorn', name:'Sparkle', svg:
    SHADOW() + `<g class="dance">` + FEET('#D9D2F0') + `
    <path d="M45 52 Q56 60 51 70 Q47 60 41 55 Z" fill="#F49BC1" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>`
    + ARMS('#F7F4FF') + `
    <ellipse cx="32" cy="58" rx="14" ry="14" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>
    <g class="head">
      <polygon points="32,3 28.5,19 35.5,19" fill="#FFD277" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M29.4 7 L34 6.2 M29.9 11.5 L34.7 10.7 M30.5 16 L35.1 15.2" stroke="#E0A53C" stroke-width="1.1"/>
      <polygon points="19,25 22,13 29,23" fill="#F7F4FF" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="el"/>
      <polygon points="45,25 42,13 35,23" fill="#F7F4FF" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="er"/>
      <path d="M41 20 Q52 25 48 38 Q44 27 38 24 Z" fill="#F49BC1" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M22 24 Q32 18 42 24 Q38 20 32 19 Q26 20 22 24 Z" fill="#F49BC1" stroke="#0A2140" stroke-width="1.6" stroke-linejoin="round"/>
      <circle cx="32" cy="33" r="15" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>`
      + EYES(25,39,31) + BLUSH(20,44,36,'#F49BC1','.8') + `
      <ellipse cx="32" cy="40" rx="5" ry="3.6" fill="#FBE0EC" stroke="#0A2140" stroke-width="1.5"/>
      <circle cx="30.2" cy="39.4" r="1" fill="#0A2140"/><circle cx="33.8" cy="39.4" r="1" fill="#0A2140"/>
    </g>` + SCARF('#5DCAA5','#1F7A6B') + `</g>` },

  { id:'cat', name:'Whiskers', svg:
    SHADOW() + `<g class="dance">` + FEET('#E0A53C') + ARMS('#FFC86B') + BODY('#FFC86B','#FFE7B8') + `
    <g class="head">
      <polygon points="18,26 21,11 30,24" fill="#FFC86B" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="el"/>
      <polygon points="46,26 43,11 34,24" fill="#FFC86B" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="er"/>
      <polygon points="21,24 22.5,15 27,23" fill="#F49BC1"/>
      <polygon points="43,24 41.5,15 37,23" fill="#F49BC1"/>
      <circle cx="32" cy="33" r="15.5" fill="#FFD68A" stroke="#0A2140" stroke-width="2.2"/>`
      + EYES(25,39,31) + BLUSH(19,45,36,'#E2688F','.6') + `
      <polygon points="32,37 28.5,40.5 35.5,40.5" fill="#E2688F" stroke="#0A2140" stroke-width="1.3" stroke-linejoin="round"/>`
      + SMILE(32,41.5) + `
      <path d="M13 34 L23 35 M13 38 L23 37.5 M51 34 L41 35 M51 38 L41 37.5" stroke="#0A2140" stroke-width="1.3" stroke-linecap="round"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'dog', name:'Biscuit', svg:
    SHADOW() + `<g class="dance">` + FEET('#8A5A33') + ARMS('#D9A06A') + BODY('#D9A06A','#F0DBC2') + `
    <g class="head">
      <path d="M18 24 Q10 26 10 36 Q10 45 17 45 Q22 44 21 36 Q20 28 18 24 Z" fill="#B8834F" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="fl"/>
      <path d="M46 24 Q54 26 54 36 Q54 45 47 45 Q42 44 43 36 Q44 28 46 24 Z" fill="#B8834F" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="fr"/>
      <circle cx="32" cy="33" r="15.5" fill="#D9A06A" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="40" rx="9" ry="7" fill="#F0DBC2" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,31) + BLUSH(19,45,36,'#C0334E','.5') + `
      <ellipse cx="32" cy="38" rx="3.2" ry="2.4" fill="#0A2140"/>` + SMILE(32,41.5) + SANTA_HAT + `</g></g>` },

  { id:'panda', name:'Bamboo', svg:
    SHADOW() + `<g class="dance">` + FEET('#2A2438') + ARMS('#2A2438') + `
    <ellipse cx="32" cy="58" rx="14" ry="14" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="61" rx="8" ry="8.5" fill="#EDE9FA" stroke="#0A2140" stroke-width="1.4"/>
    <g class="head">
      <circle cx="18" cy="22" r="7" fill="#2A2438" stroke="#0A2140" stroke-width="2" class="el"/>
      <circle cx="46" cy="22" r="7" fill="#2A2438" stroke="#0A2140" stroke-width="2" class="er"/>
      <circle cx="32" cy="33" r="15.5" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="25" cy="31" rx="5.4" ry="6.4" fill="#2A2438"/>
      <ellipse cx="39" cy="31" rx="5.4" ry="6.4" fill="#2A2438"/>`
      + EYES(25,39,31) + `
      <ellipse cx="32" cy="39" rx="3" ry="2.2" fill="#0A2140"/>` + SMILE(32,42) + `</g>`
      + SCARF('#E24B4A','#FFFFFF') + `</g>` },

  { id:'owl', name:'Hoot', svg:
    SHADOW() + `<g class="dance">
    <ellipse cx="26" cy="73" rx="4.5" ry="3" fill="#E0A53C" stroke="#0A2140" stroke-width="1.7"/>
    <ellipse cx="38" cy="73" rx="4.5" ry="3" fill="#E0A53C" stroke="#0A2140" stroke-width="1.7"/>
    <ellipse cx="32" cy="53" rx="17" ry="19" fill="#8A7AD6" stroke="#0A2140" stroke-width="2.2"/>
    <g class="wing">
      <path d="M42 44 Q52 49 50 62 Q45 66 39 61 Q36 52 42 44 Z" fill="#6F5DC4" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
      <path d="M43 50 Q48 54 47 60" stroke="#5A49A8" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="head">
      <polygon points="18,24 21,10 30,23" fill="#8A7AD6" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="46,24 43,10 34,23" fill="#8A7AD6" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="15" fill="#9E8FE0" stroke="#0A2140" stroke-width="2.2"/>
      <circle cx="25" cy="30" r="6.4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.5"/>
      <circle cx="39" cy="30" r="6.4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.5"/>
      <ellipse cx="25" cy="30" rx="2.8" ry="3.2" fill="#0A2140" class="blink"/>
      <ellipse cx="39" cy="30" rx="2.8" ry="3.2" fill="#0A2140" class="blink"/>
      <circle cx="26.2" cy="28.9" r="1.1" fill="#fff"/><circle cx="40.2" cy="28.9" r="1.1" fill="#fff"/>
      <polygon points="32,35 28.5,39.5 35.5,39.5" fill="#FFD277" stroke="#0A2140" stroke-width="1.3" stroke-linejoin="round"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'elephant', name:'Peanut', svg:
    SHADOW(32,15) + `<g class="dance">
    <ellipse cx="23" cy="72" rx="6" ry="4.2" fill="#7E86A8" stroke="#0A2140" stroke-width="2"/>
    <ellipse cx="41" cy="72" rx="6" ry="4.2" fill="#7E86A8" stroke="#0A2140" stroke-width="2"/>
    <path d="M46 58 Q54 58 53 65" stroke="#0A2140" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M46 58 Q54 58 53 65" stroke="#9AA2C0" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g class="al"><path d="M21 52 Q17 58 15 62" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
    <path d="M21 52 Q17 58 15 62" stroke="#9AA2C0" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="ar"><path d="M43 52 Q47 58 49 62" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
    <path d="M43 52 Q47 58 49 62" stroke="#9AA2C0" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="32" cy="59" rx="14" ry="13" fill="#9AA2C0" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="62" rx="8" ry="7.5" fill="#B8C0DA" stroke="#0A2140" stroke-width="1.4"/>
    <g class="head">
      <ellipse cx="12" cy="30" rx="9" ry="11" fill="#8992B4" stroke="#0A2140" stroke-width="2.2" class="el"/>
      <ellipse cx="12" cy="30" rx="5" ry="6.6" fill="#C4A0B4" opacity=".55"/>
      <ellipse cx="52" cy="30" rx="9" ry="11" fill="#8992B4" stroke="#0A2140" stroke-width="2.2" class="er"/>
      <ellipse cx="52" cy="30" rx="5" ry="6.6" fill="#C4A0B4" opacity=".55"/>
      <circle cx="32" cy="32" r="16" fill="#9AA2C0" stroke="#0A2140" stroke-width="2.2"/>
      <path d="M32 40 Q31 50 32 56 Q33 59 35 58" fill="none" stroke="#0A2140" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 40 Q31 50 32 56 Q33 59 35 58" fill="none" stroke="#9AA2C0" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M31.4 44 L34.2 43.8 M31.4 48 L34.2 48 M31.8 52 L34.4 52.2" stroke="#7E86A8" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="24" cy="31" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
      <ellipse cx="40" cy="31" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
      <circle cx="25.7" cy="29.9" r="1" fill="#fff"/><circle cx="41.7" cy="29.9" r="1" fill="#fff"/>
      <ellipse cx="19" cy="36" rx="3" ry="2" fill="#E0899F" opacity=".6"/>
      <ellipse cx="45" cy="36" rx="3" ry="2" fill="#E0899F" opacity=".6"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'dragon', name:'Blaze', svg:
    SHADOW() + `<g class="dance">` + FEET('#2E7D4F') + `
    <path d="M45 52 Q59 56 54 68 Q48 58 41 56 Z" fill="#5DCAA5" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>`
    + ARMS('#4FB78F') + `
    <ellipse cx="32" cy="58" rx="14" ry="14" fill="#4FB78F" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="61" rx="8" ry="8.5" fill="#C8EFDD" stroke="#0A2140" stroke-width="1.4"/>
    <path d="M22 47 L26 41 L30 47 L34 41 L38 47 L42 41 L44 48" fill="none" stroke="#0A2140" stroke-width="4" stroke-linejoin="round"/>
    <path d="M22 47 L26 41 L30 47 L34 41 L38 47 L42 41 L44 48" fill="none" stroke="#FFD277" stroke-width="2" stroke-linejoin="round"/>
    <g class="head">
      <polygon points="19,24 15,10 28,22" fill="#FFD277" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <polygon points="45,24 49,10 36,22" fill="#FFD277" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="32" cy="33" r="15.5" fill="#5DCAA5" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="40" rx="9" ry="6.5" fill="#8FE0C0" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,31) + BLUSH(19,45,36,'#1F7A6B','.4') + `
      <circle cx="29" cy="39" r="1.1" fill="#0A2140"/><circle cx="35" cy="39" r="1.1" fill="#0A2140"/>`
      + SMILE(32,42.5) + SANTA_HAT + `</g></g>` },

  { id:'seal', name:'Pebble', svg:
    SHADOW(32,15) + `<g class="dance">
    <path d="M20 70 Q14 74 20 76 Q26 76 26 71 Z" fill="#B8C4E0" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
    <path d="M44 70 Q50 74 44 76 Q38 76 38 71 Z" fill="#B8C4E0" stroke="#0A2140" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="32" cy="56" rx="16" ry="17" fill="#C6D2EC" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="59" rx="9" ry="10" fill="#EDF2FB" stroke="#0A2140" stroke-width="1.4"/>
    <g class="al"><ellipse cx="16" cy="55" rx="6.5" ry="9" fill="#B8C4E0" stroke="#0A2140" stroke-width="2"/></g>
    <g class="ar"><ellipse cx="48" cy="55" rx="6.5" ry="9" fill="#B8C4E0" stroke="#0A2140" stroke-width="2"/></g>
    <g class="head">
      <circle cx="32" cy="33" r="15" fill="#C6D2EC" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="39" rx="8.5" ry="6.5" fill="#EDF2FB" stroke="#0A2140" stroke-width="1.5"/>`
      + EYES(25,39,31) + BLUSH(19,45,36,'#7FA0D0','.55') + `
      <ellipse cx="32" cy="37.5" rx="2.8" ry="2.1" fill="#0A2140"/>` + SMILE(32,41) + `
      <path d="M14 36 L23 36.6 M14 40 L23 39 M50 36 L41 36.6 M50 40 L41 39" stroke="#0A2140" stroke-width="1.2" stroke-linecap="round"/>`
      + BOBBLE_HAT('#E24B4A') + `</g></g>` },

  { id:'koala', name:'Sleepy', svg:
    SHADOW() + `<g class="dance">` + FEET('#8E8AA0') + ARMS('#B8B5C9') + BODY('#B8B5C9','#D9D5E8') + `
    <g class="head">
      <circle cx="14" cy="28" r="8.5" fill="#B8B5C9" stroke="#0A2140" stroke-width="2" class="el"/>
      <circle cx="50" cy="28" r="8.5" fill="#B8B5C9" stroke="#0A2140" stroke-width="2" class="er"/>
      <circle cx="14" cy="28" r="4.6" fill="#D9D5E8"/><circle cx="50" cy="28" r="4.6" fill="#D9D5E8"/>
      <circle cx="32" cy="34" r="15" fill="#C4C1D6" stroke="#0A2140" stroke-width="2.2"/>`
      + EYES(25,39,32) + BLUSH(19,45,37,'#8A7AD6','.45') + `
      <ellipse cx="32" cy="40" rx="5" ry="6.4" fill="#4A4560" stroke="#0A2140" stroke-width="1.5"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'snowman', name:'Frost', svg:
    SHADOW() + `<g class="dance">
    <ellipse cx="32" cy="60" rx="16" ry="14" fill="#F4F9FD" stroke="#0A2140" stroke-width="2.2"/>
    <circle cx="32" cy="55" r="1.9" fill="#2A2438"/><circle cx="32" cy="62" r="1.9" fill="#2A2438"/>
    <g class="al"><path d="M18 52 Q10 48 6 44 M11 49 L9 44 M11 49 L6 50" stroke="#0A2140" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M18 52 Q10 48 6 44 M11 49 L9 44 M11 49 L6 50" stroke="#8A5A33" stroke-width="2" fill="none" stroke-linecap="round"/></g>
    <g class="ar"><path d="M46 52 Q54 48 58 44 M53 49 L55 44 M53 49 L58 50" stroke="#0A2140" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M46 52 Q54 48 58 44 M53 49 L55 44 M53 49 L58 50" stroke="#8A5A33" stroke-width="2" fill="none" stroke-linecap="round"/></g>
    <g class="head">
      <circle cx="32" cy="33" r="14" fill="#F4F9FD" stroke="#0A2140" stroke-width="2.2"/>`
      + EYES(26,38,31) + BLUSH(20,44,36,'#7FB3D5','.55') + `
      <path d="M32 35 L42 37.5 L32 39.5 Z" fill="#E8763F" stroke="#0A2140" stroke-width="1.3" stroke-linejoin="round"/>
      <circle cx="27" cy="38.5" r=".9" fill="#0A2140"/><circle cx="30" cy="40" r=".9" fill="#0A2140"/>
      <path d="M16 22 Q21 8 36 10 Q45 12 42 21 Z" fill="#2C5FA8" stroke="#0A2140" stroke-width="2"/>
      <rect x="14" y="20" width="32" height="5.6" rx="2.8" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
      <circle cx="44" cy="11" r="4.4" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
    </g>` + SCARF('#E24B4A','#FFFFFF') + `</g>` },

  { id:'ninja', name:'Shadow', svg:
    SHADOW(32,13) + `<g class="dance">
    <ellipse cx="25" cy="72" rx="5.5" ry="4" fill="#1B2440" stroke="#0A2140" stroke-width="2"/>
    <ellipse cx="39" cy="72" rx="5.5" ry="4" fill="#1B2440" stroke="#0A2140" stroke-width="2"/>`
    + ARMS('#2A3557') + `
    <ellipse cx="32" cy="57" rx="14" ry="14" fill="#2A3557" stroke="#0A2140" stroke-width="2.2"/>
    <path d="M18 55 Q32 60 46 55 L46 60 Q32 65 18 60 Z" fill="#C0334E" stroke="#0A2140" stroke-width="1.7" stroke-linejoin="round"/>
    <g class="head">
      <circle cx="32" cy="32" r="16" fill="#2A3557" stroke="#0A2140" stroke-width="2.2"/>
      <path d="M15.5 29 Q32 23 48.5 29 L48.5 37 Q32 31 15.5 37 Z" fill="#F0BFA0" stroke="#0A2140" stroke-width="1.6"/>`
      + EYES(25,39,32.5) + BLUSH(18,46,35,'#F09595','.7') + `
      <path d="M48 29 Q58 26 60 32 Q56 33 49 32 Z" fill="#2A3557" stroke="#0A2140" stroke-width="1.6" stroke-linejoin="round"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'bee', name:'Buzz', svg:
    SHADOW(32,12) + `<g class="dance">
    <ellipse cx="26" cy="72" rx="4.5" ry="3.5" fill="#3A2A20" stroke="#0A2140" stroke-width="1.9"/>
    <ellipse cx="38" cy="72" rx="4.5" ry="3.5" fill="#3A2A20" stroke="#0A2140" stroke-width="1.9"/>
    <g class="al"><ellipse cx="15" cy="46" rx="9" ry="6" fill="#DCEBF7" stroke="#0A2140" stroke-width="1.9"/></g>
    <g class="ar"><ellipse cx="49" cy="46" rx="9" ry="6" fill="#DCEBF7" stroke="#0A2140" stroke-width="1.9"/></g>
    <ellipse cx="32" cy="56" rx="15" ry="15" fill="#FFD277" stroke="#0A2140" stroke-width="2.2"/>
    <path d="M20 50 Q32 47 44 50 M18 57 Q32 54 46 57 M20 64 Q32 62 44 64" stroke="#0A2140" stroke-width="3.4" fill="none"/>
    <g class="head">
      <path d="M24 20 Q22 12 19 9 M40 20 Q42 12 45 9" stroke="#0A2140" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="19" cy="8" r="2.6" fill="#3A2A20" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="45" cy="8" r="2.6" fill="#3A2A20" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="32" cy="31" r="14" fill="#3A2A20" stroke="#0A2140" stroke-width="2.2"/>
      <circle cx="26" cy="30" r="4.2" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="38" cy="30" r="4.2" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <ellipse cx="26" cy="30" rx="2.2" ry="2.6" fill="#0A2140" class="blink"/>
      <ellipse cx="38" cy="30" rx="2.2" ry="2.6" fill="#0A2140" class="blink"/>
      <circle cx="27" cy="28.9" r="1" fill="#fff"/><circle cx="39" cy="28.9" r="1" fill="#fff"/>
      <path d="M28.5 36 Q32 38.6 35.5 36" stroke="#F4F9FD" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
      + SANTA_HAT + `</g></g>` },

  { id:'butterfly', name:'Flutter', svg:
    SHADOW(32,11) + `<g class="dance">
    <ellipse cx="27" cy="72" rx="4" ry="3.5" fill="#6E3B5C" stroke="#0A2140" stroke-width="1.9"/>
    <ellipse cx="37" cy="72" rx="4" ry="3.5" fill="#6E3B5C" stroke="#0A2140" stroke-width="1.9"/>
    <g class="al">
      <ellipse cx="14" cy="44" rx="12" ry="9" fill="#F49BC1" stroke="#0A2140" stroke-width="2"/>
      <ellipse cx="17" cy="59" rx="9" ry="7" fill="#E8763F" stroke="#0A2140" stroke-width="2"/>
      <circle cx="11" cy="42" r="2.6" fill="#FFF4EA" stroke="#0A2140" stroke-width="1.1"/>
    </g>
    <g class="ar">
      <ellipse cx="50" cy="44" rx="12" ry="9" fill="#F49BC1" stroke="#0A2140" stroke-width="2"/>
      <ellipse cx="47" cy="59" rx="9" ry="7" fill="#E8763F" stroke="#0A2140" stroke-width="2"/>
      <circle cx="53" cy="42" r="2.6" fill="#FFF4EA" stroke="#0A2140" stroke-width="1.1"/>
    </g>
    <ellipse cx="32" cy="52" rx="5" ry="18" fill="#6E3B5C" stroke="#0A2140" stroke-width="2.1"/>
    <g class="head">
      <path d="M27 20 Q24 12 20 9 M37 20 Q40 12 44 9" stroke="#0A2140" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="8" r="2.5" fill="#FFD277" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="44" cy="8" r="2.5" fill="#FFD277" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="32" cy="30" r="12.5" fill="#8A4A73" stroke="#0A2140" stroke-width="2.2"/>
      <circle cx="27" cy="29" r="3.8" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.3"/>
      <circle cx="37" cy="29" r="3.8" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.3"/>
      <ellipse cx="27" cy="29" rx="2" ry="2.4" fill="#0A2140" class="blink"/>
      <ellipse cx="37" cy="29" rx="2" ry="2.4" fill="#0A2140" class="blink"/>
      <circle cx="27.9" cy="28" r=".9" fill="#fff"/><circle cx="37.9" cy="28" r=".9" fill="#fff"/>
      <path d="M29 34.5 Q32 37 35 34.5" stroke="#F4F9FD" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g></g>` },

  { id:'ladybird', name:'Dot', svg:
    SHADOW(32,12) + `<g class="dance">
    <ellipse cx="26" cy="72" rx="4.5" ry="3.5" fill="#1B2440" stroke="#0A2140" stroke-width="1.9"/>
    <ellipse cx="38" cy="72" rx="4.5" ry="3.5" fill="#1B2440" stroke="#0A2140" stroke-width="1.9"/>`
    + ARMS('#1B2440') + `
    <ellipse cx="32" cy="55" rx="16" ry="16" fill="#E24B4A" stroke="#0A2140" stroke-width="2.2"/>
    <path d="M32 39 L32 71" stroke="#0A2140" stroke-width="2.2"/>
    <circle cx="23" cy="49" r="3.2" fill="#1B2440"/><circle cx="41" cy="49" r="3.2" fill="#1B2440"/>
    <circle cx="21" cy="60" r="2.6" fill="#1B2440"/><circle cx="43" cy="60" r="2.6" fill="#1B2440"/>
    <g class="head">
      <path d="M25 20 Q23 13 20 10 M39 20 Q41 13 44 10" stroke="#0A2140" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="9" r="2.5" fill="#1B2440" stroke="#0A2140" stroke-width="1.3"/>
      <circle cx="44" cy="9" r="2.5" fill="#1B2440" stroke="#0A2140" stroke-width="1.3"/>
      <circle cx="32" cy="31" r="13" fill="#1B2440" stroke="#0A2140" stroke-width="2.2"/>
      <circle cx="26.5" cy="30" r="4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.3"/>
      <circle cx="37.5" cy="30" r="4" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.3"/>
      <ellipse cx="26.5" cy="30" rx="2.1" ry="2.5" fill="#0A2140" class="blink"/>
      <ellipse cx="37.5" cy="30" rx="2.1" ry="2.5" fill="#0A2140" class="blink"/>
      <circle cx="27.4" cy="28.9" r=".95" fill="#fff"/><circle cx="38.4" cy="28.9" r=".95" fill="#fff"/>
      <path d="M28.5 35.5 Q32 38 35.5 35.5" stroke="#F4F9FD" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M18 19 Q23 6 38 8 Q47 10 44 19 Z" fill="#2E7D4F" stroke="#0A2140" stroke-width="2"/>
      <rect x="16" y="17" width="31" height="5.4" rx="2.7" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
      <circle cx="46" cy="9" r="4.3" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
    </g></g>` },

  { id:'octopus', name:'Inky', svg:
    SHADOW(32,15) + `<g class="dance">
    <path d="M14 52 Q9 62 13 72 M23 55 Q20 65 23 73 M32 58 Q32 68 32 74 M41 55 Q44 65 41 73 M50 52 Q55 62 51 72"
          stroke="#0A2140" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M14 52 Q9 62 13 72 M23 55 Q20 65 23 73 M32 58 Q32 68 32 74 M41 55 Q44 65 41 73 M50 52 Q55 62 51 72"
          stroke="#8A4A73" stroke-width="4.6" fill="none" stroke-linecap="round"/>
    <path d="M13 50 Q13 26 32 26 Q51 26 51 50 Z" fill="#A85E90" stroke="#0A2140" stroke-width="2.2" stroke-linejoin="round"/>
    <g class="head">
      <circle cx="24" cy="39" r="4.6" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <circle cx="40" cy="39" r="4.6" fill="#F4F9FD" stroke="#0A2140" stroke-width="1.4"/>
      <ellipse cx="24" cy="39" rx="2.4" ry="2.8" fill="#0A2140" class="blink"/>
      <ellipse cx="40" cy="39" rx="2.4" ry="2.8" fill="#0A2140" class="blink"/>
      <circle cx="25.2" cy="37.8" r="1.1" fill="#fff"/><circle cx="41.2" cy="37.8" r="1.1" fill="#fff"/>`
      + BLUSH(16,48,45,'#F49BC1','.8') + SMILE(32,45) + `
      <path d="M17 25 Q22 11 37 13 Q46 15 43 24 Z" fill="#E24B4A" stroke="#0A2140" stroke-width="2"/>
      <rect x="15" y="23" width="31" height="5.4" rx="2.7" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
      <circle cx="45" cy="14" r="4.3" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
    </g></g>` },

  { id:'cow', name:'Clover', svg:
    SHADOW() + `<g class="dance">` + FEET('#1B2440') + ARMS('#F7F4FF') + `
    <ellipse cx="32" cy="58" rx="14" ry="14" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>
    <path d="M22 54 Q26 48 30 54 Q28 60 22 58 Z" fill="#1B2440"/>
    <path d="M40 62 Q44 58 44 64 Q40 67 38 64 Z" fill="#1B2440"/>
    <g class="head">
      <path d="M17 20 Q13 15 16 12 Q20 13 20 18" fill="#EBD3B4" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M47 20 Q51 15 48 12 Q44 13 44 18" fill="#EBD3B4" stroke="#0A2140" stroke-width="1.8" stroke-linejoin="round"/>
      <ellipse cx="15" cy="28" rx="5.5" ry="4" fill="#F7F4FF" stroke="#0A2140" stroke-width="2" class="el"/>
      <ellipse cx="49" cy="28" rx="5.5" ry="4" fill="#F7F4FF" stroke="#0A2140" stroke-width="2" class="er"/>
      <circle cx="32" cy="32" r="15.5" fill="#F7F4FF" stroke="#0A2140" stroke-width="2.2"/>
      <path d="M20 24 Q26 20 30 25 Q26 30 20 28 Z" fill="#1B2440"/>
      <ellipse cx="32" cy="40" rx="9.5" ry="7" fill="#F9C6D6" stroke="#0A2140" stroke-width="1.6"/>
      <ellipse cx="28.5" cy="39" rx="1.5" ry="1.9" fill="#0A2140"/>
      <ellipse cx="35.5" cy="39" rx="1.5" ry="1.9" fill="#0A2140"/>`
      + EYES(25,39,30) + `</g>` + SCARF('#E24B4A','#C0334E') + `</g>` },

  { id:'sheep', name:'Cloud', svg:
    SHADOW() + `<g class="dance">` + FEET('#3A2A20') + ARMS('#3A2A20') + `
    <circle cx="20" cy="55" r="8" fill="#FBF8F0" stroke="#0A2140" stroke-width="2"/>
    <circle cx="44" cy="55" r="8" fill="#FBF8F0" stroke="#0A2140" stroke-width="2"/>
    <circle cx="26" cy="64" r="7.5" fill="#FBF8F0" stroke="#0A2140" stroke-width="2"/>
    <circle cx="38" cy="64" r="7.5" fill="#FBF8F0" stroke="#0A2140" stroke-width="2"/>
    <circle cx="32" cy="56" r="13" fill="#FBF8F0" stroke="#0A2140" stroke-width="2.2"/>
    <g class="head">
      <ellipse cx="15" cy="31" rx="5.5" ry="3.6" fill="#EBD3B4" stroke="#0A2140" stroke-width="1.9" class="el"/>
      <ellipse cx="49" cy="31" rx="5.5" ry="3.6" fill="#EBD3B4" stroke="#0A2140" stroke-width="1.9" class="er"/>
      <circle cx="32" cy="33" r="14" fill="#EBD3B4" stroke="#0A2140" stroke-width="2.2"/>
      <circle cx="22" cy="24" r="6" fill="#FBF8F0" stroke="#0A2140" stroke-width="1.9"/>
      <circle cx="42" cy="24" r="6" fill="#FBF8F0" stroke="#0A2140" stroke-width="1.9"/>
      <circle cx="32" cy="20" r="6.5" fill="#FBF8F0" stroke="#0A2140" stroke-width="1.9"/>`
      + EYES(26,38,33) + BLUSH(20,44,37,'#F09595','.7') + `
      <ellipse cx="32" cy="39" rx="2.4" ry="1.8" fill="#0A2140"/>` + SMILE(32,41.5) + `</g></g>` },

  { id:'pig', name:'Truffle', svg:
    SHADOW() + `<g class="dance">` + FEET('#D98BA8') + `
    <path d="M46 56 Q54 54 52 60 Q49 64 47 60" stroke="#0A2140" stroke-width="4.6" fill="none" stroke-linecap="round"/>
    <path d="M46 56 Q54 54 52 60 Q49 64 47 60" stroke="#F49BC1" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
    + ARMS('#F49BC1') + `
    <ellipse cx="32" cy="58" rx="14" ry="14" fill="#F49BC1" stroke="#0A2140" stroke-width="2.2"/>
    <g class="head">
      <path d="M17 27 Q14 16 22 17 Q25 21 24 27 Z" fill="#F49BC1" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="el"/>
      <path d="M47 27 Q50 16 42 17 Q39 21 40 27 Z" fill="#F49BC1" stroke="#0A2140" stroke-width="2" stroke-linejoin="round" class="er"/>
      <circle cx="32" cy="33" r="15.5" fill="#FBB0C8" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="40" rx="9" ry="6.5" fill="#F08BB0" stroke="#0A2140" stroke-width="1.7"/>
      <ellipse cx="28.6" cy="40" rx="1.6" ry="2.1" fill="#0A2140"/>
      <ellipse cx="35.4" cy="40" rx="1.6" ry="2.1" fill="#0A2140"/>`
      + EYES(25,39,31) + BLUSH(19,45,36,'#E2688F','.7') + SANTA_HAT + `</g></g>` },

  { id:'giraffe', name:'Sprout', svg:
    SHADOW() + `<g class="dance">
    <ellipse cx="24" cy="72" rx="5.5" ry="4" fill="#B8834F" stroke="#0A2140" stroke-width="2"/>
    <ellipse cx="40" cy="72" rx="5.5" ry="4" fill="#B8834F" stroke="#0A2140" stroke-width="2"/>
    <path d="M46 58 Q54 58 53 66" stroke="#0A2140" stroke-width="4.4" fill="none" stroke-linecap="round"/>
    <path d="M46 58 Q54 58 53 66" stroke="#E8B863" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M52 64 Q56 68 52 71" stroke="#0A2140" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <path d="M52 64 Q56 68 52 71" stroke="#6B4A2F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <g class="al"><path d="M21 57 Q17 62 15 66" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
    <path d="M21 57 Q17 62 15 66" stroke="#E8B863" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="ar"><path d="M43 57 Q47 62 49 66" stroke="#0A2140" stroke-width="9.5" fill="none" stroke-linecap="round"/>
    <path d="M43 57 Q47 62 49 66" stroke="#E8B863" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="32" cy="61" rx="13" ry="12" fill="#E8B863" stroke="#0A2140" stroke-width="2.2"/>
    <ellipse cx="32" cy="63" rx="7.5" ry="7.5" fill="#F7DCA8" stroke="#0A2140" stroke-width="1.4"/>
    <circle cx="23" cy="56" r="2.6" fill="#B8834F"/><circle cx="41" cy="57" r="2.4" fill="#B8834F"/>
    <circle cx="24" cy="66" r="2.2" fill="#B8834F"/><circle cx="41" cy="66" r="2.4" fill="#B8834F"/>
    <path d="M26 50 L26 34 Q26 30 32 30 Q38 30 38 34 L38 50 Z" fill="#E8B863" stroke="#0A2140" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="30" cy="45" r="2.3" fill="#B8834F"/><circle cx="35" cy="39" r="2.1" fill="#B8834F"/>
    <circle cx="29.5" cy="35" r="1.9" fill="#B8834F"/>
    <path d="M38 33 Q41 40 40 48" stroke="#8A5A33" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <g class="head">
      <path d="M25 15 L24 8 M39 15 L40 8" stroke="#0A2140" stroke-width="4" stroke-linecap="round"/>
      <path d="M25 15 L24 8 M39 15 L40 8" stroke="#B8834F" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="23.6" cy="7" r="2.9" fill="#6B4A2F" stroke="#0A2140" stroke-width="1.6"/>
      <circle cx="40.4" cy="7" r="2.9" fill="#6B4A2F" stroke="#0A2140" stroke-width="1.6"/>
      <ellipse cx="15" cy="21" rx="5.6" ry="3.6" fill="#E8B863" stroke="#0A2140" stroke-width="2" class="el"/>
      <ellipse cx="49" cy="21" rx="5.6" ry="3.6" fill="#E8B863" stroke="#0A2140" stroke-width="2" class="er"/>
      <ellipse cx="32" cy="24" rx="14.5" ry="13" fill="#F0C778" stroke="#0A2140" stroke-width="2.2"/>
      <ellipse cx="32" cy="30" rx="8.5" ry="6.5" fill="#F7DCA8" stroke="#0A2140" stroke-width="1.5"/>
      <ellipse cx="29" cy="29.5" rx="1.4" ry="1.8" fill="#0A2140"/>
      <ellipse cx="35" cy="29.5" rx="1.4" ry="1.8" fill="#0A2140"/>
      <ellipse cx="25" cy="22" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
      <ellipse cx="39" cy="22" rx="2.8" ry="3.4" fill="#0A2140" class="blink"/>
      <circle cx="26.7" cy="20.9" r="1" fill="#fff"/><circle cx="40.7" cy="20.9" r="1" fill="#fff"/>
      <ellipse cx="19" cy="27" rx="3" ry="2" fill="#C0334E" opacity=".5"/>
      <ellipse cx="45" cy="27" rx="3" ry="2" fill="#C0334E" opacity=".5"/>
      <path d="M32 33 Q28.5 36.5 26 34.5 M32 33 Q35.5 36.5 38 34.5" fill="none" stroke="#0A2140" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M18 12 Q22 -1 38 1 Q47 3 44 11 Q41 15 38 12 Z" fill="#E24B4A" stroke="#0A2140" stroke-width="2"/>
      <rect x="16" y="10" width="32" height="5.4" rx="2.7" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
      <circle cx="46" cy="2" r="4.3" fill="#FFFFFF" stroke="#0A2140" stroke-width="1.8"/>
    </g></g>` }
];

/* Render helper --------------------------------------------------
   size: any CSS length, e.g. "72px" or "120px"
   Each character gets a random animation delay so they don't move
   in unison — twenty animals dancing in perfect time looks wrong. */

export function renderCharacter(id, size = '72px') {
  const c = CHARACTERS.find(x => x.id === id);
  if (!c) return null;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 64 80');
  svg.setAttribute('class', 'adv-svg');
  svg.setAttribute('role', 'img');
  svg.style.width = size;
  svg.style.height = size;
  svg.innerHTML = `<title>${c.name}</title>` + c.svg;

  const delay = (Math.random() * 1.44).toFixed(2) + 's';
  svg.querySelectorAll('.dance,.head,.al,.ar,.el,.er,.fl,.fr,.wing,.fin').forEach(el => {
    el.style.animationDelay = delay;
  });
  svg.querySelectorAll('.blink').forEach(el => {
    el.style.animationDelay = (Math.random() * 3.2).toFixed(2) + 's';
  });
  return svg;
}
