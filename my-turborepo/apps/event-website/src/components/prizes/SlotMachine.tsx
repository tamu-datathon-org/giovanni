"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useInView, usePrefersReducedMotion } from "./hooks";
import { MarqueeTitle } from "./MarqueeTitle";
import { PrizeModal } from "./PrizeModal";
import { PRIZE_DIR, firstPlacePrizes } from "./prizedata";
import type { FirstPlacePrize } from "./prizedata";

const ART = `${PRIZE_DIR}/slot_machine_rework.png`;

/*
 * Spots on the art (1297 x 1407), as percentages of its width and height.
 * The four windows are the cream panes inside the bulbs; only their outer
 * corners are rounded (45px on the art).
 */
const WINDOW_W = 30.146;
const WINDOWS: { left: number; top: number; height: number; radius: string }[] = [
  { left: 15.883, top: 41.862, height: 17.058, radius: "11.5% 18.75% 0 0 / 18.75% 0 0 0" },
  { left: 46.8, top: 41.862, height: 17.058, radius: "0 11.5% 0 0 / 0 18.75% 0 0" },
  { left: 15.883, top: 59.63, height: 18.621, radius: "0 0 0 11.5% / 0 0 0 17.2%" },
  { left: 46.8, top: 59.63, height: 18.621, radius: "0 0 11.5% 0 / 0 0 17.2% 0" },
];

function WindowClip({ prize, load, playing }: { prize: FirstPlacePrize; load: boolean; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !load) return;
    if (playing) {
      // Autoplay can still be refused (e.g. low-power mode); the poster stays up then.
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [load, playing]);

  return (
    <video
      ref={ref}
      // The clips are on white; multiplying them over the cream pane drops the white.
      className="absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
      src={load ? `${PRIZE_DIR}/${prize.video}.mp4` : undefined}
      poster={`${PRIZE_DIR}/${prize.video}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

/** Four arrows pointing out of the corners: "open this bigger". */
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

export function SlotMachine() {
  const [ref, inView] = useInView<HTMLDivElement>("200px");
  const reducedMotion = usePrefersReducedMotion();
  // Don't fetch the clips until the machine is close to the screen.
  const [load, setLoad] = useState(false);
  // The prize open in the modal, if any.
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (inView) setLoad(true);
  }, [inView]);

  return (
    <div ref={ref} className="relative aspect-[1297/1407] w-full [container-type:inline-size]">
      <Image
        src={ART}
        alt=""
        fill
        priority
        sizes="(min-width: 860px) 800px, 92vw"
        className="pointer-events-none select-none object-contain"
        draggable={false}
      />

      <h2 id="prizes-title" className="absolute left-[33.5%] top-[13.8%] m-0 h-[10%] w-[28%]">
        <span className="sr-only">Prizes</span>
        <MarqueeTitle text="PRIZES" className="h-full w-full" />
      </h2>

      <p className="font-sekuya absolute left-[12.03%] top-[27.58%] m-0 flex h-[6.75%] w-[69.55%] items-center justify-center text-[length:5.2cqw] uppercase leading-none tracking-[0.04em] text-[#D50000]">
        1st Place
      </p>

      <ul aria-label="First place prizes" className="m-0 list-none p-0">
        {WINDOWS.map((pane, i) => {
          const prize = firstPlacePrizes[i];
          return (
            <li
              key={prize.video}
              className="absolute"
              style={{
                left: `${pane.left}%`,
                top: `${pane.top}%`,
                width: `${WINDOW_W}%`,
                height: `${pane.height}%`,
              }}
            >
              <button
                type="button"
                aria-label={`See ${prize.name} up close`}
                aria-haspopup="dialog"
                onClick={() => setOpen(i)}
                className="group absolute inset-0 block cursor-zoom-in overflow-hidden border-0 bg-[#FDFBED] p-0 outline-none transition-shadow duration-200 [-webkit-tap-highlight-color:transparent] hover:shadow-[inset_0_0_0_0.5cqw_#FFB24C] focus-visible:shadow-[inset_0_0_0_0.6cqw_#3edbd3]"
                style={{ borderRadius: pane.radius }}
              >
                <WindowClip prize={prize} load={load} playing={inView && !reducedMotion && open === null} />
                {/* Always a little visible so it reads as clickable on touch too. */}
                <span className="pointer-events-none absolute right-[5%] top-[7%] flex aspect-square w-[11%] items-center justify-center rounded-full bg-[#D50000] text-[#FDFBED] opacity-70 shadow-[0_0.3cqw_0.6cqw_rgb(0_0_0/0.3)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ExpandIcon className="h-[55%] w-[55%]" />
                </span>
                {/* The prize's name, shown when you point at or tab to it. */}
                <span className="font-righteous pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(117_2_4/0.85)] to-transparent px-[6%] pb-[4%] pt-[10%] text-center text-[length:max(10px,2.2cqw)] leading-tight text-[#FDFBED] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {prize.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <PrizeModal prizes={firstPlacePrizes} index={open} onChange={setOpen} />
    </div>
  );
}
