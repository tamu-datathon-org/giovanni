import type { CSSProperties, Ref } from "react";
import Image from "next/image";

import {
  ASSETS,
  cssVars,
  REELS,
  ROOM_BOX,
  SLOT_MACHINES,
  STAGE_BOX,
} from "./scene";

// A light shadow over the room (about 85% brightness), lightest behind the sign
// (centred ~400 units down the stage) and a touch deeper toward the edges, so
// the sign stands out.
const SHADE_STYLE: CSSProperties = {
  background:
    "radial-gradient(ellipse calc(760 * var(--g)) calc(560 * var(--g)) at 50% calc(var(--stage-y) + 400 * var(--g)), rgb(18 2 6 / 0.11), rgb(18 2 6 / 0.15) 55%, rgb(18 2 6 / 0.2))",
};

// Warm light the lit sign throws on the felt.
const POOL_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 186 102 / 0.26), rgb(255 150 70 / 0.08) 60%, transparent)",
};

/**
 * The casino floor: wallpaper and ceiling, the slot machines, and the poker
 * table in front of them. It all sits under one dark overlay that lifts when
 * the power comes on.
 */
export function Room({
  backgroundRef,
}: {
  backgroundRef: Ref<HTMLImageElement>;
}) {
  return (
    <>
      <div
        className={`${ROOM_BOX} z-0`}
        // The art's own ceiling and wallpaper colours, shown while background.png loads.
        style={{
          background:
            "linear-gradient(#8a3218, #a23618 6.5%, #310f00 6.7% 7.3%, #6c0101 7.4%, #520101)",
        }}
      >
        <Image
          ref={backgroundRef}
          src={ASSETS.background}
          alt=""
          fill
          loading="eager"
          sizes="(max-aspect-ratio: 1440/1086) 133vh, 100vw"
        />
      </div>

      <div className={`${STAGE_BOX} pointer-events-none`} aria-hidden="true">
        {SLOT_MACHINES.map(({ x, y, reels }) => (
          <div
            key={`${x},${y}`}
            className="absolute left-[var(--x)] top-[var(--y)] z-[1] aspect-[433/576] w-[30.07%]"
            style={cssVars({ "--x": `${x}%`, "--y": `${y}%` })}
          >
            <Image
              src={ASSETS.slotMachine}
              alt=""
              fill
              loading="eager"
              sizes="(max-aspect-ratio: 1/1) 46vw, 40vh"
            />
            {/* The numbers in the reels, lettered like the sign's TAMU. */}
            {[...reels].map((number, i) => (
              <span
                key={i}
                className="font-righteous absolute left-[var(--reel)] top-[48.78%] text-[length:calc(110*var(--g))] leading-none text-[#d50000] [text-shadow:0_calc(5*var(--g))_0_#8f0000] [translate:-50%_-50%]"
                style={cssVars({ "--reel": `${REELS[i]}%` })}
              >
                {number}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Scaled evenly (--t) to fill the screen's width, so the cards and chips on it keep their shape. */}
      <div
        className="pointer-events-none absolute left-1/2 top-[var(--table-y)] z-[2] h-[calc(520*var(--t))] w-[calc(1440*var(--t))] [translate:-50%_0]"
        aria-hidden="true"
      >
        <Image
          src={ASSETS.pokerTable}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(var(--table-y)_+_519*var(--t))] z-[2] bg-[#17330d]"
        aria-hidden="true"
      />
      {/* Same layer as the table but before the date line in the page, so it shades the room and not the text. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={SHADE_STYLE}
        aria-hidden="true"
      />

      {/* The lights are off: the room stays dim until the power comes on. */}
      <div
        className="group-data-[stage=flicker]/hero:animate-night-off pointer-events-none absolute inset-0 z-[3] bg-[rgb(20_2_6/0.7)] group-data-[stage=on]/hero:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-0"
        aria-hidden="true"
      />

      <div
        className="group-data-[stage=flicker]/hero:animate-light-on pointer-events-none absolute left-1/2 top-[var(--table-y)] z-[4] h-[calc(260*var(--g))] w-[calc(1100*var(--g))] opacity-0 mix-blend-screen [translate:-50%_-30%] group-data-[stage=on]/hero:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-100"
        style={POOL_STYLE}
        aria-hidden="true"
      />
    </>
  );
}
