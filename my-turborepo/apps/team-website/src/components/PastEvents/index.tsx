import { konkhmerSleokchher } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";

import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <main
      className={`${konkhmerSleokchher.variable} relative z-0 min-h-screen bg-[#377BB0] px-6 py-16`}
    >
      <Noise />
      <div className="relative z-[1] mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h2 className="font-konkhmer text-5xl font-normal sm:text-6xl md:text-7xl">
            <span className="text-[#83EFE8]">Past </span>
            <span className="text-white">events</span>
          </h2>
        </header>

        <HoverCrossfade groups={PAST_EVENTS} />
      </div>
    </main>
  );
}