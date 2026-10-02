import type { ReactNode } from "react";

/** Shared floor for the prizes, sponsors, and FAQ sections. */
export function SectionGround({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/event_assets/sponsors/background-grid.png')] bg-repeat"
        style={{ backgroundSize: "1440px auto" }}
      />
      <div className="relative">{children}</div>
    </>
  );
}
