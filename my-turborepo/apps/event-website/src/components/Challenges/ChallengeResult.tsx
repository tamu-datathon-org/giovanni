import type { Challenge } from "./challengeData";
import { challenges } from "./challengeData";

interface ChallengeResultProps {
  challenge: Challenge | null;
}

export default function ChallengeResult({ challenge }: ChallengeResultProps) {
  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="mx-auto w-full max-w-xl rounded-3xl border border-[#ffb64f]/50 bg-[#fff7e8] p-6 text-[#32100c] shadow-[0_24px_70px_rgba(0,0,0,0.4)] sm:p-8 lg:mx-0"
    >

      <h2 className="mt-3 font-righteous text-3xl leading-tight text-[#510c0b] sm:text-4xl">
        {challenge?.name ?? ""}
      </h2>
      <p className="mt-4 leading-relaxed text-[#55352b]">
        {challenge?.description ??
          "."}
      </p>
      {challenge?.prize && (
        <div className="mt-6 border-t border-[#d6b895] pt-5">
          <p className="font-righteous text-xs uppercase tracking-[0.2em] text-[#8b3c18]">
            Prizes
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#55352b]">
            {challenge.prize}
          </p>
        </div>
      )}
      {challenge?.name === "All Challenges" && (
        <ul className="mt-5 space-y-2 border-t border-[#d6b895] pt-5 text-sm text-[#55352b]">
          {challenges.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
