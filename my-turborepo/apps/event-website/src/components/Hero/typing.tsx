import React, { useEffect, useState } from "react";
import { TypingAnimation } from "../ui/typing-animation";

export default function SequentialTyping() {
  const [showPresents, setShowPresents] = useState(false);

  useEffect(() => {
    if (!showPresents) {
      // Estimate the time for "TAMU DATATHON" to finish typing
      // E.g., assume 12 chars x 100ms per char = 1200ms + a little buffer
      const ms = 1500;
      const timer = setTimeout(() => setShowPresents(true), ms);
      return () => clearTimeout(timer);
    }
  }, [showPresents]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {!showPresents ? (
        <TypingAnimation
          words={["TAMU DATATHON"]}
          cursorStyle="underscore"
          startOnView
          className="font-kopub text-7xl font-normal"
        />
      ) : (
        <TypingAnimation
          words={["Presents..."]}
          cursorStyle="underscore"
          startOnView
          className="font-kopub text-5xl font-normal mt-1"
        />
      )}
    </div>
  );
}