import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import type { Diet } from "./menus";
import styles from "./FoodMenu.module.css";

const ART = "/event_assets/menu";

/*
 * Both pieces are the Figma layers placed at their Figma coordinates, so the
 * numbers below are the design's own. Each rotated layer is drawn around its
 * box's center, the way Figma rotates it.
 */

/** The red neon "MENU" arrow sign, in the poster's coordinates (2480 × 3508 page). */
export function MenuSign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="85 190 900 1965" aria-hidden="true" focusable="false">
      <image
        href={`${ART}/sign-back.svg`}
        x={-344.803}
        y={-692.146}
        width={689.606}
        height={1384.291}
        transform="translate(628.13 1059.38) rotate(179.29) skewX(-0.26)"
      />
      <image className={styles.twinkle} href={`${ART}/star-large.svg`} x={402} y={217.1} width={450} height={577} />
      <image
        href={`${ART}/sign-arrow.svg`}
        x={-403.36}
        y={-957.787}
        width={806.733}
        height={1942.57}
        transform="translate(499.153 1163.97) rotate(-1.03) skewX(-0.38)"
      />
      <image
        className={styles.twinkle}
        style={{ "--d": "-1.4s" } as CSSProperties}
        href={`${ART}/star-small.svg`}
        x={693.2}
        y={591.1}
        width={251}
        height={322}
      />
      <g
        transform="translate(356.06 1075.9) rotate(-3.47) skewX(-1.27)"
        className={`font-righteous ${styles.signText}`}
        fontSize={300}
        textAnchor="middle"
      >
        {["M", "E", "N", "U"].map((letter, i) => (
          // The N is the one tube on the sign that's on its way out.
          <text
            key={letter}
            y={-420 + i * 290.7}
            dominantBaseline="central"
            className={letter === "N" ? styles.flicker : undefined}
          >
            {letter}
          </text>
        ))}
      </g>
    </svg>
  );
}

/** The two loose stars under the legend. Positions are in the side column's cqw (900 poster px = 100cqw). */
export function LegendStars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden md:block">
      <Image
        src={`${ART}/star-large.svg`}
        alt=""
        width={450}
        height={577}
        className={`absolute left-[17.78cqw] top-[58.67cqw] w-[50cqw] ${styles.twinkleBox}`}
        style={{ "--d": "-0.6s" } as CSSProperties}
      />
      <Image
        src={`${ART}/star-small.svg`}
        alt=""
        width={251}
        height={322}
        className={`absolute left-[2.22cqw] top-[94.22cqw] w-[27.89cqw] ${styles.twinkleBox}`}
        style={{ "--d": "-2.2s" } as CSSProperties}
      />
    </div>
  );
}

const LEAVES = (
  <>
    <image
      href={`${ART}/icon-leaf.svg`}
      x={-26.119}
      y={-21.544}
      width={52.238}
      height={43.089}
      transform="translate(69.259 85.975) rotate(21.84)"
    />
    <image
      href={`${ART}/icon-leaf-small.svg`}
      x={-20.275}
      y={-16.5}
      width={40.549}
      height={33}
      transform="translate(105.059 77.742) rotate(139.15) scale(1 -1)"
    />
  </>
);

const ICONS: Record<Diet, ReactNode> = {
  vegetarian: LEAVES,
  vegan: (
    <>
      {LEAVES}
      <image
        href={`${ART}/icon-sprout.svg`}
        x={-15.646}
        y={-10.569}
        width={31.292}
        height={21.139}
        transform="translate(90.524 55.978) rotate(106.24) scale(1 -1)"
      />
    </>
  ),
  "gluten-free": (
    <>
      <image href={`${ART}/icon-wheat.svg`} x={52} y={61} width={58.001} height={59.001} />
      <image
        href={`${ART}/icon-wheat-stalk.svg`}
        x={-21.93}
        y={-27.47}
        width={43.86}
        height={54.947}
        transform="translate(88.29 68.892) rotate(124.73) scale(1 -1)"
      />
    </>
  ),
};

/** A poker-chip badge for a diet, drawn from the 168px legend coin. */
export function DietCoin({ diet, className }: { diet: Diet; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 168 168" aria-hidden="true" focusable="false">
      <image href={`${ART}/coin-ring-${diet}.png`} width={168} height={168} />
      <image href={`${ART}/coin-face-${diet}.svg`} x={21} y={21} width={125} height={125} />
      {ICONS[diet]}
    </svg>
  );
}
