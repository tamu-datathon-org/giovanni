import type { ReactNode } from "react";
import { Noise } from "~/components/shared/Noise";
import styles from "./past-events.module.css";

interface PastEventsSectionProps {
  children: ReactNode;
  className?: string;
}

export default function PastEventsSection({
  children,
  className,
}: PastEventsSectionProps) {

  return (
    <section
      className={`${className ?? ""} relative`}
    >
      {/* The full-bleed frame. z-[2] sits above AboutUs (z-index 1),
          so its own bg/noise/splotch replace what AboutUs would otherwise
          paint over this area (see about.module.css .splotchesRightShell) */}
      <div
        className={`${styles.frame} z-[2] overflow-hidden bg-[#377BB0]`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <Noise />
        </div>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about-us/splotches.svg"
          alt=""
          aria-hidden
          width={641}
          height={650}
          className={styles.splotchOverhang}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl p-5 pb-20">{children}</div>
      </div>
    </section>
  );
}
