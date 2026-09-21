/* eslint-disable @next/next/no-img-element */
import { konkhmerSleokchher } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";

import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <main
      className={`${konkhmerSleokchher.variable} relative z-0 min-h-screen bg-[#377BB0] px-6 pb-16 pt-4`}
    >
      <Noise />
      {/* Behind the tab; clipped on the right. Upper half lives on About Us. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0 overflow-x-clip"
      >
        <img
          src="/images/about-us/splotches.svg"
          alt=""
          width={641}
          height={650}
          className="absolute -right-[22%] -top-[40%] w-[clamp(18rem,48vw,44rem)] max-w-none -scale-x-100"
        />
      </div>
      <div className="relative z-[1] mx-auto max-w-5xl">
        <header className="mb-8 text-right">
          <h2
            className={`${konkhmerSleokchher.className} text-[clamp(3rem,8vw,6rem)] font-normal leading-none tracking-[-0.07em]`}
          >
            <span className="text-[#83EFE8]">Past </span>
            <span className="text-white">events</span>
          </h2>
        </header>

        <HoverCrossfade groups={PAST_EVENTS} />
      </div>
    </main>
  );
}
