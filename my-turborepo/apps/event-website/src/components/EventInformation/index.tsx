import EventInfoBorder from "./EventInfoBorder";
import PoolStory from "./PoolStory";

export default function EventInformation() {
  return (
    <>
      <section
        id="event-information"
        aria-labelledby="event-information-heading"
        className="relative isolate scroll-mt-24 bg-[#142009] px-4 pb-6 pt-32 sm:px-8 lg:pb-8 lg:pt-40"
      >
        {/* Fade the felt into the hero's green to keep the seam soft. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_180px,black_calc(100%_-_64px),transparent)] [background:radial-gradient(ellipse_at_50%_30%,#71834320,transparent_65%),linear-gradient(to_right,#030a0580,transparent_16%_84%,#030a0580)]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[url('/event_assets/felt-texture.svg')] bg-[length:180px_180px] opacity-[0.14] mix-blend-soft-light" />
        </div>
        <h2
          id="event-information-heading"
          className="font-sekuya text-center text-[clamp(24px,6.5vw,96px)] font-normal not-italic leading-none tracking-normal text-[#FFB24C] [text-shadow:0_0_10px_#FFB24C]"
        >
          EVENT
          <br />
          INFORMATION
        </h2>

        <PoolStory />
      </section>
      <EventInfoBorder />
    </>
  );
}
