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
  const maxScore = Math.max(...competitors.map(c => c.score));
  return (
    <>
    
      <div className="absolute top-0 right-0 m-4 ">
        <Link href="/relativeLeaderboard" className="text-blue-500 hover:underline font-semibold">
          Go to Personal Leaderboard
        </Link>
      </div>
      <div className="mt-6 mb-6">
        <h1 className="text-5xl font-bold mb-4 text-center text-white opacity-100">Top 3 Leaderboard</h1>
      </div>
      <div className="p-6 w-1/2 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 opacity-95">
        <ul className="list-none list-inside w-full flex flex-col items-left">          {competitors.map((competitor, index) => {
          const colors = ['bg-yellow-300', 'bg-gray-400', 'bg-orange-500', 'bg-yellow-500', 'bg-purple-500'];
          const colorIndex = index % colors.length; // Get the color index from the palette
          const colorClass = colors[colorIndex]; // Get the color class

          return (
            <li key={index} className="p-8 bg-blue-100 rounded-lg mb-6 animate-width relative" style={{ animationName: `loading-${index}`, backgroundColor: `rgb(51, ${92 + 50 * index}, 255)` }}>
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
              <h2 className="text-2xl font-semibold text-white absolute inset-0 flex items-center justify-center">{competitor.name}</h2>
              <div className={`absolute right-0 top-0 bottom-0 h-full w-8 rounded-lg flex items-center justify-center ${colorClass} z-0`}>
                <span className="text-white text-lg">{index + 1}</span>
              </div>
            </li>
          );
        })}
        </ul>

      </div>
      <svg className="waves flex" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
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

