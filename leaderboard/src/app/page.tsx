/* page.tsx */
"use client";
import "./styles.css";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Team } from "~/server/api/routers/team"; // interface Team {

// interface Team {
//   teamId: number;
//   teamName: string;
//   points: number;
//   rank: number;
// }

export default function Home() {
  /*const competitors = [
                    { name: 'Competitor 1', score: 100 },
                    { name: 'Competitor 2', score: 90 },
                    { name: 'Competitor 3', score: 80 },
                
                  ]; */

  const [topThree, setTopThree] = useState<Team[]>([]);

  //leaderboard fetching

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
  // @ts-expect-error
  setTopThree(api.team.getTopThree.useQuery());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const maxScore = topThree[0]?.score;

  return (
    <>
      <div className="absolute right-0 top-0 m-4 ">
        <Link
          href="/relativeLeaderboard"
          className="text-white-500 font-semibold hover:underline"
        >
          Go to Personal Leaderboard
        </Link>
      </div>

      <div className="mb-6 mt-6">
        <h1 className="text-white-500 mb-4 text-center text-5xl font-bold text-white opacity-100">
          Top 3 Leaderboard
        </h1>
      </div>

      <h1 className="mb-4 text-center text-5xl font-bold">Leaderboard</h1>
      <div className="mx-auto flex w-1/2 flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-md">
        <ul className="w-full list-inside list-decimal">
          {topThree.map((team, index) => (
            <li
              key={index}
              className="animate-width mb-4 rounded-lg bg-blue-100 p-4"
              style={{
                animationName: `loading-${index}`,
                backgroundColor: `rgb(51, ${92 + 50 * index}, 255)`,
              }}
            >
              <style>
                {`
                @keyframes loading-${index} {
                0% {
                  width: 150px;
                }
                100% {
                  width: ${(team.score / maxScore) * 100}%;
                }
              }
            `}
              </style>
              <h2 className="text-lg font-semibold">{team.name}</h2>
              <p className="mt-2">Score: {team.score}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex w-1/2 flex-col items-center space-y-4 rounded-xl bg-white p-6 opacity-95 shadow-md">
        <ul className="items-left flex w-full list-inside list-none flex-col">
          {topThree.map((competitor, index) => {
            const colors = [
              "bg-yellow-300",
              "bg-gray-400",
              "bg-orange-500",
              "bg-yellow-500",
              "bg-purple-500",
            ];
            const colorIndex = index % colors.length; // Get the color index from the palette
            const colorClass = colors[colorIndex]; // Get the color class

            return (
              <li
                key={index}
                className="animate-width relative mb-6 rounded-lg bg-blue-100 p-8"
                style={{
                  animationName: `loading-${index}`,
                  backgroundColor: `rgb(51, ${92 + 50 * index}, 255)`,
                }}
              >
                <style>
                  {`
                @keyframes loading-${index} {
                  0% {
                    width: 150px;
                  }
                  100% {
                    width: ${100 / (index + 1)}%;
                  }
                }
              `}
                </style>
                <h2 className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-white">
                  {competitor.name}
                </h2>
                <div
                  className={`absolute bottom-0 right-0 top-0 flex h-full w-8 items-center justify-center rounded-lg ${colorClass} z-0`}
                >
                  <span className="text-lg text-white">{index + 1}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <svg
        className="waves flex"
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
        <g className="parallax flex">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </>
  );
}
