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
 * px per unit, where the mockup puts it on the stage (x 253, y 60).
 */
export const SIGN_BOX =
  "absolute left-[calc(50%_-_467*var(--g))] top-[calc(var(--stage-y)_+_60*var(--g))] h-[calc(695*var(--g))] w-[calc(934*var(--g))]";

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
  [2.26, 54.84],
  [2.27, 58.96],
  [2.28, 63.08],
  [2.26, 67.19],
  [2.28, 71.3],
  [2.26, 75.42],
  [2.26, 79.81],
  // bottom row, left of the countdown
  [5.23, 79.79],
  [8.2, 79.81],
  [11.18, 79.79],
  [14.14, 79.81],
  [17.11, 79.79],
  [20.08, 79.81],
  [23.05, 79.79],
  [25.8, 79.63],
  // bottom row, right of the countdown (the two under the lever knob are skipped)
  [73.41, 79.84],
  [76.05, 79.91],
  [84.18, 79.88],
  [86.81, 79.89],
  [89.5, 79.9],
  [92.19, 79.88],
  [94.89, 79.91],
  // right column, bottom → top
  [97.87, 79.92],
  [97.87, 75.54],
  [97.88, 71.81],
  [97.87, 67.32],
  [97.89, 63.7],
  [97.87, 59.21],
  [97.87, 54.84],
];

/** Centres of the T, A, M, U circles on hero_sign.png as [x%, y%]. */
export const LETTERS: readonly (readonly [number, number])[] = [
  [31.48, 46.62],
  [43.95, 46.62],
  [56.37, 46.62],
  [68.52, 46.62],
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
