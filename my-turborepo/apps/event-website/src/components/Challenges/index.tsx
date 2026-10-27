"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChallengeResult from "./ChallengeResult";
import ChallengeWheel from "./ChallengeWheel";
import { challenges, wheelOptions } from "./challengeData";
import { segmentAngle } from "./wheelGeometry";

const spinDuration = 2800;

export default function Challenges() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [ballRotation, setBallRotation] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * challenges.length);
    setSelectedIndex(initialIndex);
    setBallRotation((initialIndex + 0.5) * segmentAngle);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const rollTo = (index: number) => {
    if (spinning) return;

    const fullTurns = Math.floor(Math.random() * 2) + 1;
    setSpinning(true);
    setBallRotation((rotation) => {
      const targetAngle = (index + 0.5) * segmentAngle;
      const currentAngle = ((rotation % 360) + 360) % 360;
      const angleToTarget = (targetAngle - currentAngle + 360) % 360;
      return rotation + fullTurns * 360 + angleToTarget;
    });

    timeoutRef.current = setTimeout(() => {
      setSelectedIndex(index);
      setSpinning(false);
      timeoutRef.current = null;
    }, spinDuration);
  };

  const spinRandomly = () => {
    const randomIndex = Math.floor(Math.random() * wheelOptions.length);
    rollTo(randomIndex);
  };

  const selectedChallenge =
    selectedIndex === null ? null : wheelOptions[selectedIndex];

  return (
    <section
      aria-labelledby="challenges-title"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#420807] px-5 py-12 text-white sm:px-8"
    >
      <Image
        src="/event_assets/background2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <h1
        id="challenges-title"
        className="absolute left-1/2 top-5 z-20 -translate-x-1/2 whitespace-nowrap text-center font-righteous text-4xl text-[#fff8e8] drop-shadow sm:text-5xl"
      >
        CHALLENGES
      </h1>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-center gap-5">
        

          <ChallengeWheel
            ballRotation={ballRotation}
            onSelect={rollTo}
            onSpin={spinRandomly}
            selectedIndex={spinning ? null : selectedIndex}
            spinning={spinning}
            spinDuration={spinning ? spinDuration : 0}
          />

          <p className="max-w-md text-center text-sm text-[#fff2d6]/80 sm:text-base">
            {spinning
              ? "The ball is rolling..."
              : "Click the center to spin, or choose a triangle."}
          </p>
        </div>

        {selectedChallenge && (
          <ChallengeResult challenge={selectedChallenge} />
        )}
      </div>
    </section>
  );
}
