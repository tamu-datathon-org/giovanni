/* page.tsx */
import "./styles.css";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/server";
import { AdjacentTeamsComponent, TopThreeComponent } from "./components/TopThreeComponent";
import { type Team } from "~/server/api/routers/team"; // interface Team {

// interface Team {
//   teamId: number;
//   teamName: string;
//   points: number;
//   rank: number;
// }

export default async function Home() {
  /*const competitors = [
                    { name: 'Competitor 1', score: 100 },
                    { name: 'Competitor 2', score: 90 },
                    { name: 'Competitor 3', score: 80 },
                
                  ]; */

  // const [topThree, setTopThree] = useState<Team[]>([]);
  const topThree = await api.team.getTopThree()

  //leaderboard fetching

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
  // setTopThree(api.team.getTopThree.useQuery());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // const maxScore = Math.max(...topThree.map((c) => c.score));

  return (
    <>
      <div className="absolute right-0 top-0 m-4 ">
        {/* <Link
          href="/relativeLeaderboard"
          className="text-white-500 font-semibold hover:underline"
        >
          Go to Personal Leaderboard
        </Link> */}
      </div>

      <div className="mb-6 mt-6">
        <h1 className="text-white-500 mb-4 text-center text-5xl font-bold text-white opacity-100">
          Top 3 Leaderboard
        </h1>
      </div>

      <h1 className="mb-4 text-center text-5xl font-bold">Leaderboard</h1>
      {/* <div className="mx-auto flex w-1/2 flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-md">
        <ul className="w-full list-inside list-decimal">
          {topThree.map((team: Team, index: number) => (
            <TopThreeComponent
              key={index}
              index={index}
              team={team}
              maxScore={100}
            />
          ))}
        </ul>
      </div> */}

      <div className="mx-auto flex w-1/2 flex-col items-center space-y-4 rounded-xl bg-white p-6 opacity-95 shadow-md">
        <ul className="items-left flex w-full list-inside list-none flex-col">
          {topThree.map((competitor: Team, index: number) => {
            const colors: string[] = [
              "bg-yellow-300",
              "bg-gray-400",
              "bg-orange-500",
              "bg-yellow-500",
              "bg-purple-500",
            ];
            const colorIndex: number = index % colors.length; // Get the color index from the palette
            const colorClass: string | undefined = colors[colorIndex]; // Get the color class

            return (
              <AdjacentTeamsComponent
                key={index}
                index={index}
                competitor={competitor}
                colorClass={colorClass}
              />
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
