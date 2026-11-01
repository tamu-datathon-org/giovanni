import Image from "next/image";
import Link from "next/link";
import { cardBulbs } from "@/components/Challenges/ChallengeLights";
import ChallengePanel from "@/components/Challenges/ChallengePanel";
import ChallengesHeading, {
  challengesPageTop,
} from "@/components/Challenges/ChallengesHeading";
import { challenges } from "@/components/Challenges/challengeData";

export default function AllChallengesPage() {
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
            href="/challenges"
            aria-label="Back to the challenge wheel"
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
          Click on each description to see more information
        </p>
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {challenges.map((challenge, index) => (
            <Link
              key={`${challenge.name}-${index}`}
              href={`/challenges/${index + 1}`}
              className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`View ${challenge.name}`}
            >
              <ChallengePanel challenge={challenge} lights={cardBulbs} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
