import HoverCrossfade from "./HoverCrossfade";
import { PAST_EVENTS } from "./pastEventData";

export default function PastEvents() {
  return (
    <main className="min-h-screen bg-[#0d1526] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">Past Events</h1>
          {/* <p className="mt-1 text-slate-400">
            Hover a semester in the tree to preview its poster.
          </p> */}
        </header>

        <HoverCrossfade groups={PAST_EVENTS} />
      </div>
    </main>
  );
}