const STORAGE_KEY = "santa:v1";

const defaults = Object.freeze({
  name: "",
  doors: {},
  scores: {},
  sound: true,
  sleighColor: "#cc0000",
  reindeerName: "Comet",
  niceListChecked: [],
  letterDraft: { wishes: "", goodDeed: "" },
});

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults, doors: {}, scores: {}, niceListChecked: [], letterDraft: { ...defaults.letterDraft } };
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      doors: parsed.doors || {},
      scores: parsed.scores || {},
      niceListChecked: parsed.niceListChecked || [],
      letterDraft: { ...defaults.letterDraft, ...(parsed.letterDraft || {}) },
    };
  } catch (e) {
    return { ...defaults, doors: {}, scores: {}, niceListChecked: [], letterDraft: { ...defaults.letterDraft } };
  }
}

export function saveState(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch (e) {
    // quota exceeded or private browsing — silently ignore
  }
}
