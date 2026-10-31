"use client";

import { useEffect, useState } from "react";

/**
 * Vertical scroll progress track for the left rail.
 */
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      // Short pages have nothing to scroll — avoid dividing by zero.
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, (window.scrollY / docHeight) * 100));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="relative h-24 w-[3px] shrink-0 overflow-hidden rounded-full bg-white/20 xl:h-32"
    >
      <div
        className="w-full rounded-full bg-gradient-to-b from-[#6cfdea] via-[#029db1] to-[#3969d0] transition-[height] duration-150 ease-out"
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
}
