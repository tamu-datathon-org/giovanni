"use client";

import { useEffect, useState } from "react";

import styles from "./hero.module.css";

// Kickoff: Saturday, November 7, 2026 at 9:00 AM Central (CST, UTC-6 once
// daylight saving ends on Nov 1). Keep the explicit offset when changing it.
const KICKOFF_MS = new Date("2026-11-07T09:00:00-06:00").getTime();
const MINUTE_MS = 60_000;

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
      className={styles.countdown}
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
            className={`${styles.tile} ${text.length > 2 ? styles.tileWide : ""}`}
          >
            {text}
          </span>
        );
      })}
      {cells.map(({ unit }) => (
        <span key={unit} aria-hidden="true" className={styles.unit}>
          {unit}
        </span>
      ))}
    </div>
  );
}
