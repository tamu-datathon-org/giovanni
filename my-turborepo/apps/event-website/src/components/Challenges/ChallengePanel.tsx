import Image from "next/image";
import Link from "next/link";
import type { Challenge } from "./challengeData";

interface ChallengePanelProps {
  challenge: Challenge;
  showMoreLink?: boolean;
  panelImage?: string;
}

const descriptionLineLength = 58;

function wrapDescription(description: string) {
  const words = description.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (line && nextLine.length > descriptionLineLength) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  }

  if (line) lines.push(line);
  return lines;
}

export default function ChallengePanel({
  challenge,
  showMoreLink = false,
  panelImage = "/event_assets/challenge%20panel.png",
}: ChallengePanelProps) {
  const prizes = challenge.prize
    .split(/\s*(?:Â·|·)\s*/)
    .map((prize) => prize.replace(/^(?:First|Second|Third):\s*/i, "").trim())
    .filter(Boolean);
  const descriptionLines = wrapDescription(challenge.description);

  return (
    <article className="relative aspect-[462/446] w-full text-white">
      <Image
        src={panelImage}
        alt=""
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-contain"
      />

      <div
        className={`absolute left-[15%] right-[15%] z-10 flex flex-col items-center overflow-y-auto px-3 text-center sm:px-5 ${
          showMoreLink
            ? "top-[15%] h-[80%]"
            : "top-[12%] h-[76%] justify-center"
        }`}
      >
        <h2 className={`font-righteous text-2xl leading-tight text-white sm:text-3xl lg:text-4xl ${showMoreLink ? "absolute top-[28%] translate-y-2 sm:translate-y-3" : ""}`}>
          {challenge.name}
        </h2>
        <div
          className={showMoreLink ? "absolute left-0 right-0 top-[42%] bottom-[34%] w-full -translate-x-2 overflow-y-auto bg-transparent text-center text-[10px] leading-tight sm:text-xs lg:text-sm" : ""}
          style={showMoreLink ? { scrollbarColor: "#FFB24C transparent", scrollbarWidth: "thin" } : undefined}
        >
          <p className={`mt-3 break-words font-righteous leading-snug text-white ${showMoreLink ? "whitespace-pre-line" : "text-xs sm:text-sm lg:text-base"}`}>
            {descriptionLines.map((line, index) => (
              <span key={`${index}-${line}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          {prizes.length > 0 && (
            <div className={`mt-3 font-righteous leading-snug text-white ${showMoreLink ? "text-[10px] sm:text-xs lg:text-sm" : "text-xs sm:text-sm lg:text-base"}`}>
              <span className="mb-1 block uppercase tracking-wider">Prizes</span>
              <p className={showMoreLink ? "whitespace-normal break-words" : ""}>{prizes.join(" | ")}</p>
            </div>
          )}
        </div>
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
