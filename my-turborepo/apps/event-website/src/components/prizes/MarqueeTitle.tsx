import { useId } from "react";

/**
 * Orange-gradient lettering with a dark red outline, drop shadow and inner
 * shadow, as on the slot machine's dome and the craps board's banner. It's an
 * svg that scales to fill its box; `align` pins the words to its middle or
 * left edge.
 */
export function MarqueeTitle({
  text,
  align = "middle",
  className,
}: {
  text: string;
  align?: "middle" | "start";
  className?: string;
}) {
  // Unique per title, with useId's punctuation stripped for url(#…).
  const id = `marquee${useId().replace(/[^\w-]/g, "")}`;
  // Roughly the width of the words at this font size, plus room for the shadow.
  const width = Math.round(text.length * 30 + 24);

  return (
    <svg
      aria-hidden="true"
      className={`overflow-visible ${className ?? ""}`}
      viewBox={`0 0 ${width} 70`}
      preserveAspectRatio={align === "start" ? "xMinYMid meet" : "xMidYMid meet"}
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB24C" />
          <stop offset="100%" stopColor="#FF9000" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" floodColor="#750204" stdDeviation="1" result="drop-shadow" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="inner-blur" />
          <feOffset in="inner-blur" dx="0" dy="3" result="inner-offset" />
          <feComposite
            in="SourceAlpha"
            in2="inner-offset"
            operator="arithmetic"
            k2="1"
            k3="-1"
            result="inner-shadow-alpha"
          />
          <feFlood floodColor="#750204" result="inner-shadow-color" />
          <feComposite in="inner-shadow-color" in2="inner-shadow-alpha" operator="in" result="inner-shadow" />
          <feMerge>
            <feMergeNode in="drop-shadow" />
            <feMergeNode in="inner-shadow" />
          </feMerge>
        </filter>
      </defs>
      <text
        x={align === "start" ? 6 : width / 2}
        y="51"
        textAnchor={align}
        fontFamily="var(--font-righteous)"
        fontSize="42"
        fill={`url(#${id}-fill)`}
        stroke="#750204"
        strokeWidth="2"
        paintOrder="stroke"
        filter={`url(#${id}-shadow)`}
      >
        {text}
      </text>
    </svg>
  );
}
