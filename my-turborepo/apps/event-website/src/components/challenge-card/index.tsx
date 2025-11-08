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
      className="group cursor-pointer rounded-2xl border border-amber-100 bg-gradient-to-br from-[#FEF7EE] to-amber-50 p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 min-h-[240px] flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 to-amber-200/0 group-hover:from-amber-100/30 group-hover:to-amber-200/20 transition-all duration-300 rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-2xl font-serif text-gray-900 group-hover:text-amber-900 transition-colors">
            {name}
          </h3>
          <svg
            className="w-6 h-6 text-amber-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        
        <p className="text-gray-700 text-base leading-relaxed flex-grow">
          {description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-amber-200">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <p className="text-sm font-semibold text-amber-900 leading-relaxed">
              {prize}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}