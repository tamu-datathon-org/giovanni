import type { ReactNode } from "react";

/**
 * background-grid.png doesn't wrap cleanly; ending a section this far short of
 * the tile's bottom lets the pattern flow into the next section's tile top.
 */
const SEAM_OFFSET = 92;

/** Shared floor for the schedule, prizes, sponsors, and FAQ sections. */
export function SectionGround({
  children,
  align = "top",
}: {
  children: ReactNode;
  /** "bottom" pins the pattern to the bottom edge so it meets the section below seamlessly. */
  align?: "top" | "bottom";
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/event_assets/sponsors/background-grid.png')] bg-repeat"
        style={{
          backgroundSize: "1440px auto",
          backgroundPosition: align === "bottom" ? `left 0 bottom -${SEAM_OFFSET}px` : undefined,
        }}
      />
      <div className="relative">{children}</div>
    </>
  );
}
