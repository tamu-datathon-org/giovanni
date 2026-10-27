import Image from "next/image";
import { wheelOptions } from "./challengeData";
import { getSegmentPath } from "./wheelGeometry";

interface ChallengeWheelProps {
  ballRotation: number;
  onSelect: (index: number) => void;
  onSpin: () => void;
  selectedIndex: number | null;
  spinning: boolean;
  spinDuration: number;
}

export default function ChallengeWheel({
  ballRotation,
  onSelect,
  onSpin,
  selectedIndex,
  spinning,
  spinDuration,
}: ChallengeWheelProps) {
  return (
    <div className="relative aspect-[660/682] w-[min(82vw,68svh,42rem)]">
      <Image
        src="/event_assets/spin%20wheel%20MAIN.png"
  alt="A red and black eight-section challenge wheel"
        fill
        priority
        sizes="(max-width: 1024px) 82vw, 42rem"
        className="object-contain"
      />

      <svg
        aria-label="Choose a challenge by selecting a wheel triangle"
        className="absolute inset-0 h-full w-full"
        role="group"
        viewBox="0 0 660 682"
      >
        <defs>
          <mask
            id="challenge-wheel-colored-sections"
            maskContentUnits="userSpaceOnUse"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="660"
            height="682"
          >
            <image
              href="/event_assets/challenge-wheel-highlight-mask.png"
              width="660"
              height="682"
            />
          </mask>
        </defs>

        {wheelOptions.map((option, index) => (
          //wheel segments rendering
          <path
            key={option.name}
            d={getSegmentPath(index)}
            role="button"
            tabIndex={spinning ? -1 : 0}
              aria-label={`Select ${option.name}`}
            aria-pressed={selectedIndex === index}
    //
            className="cursor-pointer transition-[fill,stroke] duration-200 focus-visible:outline-none"
            fill="transparent"
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(index);
              }
            }}
          >

            <title>{option.name}</title>
          </path>
        ))}
        {selectedIndex !== null && (
          <path
            d={getSegmentPath(selectedIndex)}
            fill="#80D51A"
            mask="url(#challenge-wheel-colored-sections)"
            pointerEvents="none"
          />
        )}
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[13.5%] inset-x-[12.3%] ease-out motion-reduce:!transition-none"
        style={{


          transform: `rotate(${ballRotation}deg)`,
          transitionDuration: `${spinDuration}ms`,
          transitionProperty: "transform",
        }}
      >
        <Image
          src="/event_assets/ball.png"
          alt=""
          width={48}
          height={48}
          className="absolute left-1/2 top-0 h-[7.5%] w-[7.5%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg"
        />
      </div>



      <button
        type="button"
        disabled={spinning}
        onClick={onSpin}
        aria-label="Spin the wheel for a random challenge"
        className="absolute left-[33.8%] top-[33.8%] h-[32.4%] w-[32.4%] rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#80D51A] disabled:cursor-wait"
      />
    </div>
  );
}
