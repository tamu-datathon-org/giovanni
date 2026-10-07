import type { CSSProperties, Ref } from "react";
import Image from "next/image";

import { Countdown } from "./Countdown";
import { ASSETS, BULBS, cssVars, LETTERS, SIGN_BOX } from "./scene";

// Every copy of the sign uses the same sizes, so the browser downloads it once.
const SIGN_SIZES = "(max-aspect-ratio: 11/12) 94vw, 86vh";

const SPILL_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 168 84 / 0.2), rgb(255 136 64 / 0.07) 62%, transparent)",
};

const BULB_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, #fffdf2 0 28%, rgb(255 226 140 / 0.85) 42%, rgb(255 196 90 / 0.35) 66%, transparent)",
};

const LETTER_RING_STYLE: CSSProperties = {
  boxShadow:
    "0 0 calc(22 * var(--g)) calc(5 * var(--g)) rgb(255 196 92 / 0.7), inset 0 0 calc(16 * var(--g)) calc(2 * var(--g)) rgb(255 226 150 / 0.55)",
};

const KNOB_GLOW_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 70 50 / 0.75), rgb(255 40 40 / 0.25) 55%, transparent)",
};

/**
 * Blurred halo and warm light spill behind the sign; lights up with it. Kept
 * outside the sign's own box so `screen` blends it with the room.
 */
export function SignGlow() {
  return (
    <div
      className={`${SIGN_BOX} group-data-[stage=flicker]/hero:animate-light-on pointer-events-none z-[6] opacity-0 mix-blend-screen group-data-[stage=on]/hero:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-100`}
      aria-hidden="true"
    >
      <div className="absolute inset-[-18%_-30%_-12%]" style={SPILL_STYLE} />
      <Image
        src={ASSETS.sign}
        alt=""
        fill
        sizes={SIGN_SIZES}
        loading="eager"
        className="group-data-[stage=on]/hero:animate-hum opacity-50 blur-[calc(16*var(--g))] brightness-110 saturate-[1.6] motion-reduce:!animate-none"
      />
    </div>
  );
}

/**
 * The marquee sign: the lit art, the countdown, a dimmed copy on top that
 * flickers away when the power comes on, then the bulb and letter lights.
 */
export function MarqueeSign({
  signRef,
  powered,
  onFlipPower,
}: {
  signRef: Ref<HTMLImageElement>;
  powered: boolean;
  onFlipPower: () => void;
}) {
  return (
    <div className={`${SIGN_BOX} z-[7]`}>
      <h1 className="absolute inset-0">
        <Image
          ref={signRef}
          src={ASSETS.sign}
          alt="TAMU Datathon"
          fill
          sizes={SIGN_SIZES}
          loading="eager"
        />
      </h1>

      <Countdown />

      {/* The unlit sign: a dimmed copy stacked over the lit one. */}
      <Image
        src={ASSETS.sign}
        alt=""
        aria-hidden="true"
        fill
        sizes={SIGN_SIZES}
        loading="eager"
        className="group-data-[stage=flicker]/hero:animate-night-off brightness-[0.28] saturate-50 group-data-[stage=on]/hero:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-0"
      />

      <div
        className="group-data-[stage=flicker]/hero:animate-light-on pointer-events-none absolute inset-0 opacity-0 mix-blend-screen group-data-[stage=on]/hero:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-100"
        aria-hidden="true"
      >
        {/* Every third bulb shares a phase; animating the three groups (not 30 bulbs) keeps the chase cheap. */}
        {[0, 1, 2].map((phase) => (
          <div
            key={phase}
            className="group-data-[stage=on]/hero:animate-chase absolute inset-0 motion-reduce:!animate-none"
            // Negative offsets so the chase is already running, moving along the path.
            style={cssVars({ "--chase": `${phase * 0.3 - 0.6}s` })}
          >
            {BULBS.filter((_, i) => i % 3 === phase).map(([x, y]) => (
              <span
                key={`${x},${y}`}
                className="absolute left-[var(--x)] top-[var(--y)] aspect-square w-[3.7%] rounded-full [translate:-50%_-50%]"
                style={{
                  ...BULB_STYLE,
                  ...cssVars({ "--x": `${x}%`, "--y": `${y}%` }),
                }}
              />
            ))}
          </div>
        ))}
        {/* Each letter pulses in turn (T → A → M → U) as the power comes on, then every 7s. */}
        {LETTERS.map(([x, y], i) => (
          <span
            key={i}
            className="group-data-[stage=on]/hero:animate-letter-glow absolute left-[var(--x)] top-[var(--y)] aspect-square w-[12.4%] rounded-full opacity-[0.55] [translate:-50%_-50%] motion-reduce:!animate-none"
            style={{
              ...LETTER_RING_STYLE,
              ...cssVars({
                "--x": `${x}%`,
                "--y": `${y}%`,
                "--pop": `${250 + i * 140}ms`,
              }),
            }}
          />
        ))}
      </div>

      {/* Easter egg: the power lever on the right of the countdown. */}
      <button
        type="button"
        className="group/lever absolute left-[73.4%] top-[74.62%] h-[15.52%] w-[10.7%] cursor-pointer rounded-[calc(20*var(--g))] border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#3edbd3] disabled:cursor-default"
        onClick={onFlipPower}
        disabled={!powered}
        aria-label="Flip the power switch"
        title="Flip the power switch"
      >
        <span
          className="pointer-events-none absolute left-[72%] top-[23.1%] aspect-square w-[110%] rounded-full opacity-0 mix-blend-screen transition-opacity duration-200 [translate:-50%_-50%] group-hover/lever:opacity-100 group-focus-visible/lever:opacity-100 group-disabled/lever:opacity-0"
          style={KNOB_GLOW_STYLE}
        />
      </button>
    </div>
  );
}
