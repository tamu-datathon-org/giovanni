"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

const GOLD = "#ffb24c";
const DIAMOND_XS = [
  102.964, 308.891, 513.68, 719.607, 925.358, 1131.29, 1337.04,
];
const STAR_XS = [102.5, 308.5, 513.5, 719.5, 925.5, 1130.5, 1336.5];
const MIDDLE = Math.floor(STAR_XS.length / 2);
const RIPPLE_S = 0.06;

// A four-point star centered on x
const star = (x: number) =>
  `M${x} 93L${x + 6.347} 110.518L${x + 23.5} 117L${x + 6.347} 123.482` +
  `L${x} 141L${x - 6.347} 123.482L${x - 23.5} 117L${x - 6.347} 110.518Z`;

/** PoolStory looks up the "ball" rail by this id. */
export const BORDER_ID = "event-info-border";

/**
 * The gold-banded rail of diamonds and stars between sections. Its stars shine
 * one of two ways:
 * - "ball": PoolStory finds the rail by BORDER_ID and flashes its stars
 *   ([data-border-star]) as the eight ball passes behind it.
 * - "view": the stars ripple out from the middle each time the rail scrolls
 *   into view.
 */
export function Rail({
  shine,
  overlay = false,
}: {
  shine: "ball" | "view";
  /**
   * Hang over the top of the next section (which leaves room for it) so its
   * background shows through the rail's gaps, instead of taking up space with
   * background.png behind it.
   */
  overlay?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  // Unique per rail, with useId's punctuation stripped for url(#…).
  const id = `rail${useId().replace(/[^\w-]/g, "")}`;
  const onView = shine === "view";

  useEffect(() => {
    const svg = svgRef.current;
    if (!onView || !svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <div
      id={onView ? undefined : BORDER_ID}
      aria-hidden="true"
      className={
        overlay
          ? "pointer-events-none relative z-[2] h-0"
          : "relative z-10 overflow-hidden"
      }
    >
      {!overlay && (
        <Image
          src="/event_assets/background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 1440 234"
        className={`${overlay ? "absolute inset-x-0 top-0" : "relative"} block h-auto w-full`}
        fill="none"
        data-shine={inView ? "" : undefined}
      >
        <defs>
          <filter
            id={`${id}-star-glow`}
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
          {!onView && (
            <filter
              id={`${id}-flash-glow`}
              x="-50%"
              y="-200%"
              width="200%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="14" />
            </filter>
          )}
        </defs>
        <rect y="48" width="1440" height="138" fill="#17330d" />
        {DIAMOND_XS.map((x) => (
          <rect
            key={x}
            width="123.868"
            height="123.868"
            transform={`matrix(0.831236 0.55592 -0.831236 0.55592 ${x} 48)`}
            fill="#280000"
          />
        ))}
        {STAR_XS.map((x, i) => (
          <g
            key={x}
            data-border-star
            style={
              onView
                ? ({
                    "--delay": `${Math.abs(i - MIDDLE) * RIPPLE_S}s`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {/* Blurred copies behind the star, faded in for the glow. */}
            <g
              data-border-star-glow
              opacity="0"
              filter={`url(#${id}-star-glow)`}
              className={
                onView
                  ? "[[data-shine]_&]:animate-star-glow motion-reduce:!animate-none"
                  : undefined
              }
            >
              <path d={star(x)} fill={GOLD} />
              <path d={star(x)} fill={GOLD} />
            </g>
            <path
              d={star(x)}
              fill={GOLD}
              className={
                onView
                  ? "[transform-box:fill-box] origin-center [[data-shine]_&]:animate-star-pulse motion-reduce:!animate-none"
                  : undefined
              }
            />
          </g>
        ))}
        <rect width="1440" height="20" fill={GOLD} />
        <rect y="214" width="1440" height="20" fill={GOLD} />
        {!onView && (
          <ellipse
            data-border-flash
            cx="720"
            cy="14"
            rx="180"
            ry="34"
            fill="#ffe0ac"
            opacity="0"
            filter={`url(#${id}-flash-glow)`}
          />
        )}
      </svg>
    </div>
  );
}
