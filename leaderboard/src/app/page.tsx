/* page.tsx */
"use client";
import './styles.css';
import Link from "next/link";

export default function Home() {  

  const competitors = [
    { name: 'Competitor 1', score: 100 },
    { name: 'Competitor 2', score: 90 },
    { name: 'Competitor 3', score: 80 },
  ];

  // Sort competitors by score in descending order
  competitors.sort((a, b) => b.score - a.score);

  return (
    <>
      <div className="absolute top-0 right-0 m-4">
        <Link href="/relativeLeaderboard" className="text-blue-500 hover:underline">
          Go to Another Page
        </Link>
      </div>
      
      <h1 className="text-5xl font-bold mb-4 text-center">Leaderboard</h1>
      <div className="p-6 w-1/3 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center">
        <div className="flex container justify-center w-full">
          {competitors.map((competitor, index) => (
            <div key={index} className={`flex flex-col items-center podium-${index + 1}`}>
              <h2 className="text-lg font-semibold">{competitor.name}</h2>
              <p className="mt-2">Score: {competitor.score}</p>
            </div>
          ))}
        </div>
      </div>
      <svg className="waves"  viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
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