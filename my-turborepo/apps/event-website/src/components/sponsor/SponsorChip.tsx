import Image from "next/image";

const OUTER_DASH = (2 * Math.PI * 116) / 16;
const INNER_SEGMENT = (2 * Math.PI * 86) / 8;

/** A flat poker chip: a sponsor-colored striped rim around the original logo artwork. */
export function SponsorChip({
  src,
  color,
  color2,
  dragging,
}: {
  src: string;
  color: string;
  /** Optional second rim color for multi-color logos; alternates with `color`. */
  color2?: string;
  dragging: boolean;
}) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 select-none transition-transform duration-200 ease-out motion-reduce:transition-none ${dragging ? "" : "group-hover/sc:scale-[1.07] group-focus-visible/sc:scale-[1.07]"}`}
    >
      <svg
        viewBox="0 0 270 270"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="135" cy="135" r="134" fill={color} />
        {color2 && (
          <circle
            cx="135"
            cy="135"
            r="116"
            fill="none"
            stroke={color2}
            strokeWidth="36"
            strokeDasharray={`${OUTER_DASH} ${OUTER_DASH * 3}`}
            strokeDashoffset={OUTER_DASH * 3.5}
          />
        )}
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
        <circle
          cx="135"
          cy="135"
          r="86"
          fill="none"
          stroke="#f1eee7"
          strokeWidth="4.5"
          strokeDasharray={`${INNER_SEGMENT * 0.68} ${INNER_SEGMENT * 0.32}`}
        />
        <circle cx="135" cy="135" r="75" fill="#fff" />
      </svg>
      {/* Crop only the existing chip rim; preserve the complete company logo. */}
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        sizes="180px"
        className="object-contain [-webkit-user-drag:none] [user-drag:none]"
        style={{ clipPath: "circle(27% at 50% 50%)" }}
      />
    </span>
  );
}
