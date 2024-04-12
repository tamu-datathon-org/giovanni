/* page.tsx */
import './styles.css';
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const competitors = [
    { name: 'Competitor 1', score: 100 },
    { name: 'Competitor 2', score: 90 },
    { name: 'Competitor 3', score: 80 },
  ];
  const maxScore = Math.max(...competitors.map(c => c.score));
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
      <div className="p-6 w-1/2 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
        <ul className="list-decimal list-inside w-full">
          {competitors.map((competitor, index) => (
            <li key={index} className="p-4 bg-blue-100 rounded-lg mb-4 animate-width" style={{ animationName: `loading-${index}`}}>
              <style>
                {`
                  @keyframes loading-${index} {
                    0% {
                      width: 150px;
                    }
                    100% {
                      width: ${(competitor.score / maxScore) * 100}%;
                    }
                  }
                `}
              </style>
              <h2 className="text-lg font-semibold">{competitor.name}</h2>
              <p className="mt-2">Score: {competitor.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
