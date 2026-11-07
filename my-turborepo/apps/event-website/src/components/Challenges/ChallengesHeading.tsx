import Image from "next/image";
import type { ReactNode } from "react";

// Pair with challengesPageTop so the heading holds still between challenge pages.
export const challengesPageTop = "pt-36 md:pt-20 lg:pt-10";

interface ChallengesHeadingProps {
  children?: ReactNode;
  id?: string;
  title?: string;
}

export default function ChallengesHeading({
  children,
  id,
  title = "CHALLENGES",
}: ChallengesHeadingProps) {
  // Long challenge names wrap instead of truncating, padded clear of the back arrow.
  const long = title.length > 12;

  return (
    <div
      className={`challenges-heading relative z-20 flex w-full shrink-0 items-center justify-center gap-3 sm:gap-5 ${
        long ? "min-h-12 px-12" : "h-12 whitespace-nowrap"
      }`}
    >
      {children}
      <Image
        src="/event_assets/Star%203.png"
        alt=""
        width={72}
        height={72}
        className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10"
      />
      <h1
        id={id}
        className={`min-w-0 text-center font-righteous uppercase text-[#fff8e8] drop-shadow ${
          long
            ? "text-balance text-2xl leading-tight sm:text-4xl lg:text-5xl"
            : "truncate text-4xl sm:text-5xl"
        }`}
      >
        {title}
      </h1>
      <Image
        src="/event_assets/Star%203.png"
        alt=""
        width={72}
        height={72}
        className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10"
      />
    </div>
  );
}
