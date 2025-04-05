"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toDataURL } from "qrcode";

import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import StaticWindowContainer from "../_components/StaticWindowContainer";
import { EVENT_NAME } from "./application/application-form";

export const appsOpen = false;

export default function Page() {
  const generateQR = async (text: string): Promise<string> => {
    try {
      return await toDataURL(text);
    } catch (err) {
      console.error(err);
      return "";
    }
  };
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    const fetchQRCode = async () => {
      if (data?.status === "accepted" || data?.status === "checkedin") {
        const qr = await generateQR(session?.user.email ?? "");
        setQrCode(qr);
      }
    };
    void fetchQRCode();
  }, []);
  const { data: session } = useSession();
  // TODO: Replace this with an API call to the correct router
  const { data, isLoading } = api.application.getApplicationStatus.useQuery(
    {
      eventName: EVENT_NAME,
    },
    {
      enabled: !!EVENT_NAME,
      retry: 2,
    },
  );

  if (!isLoading && data === undefined) {
    // toast({
    //   variant: "destructive",
    //   title: "Failed to load status",
    //   description: "Please refresh the page.",
    // });
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
  if (data?.status === "accepted" || data?.status === "checkedin") {
  }
  return (
    <>
      {/* <IconList /> */}
      <div className="flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
        <StaticWindowContainer>
          <div className="align-center flex h-[60vh] w-[75vw] flex-col justify-center p-6 py-4">
            <div className="flex-1">
              <h1 className="pb-8 text-3xl text-black">DASHBOARD</h1>
              <div>
                <div className="text-black">
                  Signed in as: {session?.user.email}
                </div>
                <div className="dashboardText text-xl text-black">
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
                      : "No Application Found"}
                </div>
                {qrCode && (
                  <div className="relative h-52 w-52">
                    <Image
                      src={qrCode}
                      alt="example.com"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  {appsOpen ? <AppsOpenMessage /> : <AppsClosedMessage />}
                </div>
                <Link href="/api/auth/signout/" target="_blank">
                  <Button className="xpBorder submitBtn mx-auto my-4 w-fit text-xl font-extrabold">
                    Sign Out
                  </Button>
                </Link>
              </div>
            </div>
            <Link href="https://tamudatathon.com/" target="_blank">
              <Button className="xpBorder submitBtn mx-auto my-4 w-fit text-xl font-extrabold">
                Back to event
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
