/** The dates and venue, printed on the felt between the sign and APPLY. Dims with the room. */
export function EventDate() {
  return (
    <p className="font-righteous pointer-events-auto absolute left-1/2 top-[75.7%] whitespace-nowrap text-[length:max(12px,calc(42*var(--g)))] uppercase leading-none tracking-[0.02em] text-[#fffaf0] [text-shadow:0_calc(3*var(--g))_calc(6*var(--g))_rgb(0_0_0/0.35)] [translate:-50%_-50%]">
      <time dateTime="2026-11-07">November 7–8</time>
      <span aria-hidden="true"> | </span>
      <span className="sr-only">, </span>
      Memorial Student Center
    </p>
  );
}
