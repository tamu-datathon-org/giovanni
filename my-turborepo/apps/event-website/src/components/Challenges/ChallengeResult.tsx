import ChallengePanel from "./ChallengePanel";
import type { Challenge } from "./challengeData";

interface ChallengeResultProps {
  challenge: Challenge;
}

export default function ChallengeResult({ challenge }: ChallengeResultProps) {
  return (
    <div className="mx-auto w-full max-w-[42rem] lg:mx-0">
      <ChallengePanel challenge={challenge} showMoreLink />
    </div>
  );
}
