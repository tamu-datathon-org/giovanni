"use client";

import type { CSSProperties, ReactNode } from "react";

import { SectionGround } from "@/components/SectionGround";

import { CrapsBoard } from "./CrapsBoard";
import { useInView } from "./hooks";
import { SlotMachine } from "./SlotMachine";

const STAR_COUNT = 15;
const STAR_MIDDLE = Math.floor(STAR_COUNT / 2);

/**
 * The row of dim stars between the slot machine and the board. Like the
 * Rail's stars, they ripple out from the middle as the row scrolls into view.
 */
function StarRow() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-shine={inView ? "" : undefined}
      className="flex w-full max-w-[760px] justify-between px-[4%]"
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <svg
          key={i}
          viewBox="-24 -24 48 48"
          className="w-[4.2%] fill-[#9C1A1A] [[data-shine]_&]:animate-star-pulse motion-reduce:!animate-none"
          style={{ "--delay": `${Math.abs(i - STAR_MIDDLE) * 0.06}s` } as CSSProperties}
        >
          <path d="M0 -24L6.5 -6.5L24 0L6.5 6.5L0 24L-6.5 6.5L-24 0L-6.5 -6.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Prizes({
  ground = true,
}: {
  /**
   * Draw the section's own patterned background. The home page turns this off
   * and puts one background behind Prizes and Schedule together, so the
   * pattern runs on unbroken from one into the other.
   */
  ground?: boolean;
}) {
  const content: ReactNode = (
    <div className="mx-auto flex flex-col items-center gap-[clamp(16px,3vw,32px)] px-4 pb-16 pt-14 md:pb-20 md:pt-20">
      {/* As large as fits the window height, up to 800px wide. 0.922 is the art's width / height. */}
      <div className="w-full max-w-[min(800px,calc((100svh_-_48px)*0.922))]">
        <SlotMachine />
      </div>
      <StarRow />
      <div className="w-full max-w-[760px]">
        <CrapsBoard />
      </div>
    </div>
  );

  return (
    <section
      id="prizes"
      aria-labelledby="prizes-title"
      className={`relative overflow-x-clip ${ground ? "bg-[#6C0204]" : ""}`}
    >
      {ground ? <SectionGround>{content}</SectionGround> : content}
    </section>
  );
}
