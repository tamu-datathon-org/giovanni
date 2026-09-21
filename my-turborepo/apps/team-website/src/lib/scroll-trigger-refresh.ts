import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Re-run `ScrollTrigger.refresh()` whenever the geometry a pinned `el` depends
 * on moves. Returns a cleanup function.
 *
 * Everything above the home-page pins settles late: AboutUs is a next/dynamic
 * chunk whose jagged.svg is an unsized <img>, so for the first few frames it
 * measures 0px tall and only reaches its real ~1121px once the chunk renders
 * and the SVG loads. That pushes later sections ~578px further down the page.
 * ScrollTrigger caches `start` at refresh time, so a refresh landing before
 * that growth pins the section 578px down the viewport and the whole
 * animation plays out below the fold.
 *
 * Watching the section itself is not enough — its own box rarely changes; only
 * its position does. Watch the document, the way Header/index.tsx already
 * does, and re-measure whenever the geometry the trigger depends on has moved.
 */
export function refreshOnLayoutShift(el: HTMLElement): () => void {
  const spacerOf = (node: HTMLElement) =>
    node.parentElement?.classList.contains("pin-spacer")
      ? node.parentElement
      : node;
  const signature = () => {
    const r = spacerOf(el).getBoundingClientRect();
    return [
      Math.round(r.top + window.scrollY),
      Math.round(r.width),
      document.documentElement.scrollHeight,
    ].join("|");
  };

  let frame = 0;
  let lastSignature = signature();
  const sync = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (signature() === lastSignature) return;
      ScrollTrigger.refresh();
      // Refreshing resizes the pin-spacer, which feeds straight back into the
      // observer — record the settled geometry so that doesn't loop.
      lastSignature = signature();
    });
  };

  // body catches the section being pushed down; the section catches width
  // changes from the sidebar collapsing, which leave body height untouched.
  const observer = new ResizeObserver(sync);
  observer.observe(document.body);
  observer.observe(el);
  window.addEventListener("load", sync);
  void document.fonts.ready.then(sync);

  return () => {
    window.removeEventListener("load", sync);
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
  };
}
