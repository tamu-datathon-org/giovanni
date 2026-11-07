import Image from "next/image";
import Link from "next/link";
import ChallengeCard from "./ChallengeCard";
import ChallengesHeading, { challengesPageTop } from "./ChallengesHeading";
import { challenges } from "./challengeData";

/** The /challenges page: every challenge as a card linking to its own page. */
export default function AllChallenges() {
  return (
    <main className={`relative min-h-svh bg-[#420807] px-5 pb-20 text-white sm:px-8 ${challengesPageTop}`}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <Image
          src="/event_assets/background-challenges.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <ChallengesHeading>
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Image
              src="/event_assets/arrow.png"
              alt=""
              width={68}
              height={22}
              className="h-auto w-10"
            />
          </Link>
        </ChallengesHeading>
        <p className="mb-8 mt-3 text-center font-righteous text-sm text-[#fff2d6]/80 sm:mb-12 sm:text-base">
          Click a challenge to see its full details
        </p>
        {/* Wraps rather than a grid, so a short last row sits centered. */}
        <div className="flex flex-wrap items-start justify-center gap-6 lg:gap-8">
          {challenges.map((challenge, index) => (
            <Link
              key={`${challenge.name}-${index}`}
              href={`/challenges/${index + 1}`}
              className="block w-full rounded-xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              aria-label={`View ${challenge.name}`}
            >
              <ChallengeCard challenge={challenge} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
