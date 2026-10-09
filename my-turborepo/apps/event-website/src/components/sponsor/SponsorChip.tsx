import type { CSSProperties } from "react";
import Image from "next/image";

import type { Chip } from "./chips";
import { FLIP_ORDER } from "./chips";

/** How far the chip's side shows below its face, as a % of the chip's size. */
const EDGE_DEPTH = 4;
const EDGE_LAYERS = Array.from({ length: 10 }, (_, index) => index + 1);

// The side layers share the chip's camera and face depth, so their outlines
// match the chip's exactly at every point of a flip.
const PERSPECTIVE = "[perspective:1200px]";
const BODY =
  "relative block h-full w-full [--chip-half-depth:8px] [transform-style:preserve-3d]";
const FACE =
  "absolute inset-0 h-full w-full rounded-full [backface-visibility:hidden]";
const FRONT = `${FACE} [transform:translateZ(var(--chip-half-depth))]`;
const BACK = `${FACE} [transform:rotateY(180deg)_translateZ(var(--chip-half-depth))]`;

/** The SVG's outer rim: 16 stripes, white first, clockwise from 3 o'clock. */
const RIM = {
  cx: 135,
  cy: 135,
  r: 117.5,
  fill: "none",
  strokeWidth: 35,
  strokeDasharray: "46.142142 46.142142",
};
const RING = { cx: 134.5, cy: 134.5, r: 86, fill: "none", strokeWidth: 5 };

const tilt = (chip: Chip): CSSProperties => ({
  transform: `rotateZ(${chip.rotation}deg)`,
});

/**
 * The chip's side: copies of its outline that flip in step with it, each
 * pushed straight down the screen and painted under the chip, so the thickness
 * only ever shows below it. Each copy only peeks out as a thin sliver at its
 * rim, so painting the rim stripes on them extends every stripe straight down.
 */
function ChipSide({ chip }: { chip: Chip }) {
  return (
    <>
      {/* Deepest first, so each layer only peeks out below the one above it. */}
      {[...EDGE_LAYERS].reverse().map((layer) => {
        const depth = layer / EDGE_LAYERS.length;
        const shade = `rgb(0 0 0 / ${0.2 + depth * 0.24})`;
        const background = `linear-gradient(${shade}, ${shade}), repeating-conic-gradient(from 90deg, #F1F1F1 0 22.5deg, ${chip.colors.stripe} 22.5deg 45deg)`;

        return (
          <span
            key={layer}
            aria-hidden
            className={`pointer-events-none absolute inset-0 ${PERSPECTIVE}`}
            style={{ transform: `translateY(${depth * EDGE_DEPTH}%)` }}
          >
            <span
              className="block h-full w-full [transform-style:preserve-3d]"
              style={tilt(chip)}
            >
              <span data-flip-layer className={BODY}>
                <span className={FRONT} style={{ background }} />
                <span className={BACK} style={{ background }} />
              </span>
            </span>
          </span>
        );
      })}
    </>
  );
}

/** The reverse face: the artwork's rim and rings, without a logo. */
function ChipBack({ chip }: { chip: Chip }) {
  const { body, stripe, ring } = chip.colors;
  return (
    <svg aria-hidden viewBox="0 0 270 270" className={BACK}>
      <circle cx="135" cy="135" r="135" fill={body} />
      <circle {...RIM} stroke="#F1F1F1" />
      <circle {...RIM} stroke={stripe} strokeDashoffset="-46.142142" />
      <circle {...RING} stroke={ring} />
      <circle {...RING} stroke="#F1F1F1" strokeDasharray="40 20" />
      <circle cx="135" cy="135" r="74.5" fill="white" />
    </svg>
  );
}

/**
 * One sponsor chip lying on the table. The parent's GSAP code flips
 * `[data-flip]` and its `[data-flip-layer]` side layers together.
 */
export function SponsorChip({ chip }: { chip: Chip }) {
  return (
    <li
      // Chips lower on the table sit in front, so a side never covers the chip below it.
      className="absolute left-[var(--mx)] top-[var(--my)] z-[var(--mz)] aspect-square w-[var(--mobile)] -translate-x-1/2 -translate-y-1/2 md:left-[var(--x)] md:top-[var(--y)] md:z-[var(--z)] md:w-[var(--desktop)]"
      style={
        {
          "--x": `${chip.x}%`,
          "--y": `${chip.y}%`,
          "--mx": `${chip.mx}%`,
          "--my": `${chip.my}%`,
          "--z": chip.y,
          "--mz": chip.my,
          "--mobile": `${chip.size * 1.5}%`,
          "--desktop": `${chip.size}%`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        aria-label={`Spin the ${chip.name} sponsor chip`}
        className="group relative block h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-4 focus-visible:ring-[#FFB24C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#6C0204]"
      >
        {/* The shadow stays on the table while the chip lifts and flips. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-black/20 blur-[2px]"
          style={{ transform: `translateY(calc(${EDGE_DEPTH}% + 4px))` }}
        />
        <span
          className={`relative block h-full w-full rounded-full transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:-translate-y-2 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none ${PERSPECTIVE}`}
        >
          <ChipSide chip={chip} />
          {/* Keep the resting faces top-down so the logos stay undistorted. */}
          <span
            className="relative block h-full w-full [transform-style:preserve-3d]"
            style={tilt(chip)}
          >
            <span data-flip={FLIP_ORDER.get(chip.id)} className={BODY}>
              <ChipBack chip={chip} />
              <Image
                src={`/event_assets/${chip.id}.svg`}
                alt={chip.name}
                width={270}
                height={270}
                draggable={false}
                className={`${FRONT} select-none`}
              />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
