"use client";

import { useState } from "react";
import Image from "next/image";

const BEAR_FRAMES = [
  "/images/bear_frames/frame_1.png",
  "/images/bear_frames/frame_2.png",
  "/images/bear_frames/frame_3.png",
];

export default function BearImage({
  className = "size-[300px]",
  sizes = "300px",
}: {
  className?: string;
  sizes?: string;
}) {
  const [frameIndex, setFrameIndex] = useState(2);

  return (
    <button
      type="button"
      onClick={() =>
        setFrameIndex((i) => (i + 1) % BEAR_FRAMES.length)
      }
      aria-label="Change bear pose"
      className={`relative block cursor-pointer appearance-none border-0 bg-transparent p-0 ${className}`}
    >
      <Image
        src={BEAR_FRAMES[frameIndex]}
        alt=""
        fill
        priority
        sizes={sizes}
        className="pointer-events-none object-contain"
      />
    </button>
  );
}
