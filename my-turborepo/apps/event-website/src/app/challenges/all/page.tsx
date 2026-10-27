import Image from "next/image";
import Link from "next/link";
import ChallengePanel from "@/components/Challenges/ChallengePanel";
import { challenges } from "@/components/Challenges/challengeData";

export default function AllChallengesPage() {
  return (
    <main className="relative min-h-svh bg-[#420807] px-5 py-20 text-white sm:px-8">
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
        <div className="relative mb-8 flex items-center justify-center sm:mb-12">
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
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <Image
              src="/event_assets/Star%203.png"
              alt=""
              width={72}
              height={72}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            />
            <h1 className="text-center font-righteous text-4xl text-[#fff8e8] sm:text-5xl">
              CHALLENGES
            </h1>
            <Image
              src="/event_assets/Star%203.png"
              alt=""
              width={72}
              height={72}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {challenges.map((challenge, index) => (
            <Link
              key={`${challenge.name}-${index}`}
              href={`/challenges/${index + 1}`}
              className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`View ${challenge.name}`}
            >
              <ChallengePanel challenge={challenge} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
