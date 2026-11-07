import Image from "next/image";
import { Sparkle } from "@/components/Hero/Sparkle";
import ChallengeLights, { cardBulbs } from "./ChallengeLights";
import type { Challenge } from "./challengeData";

interface ChallengeCardProps {
  challenge: Challenge;
}

/** A marquee card on the All Challenges grid: the name and its three prizes. */
export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const titleSize =
    challenge.name.length > 16
      ? "text-xl lg:text-2xl"
      : "text-2xl lg:text-3xl";

  return (
    <article className="relative aspect-[462/446] w-full">
      <Image
        src="/event_assets/all%20challenges%20panel.png"
        alt=""
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-contain"
      />

      {/* Cream face over the art's red box (x 41–423, y 53–388 of 462×446), like the challenge pages. */}
      <div className="absolute bottom-[12.5%] left-[8.6%] right-[8.1%] top-[11.7%] flex flex-col items-center justify-center overflow-hidden rounded-[13.5%/15.5%] bg-[#fffbef] bg-[image:linear-gradient(to_bottom,#fffbef,#fff3dc)] px-[8%] py-[6%] text-center font-righteous text-[#51100b] [box-shadow:inset_0_2px_10px_rgb(81_16_11/0.25)]">
        <h2 className={`w-full text-balance break-words leading-tight ${titleSize}`}>
          {challenge.name}
        </h2>

        <div className="my-3 flex w-full items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#ef8700] sm:text-xs">
          <span className="h-px flex-1 bg-current opacity-50" />
          <Sparkle className="size-2.5 shrink-0" />
          Prizes
          <Sparkle className="size-2.5 shrink-0" />
          <span className="h-px flex-1 bg-current opacity-50" />
        </div>

        <ol className="w-full space-y-1.5 text-left text-sm leading-snug text-[#160d08] sm:text-xs lg:text-sm">
          {challenge.prizes.map((prize, index) => (
            <li key={prize} className="flex items-center gap-2">
              {/* A poker chip for the place. */}
              <span
                aria-label={`Place ${index + 1}:`}
                className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-dashed border-white/80 bg-[#ef8700] text-[10px] leading-none text-white ring-1 ring-[#ef8700]"
              >
                {index + 1}
              </span>
              <span className="line-clamp-2 min-w-0">{prize}</span>
            </li>
          ))}
        </ol>
      </div>

      <ChallengeLights {...cardBulbs} />
    </article>
  );
}
