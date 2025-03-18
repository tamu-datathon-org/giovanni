import { CircleAlert } from "lucide-react";

export default function UnderConstructionPage() {
  return (
    <div className="max-w-3xl py-8 mx-auto">
      <div className="py-8 px-4 text-center rounded-md bg-white/90 shadow-md">
        <CircleAlert className="w-20 h-20 text-amber-500 mx-auto mb-3" />
        <h1 className="text-3xl font-[myfont] font-bold mb-4">
          Challenges Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you something amazing. Please check back soon!
        </p>
        <div className="mt-4 opacity-70">
          <p className="text-sm text-gray-500">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
