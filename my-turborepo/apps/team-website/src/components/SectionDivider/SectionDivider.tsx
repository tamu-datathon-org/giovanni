"use client";

type Variant = "curvy" | "jagged";

interface SectionDividerProps {
  variant: Variant;
  className?: string;
}

const SectionDivider = ({ variant, className = "" }: SectionDividerProps) => {
  const base = "w-full shrink-0 overflow-hidden py-6";
  const strokeClass = "stroke-neutral-400 dark:stroke-neutral-500";
  const strokeWidth = 2;
  const dashArray = "4 10";

  if (variant === "curvy") {
    return (
      <div className={`${base} ${className}`} aria-hidden>
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="h-14 w-full sm:h-16"
        >
          <path
            d="M0,40 Q300,0 600,40 T1200,40"
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={strokeClass}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${base} ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="h-14 w-full sm:h-16"
      >
        <path
          d="M0,40 L150,10 L300,70 L450,10 L600,70 L750,10 L900,70 L1050,10 L1200,40"
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={strokeClass}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
