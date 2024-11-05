"use client"

import Link from "next/link";
import StaticWindowContainer from "../_components/StaticWindowContainer";
import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";


export default function Page() {
  // TODO: Replace this with an API call to the correct router
  const { data, isLoading } = api.application.getApplicationStatus.useQuery({
    eventName: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
  }, {
    enabled: !!process.env.NEXT_PUBLIC_EVENT_NAME,
    retry: 2,
  });

  if (!isLoading && data === undefined) {
    toast({
      variant: "destructive",
      title: "Failed to load status",
      description: "Please refresh the page.",
    })
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
    }
  }

  // TODO: Replace this variable with an api route that checks the latest event
  const appsOpen = false;

  return (
    <>
      {/* <IconList /> */}
      <div className="w-screen h-screen flex justify-center items-center">
        <StaticWindowContainer>
          <div className="mainContent py-4">
            <h1 className="text-3xl">DASHBOARD</h1>

            <form
              className="vertical boxShadowContainer"
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "75vw",
                padding: "10px",
              }}
            >
              <div className="dashboardText text-2xl"> YOUR APPLICATION STATUS:</div>
              <div
                className={`dashStatus text-transparent bg-clip-text bg-gradient-to-b 
                  ${gradient} text-xl
                  `}
              >
                {isLoading ? "Loading...".toUpperCase() : data?.status ? data.status.toUpperCase() : "No status available"}
              </div>

              {appsOpen ? <AppsOpenMessage /> : <AppsClosedMessage />}

              <Button className="xpBorder submitBtn my-4 w-fit bg-cyan-700 text-xl font-extrabold">
                <Link href="/">
                  Back to home
                </Link>
              </Button>
            </form>
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
      Feel free to contact <span className="text-cyan-700">connect@tamudatathon.com</span> for any issues.
    </div>
  );
}

function AppsOpenMessage() {
  return (
    <button className="editButton">
      <Link className="dashboardText buttonText text-xl" href="/apply/application">
        Edit your application
      </Link>
    </button>
  );
}
