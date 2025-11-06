"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toDataURL } from "qrcode";

import { Button } from "@vanni/ui/button";
import { api } from "~/trpc/react";
import { EVENT_NAME } from "./application/application-form";
import { useAuthRedirect } from "~/app/_components/auth/useAuthRedirect";
import { authClient } from '@vanni/auth/client';
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";
import BackgroundContainer from "../_components/BackgroundContainer";
import { GradientButton } from "../_components/GradientButton";

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
      if (data?.status !== "rejected") {
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
      <div className="flex w-screen items-center justify-center my-24">
        <BackgroundContainer className="">
          <div className="text-center items-center flex w-[75vw] flex-col justify-center gap-4 text-white">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-medium">Applicant Dashboard</h1>
              <div className="mb-2">
                Logged in as: {session?.user.email}
              </div>
              <div className="text-xl font-medium">
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
                <div className="border-4 border-gray-400 rounded-lg p-2 my-2 mx-auto w-fit">
                  <div>
                    <div className="text-xl">
                      Scan this QR Code for Check-in:
                    </div>
                  </div>
                  <div className="mx-auto relative w-[80vw] aspect-[1/1] md:h-52 md:w-52">
                    <Image
                      src={qrCode}
                      alt="example.com"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {appsOpen ? <AppsOpenMessage status={data?.status} /> : <AppsClosedMessage />}
            </div>
            <Button onClick={signOutHandler} className="bg-datadarkblue hover:bg-datadarkblue/70 w-fit" size="lg" type="button">
              Change Accounts
            </Button>
            <Button className="bg-datadarkblue hover:bg-datadarkblue/70 w-fit" size="lg" type="button">
              <Link href="https://tamudatathon.com/" target="_blank">
                Visit Event Website
              </Link>
            </Button>
          </div>
        </BackgroundContainer>
      </div>
    </>
  );
}

function AppsClosedMessage() {
  return (
    <div className="text-md">
      <br />
      Applications are currently closed.
      <br />
      We are currently reviewing applications.
      <br />
      Keep an eye out for an email!
      <br />
      <br />
      Feel free to contact{" "}
      <span className="text-cyan-700">connect@tamudatathon.com</span> for any
      issues.
    </div>
  );
}

function AppsOpenMessage({ status }: { status?: string }) {
  return (
    <GradientButton className="text-white bg-datadarkblue hover:bg-datadarkblue/70 w-fit" size="lg" type="button">
      <Link
        href="/apply/application"
      >
        {status ? "View/Edit Application" : "Start Application"}
      </Link>
    </GradientButton>
  );
}
