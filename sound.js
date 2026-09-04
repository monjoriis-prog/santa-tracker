// sound.js — self-contained audio for the Santa tracker.
//
// No audio files. Every sound is synthesised with the Web Audio API, so there is
// nothing to host and nothing to preload.
//
// Two things that commonly break sound on a site like this, both handled here:
//   1. Browsers suspend audio until the user has interacted with the page. The
//      AudioContext is therefore created lazily and resumed on the first real
//      gesture, whatever that gesture happens to be.
//   2. Wiring sounds to specific element IDs breaks whenever markup is rewritten.
//      This module listens on the document instead, so any element carrying a
//      data-sound attribute works -- including elements added later.
//
// Usage:
//   <script src="sound.js"></script>
//   <button data-sound="click">Start tracking</button>
//   <button id="sound-toggle" aria-pressed="true">Sound on</button>
//   santaSound.play('celebrate');   // right answer
//   santaSound.play('womp');        // wrong answer
//   santaSound.attachToggle(document.getElementById('sound-toggle'));
//   santaSound.createControl(document.querySelector('.site-header'));  // icon + slider

(function (global) {
  'use strict';

  var STORE_KEY = 'santa:sound';
  var VOL_KEY = 'santa:volume';
  var ctx = null;
  var master = null;
  var enabled = true;
  var volume = 0.5;
  var unlocked = false;

  try {
    var saved = localStorage.getItem(STORE_KEY);
    if (saved !== null) enabled = saved === '1';
    var sv = parseFloat(localStorage.getItem(VOL_KEY));
    if (!isNaN(sv) && sv >= 0 && sv <= 1) volume = sv;
  } catch (e) {}

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, enabled ? '1' : '0');
      localStorage.setItem(VOL_KEY, String(volume));
    } catch (e) {}
  }

  function applyGain() {
    if (master) master.gain.value = enabled ? volume : 0;
  }

  function ensureCtx() {
    if (ctx) return ctx;
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = enabled ? volume : 0;
      master.connect(ctx.destination);
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }

  // The first gesture of any kind unlocks audio. Listeners remove themselves.
  // Safari macOS needs 'mousedown'/'click'; iOS needs 'touchstart'.
  var UNLOCK_EVENTS = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click'];
  function unlock() {
    if (unlocked) return;
    var c = ensureCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume();
    // Safari sometimes needs a tiny silent buffer played during the gesture
    try {
      var b = c.createBuffer(1, 1, c.sampleRate);
      var s = c.createBufferSource();
      s.buffer = b;
      s.connect(c.destination);
      s.start(0);
    } catch (e) {}
    unlocked = true;
    UNLOCK_EVENTS.forEach(function (evt) {
      global.removeEventListener(evt, unlock, true);
    });
  }
  UNLOCK_EVENTS.forEach(function (evt) {
    global.addEventListener(evt, unlock, true);
  });

  function tone(opts) {
    var c = ensureCtx();
    if (!c) return;
    var t0 = c.currentTime + (opts.delay || 0);
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.slideTo) {
      osc.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + opts.dur);
    }
    var peak = opts.gain === undefined ? 0.3 : opts.gain;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (opts.attack || 0.008));
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + opts.dur + 0.05);
  }

  function noise(opts) {
    var c = ensureCtx();
    if (!c) return;
    var t0 = c.currentTime + (opts.delay || 0);
    var frames = Math.floor(c.sampleRate * opts.dur);
    var buf = c.createBuffer(1, frames, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource();
    src.buffer = buf;
    var filt = c.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.setValueAtTime(opts.from || 900, t0);
    filt.frequency.exponentialRampToValueAtTime(opts.to || 2600, t0 + opts.dur);
    filt.Q.value = 0.8;
    var gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(opts.gain || 0.18, t0 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur);
    src.connect(filt); filt.connect(gain); gain.connect(master);
    src.start(t0);
  }

  // brass-ish note: sawtooth through a falling lowpass, for the sad trombone
  function brass(freq, start, dur, opts) {
    var c = ensureCtx();
    if (!c) return;
    opts = opts || {};
    var t0 = c.currentTime + start;
    var osc = c.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t0);
    if (opts.bendTo) {
      osc.frequency.setValueAtTime(freq, t0 + dur * 0.45);
      osc.frequency.exponentialRampToValueAtTime(opts.bendTo, t0 + dur);
    }
    var filt = c.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(freq * 7, t0);
    filt.frequency.exponentialRampToValueAtTime(freq * 2.2, t0 + dur);
    filt.Q.value = 3;
    var gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(opts.gain || 0.2, t0 + 0.05);
    gain.gain.setValueAtTime(opts.gain || 0.2, t0 + dur * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(filt); filt.connect(gain); gain.connect(master);
    // wobble on the final slide
    if (opts.vibrato) {
      var lfo = c.createOscillator();
      var lfoGain = c.createGain();
      lfo.frequency.setValueAtTime(5.5, t0);
      lfoGain.gain.setValueAtTime(0, t0);
      lfoGain.gain.linearRampToValueAtTime(7, t0 + dur * 0.5);
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      lfo.start(t0); lfo.stop(t0 + dur + 0.05);
    }
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  var sounds = {
    // sleigh bells: a cluster of detuned high partials with fast decay
    bell: function () {
      var base = [1046, 1318, 1567, 2093];
      for (var i = 0; i < 7; i++) {
        var f = base[i % base.length] * (0.97 + Math.random() * 0.06);
        tone({ freq: f, type: 'triangle', dur: 0.5, gain: 0.10, delay: i * 0.035 + Math.random() * 0.02 });
      }
    },
    // single soft bell, for arrivals
    chime: function () {
      tone({ freq: 880, type: 'sine', dur: 1.1, gain: 0.22 });
      tone({ freq: 1320, type: 'sine', dur: 0.9, gain: 0.10, delay: 0.02 });
      tone({ freq: 2640, type: 'sine', dur: 0.5, gain: 0.05, delay: 0.03 });
    },
    click: function () {
      tone({ freq: 520, type: 'triangle', dur: 0.09, gain: 0.16 });
    },
    // door opening on the advent calendar
    open: function () {
      tone({ freq: 380, slideTo: 720, type: 'triangle', dur: 0.22, gain: 0.18 });
      tone({ freq: 760, type: 'sine', dur: 0.35, gain: 0.09, delay: 0.14 });
    },
    // right answer: rising fanfare, a bright chord, then a shower of sparkles
    celebrate: function () {
      [523, 659, 784, 1047].forEach(function (f, i) {
        tone({ freq: f, type: 'triangle', dur: 0.34, gain: 0.18, delay: i * 0.07 });
      });
      [1047, 1319, 1568].forEach(function (f) {
        tone({ freq: f, type: 'sine', dur: 0.85, gain: 0.11, delay: 0.28 });
      });
      for (var i = 0; i < 9; i++) {
        tone({
          freq: 1600 + Math.random() * 1600,
          type: 'sine',
          dur: 0.3,
          gain: 0.055,
          delay: 0.34 + Math.random() * 0.55
        });
      }
    },

    // wrong answer: sad trombone. Three descending notes, then a fourth that
    // slides down with a wobble on the end.
    womp: function () {
      brass(233.08, 0.00, 0.26, { gain: 0.20 });
      brass(220.00, 0.28, 0.26, { gain: 0.20 });
      brass(207.65, 0.56, 0.26, { gain: 0.20 });
      brass(196.00, 0.84, 0.90, { gain: 0.22, bendTo: 155, vibrato: true });
    },
    // sleigh passing overhead
    whoosh: function () {
      noise({ dur: 0.75, from: 500, to: 2800, gain: 0.14 });
    },
    // a gift landing on the counter
    pop: function () {
      tone({ freq: 640, slideTo: 1180, type: 'sine', dur: 0.13, gain: 0.16 });
    }
  };

  // aliases, so existing data-sound="success" / "wrong" keep working
  sounds.success = sounds.celebrate;
  sounds.wrong = sounds.womp;

  var ICON_ON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 6"/><path d="m21 9-5 6"/></svg>';

  function syncControls() {
    document.querySelectorAll('[data-sound-toggle]').forEach(function (el) {
      var on = enabled && volume > 0;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.setAttribute('aria-label', on ? 'Mute sound' : 'Unmute sound');
      if (el.hasAttribute('data-sound-icon')) {
        el.innerHTML = on ? ICON_ON : ICON_OFF;
      } else {
        el.textContent = on ? 'Sound on' : 'Sound off';
      }
    });
    document.querySelectorAll('[data-sound-range]').forEach(function (el) {
      el.value = String(Math.round((enabled ? volume : 0) * 100));
    });
  }

  var api = {
    play: function (name) {
      if (!enabled) return;
      var fn = sounds[name];
      if (!fn) return;
      var c = ensureCtx();
      if (!c) return;
      if (c.state === 'suspended') c.resume();
      try { fn(); } catch (e) {}
    },
    isEnabled: function () { return enabled; },
    setEnabled: function (on) {
      enabled = !!on;
      if (enabled && volume === 0) volume = 0.5;
      persist();
      applyGain();
      syncControls();
      if (enabled) api.play('click');
    },
    toggle: function () { api.setEnabled(!enabled); },

    getVolume: function () { return volume; },
    setVolume: function (v) {
      volume = Math.min(1, Math.max(0, Number(v) || 0));
      enabled = volume > 0;
      persist();
      applyGain();
      syncControls();
    },

    attachToggle: function (el) {
      if (!el) return;
      el.setAttribute('data-sound-toggle', '');
      el.addEventListener('click', function () { api.toggle(); });
      syncControls();
    },

    // Builds a speaker button plus a volume slider inside `container`.
    // The slider is hidden until the button is focused or hovered, so it
    // stays out of the way in the header.
    createControl: function (container) {
      if (!container) return null;
      var wrap = document.createElement('div');
      wrap.className = 'snd-control';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'snd-btn';
      btn.setAttribute('data-sound-toggle', '');
      btn.setAttribute('data-sound-icon', '');
      btn.addEventListener('click', function () { api.toggle(); });

      var range = document.createElement('input');
      range.type = 'range';
      range.min = '0';
      range.max = '100';
      range.step = '1';
      range.className = 'snd-range';
      range.setAttribute('data-sound-range', '');
      range.setAttribute('aria-label', 'Volume');
      range.addEventListener('input', function () {
        api.setVolume(Number(range.value) / 100);
      });
      range.addEventListener('change', function () {
        if (enabled) api.play('click');
      });

      wrap.appendChild(btn);
      wrap.appendChild(range);
      container.appendChild(wrap);
      syncControls();
      return wrap;
    },
    names: Object.keys(sounds)
  };

  // Delegated: works for elements that do not exist yet.
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-sound]') : null;
    if (el) api.play(el.getAttribute('data-sound'));
  });

  global.santaSound = api;
})(window);
