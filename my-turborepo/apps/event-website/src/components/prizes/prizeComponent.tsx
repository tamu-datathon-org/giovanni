"use client";

type PrizeProps = {
  prizesData: { title: string; description: string; image: string }[];
};

export default function PrizesComponent({ prizesData }: PrizeProps) {
  return (
    <div
      id="Prizes"
      className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-4"
    >
      <h2 className="font-squid-game text-5xl font-bold text-white">
        <span className="text-pink-500">[</span> Prizes{" "}
        <span className="text-pink-500">]</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prizesData.map((prize, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-pink-500 bg-black shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full p-4 text-center">
              <h3 className="text-neon-green text-lg font-semibold">
                {prize.title}
              </h3>
            </div>
            <div className="border-t border-pink-500 bg-black p-4 text-center">
              <img
                src={prize.image}
                alt={prize.title}
                className="mx-auto mb-4 h-32 w-32 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
