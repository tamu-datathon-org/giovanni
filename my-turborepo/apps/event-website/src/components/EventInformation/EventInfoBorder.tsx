import type { Ref } from "react";
import Image from "next/image";

const DIAMOND_XS = [
  102.964, 308.891, 513.68, 719.607, 925.358, 1131.29, 1337.04,
];
const STAR_XS = [102.5, 308.5, 513.5, 719.5, 925.5, 1130.5, 1336.5];

// A four-point star centered on x
const star = (x: number) =>
  `M${x} 93L${x + 6.347} 110.518L${x + 23.5} 117L${x + 6.347} 123.482` +
  `L${x} 141L${x - 6.347} 123.482L${x - 23.5} 117L${x - 6.347} 110.518Z`;

/**
 * The rail between Event Information and Prizes. The eight ball rolls behind
 * it, and PoolStory flashes its stars ([data-border-star]) as the ball passes.
 */
export function EventInfoBorder({
  borderRef,
}: {
  borderRef: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={borderRef}
      className="relative z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/event_assets/background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <svg
        viewBox="0 0 1440 234"
        className="relative block h-auto w-full"
        fill="none"
      >
        <defs>
          <filter
            id="event-info-border-glow"
            x="-50%"
            y="-200%"
            width="200%"
            height="500%"
          >
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter
            id="event-info-star-glow"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
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
        {STAR_XS.map((x) => (
          <g key={x} data-border-star>
            {/* Blurred copies behind the star, faded in for the glow. */}
            <g
              data-border-star-glow
              opacity="0"
              filter="url(#event-info-star-glow)"
            >
              <path d={star(x)} fill="#ffb24c" />
              <path d={star(x)} fill="#ffb24c" />
            </g>
            <path d={star(x)} fill="#ffb24c" />
          </g>
        ))}
        <rect width="1440" height="20" fill="#ffb24c" />
        <rect y="214" width="1440" height="20" fill="#ffb24c" />
        <ellipse
          data-border-flash
          cx="720"
          cy="14"
          rx="180"
          ry="34"
          fill="#ffe0ac"
          opacity="0"
          filter="url(#event-info-border-glow)"
        />
      </svg>
    </div>
  );
}
