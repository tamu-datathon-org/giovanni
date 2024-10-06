"use client";

import { Suspense } from "react";

import { ApplicationForm } from "~/app/_components/application-form";

export default async function Page() {
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-auto">
        <div className="flex-grow lg:h-10" />
        <div className="font-XPfont flex justify-center">
          <Suspense fallback={<h1>Loading... please wait</h1>}>
            <ApplicationForm />
          </Suspense>
        </div>
        <div className="flex-grow lg:h-10" />
      </div>
    </>
  );
}
