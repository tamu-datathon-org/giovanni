/** Pip centers for each face, on a 100 x 100 die. */
const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

/** A flat red die seen from above, like the ones scattered on the craps board. */
export function DieFace({ value, className }: { value: number; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <rect x="3" y="3" width="94" height="94" rx="16" fill="#D50000" stroke="#A30000" strokeWidth="6" />
      {/* A soft highlight along the top edge. */}
      <rect x="10" y="9" width="80" height="22" rx="10" fill="#FF2A2A" opacity="0.55" />
      {(PIPS[value] ?? PIPS[1]).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9.5" fill="#FDFBED" />
      ))}
    </svg>
  );
}
