"use client";

export default function Info() {
  const competitors = [
    { name: 'Competitor 1', score: 110 },
    { name: 'Competitor 2', score: 105 },
    { name: 'Competitor 3', score: 60 },
  ];

  // Assuming the current user is Competitor 2
  const currentUser = competitors.find(c => c.name === 'Competitor 2');
  const currentUserIndex = competitors.indexOf(currentUser!);
  const personBehind = competitors[currentUserIndex + 1]; 
  const personAhead = competitors[currentUserIndex - 1];

  const pointsBehind = personBehind ? currentUser.score - personBehind.score: 0;
  const pointsAhead = personAhead ? personAhead.score - currentUser.score : 0;

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
      return isAhead ? `${50 + positionPercentage}%` : `${50 -positionPercentage}%`;
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold mb-4 text-center text-blue-600">Leaderboard</h1>
      
      <div className="p-6 w-full h-full mx-auto rounded-xl shadow-md flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-center space-x-4 w-full items-center">
          <div className="w-full relative">
            {personBehind && (
              <div className="absolute flex flex-col items-center justify-center" style={{left: getPosition(pointsBehind, false, false), transform: 'translate(-50%, -50%)'}}>
                <div className="bg-blue-100 w-8 h-8 rounded-full shadow-lg"></div>
                <p className="mt-2 text-center text-blue-700">-{pointsBehind} points</p>
              </div>
            )}
            {currentUser && (
              <div className="absolute flex flex-col items-center justify-center" style={{left: getPosition(0, true, false), transform: 'translate(-50%, -50%)'}}>
                <div className="bg-green-100 w-8 h-8 rounded-full shadow-lg"></div>
                <p className="mt-2 text-center text-green-700">Score: {currentUser.score}</p>
              </div>
            )}
            {personAhead && (
              <div className="absolute flex flex-col items-center justify-center" style={{left: getPosition(pointsAhead, false, true), transform: 'translate(-50%, -50%)'}}>
                <div className="bg-red-100 w-8 h-8 rounded-full shadow-lg"></div>
                <p className="mt-2 text-center text-red-700">+{pointsAhead} points</p>
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