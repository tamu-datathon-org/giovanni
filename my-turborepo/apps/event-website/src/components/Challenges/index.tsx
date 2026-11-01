"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChallengeResult from "./ChallengeResult";
import ChallengeWheel from "./ChallengeWheel";
import ChallengesHeading, { challengesPageTop } from "./ChallengesHeading";
import { challenges, wheelOptions } from "./challengeData";
import { segmentAngle } from "./wheelGeometry";

const spinDuration = 9000;
const ballDuration = 7500;
const returnDuration = 1000;

export default function Challenges() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "returning" | "spinning">("idle");
  const [ballInside, setBallInside] = useState(false);
  const [ballRotation, setBallRotation] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * challenges.length);
    const initialAngle = (initialIndex + 0.5) * segmentAngle;
    // Ball rotation is relative to the wheel, so this parks it at the top of the rim.
    setBallRotation(initialAngle);
    setWheelRotation(-initialAngle);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const startSpin = (index: number) => {
    const wheelTurn = 360 + Math.random() * 360;
    setPhase("spinning");
    setBallInside(true);
    setWheelRotation((rotation) => rotation + wheelTurn);
    // Against the wheel's spin, like a real roulette throw.
    setBallRotation((rotation) => {
      const targetAngle = (index + 0.5) * segmentAngle;
      const currentAngle = ((rotation % 360) + 360) % 360;
      const angleToTarget = (currentAngle - targetAngle + 360) % 360;
      return rotation - 2 * 360 - angleToTarget;
    });

    timeoutRef.current = setTimeout(() => {
      setSelectedIndex(index);
      setPhase("idle");
      timeoutRef.current = null;
    }, spinDuration);
  };

  const rollTo = (index: number) => {
    if (phase !== "idle") return;

    if (!ballInside) {
      startSpin(index);
      return;
    }

    // Glide back to the top of the rim first, by the shortest way around.
    setPhase("returning");
    setBallInside(false);
    setBallRotation((rotation) => {
      const offset = (((-wheelRotation - rotation) % 360) + 360) % 360;
      return rotation + (offset > 180 ? offset - 360 : offset);
    });
    timeoutRef.current = setTimeout(() => startSpin(index), returnDuration);
  };

  const spinRandomly = () => {
    const availableIndices = wheelOptions
      .map((_, index) => index)
      .filter((index) => index !== selectedIndex);
    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)] ?? 0;
    rollTo(randomIndex);
  };

  const spinning = phase !== "idle";
  const selectedChallenge =
    selectedIndex === null ? null : (wheelOptions[selectedIndex] ?? null);

  return (
    <section
      aria-labelledby="challenges-title"
      className={`relative isolate flex min-h-svh flex-col items-center gap-8 overflow-hidden bg-[#420807] px-5 pb-12 text-white sm:px-8 ${challengesPageTop}`}
    >
      <Image
        src="/event_assets/background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <ChallengesHeading id="challenges-title" />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-center gap-5">
        

          <ChallengeWheel
            ballDuration={
              phase === "spinning"
                ? ballDuration
                : phase === "returning"
                  ? returnDuration
                  : 0
            }
            ballInside={ballInside}
            ballRotation={ballRotation}
            onSpin={spinRandomly}
            selectedIndex={spinning ? null : selectedIndex}
            spinning={spinning}
            spinDuration={phase === "spinning" ? spinDuration : 0}
            wheelRotation={wheelRotation}
          />

          <p className="max-w-md text-center text-sm text-[#fff2d6]/80 sm:text-base">
            {spinning
              ? "The ball is rolling..."
              : "Press the center to spin."}
          </p>
        </div>

        <ChallengeResult challenge={selectedChallenge} />
      </div>
    </section>
  );
}
