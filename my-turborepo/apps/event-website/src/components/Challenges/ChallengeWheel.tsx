import Image from "next/image";
import {
  getLabelArc,
  getSegmentPath,
  wheelLabelFont,
  wheelLabels,
} from "./wheelGeometry";

interface ChallengeWheelProps {
  ballDuration: number;
  ballInside: boolean;
  ballRotation: number;
  onSpin: () => void;
  selectedIndex: number | null;
  spinning: boolean;
  spinDuration: number;
  wheelRotation: number;
}

const spinEasing = "cubic-bezier(0.35, 0, 0.15, 1)";
const ballCurveEasing = "cubic-bezier(0.5, 0, 0.4, 1)";

// Ball distance from the wheel center, in ball widths: outer rim vs just outside the hub.
const ballRimOffset = "-893%";
const ballHubOffset = "-415%";

export default function ChallengeWheel({
  ballDuration,
  ballInside,
  ballRotation,
  onSpin,
  selectedIndex,
  spinning,
  spinDuration,
  wheelRotation,
}: ChallengeWheelProps) {
  return (
    <div className="relative aspect-[660/682] w-[min(82vw,68svh,42rem)]">
      {/* The art is slightly oval, so rotate in circular space to keep its outline still. */}
      <div
        className="absolute inset-0 motion-reduce:!transition-none"
        style={{
          transform: `scaleY(${682 / 660}) rotate(${wheelRotation}deg) scaleY(${660 / 682})`,
          transitionDuration: `${spinDuration}ms`,
          transitionProperty: "transform",
          transitionTimingFunction: spinEasing,
        }}
      >
        <Image
          src="/event_assets/Challenge%20wheel%20colors.png"
          alt="A red and black eight-section challenge wheel"
          fill
          priority
          sizes="(max-width: 1024px) 82vw, 42rem"
          className="object-contain"
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
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
            {wheelLabels.map((lines, index) =>
              lines.map(({ radius }, row) => (
                <path
                  key={`${index}-${row}`}
                  id={`challenge-wheel-label-${index}-${row}`}
                  d={getLabelArc(index, radius)}
                />
              )),
            )}
          </defs>

          {selectedIndex !== null && (
            <path
              d={getSegmentPath(selectedIndex)}
              fill="#80D51A"
              mask="url(#challenge-wheel-colored-sections)"
              pointerEvents="none"
            />
          )}

          {/* Each slice's challenge name, curved along its outer band. */}
          <g
            className="font-righteous"
            fill="#fff"
            fontSize={wheelLabelFont}
            textAnchor="middle"
          >
            {wheelLabels.map((lines, index) =>
              lines.map(({ text }, row) => (
                <text key={`${index}-${row}`}>
                  <textPath
                    href={`#challenge-wheel-label-${index}-${row}`}
                    startOffset="50%"
                  >
                    {text}
                  </textPath>
                </text>
              )),
            )}
          </g>
        </svg>

        {/* The ball lives in the wheel's frame, so once it lands it rides the wheel to a stop. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-reduce:!transition-none"
          style={{
            transform: `rotate(${ballRotation}deg)`,
            transitionDuration: `${ballDuration}ms`,
            transitionProperty: "transform",
            transitionTimingFunction: spinEasing,
          }}
        >
          <Image
            src="/event_assets/ball.png"
            alt=""
            width={48}
            height={48}
            className="absolute left-1/2 top-1/2 aspect-square h-auto w-[5.6%] object-contain drop-shadow-lg motion-reduce:!transition-none"
            style={{
              transform: `translate(-50%, ${ballInside ? ballHubOffset : ballRimOffset})`,
              transitionDuration: `${ballDuration}ms`,
              transitionProperty: "transform",
              transitionTimingFunction: ballCurveEasing,
            }}
          />
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 660 682"
      >
        <image
          href="/event_assets/Spin%20button%20Challenge%20Wheel.png"
          x="143"
          y="147.5"
          width="375"
          height="388"
        />
      </svg>

      <button
        type="button"
        disabled={spinning}
        onClick={onSpin}
        aria-label="Spin the wheel for a random challenge"
        aria-busy={spinning}
        className="absolute left-[33.8%] top-[33.8%] h-[32.4%] w-[32.4%] rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#80D51A]"
      />
    </div>
  );
}
