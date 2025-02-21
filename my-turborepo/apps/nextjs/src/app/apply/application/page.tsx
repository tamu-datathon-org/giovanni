"use client";

import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ApplicationForm } from "~/app/apply/application/application-form";

// TODO: Replace this variable with an api route that checks the latest event
const appsOpen = false;

export default async function Page() {
  if (!appsOpen) {
    redirect("/apply");
  }
  return (
    <>
      <div className="absolute top-0 h-screen w-screen overflow-auto bg-black bg-opacity-70">
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
