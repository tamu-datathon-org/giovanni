/* eslint-disable @next/next/no-img-element */
import { Noise } from "~/components/shared/Noise";
import styles from "./challenges.module.css";

export default function Challenges() {
  return (
    <section
      id="challenges"
      aria-labelledby="challenges-heading"
      className="relative scroll-mt-20 font-konkhmer lg:scroll-mt-0"
    >
      {/* z-[2] sits above AboutUs (z-index 1), so this frame's own
          bg/noise/splotch replace what AboutUs would otherwise paint over
          this area (see about.module.css .splotchesRightShell) */}
      <div className={`${styles.frame} z-[2] overflow-hidden bg-[#377BB0]`}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Noise />
        </div>

        <img
          src="/images/about-us/splotches.svg"
          alt=""
          aria-hidden
          width={641}
          height={650}
          className={styles.splotchOverhang}
        />

        <div className={styles.inner}>
          <h2 id="challenges-heading" className={styles.heading}>
            <span className="text-[#83EFE8]">What are</span>{" "}
            <span className="text-white">challenges?</span>
          </h2>
          <div className={`font-inter ${styles.copy}`}>
            <p>
              Challenges are technical data problems designed for students to
              attempt during the 24-hour event, focusing on bleeding-edge
              topics in data science, machine learning, and artificial
              intelligence.
            </p>
            <p>
              Place in the top three of any individual challenge for the
              opportunity to win prizes.
            </p>
            <p>
              Sponsoring companies such as{" "}
              <span className={styles.accent}>Databricks</span>,{" "}
              <span className={styles.accent}>Qualcomm</span>,{" "}
              <span className={styles.accent}>Hitachi</span>, and{" "}
              <span className={styles.accent}>H-E-B</span> will also offer
              their own challenges, which may focus on industry-specific
              datasets and real-world problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
