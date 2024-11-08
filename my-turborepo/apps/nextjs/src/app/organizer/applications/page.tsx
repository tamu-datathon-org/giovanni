import { Suspense } from "react";

import { VettingTable } from "~/app/_components/organizer/vetting-table";

export default function Page() {
  return (
    <div className="flex h-screen w-screen justify-center bg-cyan-600">
      <Suspense fallback={<div>Loading...</div>}>
        <VettingTable />
      </Suspense>
    </div>
  );
}
