import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ApplicationForm } from "~/app/apply/application/application-form";
import { appsOpen } from "../page";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!appsOpen) {
    redirect("/apply");
  }

  return (
    <>
      {/* Page-wide keyboard focus ring; the back link and the field controls
          override it. */}
      <div className="min-h-screen bg-td-page font-kode text-[14px] text-td-ink [&_:focus-visible]:outline [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-td-deep">
        <Suspense
          fallback={
            // Same as the form's own loading state.
            <p className="grid min-h-[70vh] place-items-center p-8 text-td-paper">
              Loading... please wait
            </p>
          }
        >
          <ApplicationForm />
        </Suspense>
      </div>
    </>
  );
}
