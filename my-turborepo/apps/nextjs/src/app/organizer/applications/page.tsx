import { Suspense } from "react";
import { VettingTable } from "~/app/_components/organizer/vetting-table";
export default function Page() {
    return (
        <div className="w-screen h-full justify-center max-h-screen flex overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
                <VettingTable />
            </Suspense>
        </div>
    )
};