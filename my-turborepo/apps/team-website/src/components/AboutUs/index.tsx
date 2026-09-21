/* eslint-disable @next/next/no-img-element */
import { inter, konkhmerSleokchher } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";
import BearShowcase from "./BearShowcase";

// ── Layout knobs (tweak these) ───────────────────────────────────────────────
// Must match jagged.svg viewBox
const JAGGED = {
  width: 1176,
  height: 331,
  overlap: 0.55,
} as const;

// top:  % of jagged band height — higher = lower on screen
// left: % from section left where squiggle starts — lower = bigger (right stays at edge)
const SQUIGLY = {
  top: "60%",
  left: "50%",
} as const;
// ─────────────────────────────────────────────────────────────────────────────

function Squigly({ jaggedHeight }: { jaggedHeight: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3]"
      style={{
        WebkitMaskImage: "url(/images/about-us/squigly-clip.svg)",
        maskImage: "url(/images/about-us/squigly-clip.svg)",
        WebkitMaskSize: "100% auto",
        maskSize: "100% auto",
        WebkitMaskPosition: "top",
        maskPosition: "top",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full" style={{ height: jaggedHeight }}>
        <img
          src="/images/about-us/squigly.svg"
          alt=""
          className="absolute"
          style={{
            top: SQUIGLY.top,
            right: 0,
            width: `calc(100% - ${SQUIGLY.left})`,
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutUs() {
  const jaggedHeight = `calc(100vw * ${JAGGED.height} / ${JAGGED.width})`;

  return (
    <section
      id="about-us"
      className={`relative z-20 w-full scroll-mt-20 overflow-visible lg:scroll-mt-0 ${konkhmerSleokchher.className}`}
      style={{ marginTop: `calc(${jaggedHeight} * ${-JAGGED.overlap})` }}
    >
      <div className="relative z-[2] w-full leading-[0]">
        <img
          src="/images/about-us/jagged.svg"
          alt=""
          aria-hidden
          className="block h-auto w-full select-none"
        />
        <Noise mask="/images/about-us/jagged.svg" />
      </div>

      <div className="relative -mt-px bg-[#377BB0] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
        <Noise />
        <div className="relative z-10 mx-auto max-w-5xl text-white">
          <img
            src="/images/about-us/heading-sparkle.svg"
            alt=""
            aria-hidden
            draggable={false}
            width={95}
            height={107}
            className="pointer-events-none mb-[clamp(1.5rem,4vw,3rem)] ml-[clamp(-1.5rem,-2vw,-0.5rem)] block h-auto w-[clamp(6rem,12vw,9rem)] max-w-full select-none"
          />
          <h2 className="text-[56px] font-normal leading-none tracking-[-0.07em] sm:text-[72px] md:text-[96px]">
            <span className="text-[#83EFE8]">ABOUT</span>{" "}
            <span className="text-white">US</span>
          </h2>
          <p
            className={`${inter.className} mt-6 max-w-2xl text-[24px] font-normal uppercase leading-none tracking-normal md:text-[36px]`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <div className="mt-8 flex gap-3" aria-hidden>
            <img
              src="/images/about-us/star.svg"
              alt=""
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <img
              src="/images/about-us/star.svg"
              alt=""
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <img
              src="/images/about-us/star.svg"
              alt=""
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </div>
        </div>
        <BearShowcase />
      </div>

      <Squigly jaggedHeight={jaggedHeight} />
    </section>
  );
}
