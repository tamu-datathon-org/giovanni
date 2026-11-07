import { SponsorChip } from "@/components/sponsor/SponsorChip";
import type { ChallengeSponsor } from "./challengeData";

/** The chip's size. The challenge page leaves this much room under its text. */
export const sponsorBadgeSize = "size-[clamp(60px,12cqw,120px)]";

/**
 * The sponsor's poker chip, tilted in the bottom-left corner of the challenge
 * panel's cream (just inside the art's 61px side and 44px base).
 */
export default function SponsorBadge({ sponsor }: { sponsor: ChallengeSponsor }) {
  return (
    <span
      role="img"
      aria-label={`Sponsored by ${sponsor.name}`}
      className={`absolute bottom-[4.8cqw] left-[6.1cqw] -rotate-12 drop-shadow-[0_3px_4px_rgb(81_16_11/0.35)] ${sponsorBadgeSize}`}
    >
      <SponsorChip src={sponsor.logo} colors={sponsor.colors} dragging={false} />
    </span>
  );
}
