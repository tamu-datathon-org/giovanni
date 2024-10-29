import { Suspense } from "react";
import { VettingTable } from "~/app/_components/organizer/vetting-table";
export default function Page() {
    return (
        <div className="w-screen h-screen justify-center flex bg-cyan-600">
            <Suspense fallback={<div>Loading...</div>}>
                <VettingTable />
            </Suspense>
        </div>
    )
};