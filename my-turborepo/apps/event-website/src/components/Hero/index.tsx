"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ApplyButton } from "./ApplyButton";
import { Ceiling } from "./Ceiling";
import { Curtains } from "./Curtains";
import { EventDate } from "./EventDate";
import { MarqueeSign, SignGlow } from "./MarqueeSign";
import { Room } from "./Room";
import { CURTAIN_SPAN, cssVars, POWER_AT, STAGE_BOX, TIMING } from "./scene";
import { SiteNotice } from "./SiteNotice";
import { Footer } from "./Footer"
// import { SkyLayer } from "./SkyLayer";
// import { Street } from "./Street";

/** off: room and sign dark · flicker: the power-on sputter · on: fully lit and animated. */
type Stage = "off" | "flicker" | "on";

// The curtains start parting on the first scroll and settle into the wings, so
// the stage is already in view when the lights come on at POWER_AT.
const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Writes how far the curtains have parted to --open / --open-e (and flags
 * data-open once they're all the way) as the page scrolls through the hero's
 * track, without re-rendering. Calls `onPowerPoint` once they pass POWER_AT.
 * Returns a function that scrolls them fully open.
 */
function useCurtainScroll(
  ref: RefObject<HTMLElement | null>,
  onPowerPoint: () => void,
) {
  const onPowerPointRef = useRef(onPowerPoint);
  const endRef = useRef(0);

  useEffect(() => {
    onPowerPointRef.current = onPowerPoint;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let top = 0;
    let span = 1;
    let frame = 0;
    let passed = false;

    const measure = () => {
      top = el.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, el.offsetHeight - window.innerHeight);
      endRef.current = top + span;
    };
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      el.style.setProperty("--open", progress.toFixed(4));
      el.style.setProperty("--open-e", easeOutSine(progress).toFixed(4));
      el.toggleAttribute("data-open", progress >= 0.999);
      if (!passed && progress >= POWER_AT) {
        passed = true;
        onPowerPointRef.current();
      }
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
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref]);

  return useCallback(() => {
    if (window.scrollY >= endRef.current) return;
    window.scrollTo({
      top: endRef.current,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);
}

/** Flags the stage while it's out of view so its idle loops can pause. */
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
  const stageRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const timers = useRef<number[]>([]);
  // The power comes on once the art is ready and the curtains are partly open.
  const artReady = useRef(false);
  const curtainsParted = useRef(false);
  const started = useRef(false);
  const [stage, setStage] = useState<Stage>("off");

  usePauseOffscreen(stageRef);

  const later = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  /** Turns the lights on after `delay` ms: a sputter, or a plain fade for reduced motion. */
  const powerOn = useCallback(
    (delay: number) => {
      if (prefersReducedMotion()) {
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

  const startShow = useCallback(() => {
    if (started.current || !artReady.current || !curtainsParted.current) return;
    started.current = true;
    powerOn(TIMING.beat);
  }, [powerOn]);

  const openCurtains = useCurtainScroll(heroRef, () => {
    curtainsParted.current = true;
    startShow();
  });

  // Hold the lights off until the sign and the room can actually be seen.
  useEffect(() => {
    let cancelled = false;
    const ready = () => {
      if (cancelled) return;
      artReady.current = true;
      startShow();
    };

    const images = [signRef.current, backgroundRef.current].filter(
      (img): img is HTMLImageElement => img !== null,
    );
    void Promise.all(
      images.map((img) => img.decode().catch(() => undefined)),
    ).then(ready);
    later(TIMING.readyTimeout, ready);

    return () => {
      cancelled = true;
      started.current = false;
      clearTimers();
    };
  }, [later, clearTimers, startShow]);

  const flipPower = useCallback(() => {
    if (stage !== "on") return;
    setStage("off");
    powerOn(TIMING.darkHold);
  }, [stage, powerOn]);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-stage={stage}
      // The track the curtains open over: the stage stays pinned for CURTAIN_SPAN
      // screens of scrolling. group/hero: children style themselves off
      // data-stage, data-open and --open.
      className="group/hero relative h-[calc((1_+_var(--span))*100svh)] bg-[#520101] [@media(scripting:none)]:h-auto"
      style={cssVars({
        "--span": CURTAIN_SPAN,
        "--flicker": `${TIMING.flicker}ms`,
      })}
    >
      <div
        ref={stageRef}
        // Idle loops pause while off-screen.
        className="sticky top-0 isolate h-svh min-h-[320px] overflow-hidden [container-type:size] [&[data-offscreen]_*]:![animation-play-state:paused]"
        // Tabbing to anything behind the curtains (not in [data-front]) opens them.
        onFocus={(event) => {
          if (!event.target.closest("[data-front]")) openCurtains();
        }}
        style={cssVars({
          "--gutter": "clamp(12px, 3cqw, 24px)",
          // px per unit of background.png: the room always covers the screen, from the ceiling down.
          "--s": "max(100cqw / 1440, 100cqh / 1086)",
          // px per unit of the stage (the mockup frame): all of it always fits, and the sign clears the edges.
          "--g":
            "min(1.25px, 100cqh / 1086, (100cqw - 2 * var(--gutter)) / 934)",
          "--stage-y": "max(0px, (100cqh - 1086 * var(--g)) / 2)",
          "--table-y": "calc(var(--stage-y) + 566 * var(--g))",
          // px per unit of poker_table.png: the stage's scale, but always the screen's full width.
          "--t": "max(100cqw / 1440, var(--g))",
        })}
      >
        <Room backgroundRef={backgroundRef} />
        <div className={`${STAGE_BOX} pointer-events-none z-[2]`}>
          <EventDate />
        </div>
        <Ceiling />
        <SignGlow />
        <MarqueeSign
          signRef={signRef}
          powered={stage === "on"}
          onFlipPower={flipPower}
        />
        <div className={`${STAGE_BOX} pointer-events-none z-[8]`}>
          <ApplyButton />
        </div>
        {/* Clicking the curtains scrolls them open too. */}
        <Curtains onOpen={openCurtains} />
        <div data-front className="contents">
          <SiteNotice />
          {/* MLH member events must link the Code of Conduct. */}
          <a
            href="https://mlh.io/code-of-conduct"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[max(10px,1.5cqh)] right-[max(12px,1.5cqw)] z-[10] text-[length:clamp(11px,0.9cqw,14px)] tracking-[0.02em] text-[rgb(255_244_220/0.75)] underline underline-offset-[3px] hover:text-[#fff4dc] focus-visible:rounded focus-visible:text-[#fff4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3edbd3]"
          >
            MLH Code of Conduct
          </a>
        </div>
      </div>
    </section>
  );
}
