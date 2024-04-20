"use client";
import { api } from "~/trpc/react";
import Link from "next/link";

export default function Info() {
  /*
          const competitors = [
            { name: 'Competitor 1', score: 110, rank: 3 },
            { name: 'Competitor 2', score: 91, rank: 4 },
            { name: 'Competitor 3', score: 60, rank: 5 },
          ];
        
          // Assuming the current user is Competitor 2
          const currentUser = competitors.find(c => c.name === 'Competitor 2');
          const currentUserIndex = competitors.indexOf(currentUser!);
          const personBehind = competitors[currentUserIndex + 1];
          const personAhead = competitors[currentUserIndex - 1];
        
          const pointsBehind = personBehind ? currentUser.score - personBehind.score : 0;
          const pointsAhead = personAhead ? personAhead.score - currentUser.score : 0;
        */
  const { data: scoreDiff } = api.team.scoreDiff.useQuery({
    teamId: 1,
    teamName: "team1",
    points: 100,
    rank: 1,
  });

  const { teamAhead, curTeam, teamBehind } = scoreDiff || {};

  //Checks to see if their rank is in top 10;
  const ifTop10 = curTeam ? curTeam.rank <= 10 : false;

  /* const maxPointDifference = pointsAhead + pointsBehind; // Maximum point difference
          const buffer = 10; // 10% buffer on each side
        
          const getPosition = (scoreDifference: number, isCurrentUser: boolean, isAhead: boolean) => {
            if (isCurrentUser) {
              return '50%'; // Current user is always at the center
            } else {
              const positionPercentage = (scoreDifference / maxPointDifference) * (40);
              console.log(positionPercentage);
              if (positionPercentage > 40) {
                return isAhead ? `${90}%` : `${10}%`;
              }
              return isAhead ? `${50 + positionPercentage}%` : `${50 - positionPercentage}%`;
            }
          };
        */
  return (
    <>
      <div className="absolute right-0 top-0 m-4 ">
        <Link href="/" className="text-white-500 font-semibold hover:underline">
          Go to Global Leaderboard
        </Link>
      </div>
      <h1 className="mb-4 p-5 text-center text-5xl font-bold text-white">
        Leaderboard
      </h1>
      <div className="relative w-full">
        {ifTop10 && (
          <div>
            <h1 className="mb-4 text-center text-5xl font-bold text-white">
              Rank: {curTeam!.rank}
            </h1>
          </div>
        )}
      </div>
      <div className="flex h-1/2 flex-col items-center justify-center space-y-4 rounded-xl p-10">
        <div className="align-center flex items-center justify-center space-x-4 align-top">
          <div className="relative flex w-full justify-between gap-10">
            {teamBehind && (
              <div className="square-outline flex flex-col items-center justify-center bg-red-500 opacity-80">
                <div className="truncate">{teamBehind.name}</div>
                <div className="truncate">-{teamBehind.score}</div>
              </div>
            )}

            {curTeam && (
              <div className="square-outline flex flex-col items-center justify-center bg-white opacity-80">
                ?
              </div>
            )}
            {teamAhead && (
              <div className="square-outline flex flex-col items-center justify-center bg-green-500 opacity-80">
                <div className="truncate">{teamAhead.name}</div>
                <div className="truncate">+{teamAhead.score}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <svg
        className="waves"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </>
  );
}
