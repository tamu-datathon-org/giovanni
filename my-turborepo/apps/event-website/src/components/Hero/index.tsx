"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ApplyButton } from "./ApplyButton";
import { EventDate } from "./EventDate";
import styles from "./hero.module.css";
import { MarqueeSign, SignGlow } from "./MarqueeSign";
import { ASSETS, cssVars, DRIVE_SPAN, TIMING } from "./scene";
import { SkyLayer } from "./SkyLayer";
import { Street } from "./Street";

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

/** Flags the hero while it's out of view so the CSS can pause its idle loops. */
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
    <section
      ref={heroRef}
      id="hero"
      className={styles.hero}
      data-stage={stage}
      style={cssVars({ "--flicker": `${TIMING.flicker}ms` })}
    >
      <div className={styles.scene}>
        <Image
          ref={backgroundRef}
          src={ASSETS.background}
          alt=""
          fill
          preload
          sizes="(max-aspect-ratio: 1/1) 110vh, 100vw"
        />
        <SkyLayer />
      </div>

      <SignGlow />
      <MarqueeSign
        signRef={signRef}
        powered={stage === "on"}
        onFlipPower={flipPower}
      />
      <Street />
      {/* Same box as the sign, but above the road and the car. */}
      <div className={`${styles.signBox} ${styles.signFront}`}>
        <EventDate />
        <ApplyButton />
      </div>
      <a
        href="https://mlh.io/code-of-conduct"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.conduct}
      >
        MLH Code of Conduct
      </a>
    </section>
  );
}
