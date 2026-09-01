import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

/**
 * A CSS-only infinite marquee: renders its children twice back-to-back and
 * slides the whole track left by exactly one copy's width, so the loop is
 * seamless. Track must use normal flex flow (no absolute positioning) for
 * the width duplication to line up.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-max animate-marquee gap-8",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className,
        )}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
