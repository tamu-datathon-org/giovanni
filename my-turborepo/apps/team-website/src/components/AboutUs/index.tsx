/* eslint-disable @next/next/no-img-element */
import { Noise } from "~/components/shared/Noise";
import AboutStars from "./AboutStars";
import BearShowcase from "./BearShowcase";

// ── Layout knobs (tweak these) ───────────────────────────────────────────────
// Must match jagged.svg viewBox
const JAGGED = {
  width: 1176,
  height: 331,
  overlap: 0.9,
} as const;

// ─────────────────────────────────────────────────────────────────────────────

function Squigly() {
  return (
    <div
      aria-hidden
      // Above the jagged edge (z-10) and the right splotch (z-0); placement
      // and cutoff both scale with the section's width.
      className="squiggle-clip pointer-events-none absolute inset-0 z-[15] overflow-hidden"
    >
      <div className="squiggle-art" />
    </div>
  );
}

export default function AboutUs() {
  // Percentage margins follow the content width as the sidebar opens or closes.
  const overlap = `${(-JAGGED.height / JAGGED.width) * JAGGED.overlap * 100}%`;

  return (
    <section
      id="about-us"
      className="relative z-[1] w-full scroll-mt-20 overflow-visible font-konkhmer @container lg:scroll-mt-0"
      style={{ marginTop: overlap }}
    >
      <div className="relative z-10 w-full leading-[0]">
        <img
          src="/images/about-us/jagged.svg"
          alt=""
          aria-hidden
          className="block h-auto w-full select-none"
        />
        <Noise mask="/images/about-us/jagged.svg" />
      </div>

      <div className="relative -mt-px overflow-visible bg-td-blue px-[clamp(1.5rem,4.08cqw,4rem)] pb-[clamp(2rem,4cqw,3rem)] pt-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <img
            src="/images/about-us/splotches.svg"
            alt=""
            width={641}
            height={650}
            className="absolute left-[-5%] top-[clamp(12rem,22cqw,22rem)] h-auto w-[clamp(20rem,55cqw,50rem)] max-w-none"
          />
        </div>
        {/* One right splotch: under the squiggle and sparkle, hanging into
            Past Events and clipped on the right. MinimizeToDock redraws a
            frozen copy, so keep its size and offsets in sync. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-22rem] z-0 h-[calc(22rem+clamp(18rem,48cqw,44rem)*650/641)] overflow-x-clip"
          aria-hidden
        >
          <img
            src="/images/about-us/splotches.svg"
            alt=""
            width={641}
            height={650}
            className="absolute bottom-0 right-[-22%] h-auto w-[clamp(18rem,48cqw,44rem)] max-w-none -scale-x-100"
          />
        </div>
        <Noise />
        {/* Above the jagged edge (z-10) so the sparkle isn't covered. */}
        <div className="relative z-20 mx-auto max-w-[88rem] text-white">
          {/* Sits in the existing transition space rather than adding a row
              above the heading. */}
          <img
            src="/images/about-us/heading-sparkle.svg"
            alt=""
            aria-hidden
            draggable={false}
            width={95}
            height={107}
            className="pointer-events-none absolute bottom-[calc(100%+1.5rem)] left-[clamp(-1.5rem,-2cqw,-0.5rem)] h-auto w-[clamp(5rem,9cqw,7rem)] select-none"
          />
          <h2 className="m-0 text-[length:clamp(3rem,8.164cqw,6rem)] font-normal not-italic leading-none tracking-[-0.07em]">
            <span className="text-td-aqua">About</span>{" "}
            <span className="text-white">us</span>
          </h2>
          <div className="mt-[clamp(1.5rem,3cqw,2.5rem)] w-full max-w-[48rem] break-words font-inter text-[length:clamp(1.125rem,3.06cqw,2.25rem)] font-normal uppercase leading-[1.2] tracking-normal @[640px]:w-[68%] [&>p+p]:mt-[clamp(1.5rem,4cqw,3rem)]">
            <p>
              Founded in 2019, TAMU Datathon is Texas A&M's premier hackathon focused on Data Science, Machine Learning, and AI. 
            </p>
            <p>We take a unique approach to hackathons by creating deterministic, engaging challenges that encourage students to develop and strengthen critical skills for today's rapidly evolving AI landscape.</p>
          </div>
          <AboutStars />
        </div>
        <BearShowcase />
      </div>

      <Squigly />
    </section>
  );
}
