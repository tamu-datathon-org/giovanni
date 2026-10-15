import type { CSSProperties } from "react";
import Image from "next/image";

import type { Swing } from "./scene";
import {
  ASSETS,
  CHANDELIER_BULBS,
  CHANDELIERS,
  cssVars,
  ROOM_BOX,
} from "./scene";

// Warm light the chandelier throws on the wallpaper around it.
const HALO_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 196 110 / 0.34), rgb(255 150 70 / 0.12) 58%, transparent)",
};

const BULB_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, #fffdf2 0 22%, rgb(255 226 140 / 0.8) 36%, rgb(255 190 90 / 0.3) 64%, transparent)",
};

const swingVars = (swing: Swing) =>
  cssVars({
    "--x": `${swing.x}%`,
    "--y": `${swing.y}%`,
    "--from": `${swing.from}deg`,
    "--to": `${swing.to}deg`,
    "--period": `${swing.period}s`,
    "--phase": `${-swing.phase}s`,
  });

// Lights up with the sign: the neon sputter, then fully on.
const LIGHT_ON =
  "group-data-[stage=flicker]/hero:animate-light-on opacity-0 group-data-[stage=on]/hero:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-100";

/**
 * A chandelier swinging from its ceiling mount. The art, its unlit copy and
 * the bulb glows all hang off one pivot, so the light swings with it; the halo
 * stays put (it's round) so it can `screen` onto the wallpaper.
 */
function Chandelier({ swing }: { swing: Swing }) {
  return (
    <>
      <span
        className={`${LIGHT_ON} pointer-events-none absolute left-[var(--x)] top-[calc(var(--y)_+_290*var(--s))] z-[4] h-[calc(380*var(--s))] w-[calc(540*var(--s))] mix-blend-screen [translate:-50%_-50%]`}
        style={swingVars(swing)}
      >
        <span
          className="group-data-[stage=on]/hero:animate-hum absolute inset-0 motion-reduce:!animate-none"
          style={HALO_STYLE}
        />
      </span>
      <span
        className="animate-sway pointer-events-none absolute left-[var(--x)] top-[var(--y)] z-[5] [rotate:var(--from)] motion-reduce:animate-none motion-reduce:[rotate:0deg]"
        style={swingVars(swing)}
      >
        {/* Hung by the top of its rod (49% across the art). */}
        <span className="absolute left-[calc(-147*var(--s))] top-0 h-[calc(415*var(--s))] w-[calc(300*var(--s))]">
          {/* Toned down a little, like the rest of the room, so the sign stands out; the bulbs still glow. */}
          <Image
            src={ASSETS.chandelier}
            alt=""
            fill
            sizes="(max-aspect-ratio: 1440/1086) 28vh, 21vw"
            loading="eager"
            className="brightness-[0.90]"
          />
          {/* The unlit chandelier: a dimmed copy stacked over the lit one. */}
          <Image
            src={ASSETS.chandelier}
            alt=""
            fill
            sizes="(max-aspect-ratio: 1440/1086) 28vh, 21vw"
            loading="eager"
            className="group-data-[stage=flicker]/hero:animate-night-off brightness-[0.3] saturate-50 group-data-[stage=on]/hero:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-0"
          />
          <span className={`${LIGHT_ON} absolute inset-0 mix-blend-screen`}>
            {CHANDELIER_BULBS.map(([x, y]) => (
              <span
                key={`${x},${y}`}
                className="absolute left-[var(--x)] top-[var(--y)] aspect-square w-[26%] rounded-full [translate:-50%_-50%]"
                style={{
                  ...BULB_STYLE,
                  ...cssVars({ "--x": `${x}%`, "--y": `${y}%` }),
                }}
              />
            ))}
          </span>
        </span>
      </span>
    </>
  );
}

/** The two chandeliers hanging from the ceiling. */
export function Ceiling() {
  return (
    // No z-index here, so each chandelier's halo and body layer with the rest of the scene.
    <div className={`${ROOM_BOX} pointer-events-none`} aria-hidden="true">
      {CHANDELIERS.map((swing, i) => (
        <Chandelier key={i} swing={swing} />
      ))}
    </div>
  );
}
