/**
 * Geometry for the hero scene, measured from the source art in
 * public/event_assets. background.png is the size of the design frame
 * (1440×1086), so a "unit" is one pixel of the mockup. Positions are
 * percentages of the box or image they sit on; sizes are units scaled by two
 * CSS variables set on the hero: --s (px per unit for the room, which covers
 * the screen) and --g (px per unit for the stage, which always fits on it).
 */
import type { CSSProperties } from "react";

/** Passes CSS custom properties through a `style` prop. */
export const cssVars = (vars: Record<`--${string}`, string | number>) =>
  vars as CSSProperties;

/**
 * The room: background.png at --s px per unit, pinned to the top so the
 * ceiling (and the chandeliers hung from it) always shows.
 */
export const ROOM_BOX =
  "absolute left-[calc(50%_-_720*var(--s))] top-0 h-[calc(1086*var(--s))] w-[calc(1440*var(--s))]";

/** The stage: the whole design frame at --g px per unit, centred on the screen. */
export const STAGE_BOX =
  "absolute left-[calc(50%_-_720*var(--g))] top-[var(--stage-y)] h-[calc(1086*var(--g))] w-[calc(1440*var(--g))]";

/**
 * The box every sign layer shares (glow, sign, lights): hero_sign.png at --g
 * px per unit, where the mockup puts it on the stage (x 253, y 26).
 */
export const SIGN_BOX =
  "absolute left-[calc(50%_-_467*var(--g))] top-[calc(var(--stage-y)_+_26*var(--g))] h-[calc(729*var(--g))] w-[calc(934*var(--g))]";

export const ASSETS = {
  background: "/event_assets/background.png",
  sign: "/event_assets/hero_sign.png",
  curtain: "/event_assets/curtain.png",
  chandelier: "/event_assets/chandeliers.png",
  slotMachine: "/event_assets/slot_machine.png",
  pokerTable: "/event_assets/poker_table.png",
} as const;

/** Stage timings in ms. `flicker` is mirrored into CSS as --flicker. */
export const TIMING = {
  /** Dark beat after the art is ready, before the power comes on. */
  beat: 350,
  /** The neon sputter of the power-on sequence. */
  flicker: 1800,
  /** Lever: how long the sign stays dark before re-powering. */
  darkHold: 850,
  /** Start the show even if an image never decodes. */
  readyTimeout: 2500,
} as const;

/** Screen heights of scrolling it takes to part the curtains fully. */
export const CURTAIN_SPAN = 1;

/** How far open the curtains are (0–1) when the lights come on. */
export const POWER_AT = 0.2;

/** Marquee bulbs on hero_sign.png as [x%, y%], in chase order (down, across, up). */
export const BULBS: readonly (readonly [number, number])[] = [
  // left column, top → bottom
  [2.26, 56.94],
  [2.26, 60.88],
  [2.29, 64.81],
  [2.26, 68.72],
  [2.29, 72.63],
  [2.26, 76.57],
  [2.26, 80.75],
  // bottom row, left of the countdown
  [5.23, 80.74],
  [8.19, 80.74],
  [11.18, 80.73],
  [14.14, 80.74],
  [17.1, 80.73],
  [20.08, 80.74],
  [23.06, 80.73],
  [25.8, 80.58],
  // bottom row, right of the countdown (the two under the lever knob are skipped)
  [73.41, 80.77],
  [76.05, 80.84],
  [84.19, 80.82],
  [86.82, 80.81],
  [89.51, 80.84],
  [92.2, 80.81],
  [94.9, 80.85],
  // right column, bottom → top
  [97.88, 80.85],
  [97.87, 76.69],
  [97.88, 73.12],
  [97.87, 68.85],
  [97.9, 65.39],
  [97.87, 61.11],
  [97.87, 56.94],
];

/** Centres of the T, A, M, U circles on hero_sign.png as [x%, y%]. */
export const LETTERS: readonly (readonly [number, number])[] = [
  [31.48, 49.11],
  [43.95, 49.11],
  [56.37, 49.11],
  [68.52, 49.11],
];

/**
 * The two slot machines: top-left corners as x%, y% of the stage, and the
 * three numbers showing in their reels, left to right.
 */
export const SLOT_MACHINES: readonly { x: number; y: number; reels: string }[] =
  [
    { x: 1.67, y: 12.9, reels: "777" },
    { x: 67.57, y: 12.9, reels: "777" },
  ];

/** Centres of the three reel windows on slot_machine.png, as x% (all at 48.78% down). */
export const REELS: readonly number[] = [24.94, 46.42, 67.78];

export interface Swing {
  /** Pivot in % of ROOM_BOX. */
  x: number;
  y: number;
  /** Swing range in degrees; 0 hangs straight down. */
  from: number;
  to: number;
  /** Seconds for one swing; alternates back and forth. */
  period: number;
  /** Seconds into the swing to start at, so the lights stay out of step. */
  phase: number;
}

/**
 * Centred under the two ceiling mounts on background.png, but hung from above
 * the screen: the pivot (the top of the rod) is 210 units up, so the rod and
 * canopy (the art's top 201 rows) stay off-screen and only the arms show.
 */
export const CHANDELIERS: readonly Swing[] = [
  { x: 14.58, y: -19.34, from: -3.5, to: 3.5, period: 4.6, phase: 0 },
  { x: 83.58, y: -19.34, from: 3.5, to: -3.5, period: 5.2, phase: 1.4 },
];

/** Bulbs on chandeliers.png as [x%, y%]. */
export const CHANDELIER_BULBS: readonly (readonly [number, number])[] = [
  [11.8, 65.2],
  [33.2, 73.9],
  [64, 73.4],
  [87.7, 64.5],
];
