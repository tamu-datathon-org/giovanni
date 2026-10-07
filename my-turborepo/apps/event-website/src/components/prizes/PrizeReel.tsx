import Image from "next/image";
import type { CSSProperties } from "react";

export type ReelEntry = {
  id: string;
  label: string;
  imageSrc: string;
  split?: boolean;
};

type PrizeReelProps = {
  entries: ReelEntry[];
  targetIndex: number;
  rollKey: number;
  labelClassName: string;
  centerLabels?: boolean;
};

// Entries are stacked vertically and translated upward
export function PrizeReel({
  entries,
  targetIndex,
  rollKey,
  labelClassName,
  centerLabels = false,
}: PrizeReelProps) {
  const itemCount = entries.length;
  const targetOffset = (-targetIndex * 100) / itemCount;
  const trackStyle = {
    height: `${itemCount * 100}%`,
    "--roll-to": `${targetOffset}%`,
    "--roll-cruise": `${targetOffset * 0.88}%`,
  } as CSSProperties;

  return (
    <div
      key={rollKey}
      className="prize-reel-track absolute inset-x-0 top-0 flex flex-col"
      style={trackStyle}
    >
      {entries.map((entry, index) => (
        <div
          key={`${entry.id}-${index}`}
          className={`relative flex shrink-0 flex-col items-center overflow-hidden px-[3%] ${centerLabels ? "justify-center" : "justify-end pb-[3%]"}`}
          style={{ height: `${100 / itemCount}%` }}
        >
          {/* Prize art */}
          {entry.imageSrc && (
            <Image
              src={entry.imageSrc}
              alt={entry.label}
              width={64}
              height={64}
              className="absolute inset-x-[10%] top-[8%] h-[68%] w-[80%] object-contain"
            />
          )}
          <span
            className={`z-10 min-w-0 w-full whitespace-normal break-words text-center text-[clamp(7px,2.5cqw,14px)] leading-tight [overflow-wrap:anywhere] ${labelClassName}`}
          >
            {entry.split
              ? entry.label.split(/\s+/).map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`} className="block">
                    {word}
                  </span>
                ))
              : entry.label}
          </span>
        </div>
      ))}
    </div>
  );
}
