import type { CSSProperties } from "react";
import Image from "next/image";

import { ASSETS } from "./scene";

// Warm light the lit sign throws on the road.
const POOL_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 186 102 / 0.3), rgb(255 150 70 / 0.1) 60%, transparent)",
};

// A soft wedge of light ahead of the car, fading with distance.
const HEADLIGHT_STYLE: CSSProperties = {
  background:
    "conic-gradient(from 74deg at 0 50%, rgb(255 238 186 / 0) 0deg, rgb(255 238 186 / 0.4) 10deg, rgb(255 238 186 / 0.4) 22deg, rgb(255 238 186 / 0) 32deg)",
  WebkitMaskImage: "linear-gradient(90deg, #000 5%, transparent)",
  maskImage: "linear-gradient(90deg, #000 5%, transparent)",
};

const TAILLIGHT_STYLE: CSSProperties = {
  background:
    "radial-gradient(closest-side, rgb(255 60 60 / 0.7), transparent)",
};

/**
 * Road, ground and the car. As the page scrolls (--drive), the car drives off
 * to the right and the road behind it turns the ground's green. With reduced
 * motion the car fades out and the road cross-fades to green instead.
 */
export function Street() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-[var(--road-y)] z-[3] h-[calc(273*var(--s))] bg-[#271919] bg-[url('/event_assets/road.png')] bg-[length:auto_100%] bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(var(--road-y)_+_273*var(--s)_-_1px)] z-[3] bg-[#17330d]"
        aria-hidden="true"
      />
      {/* Green trailing the car. Twice the hero wide so it still covers the left once the car is gone. */}
      <div
        className="pointer-events-none absolute left-0 top-[var(--road-y)] z-[3] h-[calc(273*var(--s))] w-[200%] bg-[linear-gradient(90deg,#17330d_calc(100%_-_6cqw),rgb(23_51_13/0))] [--edge:calc(var(--drive,0)*(12cqw_+_var(--car-w)/2)_+_var(--drive-e,0)*(88cqw_+_var(--car-w)))] [transform:translateX(calc(var(--edge)_-_100%))] motion-reduce:w-full motion-reduce:opacity-[var(--drive,0)] motion-reduce:[background:#17330d] motion-reduce:[transform:none]"
        aria-hidden="true"
      />
      <div
        className="group-data-[stage=flicker]/hero:animate-light-on pointer-events-none absolute left-1/2 top-[var(--road-y)] z-[3] h-[calc(170*var(--g))] w-[calc(1000*var(--g))] opacity-0 mix-blend-screen [translate:-50%_-42%] group-data-[stage=on]/hero:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-500 [@media(scripting:none)]:!opacity-100"
        style={POOL_STYLE}
        aria-hidden="true"
      />
      {/* Wheels just past the road's near edge as in the mockup, but never below the hero's bottom. */}
      <div
        className="pointer-events-none absolute left-[12cqw] top-[calc(min(var(--road-y)_+_382*var(--s),98.5cqh)_-_var(--car-w)*281/513)] z-[4] aspect-[513/281] w-[var(--car-w)] [transform:translateX(calc(var(--drive-e,0)*(88cqw_+_100%)))] motion-reduce:opacity-[calc(1_-_var(--drive,0))] motion-reduce:[transform:none]"
        aria-hidden="true"
      >
        <span
          className="absolute left-[95%] top-1/2 h-[90%] w-[120%] opacity-0 transition-opacity duration-300 [translate:0_-50%] group-data-[stage=on]/hero:opacity-100 [@media(scripting:none)]:!opacity-100"
          style={HEADLIGHT_STYLE}
        />
        <Image
          src={ASSETS.car}
          alt=""
          fill
          sizes="(max-aspect-ratio: 1/1) 45vw, 40vh"
        />
        <span
          className="absolute left-[5%] top-[50.2%] aspect-square w-[16%] rounded-full opacity-0 mix-blend-screen transition-opacity duration-300 [translate:-50%_-50%] group-data-[stage=on]/hero:opacity-100 [@media(scripting:none)]:!opacity-100"
          style={TAILLIGHT_STYLE}
        />
      </div>
    </>
  );
}
