import { konkhmerSleokchher } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";

import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <main
      className={`${konkhmerSleokchher.variable} relative min-h-screen bg-[#377BB0] px-6 pb-16 pt-4`}
    >
      <Noise />
      {/* Above the bridging splotch (About Us is z-index 1). */}
      <div className="relative z-10 mx-auto max-w-5xl">
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
