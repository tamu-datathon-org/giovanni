import { konkhmerSleokchher } from "~/app/_components/fonts";
import HoverCrossfade from "./HoverCrossfade";
import MinimizeToDock from "./MinimizeToDock";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <MinimizeToDock className={konkhmerSleokchher.variable}>
      <header data-genie-heading className="mb-8 text-right">
        <h2
          className={`${konkhmerSleokchher.className} text-[clamp(3rem,8vw,6rem)] font-normal leading-none tracking-[-0.07em]`}
        >
          <span className="text-[#83EFE8]">Past </span>
          <span className="text-white">events</span>
        </h2>
      </header>

      <HoverCrossfade groups={PAST_EVENTS} />
    </MinimizeToDock>
  );
}
