/**
 * Site-status card in the hero's top-right corner (the MLH badge hangs top-left).
 * Narrow on phones and tablets so it clears the badge and the bear's ear.
 */
export function SiteNotice() {
  return (
    <aside
      aria-label="Site status"
      className="absolute right-[max(12px,1.5cqw)] top-[max(12px,1.5cqh)] z-[6] w-[min(210px,calc(100cqw_-_172px))] overflow-hidden rounded-xl border-2 border-[#ef8700] bg-[rgb(26_11_36/0.88)] px-3.5 pb-2.5 pt-4 text-[#fff4dc] shadow-[0_8px_24px_rgb(10_4_20/0.45)] lg:w-[240px]"
    >
      {/* Hazard stripe along the top edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(-45deg,#f5b700_0_8px,#1b1414_8px_16px)]"
      />
      <p className="font-righteous text-[length:clamp(12px,1cqw,14px)] uppercase leading-tight tracking-[0.06em] text-[#ffc94d]">
        Site under construction
      </p>
      <p className="mt-1 text-[length:clamp(12px,0.95cqw,13px)] leading-snug text-[rgb(255_244_220/0.85)]">
        More information is on the way!
      </p>
    </aside>
  );
}
