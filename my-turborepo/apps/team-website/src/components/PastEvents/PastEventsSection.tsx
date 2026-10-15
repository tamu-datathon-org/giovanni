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
      {/* The full-bleed frame. */}
      <div
        className={`${styles.frame} z-[2] overflow-hidden bg-[#377BB0]`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <Noise />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl p-5 pb-20">{children}</div>
      </div>
    </section>
  );
}
