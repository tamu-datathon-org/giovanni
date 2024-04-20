"use client";
import { useQuery } from '@tramvai/react-query';
import { postRouter } from '~/server/api/routers/team';

interface Team {
  id: number;
  name: string;
  score: number;
  rank: number;
}

interface ScoreDiffData {
  teamAhead?: Team;
  curTeam?: Team;
  teamBehind?: Team;
}

import Link from "next/link";

export default function Info() {

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
  const { data: scoreDiff, isLoading, isError } = useQuery<ScoreDiffData>('scoreDiff', () =>
    postRouter.scoreDiff.query()
  );


  const { teamAhead, curTeam, teamBehind } = scoreDiff || {};



  //Checks to see if their rank is in top 10;
  const ifTop10 = curTeam.rank <= 10;

 const maxPointDifference = pointsAhead + pointsBehind; // Maximum point difference

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

  return (
    <>
      <div className="absolute top-0 right-0 m-4 ">
        <Link href="/" className="text-white-500 hover:underline font-semibold">
          Go to Global Leaderboard
        </Link>
      </div>
      <h1 className="text-5xl font-bold mb-4 text-center text-white p-5">Leaderboard</h1>
      <div className="w-full relative">
        {ifTop10 && (
          <div><h1 className="text-5xl font-bold mb-4 text-center text-white">Rank: {currentUser?.rank}</h1></div>
        )}
      </div>
      <div className="p-10 h-1/2 rounded-xl flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-center space-x-4 items-center align-center align-top">
          <div className="w-full relative flex justify-between gap-10">

            {teamBehind && (
              <div className="square-outline flex flex-col justify-center items-center bg-red-500 opacity-80">
                <div className="truncate">{teamBehind.name}</div>
                <div className="truncate">-{teamBehind.score}</div>
              </div>
            )}

            {curTeam && (
              <div className="square-outline flex flex-col justify-center items-center bg-white opacity-80">
                ?
              </div>
            )}
            {teamAhead && (
              <div className="square-outline flex flex-col justify-center items-center bg-green-500 opacity-80">
                <div className="truncate">{teamAhead.name}</div>
                <div className="truncate">+{teamAhead.score}</div>
              </div>
            )}
          </div>


        </div>
      </div>
      <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
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