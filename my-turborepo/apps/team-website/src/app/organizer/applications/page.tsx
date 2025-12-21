import { Suspense } from "react";

import { VettingTable } from "~/app/_components/organizer/vetting-table";

export default function Page() {
  return (
    <div className="flex max-h-screen w-screen justify-center overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <VettingTable />
      </Suspense>
    </div>
  );
}
