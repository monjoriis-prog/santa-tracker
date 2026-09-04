// music.js — a music-box arrangement of "Jingle Bells", synthesised live.
//
// No audio file, nothing to license, nothing to host. The tune (James Lord
// Pierpont, 1857) is public domain, and this recording is generated in the
// browser, so there is no separate recording copyright to worry about.
//
// Never starts on its own. Browsers block autoplay, and music that starts by
// itself makes people close the tab. Call santaMusic.play() from a click.
//
// Usage:
//   <script src="sound.js"></script>
//   <script src="music.js"></script>
//   <button id="music-toggle">Play music</button>
//   santaMusic.attachToggle(document.getElementById('music-toggle'));
//
// If sound.js is present, this hooks into its mute and volume control, so the
// speaker button in the header governs music and sound effects together.

(function (global) {
  'use strict';

  var VOL_KEY = 'santa:music';
  var ctx = null, bus = null, filter = null;
  var playing = false, timer = null;
  var noteIndex = 0, nextTime = 0;
  var volume = 0.28;
  var muted = false;

  try {
    var saved = parseFloat(localStorage.getItem(VOL_KEY));
    if (!isNaN(saved) && saved >= 0 && saved <= 1) volume = saved;
  } catch (e) {}

  var TEMPO = 132;                 // beats per minute
  var BEAT = 60 / TEMPO;
  var LOOKAHEAD = 0.2;             // seconds of audio scheduled ahead
  var TICK = 25;                   // scheduler interval, ms

  // Melody, octave 5. [frequency, beats]. A null frequency is a rest.
  var C = 523.25, D = 587.33, E = 659.25, F = 698.46, G = 783.99;

  var MELODY = [
    [E,1],[E,1],[E,2],
    [E,1],[E,1],[E,2],
    [E,1],[G,1],[C,1.5],[D,0.5],[E,4],
    [F,1],[F,1],[F,1.5],[F,0.5],
    [F,1],[E,1],[E,1],[E,0.5],[E,0.5],
    [E,1],[D,1],[D,1],[E,1],
    [D,2],[G,2],

    [E,1],[E,1],[E,2],
    [E,1],[E,1],[E,2],
    [E,1],[G,1],[C,1.5],[D,0.5],[E,4],
    [F,1],[F,1],[F,1.5],[F,0.5],
    [F,1],[E,1],[E,1],[E,0.5],[E,0.5],
    [G,1],[G,1],[F,1],[D,1],
    [C,4],
    [null,2]                       // breath before the loop repeats
  ];

  // One bass note per four-beat bar, cycled alongside the melody.
  var C3 = 130.81, F3 = 174.61, G3 = 196.00;
  var BASS = [C3,C3,C3,C3,F3,C3,G3,G3, C3,C3,C3,C3,F3,C3,G3,C3, C3];

  function ensureCtx() {
    if (ctx) return ctx;
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
      filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 4200;
      bus = ctx.createGain();
      bus.gain.value = muted ? 0 : volume;
      filter.connect(bus);
      bus.connect(ctx.destination);
    } catch (e) { ctx = null; }
    return ctx;
  }

  // A struck music-box tine: bright fundamental, an octave above it, and a
  // faint inharmonic partial that gives the metallic edge.
  function pluck(freq, time, gainScale) {
    var partials = [[1, 1.0, 1.9], [2, 0.34, 1.3], [3.01, 0.12, 0.8]];
    for (var i = 0; i < partials.length; i++) {
      var mult = partials[i][0], amp = partials[i][1] * (gainScale || 1), decay = partials[i][2];
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * mult, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(amp * 0.3, time + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, time + decay);
      osc.connect(g); g.connect(filter);
      osc.start(time);
      osc.stop(time + decay + 0.05);
    }
  }

  function bassNote(freq, time) {
    var osc = ctx.createOscillator();
    var g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(0.13, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 1.1);
    osc.connect(g); g.connect(filter);
    osc.start(time);
    osc.stop(time + 1.2);
  }

  // Soft sleigh-bell shimmer on the beat, well under the melody.
  function shimmer(time) {
    var freqs = [2093, 2637, 3136];
    for (var i = 0; i < freqs.length; i++) {
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqs[i] * (0.98 + Math.random() * 0.04), time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(0.022, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
      osc.connect(g); g.connect(filter);
      osc.start(time); osc.stop(time + 0.3);
    }
  }

  var beatCounter = 0;

  function scheduler() {
    if (!playing || !ctx) return;
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      var note = MELODY[noteIndex];
      var freq = note[0], beats = note[1];

      if (freq) pluck(freq, nextTime, 1);

      // bass on the downbeat of each bar
      if (beatCounter % 4 === 0) {
        var bar = Math.floor(beatCounter / 4) % BASS.length;
        bassNote(BASS[bar], nextTime);
      }
      if (freq && beats >= 1) shimmer(nextTime);

      nextTime += beats * BEAT;
      beatCounter += beats;
      noteIndex++;
      if (noteIndex >= MELODY.length) { noteIndex = 0; beatCounter = 0; }
    }
    timer = setTimeout(scheduler, TICK);
  }

  function applyGain() {
    if (bus) bus.gain.value = muted ? 0 : volume;
  }

  var api = {
    play: function () {
      var c = ensureCtx();
      if (!c || playing) return;
      if (c.state === 'suspended') c.resume();
      // iOS needs a silent buffer to actually play before the context unmutes
      try {
        var b = c.createBuffer(1, 1, c.sampleRate);
        var s = c.createBufferSource();
        s.buffer = b;
        s.connect(c.destination);
        s.start(0);
      } catch (e) {}
      playing = true;
      noteIndex = 0;
      beatCounter = 0;
      nextTime = c.currentTime + 0.1;
      scheduler();
      sync();
    },
    stop: function () {
      playing = false;
      if (timer) { clearTimeout(timer); timer = null; }
      sync();
    },
    toggle: function () { playing ? api.stop() : api.play(); },
    isPlaying: function () { return playing; },
    getVolume: function () { return volume; },
    setVolume: function (v) {
      volume = Math.min(1, Math.max(0, Number(v) || 0));
      try { localStorage.setItem(VOL_KEY, String(volume)); } catch (e) {}
      applyGain();
    },
    setMuted: function (m) { muted = !!m; applyGain(); },
    attachToggle: function (el) {
      if (!el) return;
      el.setAttribute('data-music-toggle', '');
      el.addEventListener('click', function () { api.toggle(); });
      sync();
    }
  };

  function sync() {
    document.querySelectorAll('[data-music-toggle]').forEach(function (el) {
      el.setAttribute('aria-pressed', playing ? 'true' : 'false');
      el.textContent = playing ? 'Pause music' : 'Play music';
    });
  }

  // Stop scheduling while the tab is hidden, so it doesn't run in the background.
  document.addEventListener('visibilitychange', function () {
    if (!ctx) return;
    if (document.hidden) { if (ctx.state === 'running') ctx.suspend(); }
    else if (playing && ctx.state === 'suspended') { ctx.resume(); }
  });

  // Follow the site's existing mute and volume control, if sound.js is loaded.
  if (global.santaSound) {
    var s = global.santaSound;
    muted = !s.isEnabled();
    applyGain();
    var origEnabled = s.setEnabled;
    s.setEnabled = function (on) { origEnabled.call(s, on); api.setMuted(!s.isEnabled()); };
    var origVol = s.setVolume;
    s.setVolume = function (v) { origVol.call(s, v); api.setMuted(!s.isEnabled()); };
  }

  global.santaMusic = api;
})(window);
