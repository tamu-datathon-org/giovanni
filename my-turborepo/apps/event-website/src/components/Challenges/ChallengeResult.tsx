import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "@/components/Hero/Sparkle";
import ChallengeLights, { signBulbs } from "./ChallengeLights";
import type { Challenge } from "./challengeData";

interface ChallengeResultProps {
  challenge: Challenge | null;
}

const SPARKLE = "hidden size-3 shrink-0 text-[#ef8700] sm:block sm:size-4 lg:size-5";

/**
 * The bear's sign beside the wheel: the challenge the ball landed on, and a
 * big button to every challenge. The red board is x 13–84%, y 34–91% of this box.
 */
export default function ChallengeResult({ challenge }: ChallengeResultProps) {
  const titleSize =
    (challenge?.name.length ?? 0) > 16
      ? "text-xl sm:text-2xl lg:text-3xl"
      : "text-2xl sm:text-3xl lg:text-4xl";

  return (
    <div className="mx-auto w-full max-w-[42rem] lg:mx-0">
      <article className="relative aspect-[462/446] w-full text-white">
        <Image
          src="/event_assets/bear_challenge_sign.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 90vw, 42rem"
          className="object-contain"
        />

        <ChallengeLights {...signBulbs} />

        <div
          className="absolute bottom-[33%] left-[17%] right-[20%] top-[37%] z-10 flex flex-col items-center justify-center overflow-y-auto text-center font-righteous"
          style={{ scrollbarColor: "#FFB24C transparent", scrollbarWidth: "thin" }}
        >
          {challenge ? (
            <>
              <h2 className={`w-full text-balance break-words leading-tight ${titleSize}`}>
                {challenge.name}
              </h2>
              <div className="mt-3 w-full text-xs leading-snug sm:text-sm lg:text-base">
                <span className="mb-1 block uppercase tracking-wider text-[#FFB24C]">
                  Prizes
                </span>
                <p className="line-clamp-3 text-balance break-words">
                  {challenge.prizes.join(" | ")}
                </p>
              </div>
            </>
          ) : (
            <p className="text-balance text-xl leading-tight sm:text-3xl lg:text-4xl">
              Spin the wheel to get a random challenge!
            </p>
          )}
        </div>

        {/* Styled like the hero's APPLY button. */}
        <Link
          href="/challenges"
          className="absolute bottom-[12%] left-[48.5%] z-10 flex h-[16%] w-[64%] -translate-x-1/2 items-center justify-center gap-2 rounded-full border-[3px] border-[#ef8700] bg-[#fffbef] bg-[image:linear-gradient(to_bottom,#fffbef,#fff3dc)] font-righteous text-sm uppercase leading-none tracking-wide text-[#d50000] no-underline transition-[translate,box-shadow] duration-200 [box-shadow:0_6px_14px_rgb(16_6_24/0.45),inset_0_-3px_0_rgb(226_168_96/0.35)] [text-shadow:0_2px_0_#ffd9a8] hover:-translate-y-1 hover:[box-shadow:0_10px_18px_rgb(16_6_24/0.5),0_0_24px_rgb(255_170_60/0.55),inset_0_-3px_0_rgb(226_168_96/0.35)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:gap-3 sm:border-4 sm:text-xl lg:text-2xl"
        >
          <Sparkle className={SPARKLE} />
          See All Challenges
          <Sparkle className={SPARKLE} />
        </Link>
      </article>
    </div>
  );
}
