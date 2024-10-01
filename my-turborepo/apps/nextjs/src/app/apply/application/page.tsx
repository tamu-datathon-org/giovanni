"use client"

import { ApplicationForm } from "~/app/_components/application-form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-auto">
        <div className="lg:h-10 flex-grow" />
        <div className="font-XPfont flex justify-center">
          <Suspense fallback={<h1>Loading... please wait</h1>}>

            <ApplicationForm />
          </Suspense>
        </div>
        <div className="lg:h-10 flex-grow" />
      </div>
    </>
  );
}
