import { Suspense } from "react";

import AnalyticsDashboard from "~/app/_components/organizer/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-white">
          Loading analytics…
        </div>
      }
    >
      <AnalyticsDashboard />
    </Suspense>
  );
}
