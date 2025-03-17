"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import StaticWindowContainer from "../_components/StaticWindowContainer";
import { useSession } from "next-auth/react"

export const appsOpen = true;

export default function Page() {
  const { data: session } = useSession()
  // TODO: Replace this with an API call to the correct router
  const { data, isLoading } = api.application.getApplicationStatus.useQuery(
    {
      eventName: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
    },
    {
      enabled: !!process.env.NEXT_PUBLIC_EVENT_NAME,
      retry: 2,
    },
  );

  if (!isLoading && data === undefined) {
    toast({
      variant: "destructive",
      title: "Failed to load status",
      description: "Please refresh the page.",
    });
  }
  let gradient = "from-blue-400 to-cyan-700";
  if (!isLoading) {
    switch (data?.status) {
      case "pending":
        gradient = "from-gray-400 to-cyan-700";
        break;
      case "accepted":
        gradient = "from-pink-500 to-cyan-700";
        break;
      case "rejected":
        gradient = "from-red-500 to-cyan-700";
        break;
      case "checkedin":
        gradient = "from-green-500 to-cyan-700";
        break;
      case "waitlisted":
        gradient = "from-yellow-500 to-cyan-700";
        break;
    }
  }

  return (
    <>
      {/* <IconList /> */}
      <div className="flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
        <StaticWindowContainer>
          <div className="py-4 flex flex-col justify-center align-center h-[60vh] w-[75vw] p-6">
            <div className="flex-1">
              <h1 className="text-3xl pb-8">DASHBOARD</h1>
              <div>
                <div>
                  Signed in as: {session?.user.email}
                </div>
                <div className="dashboardText text-2xl">
                  {" "}
                  YOUR APPLICATION STATUS:
                </div>
                <div
                  className={`dashStatus bg-gradient-to-b bg-clip-text text-transparent 
                    ${gradient} text-xl
                    `}
                >
                  {isLoading
                    ? "Loading...".toUpperCase()
                    : data?.status
                      ? data.status.toUpperCase()
                      : "No status available"}
                </div>

                <div>
                  {appsOpen ? <AppsOpenMessage /> : <AppsClosedMessage />}
                </div>

              </div>
            </div>
            <Link href="https://tamudatathon.com/" target="_blank">
              <Button className="xpBorder submitBtn my-4 w-fit text-xl font-extrabold mx-auto">
                Back to home
              </Button>
            </Link>
          </div>
        </StaticWindowContainer>
      </div>
    </>
  );
}

function AppsClosedMessage() {
  return (
    <div className="dashboardText text-xl">
      <br />
      Applications are currently closed.
      <br />
      We are currently reviewing applications.
      <br />
      Keep an eye out for an email!
      <br />
      <br />
      <br />
      Feel free to contact{" "}
      <span className="text-cyan-700">connect@tamudatathon.com</span> for any
      issues.
    </div>
  );
}

function AppsOpenMessage() {
  return (
    <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
      <Link
        className="dashboardText buttonText text-xl"
        href="/apply/application"
      >
        Edit your application
      </Link>
    </Button>
  );
}
