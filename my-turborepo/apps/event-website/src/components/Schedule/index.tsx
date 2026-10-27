"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Archivo_Black, Barlow_Condensed } from "next/font/google";

import { SectionGround } from "@/components/SectionGround";

import { categoryColor } from "./categories";
import scheduleJson from "./schedule.json";
import styles from "./Schedule.module.css";

const STAR = "/event_assets/sponsors/Star.png";

const voucherFont = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-voucher" });
const receiptFont = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-receipt",
});

export interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  location?: string;
  featured?: boolean;
  day?: string;
}

export interface ScheduleData {
  timezone: string;
  events: ScheduleEvent[];
}

interface Day {
  key: string;
  weekday: string;
  date: string;
  events: ScheduleEvent[];
}

/*
 * The end of each receipt curls backwards, away from you, drawn flat like the
 * rest of the site's art. It's modelled from the side (z toward you, y up, in
 * units where the receipt is 100 wide) as a loose spiral around an axis behind
 * the paper, then drawn with depth slanting up and off to one side.
 */
const CURL = { drop: 1, outer: 10.5, inner: 7.5, turns: 0.82, steps: 30 };
const CURL_SLANT = { x: 0.42, y: 0.3 };
const CURL_PAD = 14;
const CURL_INK = "#b5a26f";
const CURL_FRONT = ["#fbf8ea", "#ebe1c2", "#d6c69b"] as const;
const CURL_BACK = ["#efe6ca", "#ddd0a8", "#c6b486"] as const;
const CURL_LIGHT = { y: 0.75 / Math.hypot(0.75, 0.66), z: 0.66 / Math.hypot(0.75, 0.66) };

type CurlShape =
  | { kind: "paper"; points: string; fill: string }
  | { kind: "edge"; x1: number; y1: number; x2: number; y2: number };

interface CurlDrawing {
  viewBox: string;
  shapes: CurlShape[];
}

function buildCurl(side: "left" | "right"): CurlDrawing {
  const kx = side === "right" ? CURL_SLANT.x : -CURL_SLANT.x;
  const ky = CURL_SLANT.y;
  const round = (v: number) => Math.round(v * 100) / 100;
  const project = (x: number, y: number, z: number): [number, number] => [round(x - z * kx), round(-y + z * ky)];

  // [z, y] along the paper: a short drop below the footer, then the curl.
  const path: [number, number][] = [
    [0, 0],
    [0, -CURL.drop],
  ];
  for (let i = 1; i <= CURL.steps; i++) {
    const t = i / CURL.steps;
    const a = -t * CURL.turns * Math.PI * 2;
    const r = CURL.outer + (CURL.inner - CURL.outer) * t;
    path.push([-CURL.outer + r * Math.cos(a), -CURL.drop + r * Math.sin(a)]);
  }

  const pieces: { depth: number; shapes: CurlShape[] }[] = [];
  let maxY = 0;
  let wasFacing: boolean | null = null;
  for (let i = 1; i < path.length; i++) {
    const [za, ya] = path[i - 1];
    const [zb, yb] = path[i];
    const len = Math.hypot(yb - ya, zb - za) || 1;
    // The printed side's normal, flipped when the back of the paper is the side we see.
    let ny = (zb - za) / len;
    let nz = -(yb - ya) / len;
    const facing = ny * ky + nz >= 0;
    if (!facing) {
      ny = -ny;
      nz = -nz;
    }
    const lit = ny * CURL_LIGHT.y + nz * CURL_LIGHT.z;
    const tones = facing ? CURL_FRONT : CURL_BACK;
    const fill = lit >= 0.45 ? tones[0] : lit >= -0.1 ? tones[1] : tones[2];

    const corners = [project(0, ya, za), project(100, ya, za), project(100, yb, zb), project(0, yb, zb)] as const;
    for (const [, y] of corners) maxY = Math.max(maxY, y);
    const edge = (a: [number, number], b: [number, number]): CurlShape => ({
      kind: "edge",
      x1: a[0],
      y1: a[1],
      x2: b[0],
      y2: b[1],
    });
    const shapes: CurlShape[] = [
      { kind: "paper", points: corners.map(([x, y]) => `${x},${y}`).join(" "), fill },
      edge(corners[0], corners[3]),
      edge(corners[1], corners[2]),
    ];
    if (wasFacing !== null && wasFacing !== facing) shapes.push(edge(corners[0], corners[1]));
    if (i === path.length - 1) shapes.push(edge(corners[3], corners[2]));
    wasFacing = facing;

    pieces.push({ depth: ((ya + yb) / 2) * ky + (za + zb) / 2, shapes });
  }

  pieces.sort((a, b) => a.depth - b.depth);
  return {
    viewBox: `${-CURL_PAD} 0 ${100 + 2 * CURL_PAD} ${round(maxY + 1)}`,
    shapes: pieces.flatMap((piece) => piece.shapes),
  };
}

const CURLS = { left: buildCurl("left"), right: buildCurl("right") };

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

/** Flips to true the first time the element scrolls into view. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
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

/** The end of the receipt curling backwards; `side` is the side the curl shows on. */
function PaperCurl({ side }: { side: "left" | "right" }) {
  const curl = CURLS[side];

  return (
    <svg className={styles.curl} viewBox={curl.viewBox} aria-hidden="true">
      {curl.shapes.map((shape, i) =>
        shape.kind === "paper" ? (
          <polygon
            key={i}
            points={shape.points}
            fill={shape.fill}
            stroke={shape.fill}
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
        ) : (
          <line
            key={i}
            x1={shape.x1}
            y1={shape.y1}
            x2={shape.x2}
            y2={shape.y2}
            stroke={CURL_INK}
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        ),
      )}
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
  const [ref, seen] = useInView<HTMLDivElement>();

  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit" }),
    [timezone],
  );

  const next = now == null ? undefined : day.events.find((e) => Date.parse(e.startTime) > now);
  const cashedOut = now != null && !next;
  const amount = next && now != null ? formatCountdown(Date.parse(next.startTime) - now) : "00:00:00";
  const label = cashedOut ? "Cashed out" : next ? next.title : "Next event";

  return (
    <div
      ref={ref}
      className={`${styles.voucher} ${seen ? styles.printed : ""}`}
      style={{ "--d": `${index * 350}ms` } as CSSProperties}
    >
      <div className={styles.slot} aria-hidden="true" />
      <div className={styles.paper}>
        <div className={styles.hanging}>
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
              <span className={styles.dateStar} aria-hidden="true">
                ✦
              </span>
              <span>{day.date}</span>
            </p>
            <p className={styles.valid}>Valid until</p>
            <p className={styles.amount} aria-live="off">
              {amount}
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
                  <li
                    key={ev.id}
                    className={rowClass}
                    data-category={ev.category}
                    style={{ "--cat": categoryColor(ev.category) } as CSSProperties}
                  >
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
          <PaperCurl side={index % 2 ? "left" : "right"} />
        </div>
      </div>
    </div>
  );
}

export default function Schedule({
  data = scheduleJson as ScheduleData,
  ground = true,
}: {
  data?: ScheduleData;
  /** Draw the section's own patterned background; off when the page puts a shared one behind it. */
  ground?: boolean;
}) {
  const days = useMemo(() => groupByDay(data), [data]);
  const now = useNow();

  return (
    <section
      id="schedule"
      className={`${styles.section} ${ground ? "" : styles.bare} ${voucherFont.variable} ${receiptFont.variable}`}
      aria-labelledby="schedule-title"
    >
      <Ground on={ground}>
        <h2
          id="schedule-title"
          className="font-righteous flex items-center justify-center gap-[0.4em] text-[clamp(42px,7vw,88px)] uppercase leading-none tracking-[0.04em] text-[#FDFBED] [-webkit-text-stroke:0.06em_#FFB24C] [paint-order:stroke_fill]"
        >
          <Image
            src={STAR}
            alt=""
            width={47}
            height={48}
            draggable={false}
            className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
          />
          Schedule
          <Image
            src={STAR}
            alt=""
            width={47}
            height={48}
            draggable={false}
            className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
          />
        </h2>
        <div className={styles.grid}>
          {days.map((day, i) => (
            <Voucher key={day.key} day={day} index={i} timezone={data.timezone} now={now} />
          ))}
        </div>
      </Ground>
    </section>
  );
}

/** The section's own background, or nothing when a shared one is behind it. */
function Ground({ on, children }: { on: boolean; children: ReactNode }) {
  return on ? <SectionGround align="bottom">{children}</SectionGround> : <>{children}</>;
}
