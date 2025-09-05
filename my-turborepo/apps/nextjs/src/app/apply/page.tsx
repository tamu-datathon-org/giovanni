"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toDataURL } from "qrcode";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { EVENT_NAME } from "./application/application-form";
import { useAuthRedirect } from "~/app/_components/auth/useAuthRedirect";
import { authClient } from '@vanni/auth/client';
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";

export const appsOpen = false;

export default function Page() {
  const { session, setSession } = useAuthRedirect();
  const router = useRouter();

  async function signOutHandler() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setSession(null);
            router.push('/login?callbackUrl=/apply');
          }
        }
      });
    } catch (error) {
      toast({
        title: "Sign-Out Error",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  }

  const generateQR = async (text: string): Promise<string> => {
    try {
      const parseText = btoa(text);
      return await toDataURL(parseText);
    } catch (err) {
      console.error(err);
      return "";
    }
  };
  const [qrCode, setQrCode] = useState<string>("");

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

  useEffect(() => {
    const fetchQRCode = async () => {
      if (data?.status === "accepted" || data?.status === "checkedin") {
        const qr = await generateQR(data?.email ?? "");
        setQrCode(qr);
      }
    };
    void fetchQRCode();
  }, [data]);

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
      <div className="flex w-screen items-center justify-center pt-24 pb-24">
        <div className="text-center align-center flex w-[75vw] flex-col justify-center p-6 py-4 bg-slate-200 rounded-lg dark:bg-slate-400">
          <div className="flex-1 text-black dark:text-white">
            <h1 className="pb-8 text-3xl font-bold">DASHBOARD</h1>
            <div>
              <div className="">
                Signed in as: {session?.user.email}
              </div>
              <div className="text-xl font-bold">
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
                <div className="border-4 border-gray-300 rounded-lg p-4 my-4 mx-auto w-fit">
                  <div>
                    <div className="dashboardText text-xl">
                      QR Code for Check-in:
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-200">
                      Scan this QR code at the check-in desk!
                    </div>
                  </div>
                  <div className="mx-auto relative w-40 h-40 md:h-52 md:w-52">
                    <Image
                      src={qrCode}
                      alt="example.com"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div>
                {appsOpen ? <AppsOpenMessage /> : <AppsClosedMessage />}
              </div>
              <Button onClick={signOutHandler} className="mx-auto my-4 w-fit text-xl font-extrabold bg-cyan-700 hover:bg-cyan-700 hover:bg-opacity-70">
                Sign Out
              </Button>
            </div>
          </div>
          <Link href="https://tamudatathon.com/" target="_blank">
            <Button className="mx-auto my-4 w-fit text-xl font-extrabold bg-cyan-700 hover:bg-cyan-700 hover:bg-opacity-70">
              Back to event
            </Button>
          </Link>
        </div>
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
