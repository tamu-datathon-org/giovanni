"use client";

import Image from "next/image";
import { useState } from "react";
import { PrizeReel } from "./PrizeReel";
import { prizes, type Challenge } from "./prizedata";

//
const LEVER_HOTSPOT = {
  left: "88%",
  top: "35%",
  width: "12%",
  height: "30%",
};

const PRIZE_TITLE = ["P", "R", "I", "Z", "E", "S"];
const CHALLENGE_BUTTONS = [
  { left: "20.5%", top: "84.1%" },
  { left: "37.6%", top: "84.1%" },
  { left: "55.4%", top: "84.1%" },
  { left: "74.1%", top: "84.1%" },
  { left: "20.5%", top: "93.6%" },
  { left: "37.6%", top: "93.6%" },
  { left: "55.4%", top: "93.6%" },
  { left: "74.1%", top: "93.6%" },
];

const SPIN_CYCLES = 2;
const DISPLAY_PRIZE_ORDER = [1, 0, 2] as const;

export default function Prizes() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );
  const [rollKey, setRollKey] = useState(0);

  const selectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setRollKey((key) => key + 1);
  };
  //Random challenge math
  const selectRandomChallenge = () => {
    const challenge = prizes[Math.floor(Math.random() * prizes.length)];
    if (challenge) selectChallenge(challenge);
  };

  const selectedIndex = selectedChallenge
    ? prizes.findIndex((challenge) => challenge.number === selectedChallenge.number)
    : -1;
  const stopIndex = SPIN_CYCLES * prizes.length;
  const reelOrder =
    selectedIndex < 0
      ? prizes
      : [...prizes.slice(selectedIndex), ...prizes.slice(0, selectedIndex)];

  return (
    <section
      id="prizes"
      aria-label="Prizes"
      className="relative isolate flex min-h-svh items-center justify-center"
    >
      <Image
        src="/event_assets/background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10 aspect-[433/576] w-[min(75vw,52svh)]">
        <Image
          src="/event_assets/slot_machine_prizes.png"
          alt="Slot machine"
          fill
          priority
          sizes="(max-width: 768px) 75vw, 52svh"
          className="object-contain"
        />
        <svg
          aria-label="Prizes"
          className="pointer-events-none absolute left-[19.5%] top-[8.2%] z-10 h-[14.5%] w-[55%] overflow-visible"
          role="img"
          viewBox="0 0 320 70"
        >
          <defs>
            {/*Prize title gradient */}
            {PRIZE_TITLE.map((_, index) => (
              <linearGradient
                key={index}
                id={`prize-letter-gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FFB24C" />
                <stop offset="100%" stopColor="#FF9000" />
              </linearGradient>
            ))}


            <filter
              height="200%"

              id="prize-title-shadow"
              width="200%"
              x="-50%"
              y="-50%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                floodColor="#750204"
                stdDeviation="1"
                result="drop-shadow"
              />
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="3"
                result="inner-blur"
              />
              <feOffset
                in="inner-blur"
                dx="0"
                dy="3"
                result="inner-offset"
              />
              <feComposite
                in="SourceAlpha"
                in2="inner-offset"
                operator="arithmetic"
                k2="1"
                k3="-1"
                result="inner-shadow-alpha"
              />
              <feFlood floodColor="#750204" result="inner-shadow-color" />
              <feComposite
                in="inner-shadow-color"
                in2="inner-shadow-alpha"
                operator="in"
                result="inner-shadow"
              />
              <feMerge>
                <feMergeNode in="drop-shadow" />
                <feMergeNode in="inner-shadow" />
              </feMerge>
            </filter>
          </defs>
          <text
            x="160"
            y="51"
            textAnchor="middle"
            fontFamily="var(--font-righteous)"
            fontSize="42"
            
            letterSpacing="0"
            fill="transparent"
            stroke="#750204"
            strokeWidth="2"
            paintOrder="stroke"
            filter="url(#prize-title-shadow)"
          >
            {PRIZE_TITLE.map((letter, index) => (
              <tspan
                key={index}
                fill={`url(#prize-letter-gradient-${index})`}
              >
                {letter}
              </tspan>
            ))}
          </text>
        </svg>
        <button
          type="button"
          aria-label="Pull the slot machine lever"
          className="absolute cursor-pointer rounded-full border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#3edbd3]"
          style={LEVER_HOTSPOT}
          onClick={selectRandomChallenge}
        />
        {prizes.map((challenge, index) => (
          <button
            key={challenge.number}
            type="button"
            aria-label={`Show ${challenge.challengeName} prizes`}
            className="absolute z-20 aspect-[49/44] w-[11.5%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-transparent bg-transparent transition-colors hover:border-[#fff4dc]/80 hover:bg-[#fff4dc]/20 focus-visible:border-[#3edbd3] focus-visible:outline-none active:bg-[#ffb24c]/40"
            style={CHALLENGE_BUTTONS[index]}
            onClick={() => selectChallenge(challenge)}
          />
        ))}
        <div className="absolute left-[10%] top-[20.5%] z-10 h-[8.5%] w-[74%] overflow-hidden">
          <div
            aria-live="polite"
            className="font-sekuya absolute inset-x-[3%] top-[20%] bottom-[20%] flex items-center justify-center overflow-hidden px-[2%] text-center text-[clamp(8px,3cqw,18px)] uppercase leading-none text-[#D50000] [clip-path:inset(0)] [contain:paint]"
          >
            {selectedChallenge ? (
              <PrizeReel
                key={`challenge-${rollKey}`}
                entries={Array.from({ length: SPIN_CYCLES + 1 }).flatMap(
                  (_, cycle) =>
                      reelOrder.map((challenge) => ({
                      id: `${cycle}-${challenge.number}`,
                      label: challenge.challengeName,
                      imageSrc: "",
                    })),
                )}
                targetIndex={stopIndex}
                rollKey={rollKey}
                labelClassName="font-sekuya uppercase text-[#D50000]"
                centerLabels
              />
            ) : (
              "Select a challenge"
            )}
          </div>
        </div>
        <ul
          key={`prizes-${rollKey}`}
          aria-label={
            selectedChallenge
              ? `${selectedChallenge.challengeName} prizes`
              : "Challenge prizes"
          }
          aria-live="polite"
          className="absolute left-[15.5%] top-[34%] z-10 grid h-[30%] w-[61.5%] grid-cols-3 text-center text-[#4c321b]"
        >
          {DISPLAY_PRIZE_ORDER.map((prizeIndex) => (
            <li
              key={prizeIndex}
              className="relative min-w-0 overflow-hidden"
            >
              <span className="font-sekuya absolute inset-x-0 top-[5%] z-20 text-center text-[clamp(7px,2.4cqw,13px)] leading-none text-[#D50000] [text-shadow:0_2px_2px_rgb(0_0_0/0.45)]">
                {["1ST", "2ND", "3RD"][prizeIndex]} 
              </span>
              {selectedChallenge ? (
                <div className="absolute inset-x-0 top-[20%] h-[75%] overflow-hidden">
                  <PrizeReel
                    entries={Array.from({ length: SPIN_CYCLES + 1 }).flatMap(
                      (_, cycle) =>
                        reelOrder.map((challenge) => {
                          const prize = challenge.prizes[prizeIndex];
                          return {
                            id: `${cycle}-${challenge.number}-${prizeIndex}`,
                            label:
                              prize?.name || `Prize ${prizeIndex + 1}`,
                            imageSrc: prize?.imageSrc ?? "",
                            split: prize?.split,
                          };
                        }),
                    )}
                    targetIndex={stopIndex}
                    rollKey={rollKey}
                    labelClassName="font-righteous text-[#760000]"
                  />
                </div>
              ) : (
                <span className="font-righteous absolute inset-x-0 bottom-[3%] text-[clamp(7px,2.5cqw,14px)] leading-tight text-[#760000]">
                  Prize {prizeIndex + 1}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
