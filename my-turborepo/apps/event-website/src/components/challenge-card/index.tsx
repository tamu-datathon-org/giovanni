"use client";

interface ChallengeCardProps {
  name: string;
  description: string;
  prize: string;
  onClick: () => void;
}

export default function ChallengeCard({ name, description, prize, onClick }: ChallengeCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-8 shadow-sm hover:shadow-md transition bg-[#FEF7EE] min-h-[200px] flex flex-col gap-3"
    >
      <h3 className="font-semibold text-2xl font-serif">{name}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      <p className="text-gray-600 text-base leading-relaxed">{prize}</p>
    </div>
  );
}