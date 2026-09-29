import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

import { ASSETS, cssVars } from "./scene";

// Pelmet stripes, 211 units apart with a dark band centred on the seam. The
// gradient runs from each panel's inner edge, so the two halves meet in step.
const stripes = (direction: string): CSSProperties => ({
  background: `repeating-linear-gradient(${direction}, #c06d1f 0 calc(33.5 * var(--s)), #ffab4a 0 calc(177.5 * var(--s)), #c06d1f 0 calc(211 * var(--s)))`,
});

// A follow-spot on the curtain: a bright, even disc with a crisp rim...
const SPOT_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 238 208 / 0.8), rgb(255 222 182 / 0.72) 60%, rgb(255 204 158 / 0.68) 91%, rgb(255 150 110 / 0.3) 96%, transparent 99%)",
};

// ...a glow of light just around it...
const SPILL_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 110 80 / 0.3) 55%, rgb(255 70 50 / 0.12) 72%, transparent)",
};

// ...and the rest of the curtain a little darker, so the disc stands out.
const SHADE_STYLE: CSSProperties = {
  background:
    "radial-gradient(circle closest-side, transparent calc(var(--spot-d) * 0.5), rgb(24 0 6 / 0.2) calc(var(--spot-d) * 0.62), rgb(24 0 6 / 0.38) calc(var(--spot-d) * 1.1))",
};

/** Where the spotlight points: the centre, plus the offset useFollowSpot eases toward the mouse. */
const AIM =
  "absolute left-1/2 top-1/2 [translate:calc(-50%_+_var(--spot-x,0px))_calc(-50%_+_var(--spot-y,0px))] will-change-[translate]";

/**
 * Eases the spotlight toward the mouse, like a follow-spot operator, and back
 * to the centre when it leaves the window, by writing its offset from the
 * centre to --spot-x / --spot-y. Touch has no cursor to follow, and with
 * reduced motion it stays put.
 */
function useFollowSpot(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let last = 0;

    const step = (now: number) => {
      // Close ~90% of the gap every 200ms, whatever the frame rate.
      const k = 1 - Math.exp(-Math.max(0, now - last) / 90);
      last = now;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.setProperty("--spot-x", `${pos.x.toFixed(1)}px`);
      el.style.setProperty("--spot-y", `${pos.y.toFixed(1)}px`);
      frame =
        Math.hypot(target.x - pos.x, target.y - pos.y) > 0.5
          ? requestAnimationFrame(step)
          : 0;
    };
    const aim = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };
    const onMove = (event: PointerEvent) => {
      // Nothing to light once the curtains are open.
      if (event.pointerType === "touch" || el.closest("[data-open]")) return;
      const box = el.getBoundingClientRect();
      aim(
        event.clientX - box.left - box.width / 2,
        event.clientY - box.top - box.height / 2,
      );
    };
    const onLeave = () => aim(0, 0);

    const root = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

/** One half of the curtain, with its share of the pelmet. Parts as --open-e goes 0 → 1. */
function Panel({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    <div
      className={`pointer-events-auto absolute inset-y-0 w-1/2 motion-reduce:![translate:none] ${
        left
          ? "left-0 [translate:calc(var(--open-e,0)*-102%)_0]"
          : "right-0 [translate:calc(var(--open-e,0)*102%)_0]"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-[calc(71*var(--s))] shadow-[inset_0_calc(-4*var(--s))_0_rgb(120_50_0/0.35)]"
        style={stripes(left ? "270deg" : "90deg")}
      />
      <div className="absolute inset-x-0 top-[calc(71*var(--s))] h-[calc(27*var(--s))] border-y-[length:calc(5*var(--s))] border-[#2b0a02] bg-[#6d0808]" />
      {/* The fabric stretches to the screen's height; its hem stops short of the floor. */}
      <div className="absolute inset-x-0 bottom-[4cqh] top-[calc(98*var(--s))]">
        <Image
          src={ASSETS.curtain}
          alt=""
          fill
          preload
          sizes="50vw"
          // curtain.png is the right-hand panel; the left one is its mirror image.
          className={left ? "-scale-x-100" : undefined}
        />
      </div>
    </div>
  );
}

/**
 * The curtains over the stage, with a spotlight on them that follows the
 * mouse. Scrolling parts them (--open, --open-e from the hero), revealing the
 * room behind; with reduced motion they fade instead. They're hidden once
 * fully open, and without JavaScript altogether.
 */
export function Curtains() {
  const ref = useRef<HTMLDivElement>(null);
  useFollowSpot(ref);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[9] group-data-[open]/hero:invisible motion-reduce:opacity-[calc(1_-_var(--open,0))] [@media(scripting:none)]:hidden"
      style={cssVars({ "--spot-d": "min(60cqw, 50cqh)" })}
      aria-hidden="true"
    >
      {/* The stage floor under the hem, so nothing behind peeks through the scallops. */}
      <div className="absolute inset-x-0 bottom-0 h-[7cqh] bg-[#17330d] opacity-[calc(1_-_4_*_var(--open,0))]" />
      <Panel side="left" />
      <Panel side="right" />

      {/*
        The spotlight fades as the curtains part. Its shade and its light are
        separate layers (the light screens onto the fabric), aimed and drifting
        in step. The shade is big enough to cover the screen from any aim.
      */}
      <div className="absolute inset-0 opacity-[calc(1_-_2_*_var(--open,0))]">
        <div className={`${AIM} aspect-square w-[200cqmax]`}>
          <div
            className="animate-spot-drift absolute inset-0 motion-reduce:animate-none"
            style={SHADE_STYLE}
          />
        </div>
      </div>
      <div className="absolute inset-0 opacity-[calc(1_-_2_*_var(--open,0))] mix-blend-screen">
        <div className={`${AIM} aspect-square w-[var(--spot-d)]`}>
          <div className="animate-spot-drift absolute inset-0 motion-reduce:animate-none">
            <div className="absolute inset-[-22%]" style={SPILL_STYLE} />
            <div
              className="animate-spot-breathe absolute inset-0 motion-reduce:animate-none"
              style={SPOT_STYLE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
