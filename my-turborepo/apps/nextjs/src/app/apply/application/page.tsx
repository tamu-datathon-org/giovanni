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
      <div className="min-h-screen font-XPfont flex justify-center py-16">
        <Suspense fallback={<h1>Loading... please wait</h1>}>
          <ApplicationForm />
        </Suspense>
      </div>
    </>
  );
}
