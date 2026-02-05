"use client";

import type React from "react";

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    value: "$10K",
    label: "In Prizes",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "600+",
    label: "Hackers",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    value: "20+",
    label: "Schools",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
  },
  {
    value: "48",
    label: "Hours",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "100+",
    label: "Projects",
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

interface ScrollStatsProps {
  progress: number;
}

export default function ScrollStats({ progress }: ScrollStatsProps) {
  const visibleCount = Math.min(
    stats.length,
    Math.max(0, Math.floor(progress * (stats.length + 1))),
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
      {stats.map((stat, index) => {
        const isVisible = index < visibleCount;
        return (
          <div
            key={index}
            className={`flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/90 px-5 py-4 shadow-md ring-1 ring-neutral-200/80 transition-all duration-500 sm:gap-4 sm:px-6 sm:py-4 ${
              isVisible
                ? "translate-y-0 scale-[1.02] opacity-100"
                : "translate-y-4 scale-95 opacity-0"
            }`}
          >
            <span className="flex shrink-0 items-center justify-center rounded-lg bg-datalightblue/20 p-1.5 text-datadarkblue">
              {stat.icon}
            </span>
            <div className="flex flex-col items-start">
              <span className="font-mono text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
