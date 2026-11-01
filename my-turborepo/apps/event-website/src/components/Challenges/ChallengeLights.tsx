import type { CSSProperties } from "react";

export interface BulbLayout {
  bulbs: readonly (readonly [number, number])[];
  radius: number;
  viewBox: string;
}

// Bulb centers in all challenges panel.png pixels, clockwise from the top left.
const cardBulbCenters = [
  [25, 58], [52, 33], [90, 30], [130, 30], [170, 30], [210, 30], [248, 30],
  [288, 30], [327, 30], [366, 30], [404, 34], [435, 54], [437, 95], [437, 134],
  [437, 174], [437, 212], [437, 252], [437, 292], [437, 330], [437, 370],
  [416, 403], [375, 410], [333, 410], [292, 410], [252, 410], [214, 410],
  [174, 410], [132, 410], [90, 410], [49, 401], [25, 374], [25, 334], [25, 295],
  [25, 255], [25, 216], [25, 177], [25, 138], [25, 99],
] as const;

export const cardBulbs: BulbLayout = {
  bulbs: cardBulbCenters,
  radius: 17,
  viewBox: "0 0 462 446",
};

// Bulb centers in bear_challenge_sign.png pixels, clockwise from the top left.
const signBulbCenters = [
  [58, 266], [99, 264], [140, 264], [180, 264], [228, 264], [275, 264],
  [322, 264], [369, 264], [416, 264], [463, 264], [510, 264], [557, 264],
  [604, 264], [651, 264], [692, 266], [712, 309], [712, 356], [712, 403],
  [712, 450], [712, 497], [712, 544], [712, 591], [712, 638], [712, 685],
  [712, 732], [712, 780], [693, 820], [652, 822], [605, 822], [558, 822],
  [511, 822], [464, 822], [417, 822], [370, 822], [323, 822], [276, 822],
  [229, 822], [182, 822], [141, 822], [100, 822], [59, 820], [38, 776],
  [38, 728], [38, 681], [38, 634], [38, 587], [38, 540], [38, 493],
  [38, 446], [38, 399], [38, 352], [38, 305],
] as const;

export const signBulbs: BulbLayout = {
  bulbs: signBulbCenters,
  radius: 30,
  viewBox: "0 0 782 867",
};

export default function ChallengeLights({ bulbs, radius, viewBox }: BulbLayout) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
      viewBox={viewBox}
    >
      <defs>
        {/* Same bulb glow as the hero marquee sign. */}
        <radialGradient id="challenge-bulb-glow">
          <stop offset="28%" stopColor="#fffdf2" />
          <stop offset="42%" stopColor="rgb(255 226 140)" stopOpacity="0.85" />
          <stop offset="66%" stopColor="rgb(255 196 90)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(255 196 90)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Every third bulb shares a phase, the same theater chase as the hero. */}
      {[0, 1, 2].map((phase) => (
        <g
          key={phase}
          className="animate-chase motion-reduce:!animate-none"
          style={{ "--chase": `${phase * 0.3 - 0.6}s` } as CSSProperties}
        >
          {bulbs
            .filter((_, index) => index % 3 === phase)
            .map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={radius}
                fill="url(#challenge-bulb-glow)"
              />
            ))}
        </g>
      ))}
    </svg>
  );
}
