import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ApplicationForm } from "~/app/apply/application/application-form";
import { appsOpen } from "../page";

export default async function Page() {
  if (!appsOpen) {
    redirect("/apply");
  }

  return (
    <>
      <div className="min-h-screen px-4 font-XPfont flex justify-center py-20 mt-5">
        <Suspense fallback={<h1>Loading... please wait</h1>}>
          <ApplicationForm />
        </Suspense>
      </div>
    </>
  );
}
