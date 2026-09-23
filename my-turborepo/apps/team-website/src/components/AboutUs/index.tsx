/* eslint-disable @next/next/no-img-element */
import { inter, konkhmerSleokchher } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";
import AboutStars from "./AboutStars";
import BearShowcase from "./BearShowcase";
import styles from "./about.module.css";

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
      className={styles.squiggles}
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
      <div className={styles.squiggleArt} />
    </div>
  );
}

export default function AboutUs() {
  // Percentage margins follow the content width as the sidebar opens or closes.
  const overlap = `${(-JAGGED.height / JAGGED.width) * JAGGED.overlap * 100}%`;

  return (
    <section
      id="about-us"
      className={`relative w-full scroll-mt-20 overflow-visible lg:scroll-mt-0 ${styles.section} ${konkhmerSleokchher.className}`}
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

      <div className={styles.body}>
        <div className={styles.background} aria-hidden>
          <img
            src="/images/about-us/splotches.svg"
            alt=""
            width={641}
            height={650}
            className={styles.splotches}
          />
        </div>
        <div className={styles.splotchesRightShell} aria-hidden>
          <img
            src="/images/about-us/splotches.svg"
            alt=""
            width={641}
            height={650}
            className={styles.splotchesRight}
          />
        </div>
        <Noise />
        <div className={styles.intro}>
          <img
            src="/images/about-us/heading-sparkle.svg"
            alt=""
            aria-hidden
            draggable={false}
            width={95}
            height={107}
            className={styles.sparkle}
          />
          <h2 className={styles.heading}>
            <span className="text-[#83EFE8]">About</span>{" "}
            <span className="text-white">us</span>
          </h2>
          <div className={`${inter.className} ${styles.copy}`}>
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
