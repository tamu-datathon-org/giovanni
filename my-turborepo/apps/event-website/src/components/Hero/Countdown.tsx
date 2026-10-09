"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

// Kickoff: Saturday, November 7, 2026 at 9:00 AM Central (CST, UTC-6 once
// daylight saving ends on Nov 1). Keep the explicit offset when changing it.
const KICKOFF_MS = new Date("2026-11-07T09:00:00-06:00").getTime();
const MINUTE_MS = 60_000;

// Cream tiles with a warm rim, lit from above.
const TILE_STYLE: CSSProperties = {
  boxShadow:
    "inset 0 calc(-5 * var(--g)) 0 rgb(226 150 60 / 0.3), inset 0 0 0 calc(2.5 * var(--g)) rgb(244 176 88 / 0.85), 0 calc(3 * var(--g)) calc(6 * var(--g)) rgb(110 45 0 / 0.35)",
};

/** Whole minutes until `targetMs` (0 once it passes); null until mounted, so SSR stays stable. */
function useMinutesUntil(targetMs: number) {
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setMinutes(Math.max(0, Math.floor((targetMs - Date.now()) / MINUTE_MS)));
    tick();
    // Ticks every second but only re-renders when the minute changes.
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return minutes;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Days / hours / minutes to kickoff, laid over the sign's blank orange panel. */
export function Countdown() {
  const minutes = useMinutesUntil(KICKOFF_MS);
  const left =
    minutes === null
      ? null
      : {
          days: Math.floor(minutes / 1440),
          hours: Math.floor(minutes / 60) % 24,
          mins: minutes % 60,
        };

  const cells = [
    { unit: "DAYS", value: left?.days },
    { unit: "HRS", value: left?.hours },
    { unit: "MIN", value: left?.mins },
  ];

  return (
    <div
      // Sits on the sign's blank orange panel. Padding percentages are of the
      // sign's width: 41 and 36 of its 1010 units. Hidden until the power comes on.
      className="font-righteous absolute left-[31.68%] top-[46.68%] grid h-[16.17%] w-[38.12%] grid-cols-3 grid-rows-[16.5%_60.5%_1fr] gap-x-[5.5%] pl-[4.06%] pr-[3.56%] leading-none group-data-[stage=off]/hero:invisible [@media(scripting:none)]:!visible"
      role="timer"
      aria-label={
        left
          ? `Kickoff in ${plural(left.days, "day")}, ${plural(left.hours, "hour")}, ${plural(left.mins, "minute")}`
          : "Countdown to kickoff"
      }
    >
      {cells.map(({ unit, value }) => {
        const text =
          value === undefined ? "--" : String(value).padStart(2, "0");
        return (
          <span
            key={unit}
            aria-hidden="true"
            className={`row-start-2 grid place-items-center rounded-[calc(12*var(--g))] bg-gradient-to-b from-[#fffdf5] to-[#fbecd0] text-[#1b1414] ${text.length > 2 ? "text-[length:calc(46*var(--g))]" : "text-[length:calc(64*var(--g))]"}`}
            style={TILE_STYLE}
          >
            {text}
          </span>
        );
      })}
      {cells.map(({ unit }) => (
        <span
          key={unit}
          aria-hidden="true"
          className="row-start-3 self-center text-center text-[length:calc(29*var(--g))] tracking-[0.02em] text-[#fff4dc] [text-shadow:0_calc(2*var(--g))_0_rgb(150_64_0/0.55)]"
        >
          {unit}
        </span>
      ))}
    </div>
  );
}
