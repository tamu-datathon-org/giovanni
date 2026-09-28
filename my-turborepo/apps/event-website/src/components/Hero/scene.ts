/**
 * Geometry for the hero scene, measured from the source art in
 * public/event_assets. Positions are percentages of the source image they sit
 * on; sizes are source pixels ("units") scaled by two CSS variables set on the
 * hero: --s (px per unit of background.png) and --g (px per unit of hero_sign.png).
 */
import type { CSSProperties } from "react";

/** Passes CSS custom properties through a `style` prop. */
export const cssVars = (vars: Record<`--${string}`, string | number>) =>
  vars as CSSProperties;

/**
 * The box every sign layer shares (glow, sign, front): hero_sign.png at --g
 * px per unit, centred on the visible art, with sign row 911 on the road line.
 */
export const SIGN_BOX =
  "absolute left-[calc(50%_-_501.5*var(--g))] top-[calc(var(--road-y)_-_911*var(--g))] h-[calc(1206*var(--g))] w-[calc(1010*var(--g))]";

export const ASSETS = {
  background: "/event_assets/background.png",
  sign: "/event_assets/hero_sign.png",
  car: "/event_assets/car.png",
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

/** Fraction of the hero's height to scroll for the car's full drive. */
export const DRIVE_SPAN = 0.55;

/** Marquee bulbs on hero_sign.png as [x%, y%], in chase order (down, across, up). */
export const BULBS: readonly (readonly [number, number])[] = [
  // left column, top → bottom
  [5.47, 34.43],
  [5.47, 36.8],
  [5.47, 39.17],
  [5.47, 41.54],
  [5.47, 43.91],
  [5.47, 46.29],
  [5.47, 48.81],
  // bottom row, left of the countdown
  [8.21, 48.81],
  [10.95, 48.81],
  [13.7, 48.81],
  [16.46, 48.81],
  [19.2, 48.81],
  [21.94, 48.81],
  [24.69, 48.81],
  [27.44, 48.81],
  [30.18, 48.81],
  // bottom row, right of the countdown (the two under the lever knob are skipped)
  [71.21, 48.86],
  [73.69, 48.86],
  [76.19, 48.86],
  [83.65, 48.86],
  [86.15, 48.86],
  [88.63, 48.86],
  [91.12, 48.86],
  // right column, bottom → top
  [93.88, 48.88],
  [93.88, 46.36],
  [93.88, 44.2],
  [93.88, 41.62],
  [93.88, 39.53],
  [93.88, 36.94],
  [93.88, 34.43],
];

/** Centres of the T, A, M, U circles on hero_sign.png as [x%, y%]. */
export const LETTERS: readonly (readonly [number, number])[] = [
  [32.28, 29.73],
  [43.76, 29.73],
  [55.25, 29.73],
  [66.68, 29.73],
];

/** Centres of the two red ✦ on hero_sign.png as [x%, y%]. */
export const SIGN_SPARKLES: readonly (readonly [number, number])[] = [
  [21.53, 29.98],
  [77.38, 30.14],
];

export interface Beam {
  /**
   * Pivot (the searchlight itself), in % of the scene. Sits behind the sign's
   * countdown panel at every screen size, so the beams rise from behind the sign.
   */
  x: number;
  y: number;
  /** Sway range in degrees from vertical. */
  from: number;
  to: number;
  /** Seconds for one sweep; alternates back and forth. */
  period: number;
  /** Seconds into the sweep to start at, so the beams stay out of step. */
  phase: number;
  /** Light colour as space-separated RGB channels. */
  tone: string;
}

const WARM = "255 241 214";
const COOL = "234 242 255";

// Sways stay within ±28° so even the beams' soft edges clear the palm trees.
export const BEAMS: readonly Beam[] = [
  { x: 45.14, y: 54.52, from: -28, to: -4, period: 9, phase: 2.1, tone: WARM },
  { x: 45.14, y: 54.52, from: -16, to: 10, period: 7, phase: 5.3, tone: COOL },
  { x: 54.86, y: 54.52, from: -10, to: 16, period: 8, phase: 0.6, tone: COOL },
  { x: 54.86, y: 54.52, from: 4, to: 28, period: 10, phase: 6.4, tone: WARM },
];

export interface ShootingStar {
  /** Start point in % of the scene. */
  x: number;
  y: number;
  /** Tilt of the streak; negative falls to the left. */
  angle: number;
  /** Scene units the head travels; each path stays in open sky. */
  travel: number;
  /** Seconds between streaks and the offset of the first one. */
  cycle: number;
  delay: number;
}

export const SHOOTING_STARS: readonly ShootingStar[] = [
  { x: 70, y: 20.5, angle: -24, travel: 420, cycle: 19, delay: 4 },
  { x: 58, y: 12, angle: -20, travel: 300, cycle: 27, delay: 13 },
];

export interface Star {
  /** Position in % of the scene. */
  x: number;
  y: number;
  /** Diameter in scene units. */
  size: number;
  kind: "dot" | "sparkle";
  color: string;
  /** Seconds before the star glimmers in. */
  delay: number;
  /** Seconds per twinkle loop (six pulses), how far into it to start, and its lowest opacity. */
  twinkle: number;
  phase: number;
  dim: number;
}

/** Top of the skyline (palms and buildings) per 80-unit column of background.png; stars stay above it. */
const SKYLINE = [
  282, 286, 274, 276, 296, 519, 519, 645, 645, 645, 645, 645, 577, 261, 235,
  230, 235, 254,
];

const SCENE_WIDTH = 1440;
const SCENE_HEIGHT = 1394;
const STAR_COUNT = 84;

/** Small deterministic PRNG so the server and client render identical stars. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(): Star[] {
  const rand = mulberry32(2026);
  const pick = <T>(items: readonly T[]) =>
    items[Math.floor(rand() * items.length)];
  const stars: Star[] = [];

  while (stars.length < STAR_COUNT) {
    const x = rand() * SCENE_WIDTH;
    // Slightly denser toward the top, but spread down to the skyline because
    // wide screens crop the top of the sky.
    const y = 12 + 628 * rand() ** 1.15;
    if (y > SKYLINE[Math.floor(x / 80)] - 24) continue;

    const sparkle = rand() < 0.2;
    const twinkle = 24 + rand() * 12;
    stars.push({
      x: (x / SCENE_WIDTH) * 100,
      y: (y / SCENE_HEIGHT) * 100,
      size: sparkle ? 12 + rand() * 10 : 2 + rand() * 2.5,
      kind: sparkle ? "sparkle" : "dot",
      color: sparkle
        ? pick(["#e4d9ff", "#d9ccf7", "#efe6ff"])
        : pick(["#ffffff", "#fff4d8", "#dde6ff"]),
      delay: rand() * 1.8,
      twinkle,
      phase: rand() * twinkle,
      dim: 0.25 + rand() * 0.35,
    });
  }
  return stars;
}

export const STARS: readonly Star[] = createStars();
