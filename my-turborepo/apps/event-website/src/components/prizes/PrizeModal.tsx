"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

import { usePrefersReducedMotion } from "./hooks";
import { PRIZE_DIR, prizeLinkProps } from "./prizedata";
import type { FirstPlacePrize } from "./prizedata";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

const ROUND_BUTTON =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#D50000] p-0 text-[#FDFBED] shadow-[0_3px_0_#750204,0_6px_12px_rgb(0_0_0/0.3)] transition hover:bg-[#FF1A1A] active:translate-y-[2px] active:shadow-[0_1px_0_#750204] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3]";

/**
 * A first-place prize's clip, shown large. Built on <dialog> + showModal(), so
 * it sits above everything, traps focus and closes on Esc by itself. Clicking
 * the dimmed backdrop or × also closes it; ←/→ and the arrows step through the
 * prizes. `index` is the prize shown, or null when closed.
 */
export function PrizeModal({
  prizes,
  index,
  onChange,
}: {
  prizes: FirstPlacePrize[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isOpen = index !== null;
  const prize = index === null ? null : prizes[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Keep the page from scrolling behind the modal.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const step = (by: number) => {
    if (index !== null) onChange((index + by + prizes.length) % prizes.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
    }
  };

  // The panel fills the dialog, so a click on the dialog itself is on the backdrop.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onChange(null);
  };

  const arrows = (
    <>
      <button type="button" aria-label="Previous prize" className={ROUND_BUTTON} onClick={() => step(-1)}>
        <Chevron direction="left" />
      </button>
      <button type="button" aria-label="Next prize" className={ROUND_BUTTON} onClick={() => step(1)}>
        <Chevron direction="right" />
      </button>
    </>
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby="prize-modal-title"
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className="prize-modal m-auto max-h-[96svh] w-[min(92vw,960px,calc((100svh_-_190px)*1.778_+_56px))] max-w-none overflow-y-auto border-0 bg-transparent p-0 backdrop:bg-[rgb(24_0_0/0.78)] backdrop:backdrop-blur-[3px]"
    >
      {prize && (
        // Dressed like the slot machine: gold body, dark red bezel, cream screen.
        <div className="prize-modal-panel rounded-[26px] bg-gradient-to-b from-[#FFC46B] to-[#F29B2E] p-2.5 shadow-[0_24px_60px_rgb(0_0_0/0.55)] sm:p-3.5">
          <div className="rounded-[18px] bg-[#750204] p-2 sm:p-3">
            <div className="flex items-center justify-between gap-3 rounded-[12px] bg-[#FDFBED] py-2 pl-4 pr-2 sm:py-2.5 sm:pl-6 sm:pr-3">
              <div className="min-w-0">
                <p className="font-righteous m-0 text-[11px] uppercase tracking-[0.2em] text-[#750204] sm:text-xs">
                  1st place prize
                </p>
                <h3
                  id="prize-modal-title"
                  className="font-sekuya m-0 truncate text-[clamp(18px,3.6vw,32px)] uppercase leading-tight text-[#D50000]"
                >
                  {prize.name}
                </h3>
              </div>
              <button type="button" aria-label="Close" className={ROUND_BUTTON} onClick={() => onChange(null)}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative mt-2 overflow-hidden rounded-[12px] bg-[#FDFBED] sm:mt-3">
              <video
                key={prize.video}
                // The clips are on white; multiplying them over the cream screen drops the white.
                className="block aspect-video w-full object-contain mix-blend-multiply"
                src={`${PRIZE_DIR}/${prize.video}_hd.mp4`}
                poster={`${PRIZE_DIR}/${prize.video}_hd.jpg`}
                autoPlay={!reducedMotion}
                controls={reducedMotion}
                muted
                loop
                playsInline
                aria-label={`${prize.name} clip`}
              />
              <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between sm:flex [&>button]:pointer-events-auto">
                {arrows}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 sm:mt-3">
              <div className="flex gap-2 sm:hidden">{arrows}</div>
              {/* Marquee bulbs, one per prize; the lit one is showing. */}
              <div className="hidden items-center gap-2 sm:flex">
                {prizes.map((p, i) => (
                  <button
                    key={p.video}
                    type="button"
                    aria-label={`Show ${p.name}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => onChange(i)}
                    className={`h-3.5 w-3.5 cursor-pointer rounded-full border-0 p-0 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3] ${
                      i === index
                        ? "bg-[#FFB24C] shadow-[0_0_10px_#FFB24C]"
                        : "bg-[#FDFBED]/40 hover:bg-[#FDFBED]/70"
                    }`}
                  />
                ))}
              </div>
              {prize.href && (
                <a
                  {...prizeLinkProps(prize.href)}
                  className="font-righteous inline-flex items-center gap-2 rounded-full bg-[#FFB24C] px-5 py-2.5 text-sm uppercase tracking-[0.08em] text-[#750204] no-underline shadow-[0_3px_0_#C97A1E] transition hover:bg-[#FFC46B] active:translate-y-[2px] active:shadow-[0_1px_0_#C97A1E] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3] sm:text-base"
                >
                  View prize
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
