import PoolStory from "./PoolStory";

const SIGHTS =
  "absolute top-[18%] bottom-[14%] flex w-[7px] flex-col items-center justify-between";
const DIAMOND =
  "h-[9px] w-[5px] bg-[#f9dea078] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] drop-shadow-[0_0_3px_#ffb24c28]";

export default function EventInformation() {
  return (
    <section
      id="event-information"
      aria-labelledby="event-information-heading"
      className="relative isolate scroll-mt-24 bg-[#142009] px-4 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40"
    >
      {/* Fade the felt and rails into the hero's green to keep the seam soft. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_180px,black_calc(100%_-_64px),transparent)] [background:radial-gradient(ellipse_at_50%_30%,#71834320,transparent_65%),linear-gradient(to_right,#030a0580,transparent_16%_84%,#030a0580)]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[url('/event_assets/felt-texture.svg')] bg-[length:180px_180px] opacity-[0.14] mix-blend-soft-light" />
        <div className="absolute inset-x-[clamp(8px,1.7vw,28px)] bottom-7 top-24 rounded-[clamp(28px,6vw,88px)] border border-[#ffb24c30] shadow-[inset_0_0_0_6px_#08130670,inset_0_0_0_7px_#ffb24c16,inset_0_0_32px_#030a0538,0_0_24px_#030a0538]">
          <div className={`${SIGHTS} left-0`}>
            <span className={DIAMOND} />
            <span className={DIAMOND} />
            <span className={DIAMOND} />
          </div>
          <div className={`${SIGHTS} right-0`}>
            <span className={DIAMOND} />
            <span className={DIAMOND} />
            <span className={DIAMOND} />
          </div>
        </div>
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
  );
}
