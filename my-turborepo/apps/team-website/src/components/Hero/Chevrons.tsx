"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Chevrons({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chevrons = root.querySelectorAll<SVGPathElement>("[data-chevron]");
    if (!chevrons.length) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      gsap.set(chevrons, { x: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      chevrons,
      { x: (i: number) => -24 - i * 12, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay: 1.2,
        ease: "back.out(1.6)",
        stagger: 0.12,
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 120 60"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        data-chevron
        d="M0 15L25 30L0 45"
        stroke="#F97316"
        strokeWidth="8"
      />
      <path
        data-chevron
        d="M35 15L60 30L35 45"
        stroke="#F97316"
        strokeWidth="8"
      />
      <path
        data-chevron
        d="M70 15L95 30L70 45"
        stroke="#F97316"
        strokeWidth="8"
      />
    </svg>
  );
}
