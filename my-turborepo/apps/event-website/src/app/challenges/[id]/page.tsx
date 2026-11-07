import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChallengesHeading, {
  challengesPageTop,
} from "@/components/Challenges/ChallengesHeading";
import { challenges } from "@/components/Challenges/challengeData";
import SponsorBadge, {
  sponsorBadgeSize,
} from "@/components/Challenges/SponsorBadge";

const placeLabels = ["1st", "2nd", "3rd"];

/**
 * The panel art as a 9-slice frame, so the panel grows with its text. In the
 * 1332×645 art, the arch above y 245 and the base below y 545 stay as drawn, and
 * the suit-lined sides between them repeat (300px = five suits, so seams line up).
 */
const frameWidth = (px: number) => `calc(${px} / 1332 * 100cqw)`;
const panelFrame: CSSProperties = {
  borderStyle: "solid",
  borderWidth: 0,
  borderImageSource: "url('/event_assets/challenge-name-panel-frame.png')",
  borderImageSlice: "245 70 100 61 fill",
  borderImageWidth: [245, 70, 100, 61].map(frameWidth).join(" "),
  borderImageRepeat: "round",
};

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

  const { link, sponsor } = challenge;

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
            href="/challenges"
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
        className="relative z-10 w-full max-w-5xl flex-1 [container-type:inline-size]"
      >
        {/* At least the art's own height; longer text stretches it instead of scrolling. */}
        <div
          className="relative min-h-[48.42cqw] px-[9%] pb-[4%] pt-[5.75%]"
          style={panelFrame}
        >
          <div className="px-3 py-3 text-center text-[#160d08] sm:px-8 sm:py-6">
            <section>
              <h2 className="font-righteous text-lg sm:text-2xl">Description</h2>
              <p className="mt-1 font-righteous text-xs leading-relaxed sm:mt-2 sm:text-base">
                {challenge.description}
              </p>
            </section>
            {(link ?? challenge.howToStart) && (
              <section className="mt-5 sm:mt-8">
                <h2 className="font-righteous text-lg sm:text-2xl">Get Started</h2>
                {challenge.howToStart && (
                  <p className="mt-1 font-righteous text-xs leading-relaxed sm:mt-2 sm:text-base">
                    {challenge.howToStart}
                  </p>
                )}
                {link && (
                  <a
                    href={link.href}
                    {...(link.download
                      ? { download: true }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="relative mx-auto mt-2 flex w-40 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51100b] sm:mt-3 sm:w-56"
                  >
                    {/* The wheel's SEE MORE pill. */}
                    <Image
                      src="/event_assets/seemore.png"
                      alt=""
                      width={490}
                      height={115}
                      className="h-auto w-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-righteous text-xs uppercase tracking-wide text-[#51100b] sm:text-base">
                      {link.label}
                      {!link.download && (
                        <span className="sr-only"> (opens in a new tab)</span>
                      )}
                    </span>
                  </a>
                )}
              </section>
            )}
            <section className="mt-5 sm:mt-8">
              <h2 className="font-righteous text-lg sm:text-2xl">Prizes</h2>
              <ol className="mt-1 font-righteous text-xs leading-relaxed sm:mt-2 sm:text-base">
                {challenge.prizes.map((prize, index) => (
                  <li key={prize}>
                    {placeLabels[index]}: {prize}
                  </li>
                ))}
              </ol>
            </section>
            {/* Room for the sponsor's chip, so it never sits on the text. */}
            {sponsor && <div aria-hidden="true" className={`mt-2 ${sponsorBadgeSize}`} />}
          </div>
          {sponsor && <SponsorBadge sponsor={sponsor} />}
        </div>
        {/* The FAQ section's divider stands in for the band drawn into the panel art. */}
        <Image
          src="/event_assets/faq/divider.png"
          alt=""
          width={1440}
          height={234}
          className="mx-auto block h-auto w-[99.2%]"
        />
      </section>
    </main>
  );
}
