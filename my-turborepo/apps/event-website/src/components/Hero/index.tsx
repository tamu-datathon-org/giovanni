"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ApplyButton } from "./ApplyButton";
import { EventDate } from "./EventDate";
import { MarqueeSign, SignGlow } from "./MarqueeSign";
import { ASSETS, cssVars, DRIVE_SPAN, SIGN_BOX, TIMING } from "./scene";
import { SiteNotice } from "./SiteNotice";
import { Footer } from "./Footer"
// import { SkyLayer } from "./SkyLayer";
// import { Street } from "./Street";

/** off: sign dark · flicker: the power-on sputter · on: fully lit and animated. */
type Stage = "off" | "flicker" | "on";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

/** Writes how far the page has scrolled through the hero to --drive / --drive-e, without re-rendering. */
function useScrollDrive(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let top = 0;
    let frame = 0;

    const measure = () => {
      top = el.getBoundingClientRect().top + window.scrollY;
    };
    const update = () => {
      frame = 0;
      // Finish the drive by the bottom of the page if it's too short to scroll the full span.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight - top;
      const span = Math.max(
        1,
        Math.min(el.offsetHeight * DRIVE_SPAN, scrollable),
      );
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      el.style.setProperty("--drive", progress.toFixed(4));
      el.style.setProperty("--drive-e", easeInOutCubic(progress).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const resize = new ResizeObserver(() => {
      measure();
      schedule();
    });
    measure();
    update();
    resize.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}

/** Flags the hero while it's out of view so its idle loops can pause. */
function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const signRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const timers = useRef<number[]>([]);
  const [stage, setStage] = useState<Stage>("off");

  useScrollDrive(heroRef);
  usePauseOffscreen(heroRef);

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  /** Turns the sign on after `delay` ms: a sputter, or a plain fade for reduced motion. */
  const powerOn = useCallback(
    (delay: number) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        later(delay, () => setStage("on"));
        return;
      }
      later(delay, () => {
        setStage("flicker");
        later(TIMING.flicker, () => setStage("on"));
      });
    },
    [later],
  );

  // Hold the sign dark until its art (and the city) can actually be seen, then power on.
  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      powerOn(TIMING.beat);
    };

    const images = [signRef.current, backgroundRef.current].filter(
      (img): img is HTMLImageElement => img !== null,
    );
    void Promise.all(
      images.map((img) => img.decode().catch(() => undefined)),
    ).then(start);
    later(TIMING.readyTimeout, start);

    return () => {
      started = true;
      clearTimers();
    };
  }, [later, clearTimers, powerOn]);

  const flipPower = useCallback(() => {
    if (stage !== "on") return;
    setStage("off");
    powerOn(TIMING.darkHold);
  }, [stage, powerOn]);

  return (
    <div>
      <section
        ref={heroRef}
        id="hero"
        data-stage={stage}
        // group/hero: children style themselves off data-stage. Idle loops pause while off-screen.
        className="group/hero relative isolate h-svh min-h-[320px] overflow-hidden bg-[#190148] [container-type:size] [&[data-offscreen]_*]:![animation-play-state:paused]"
        style={cssVars({
          "--flicker": `${TIMING.flicker}ms`,
          // Road-top line: 72% of the height on square and portrait screens, rising to 88% on very wide ones.
          "--road-y": "clamp(72cqh, 56cqh + 16cqw, 88cqh)",
          "--gutter": "clamp(12px, 3cqw, 24px)",
          "--top-gap": "12px",
          // px per unit of background.png: the scene always covers the width and reaches the top.
          "--s": "max(100cqw / 1440, var(--road-y) / 950)",
          // px per unit of hero_sign.png: never beyond the mockup's proportions, the width, or the space above the road.
          "--g":
            "min(var(--s), (100cqw - 2 * var(--gutter)) / 921, (var(--road-y) - var(--top-gap)) / 911)",
          "--car-w": "calc(410 * var(--g))",
        })}
      >
        <div
          className="absolute left-[calc(50%_-_720*var(--s))] top-[calc(var(--road-y)_-_950*var(--s))] z-0 h-[calc(1394*var(--s))] w-[calc(1440*var(--s))]"
          // The art's own sky colours, shown while background.png loads.
          style={{
            background:
              "linear-gradient(#190148, #4b2346 14.3%, #713a3f 28.7%, #894438 43%, #8d4536 46%)",
          }}
        >
          <Image
            ref={backgroundRef}
            src={ASSETS.background}
            alt=""
            fill
            preload
            sizes="(max-aspect-ratio: 1/1) 110vh, 100vw"
          />
          {/* <SkyLayer /> */}
        </div>
        <SignGlow />
        <MarqueeSign
          signRef={signRef}
          powered={stage === "on"}
          onFlipPower={flipPower}
        />
        {/* <Street /> */}
        {/* Same box as the sign, but above the road and the car. */}
        <div className={`${SIGN_BOX} pointer-events-none z-[5]`}>
          <EventDate />
          <ApplyButton />
        </div>
        <SiteNotice />
        {/* MLH member events must link the Code of Conduct. */}
        <a
          href="https://mlh.io/code-of-conduct"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[max(10px,1.5cqh)] right-[max(12px,1.5cqw)] z-[6] text-[length:clamp(11px,0.9cqw,14px)] tracking-[0.02em] text-[rgb(255_244_220/0.75)] underline underline-offset-[3px] hover:text-[#fff4dc] focus-visible:rounded focus-visible:text-[#fff4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3edbd3]"
        >
          MLH Code of Conduct
        </a>
      </section>
      {/* <Footer /> */}
    </div>
  );
}
