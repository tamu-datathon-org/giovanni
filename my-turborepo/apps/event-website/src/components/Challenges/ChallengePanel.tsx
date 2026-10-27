import Image from "next/image";
import Link from "next/link";
import type { Challenge } from "./challengeData";

interface ChallengePanelProps {
  challenge: Challenge;
  showMoreLink?: boolean;
}

export default function ChallengePanel({
  challenge,
  showMoreLink = false,
}: ChallengePanelProps) {
  return (
    <article className="relative aspect-[462/446] w-full text-white">
      <Image
        src="/event_assets/challenge%20panel.png"
        alt=""
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-contain"
      />

      <div
        className={`absolute left-[15%] right-[15%] z-10 flex flex-col items-center overflow-y-auto px-3 text-center sm:px-5 ${
          showMoreLink
            ? "top-[15%] h-[62%] justify-center"
            : "top-[12%] h-[76%] justify-center"
        }`}
      >
        <h2 className="font-righteous text-base leading-tight text-white sm:text-lg lg:text-xl">
          {challenge.name}
        </h2>
        <p className="mt-2 font-righteous text-[11px] leading-snug text-white sm:text-xs lg:text-sm">
          {challenge.description}
        </p>
        {challenge.prize && (
          <p className="mt-2 font-righteous text-[11px] leading-snug text-white sm:text-xs lg:text-sm">
            <span className="block uppercase tracking-wider">Prizes</span>
            {challenge.prize}
          </p>
        )}
      </div>

      {showMoreLink && (
        <Link
          href="/challenges/all"
          className="absolute bottom-[15%] left-1/2 z-10 flex w-[55%] -translate-x-1/2 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Image
            src="/event_assets/seemore.png"
            alt=""
            width={490}
            height={115}
            className="h-auto w-full"
          />
          <span className="absolute inset-0 flex items-center justify-center font-righteous text-sm uppercase tracking-wide text-[#51100b] sm:text-base">
            SEE MORE
          </span>
        </Link>
      )}
    </article>
  );
}
