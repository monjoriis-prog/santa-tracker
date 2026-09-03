/** Single fetch of sleigh.svg shared across modules. */
export const sleighSvgReady = fetch("assets/sleigh.svg")
  .then((r) => r.text())
  .catch(() => null);
