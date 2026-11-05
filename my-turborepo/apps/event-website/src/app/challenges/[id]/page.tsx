import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChallengesHeading, {
  challengesPageTop,
} from "@/components/Challenges/ChallengesHeading";
import { challenges } from "@/components/Challenges/challengeData";

interface ChallengeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const { id } = await params;
  const index = Number(id) - 1;
  const challenge = Number.isInteger(index) ? challenges[index] : undefined;

  if (!challenge) notFound();

  const prizes = challenge.prize
    .split(/\s*(?:Â·|·)\s*/)
    .map((prize) => prize.replace(/^(?:First|Second|Third):\s*/i, "").trim())
    .filter(Boolean);

  return (
    <main className={`relative flex min-h-svh flex-col items-center overflow-hidden bg-[#420807] px-5 pb-20 text-white sm:px-8 ${challengesPageTop}`}>
      <Image
        src="/event_assets/background-challenges.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <header className="relative z-10 mb-8 w-full max-w-7xl sm:mb-12">
        <ChallengesHeading title={challenge.name}>
          <Link
            href="/challenges/all"
            aria-label="Back to all challenges"
            className="absolute left-0 flex h-12 w-12 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
      </header>

      <section
        aria-label={`${challenge.name} details`}
        className="relative z-10 w-full max-w-5xl flex-1"
      >
        <div className="relative aspect-[1332/765] w-full">
          <Image
            src="/event_assets/challenge%20name%20panel.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain [clip-path:inset(0_0_15.8%_0)]"
          />
          {/* The FAQ section's divider stands in for the band drawn into the panel art. */}
          <Image
            src="/event_assets/faq/divider.png"
            alt=""
            width={1440}
            height={234}
            className="absolute left-[0.4%] top-[84.2%] h-auto w-[99.2%]"
          />
          <div className="absolute left-[9%] right-[9%] top-[10%] bottom-[25%] overflow-y-auto px-3 py-3 text-center text-[#160d08] sm:px-8 sm:py-6">
            <section>
              <h2 className="font-righteous text-lg sm:text-2xl">Description</h2>
              <p className="mt-1 font-righteous text-xs leading-relaxed sm:mt-2 sm:text-base">
                {challenge.description}
              </p>
            </section>
            <section className="mt-5 sm:mt-8">
              <h2 className="font-righteous text-lg sm:text-2xl">Prizes</h2>
              <p className="mt-1 font-righteous text-xs leading-relaxed sm:mt-2 sm:text-base">
                {prizes.join(" | ")}
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
