/* page.tsx */
"use client";
import './styles.css';
import Link from "next/link";
import { useState, useEffect} from 'react';

interface Team{
  teamId: number;
  teamName: string;
  points: number;
  rank: number;
}

export default function Home() {  

  /*const competitors = [
    { name: 'Competitor 1', score: 100 },
    { name: 'Competitor 2', score: 90 },
    { name: 'Competitor 3', score: 80 },
  ]; */

  const [topThree, setTopThree] = useState<Team[]>([]);

  useEffect(() => {
    //leaderboard fetching
    fetch('../api/routers/team/getTopThree')
      .then(response => response.json())
      .then(data => setTopThree(data.topThree))
      .catch(error => console.error('Error fetching top three:', error));
  }, []);
  const maxScore = Math.max(...topThree.map(c => c.score));
  return (
    <>
      <div className="absolute top-0 right-0 m-4">
        <Link href="/relativeLeaderboard" className="text-blue-500 hover:underline">
          Go to Another Page
        </Link>
      </div>
      <h1 className="text-5xl font-bold mb-4 text-center">Leaderboard</h1>
      <div className="p-6 w-1/2 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
        <ul className="list-decimal list-inside w-full">
          {topThree.map((team, index) => (
            <li key={index} className="p-4 bg-blue-100 rounded-lg mb-4 animate-width" style={{ animationName: `loading-${index}`, backgroundColor: `rgb(51, ${92 + 50 * index}, 255)`}}>
              <style>
                {`
                    @keyframes loading-${index} {
                    0% {
                      width: 150px;
                    }
                    100% {
                      width: ${(team.points / maxScore) * 100}%;
                    }
                  }
                `}
              </style>
              <h2 className="text-lg font-semibold">{team.teamName}</h2>
              <p className="mt-2">Score: {team.points}</p>
            </li>
          ))}
        </ul> 
        
    </div>
    <div></div>
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

