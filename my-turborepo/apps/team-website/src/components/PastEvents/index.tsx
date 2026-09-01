import { konkhmerSleokchher } from "~/app/_components/fonts";

import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <main
      className={`${konkhmerSleokchher.variable} min-h-screen bg-[#EEEEEE] px-6 py-16`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h2 className="font-konkhmer text-5xl font-normal sm:text-6xl md:text-7xl">
            <span className="text-[#377BB0]">PAST </span>
            <span className="text-[#10AEA4]">EVENTS</span>
          </h2>
        </header>

        <HoverCrossfade groups={PAST_EVENTS} />
      </div>
    </main>
  );
}