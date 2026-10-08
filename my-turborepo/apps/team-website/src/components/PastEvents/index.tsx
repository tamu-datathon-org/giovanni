import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";
import PastEventsSection from "./PastEventsSection";

export default function PastEvents() {
  return (
    <PastEventsSection className="font-konkhmer">
      <header className="mb-8 text-right">
        <h2
          className="font-konkhmer text-[clamp(3rem,8vw,6rem)] font-normal leading-none tracking-[-0.07em]"
        >
          <span className="text-[#83EFE8]">Past </span>
          <span className="text-white">events</span>
        </h2>
      </header>
      <HoverCrossfade groups={PAST_EVENTS} />
    </PastEventsSection>
  );
}
