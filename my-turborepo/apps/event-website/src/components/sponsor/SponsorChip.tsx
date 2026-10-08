import { useId } from "react";
import Image from "next/image";

const OUTER_DASH = (2 * Math.PI * 116) / 16;

function Rim({ color }: { color: string }) {
  return (
    <g>
      <circle cx="135" cy="135" r="134" fill={color} />
      <circle
        cx="135"
        cy="135"
        r="116"
        fill="none"
        stroke="#f1eee7"
        strokeWidth="36"
        strokeDasharray={`${OUTER_DASH} ${OUTER_DASH}`}
        strokeDashoffset={OUTER_DASH / 2}
      />
    </g>
  );
}

/** A beveled poker chip with a striped sidewall and the original logo artwork. */
export function SponsorChip({
  src,
  color,
  dragging,
}: {
  src: string;
  color: string;
  dragging: boolean;
}) {
  const id = useId();
  const face = `${id}-face`;
  const bevel = `${id}-bevel`;
  const inset = `${id}-inset`;

  return (
    <span
      className={`pointer-events-none absolute inset-0 select-none transition-transform duration-200 ease-out motion-reduce:transition-none ${dragging ? "" : "group-hover/sc:-translate-y-[2%] group-hover/sc:scale-[1.04] group-focus-visible/sc:-translate-y-[2%] group-focus-visible/sc:scale-[1.04]"}`}
    >
      <svg
        viewBox="0 0 270 270"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={face} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.02" />
            <stop offset="1" stopColor="#000" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={bevel} x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="#fff" stopOpacity="0.75" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={inset} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#000" stopOpacity="0.14" />
            <stop offset="0.25" stopColor="#000" stopOpacity="0" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <Rim color={color} />
        <circle cx="135" cy="135" r="134" fill={`url(#${face})`} />
        <circle
          cx="135"
          cy="135"
          r="132.5"
          fill="none"
          stroke={`url(#${bevel})`}
          strokeWidth="3"
        />
        <circle
          cx="135"
          cy="135"
          r="97"
          fill="none"
          stroke="#000"
          strokeOpacity="0.18"
          strokeWidth="4"
        />
        <circle cx="135" cy="135" r="96" fill={`url(#${bevel})`} />
        <circle cx="135" cy="135" r="94" fill="#fff" />
      </svg>
      {/* Crop only the existing chip rim; preserve the complete company logo. */}
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        sizes="180px"
        className="object-contain [-webkit-user-drag:none] [user-drag:none]"
        style={{ clipPath: "circle(27% at 50% 50%)", transform: "scale(1.25)" }}
      />
      <svg
        viewBox="0 0 270 270"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="135" cy="135" r="94" fill={`url(#${inset})`} />
        <circle
          cx="135"
          cy="135"
          r="94"
          fill="none"
          stroke="#000"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}
