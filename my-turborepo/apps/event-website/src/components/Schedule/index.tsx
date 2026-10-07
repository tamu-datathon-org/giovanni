"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Archivo_Black, Barlow_Condensed, Lilita_One } from "next/font/google";
import scheduleJson from "./schedule.json";
import styles from "./Schedule.module.css";

const titleFont = Lilita_One({ weight: "400", subsets: ["latin"], variable: "--font-schedule-title" });
const voucherFont = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-voucher" });
const receiptFont = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-receipt",
});

export type ScheduleEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  location?: string;
  featured?: boolean;
  day?: string;
};

export type ScheduleData = {
  timezone: string;
  events: ScheduleEvent[];
};

type Day = {
  key: string;
  weekday: string;
  date: string;
  events: ScheduleEvent[];
};

function groupByDay(data: ScheduleData): Day[] {
  const keyFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: data.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const weekdayFmt = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long" });
  const monthFmt = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short" });

  const sorted = [...data.events].sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime));
  const days = new Map<string, Day>();

  for (const ev of sorted) {
    const key = ev.day ?? keyFmt.format(new Date(ev.startTime));
    let day = days.get(key);
    if (!day) {
      const noon = new Date(`${key}T12:00:00Z`);
      const month = monthFmt.format(noon);
      day = {
        key,
        weekday: weekdayFmt.format(noon),
        date: `${month === "May" ? month : `${month}.`} ${noon.getUTCDate()}`,
        events: [],
      };
      days.set(key, day);
    }
    day.events.push(ev);
  }

  return [...days.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useDispense<T extends Element>() {
  const ref = useRef<T>(null);
  const [dispensed, setDispensed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setDispensed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDispensed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, dispensed] as const;
}

function Barcode({ seed }: { seed: string }) {
  const bars = useMemo(() => {
    let h = 2166136261;
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const out: { x: number; w: number }[] = [];
    let x = 0;
    while (x < 200) {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      const w = 1 + ((h >>> 0) % 4);
      const gap = 1 + ((h >>> 8) % 3);
      if (x + w > 200) break;
      out.push({ x, w });
      x += w + gap;
    }
    return out;
  }, [seed]);

  return (
    <svg className={styles.barcode} viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={40} />
      ))}
    </svg>
  );
}

function Voucher({
  day,
  index,
  timezone,
  now,
}: {
  day: Day;
  index: number;
  timezone: string;
  now: number | null;
}) {
  const [ref, dispensed] = useDispense<HTMLDivElement>();

  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit" }),
    [timezone],
  );

  const next = now == null ? undefined : day.events.find((e) => Date.parse(e.startTime) > now);
  const cashedOut = now != null && !next;
  const amount = next && now != null ? formatCountdown(Date.parse(next.startTime) - now) : "00:00:00";
  const label = cashedOut ? "Cashed out" : next ? `Until ${next.title}` : "Until next event";

  return (
    <div
      ref={ref}
      className={`${styles.machine} ${dispensed ? styles.dispensed : ""}`}
      style={{ "--delay": `${index * 350}ms` } as CSSProperties}
    >
      <div className={styles.slot} aria-hidden="true" />
      <div className={styles.chute}>
        <article className={styles.ticket} aria-label={`${day.weekday} schedule`}>
          <p className={styles.org}>TAMU Datathon</p>
          <p className={styles.city}>College Station, TX</p>
          <h3 className={styles.heading}>
            Cashout
            <br />
            Voucher
          </h3>
          <Barcode seed={day.key} />
          <p className={styles.date}>
            <span>{day.weekday}</span>
            <span aria-hidden="true">✦</span>
            <span>{day.date}</span>
          </p>
          <p className={styles.amount} aria-live="off">
            ${amount}
          </p>
          <p className={styles.until}>{label}</p>

          <hr className={styles.rule} />

          <ol className={styles.list}>
            {day.events.map((ev) => {
              const start = Date.parse(ev.startTime);
              const end = Date.parse(ev.endTime);
              const past = now != null && end <= now;
              const live = now != null && start <= now && now < end;
              const parts = timeFmt.formatToParts(new Date(start));
              const clock = parts
                .filter((p) => p.type === "hour" || p.type === "minute" || p.type === "literal")
                .map((p) => p.value)
                .join("")
                .trim();
              const period = parts.find((p) => p.type === "dayPeriod")?.value;
              const rowClass = [
                styles.row,
                ev.featured ? styles.featured : "",
                past ? styles.past : "",
                live ? styles.live : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li key={ev.id} className={rowClass} data-category={ev.category}>
                  <time className={styles.time} dateTime={ev.startTime}>
                    {clock}
                    {period && <span className={styles.period}>{period}</span>}
                  </time>
                  <span className={styles.leader} aria-hidden="true" />
                  <span className={styles.name}>
                    {ev.featured && (
                      <span className={styles.star} aria-label="Don't miss">
                        ★
                      </span>
                    )}
                    {ev.title}
                  </span>
                </li>
              );
            })}
          </ol>

          <footer className={styles.footer}>
            <span className={styles.legend}>★ = Don&apos;t miss</span>
            <span>No.{String(index + 1).padStart(2, "0")}</span>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default function Schedule({ data = scheduleJson as ScheduleData }: { data?: ScheduleData }) {
  const days = useMemo(() => groupByDay(data), [data]);
  const now = useNow();

  return (
    <section
      className={`${styles.section} ${titleFont.variable} ${voucherFont.variable} ${receiptFont.variable}`}
      aria-labelledby="schedule-title"
    >
      <h2 id="schedule-title" className={styles.title}>
        <span className={styles.sparkle} aria-hidden="true">
          ✦
        </span>
        Schedule
        <span className={styles.sparkle} aria-hidden="true">
          ✦
        </span>
      </h2>
      <div className={styles.grid}>
        {days.map((day, i) => (
          <Voucher key={day.key} day={day} index={i} timezone={data.timezone} now={now} />
        ))}
      </div>
    </section>
  );
}
