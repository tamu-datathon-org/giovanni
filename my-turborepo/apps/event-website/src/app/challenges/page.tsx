import { CircleAlert } from "lucide-react";

export default function UnderConstructionPage() {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="rounded-md bg-white/90 px-4 py-8 text-center shadow-md">
        <CircleAlert className="mx-auto mb-3 h-20 w-20 text-amber-500" />
        <h1 className="mb-4 font-[myfont] text-3xl font-bold">
          Challenges Under Construction
        </h1>
        <p className="mb-6 text-gray-600">
          We're working hard to bring you something amazing. Please check back
          soon!
        </p>
        <div className="mt-4 opacity-70">
          <p className="text-sm text-gray-500">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
