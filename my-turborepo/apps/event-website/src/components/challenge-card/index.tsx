"use client";

interface ChallengeCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

export default function ChallengeCard({ name, description, onClick }: ChallengeCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition"
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
