"use client";
import type { Team } from "~/server/api/routers/team";

export const TopThreeComponent = ({
  index,
  team,
  maxScore,
}: {
  index: number;
  team: Team;
  maxScore: number;
}) => {
  return (
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
  );
};

export const AdjacentTeamsComponent = ({
  index,
  competitor,
}: {
  index: number;
  competitor: Team;
  colorClass: string | undefined;
}) => {
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
        className={`absolute bottom-0 right-0 top-0 z-0 flex h-full w-8 items-center justify-center rounded-lg`}
      >
        <span className="text-lg text-white">{index + 1}</span>
      </div>
    </li>
  );
};
