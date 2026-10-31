import { cssVars } from "./scene";
import { Sparkle } from "./Sparkle";

const APPLY_STAR =
  "absolute left-[var(--at)] top-1/2 aspect-square w-[calc(40*var(--g))] transition-[rotate] duration-[350ms] [translate:-50%_-50%] group-hover/apply:[rotate:90deg] motion-reduce:transition-none";

/** APPLY, in the mockup's spot on the table below the sign (placed as % of the stage). */
export function ApplyButton() {
  return (
    <a
      href="https://tamudatathon.org/apply"
      className="group/apply font-righteous group-data-[stage=on]/hero:animate-apply-pop pointer-events-auto absolute left-[29.62%] top-[80.75%] flex h-[15.01%] w-[40.76%] items-center justify-center rounded-full border-[length:calc(22*var(--g))] border-[#ef8700] bg-gradient-to-b from-[#fffbef] to-[#fff3dc] text-[length:calc(96*var(--g))] leading-none tracking-[0.03em] text-[#d50000] no-underline transition-[translate,box-shadow] duration-200 [box-shadow:0_calc(12*var(--g))_calc(22*var(--g))_rgb(16_6_24/0.45),inset_0_calc(-6*var(--g))_0_rgb(226_168_96/0.35)] [text-shadow:0_calc(5*var(--g))_0_#8f0000] hover:[box-shadow:0_calc(16*var(--g))_calc(26*var(--g))_rgb(16_6_24/0.5),0_0_calc(42*var(--g))_rgb(255_170_60/0.55),inset_0_calc(-6*var(--g))_0_rgb(226_168_96/0.35)] hover:[translate:0_calc(-5*var(--g))] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#3edbd3] active:[translate:0_calc(2*var(--g))] motion-reduce:!animate-none motion-reduce:transition-none"
    >
      <Sparkle className={APPLY_STAR} style={cssVars({ "--at": "14%" })} />
      APPLY
      <Sparkle className={APPLY_STAR} style={cssVars({ "--at": "86%" })} />
      {/* Unlit until the power comes on; the link works throughout. */}
      <span
        aria-hidden="true"
        className="group-data-[stage=on]/hero:animate-apply-lights pointer-events-none absolute inset-[calc(-22*var(--g))] rounded-[inherit] bg-[rgb(14_6_34/0.5)] motion-reduce:transition-opacity motion-reduce:duration-500 motion-reduce:group-data-[stage=on]/hero:!animate-none motion-reduce:group-data-[stage=on]/hero:opacity-0 [@media(scripting:none)]:!opacity-0"
      />
    </a>
  );
}
