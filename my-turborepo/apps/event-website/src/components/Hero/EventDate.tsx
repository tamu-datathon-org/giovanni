import { cssVars } from "./scene";
import { Sparkle } from "./Sparkle";

/** The event dates, on a lit letter board hung between the countdown and APPLY, sized to its text. */
export function EventDate() {
  return (
    <p className="font-righteous pointer-events-auto absolute left-[49.65%] top-[63.52%] flex items-center gap-[0.5em] whitespace-nowrap rounded-[calc(14*var(--g))] border-[length:calc(6*var(--g))] border-[#ef8700] bg-gradient-to-b from-[#2b1438] to-[#1a0b24] px-[0.9em] py-[0.4em] text-[length:max(12px,calc(28*var(--g)))] uppercase leading-none tracking-[0.05em] text-[#fff4dc] [box-shadow:0_calc(6*var(--g))_calc(14*var(--g))_rgb(10_4_20/0.45)] [text-shadow:0_0_calc(10*var(--g))_rgb(255_196_120/0.6)] [translate:-50%_0]">
      <time dateTime="2026-11-07">Nov 7–8, 2026</time>
      <Sparkle className="aspect-square w-[0.7em] text-[#ef8700]" />
      <span>
        <span className="sr-only">, </span>24 hours
      </span>
      {/* Unlit until the power comes on, lighting just after APPLY. */}
      <span
        aria-hidden="true"
        className="group-data-[stage=on]/hero:animate-apply-lights pointer-events-none absolute inset-[calc(-6*var(--g))] rounded-[inherit] bg-[rgb(14_6_34/0.55)] motion-reduce:transition-opacity motion-reduce:duration-500 motion-reduce:group-data-[stage=on]/hero:!animate-none motion-reduce:group-data-[stage=on]/hero:opacity-0 [@media(scripting:none)]:!opacity-0"
        style={cssVars({ "--lights-delay": "0.15s" })}
      />
    </p>
  );
}
