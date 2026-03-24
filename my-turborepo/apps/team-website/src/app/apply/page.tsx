"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toDataURL } from "qrcode";

import { authClient } from "@vanni/auth/client";
import { Button } from "@vanni/ui/button";

import { useAuthRedirect } from "~/app/_components/auth/useAuthRedirect";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { GradientButton } from "../_components/GradientButton";
import { EVENT_NAME } from "./application/application-form";

export const appsOpen = true;

export default function Page() {
  const { session, setSession } = useAuthRedirect();
  const router = useRouter();
  const [offerDecision, setOfferDecision] = useState<
    "accepted" | "declined" | null
  >(null);

  async function signOutHandler() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setSession(null);
            router.push("/login?callbackUrl=/apply");
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
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

  const hasSession = !!session;

  const { data, isLoading, error } =
    api.application.getApplicationStatus.useQuery(
      {
        eventName: EVENT_NAME,
      },
      {
        enabled: !!EVENT_NAME && hasSession,
        retry: 2,
      },
    );

  useEffect(() => {
    if (error) {
      console.error("Application status query error", error);
    }
  }, [error]);

  useEffect(() => {
    const fetchQRCode = async () => {
      if (data?.status === "rejected") {
        return;
      }
      const qr = await generateQR(data?.email ?? "");
      setQrCode(qr);
    };
    void fetchQRCode();
  }, [data]);

  let color = "text-[#2d69df]";
  if (!isLoading) {
    switch (data?.status) {
      case "pending":
        color = "text-[#2d69df]";
        break;
      case "accepted":
        color = "text-[#007c00]";
        break;
      case "rejected":
        color = "text-[#b80000]";
        break;
      case "checkedin":
        color = "text-[#2d69df]";
        break;
      case "waitlisted":
        color = "text-[#f7d71f]";
        break;
    }
  }
  const updateInvitationStatusMutation =
    api.application.updateInvitationStatus.useMutation({
      onError: () => {
        toast({
          title: "Update failed",
          description: "Could not update invitation status.",
          variant: "destructive",
        });
      },
    });

  const handleOfferDecision = async (decision: "accepted" | "declined") => {
    updateInvitationStatusMutation.mutateAsync({
      eventName: EVENT_NAME ?? "",
      email: session?.user.email ?? "",
      newStatus: decision === "accepted",
    });
    setOfferDecision(decision);
    toast({
      title: "Update Successful",
      description:
        decision === "accepted" ? "Offer accepted" : "Offer declined",
      variant: "success",
    });
  };

  return (
    <>
      <div className="my-20 flex w-screen items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center text-white">
          {/* Header */}
          <section className="flex w-full flex-col items-center justify-center text-center">
            <h1 className="py-2 text-2xl font-medium md:text-3xl">
              Applicant Dashboard
            </h1>
            <p className="mt-1 w-fit rounded-md bg-[#2d69df] px-4 py-2 text-sm text-white/80">
              Logged in as {session?.user.email}
            </p>
          </section>

          {/* Status card */}
          <section className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-4">
            <p className="mb-1 text-sm font-medium uppercase tracking-wide text-white/80">
              Application status
            </p>
            <p className={`bg-clip-text text-xl font-medium ${color}`}>
              {isLoading
                ? "Loading...".toUpperCase()
                : data?.status
                  ? data.status.toUpperCase()
                  : "No Application Found"}
            </p>
          </section>

          {/* QR code (when available) */}
          {qrCode && (
            <section className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-4">
              <p className="mb-3 text-sm font-medium">
                Scan this QR code for check-in
              </p>
              <div className="mx-auto w-fit rounded-lg border-2 border-white/30 bg-white/10 p-3">
                <div className="relative aspect-square w-40 md:w-52">
                  <Image
                    src={qrCode}
                    alt="Check-in QR code"
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Offer response for accepted applicants (frontend-only) */}
          {data?.status === "accepted" && (
            <section className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-4">
              <p className="mb-3 text-sm font-medium">
                Admission offer response
              </p>
              <p className="mb-4 text-sm text-white/80">
                Let us know whether you accept or decline your offer.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="w-full bg-[#007c00] hover:bg-[#007c00]/80"
                  type="button"
                  onClick={() => handleOfferDecision("accepted")}
                >
                  Accept Offer
                </Button>
                <Button
                  className="w-full bg-[#b80000] hover:bg-[#b80000]/80"
                  type="button"
                  onClick={() => handleOfferDecision("declined")}
                >
                  Decline Offer
                </Button>
              </div>
              {offerDecision && (
                <p className="mt-3 text-sm text-white/80">
                  You selected:{" "}
                  <span className="font-semibold uppercase">
                    {offerDecision}
                  </span>
                </p>
              )}
            </section>
          )}

          {/* Primary action */}
          <section>
            <AppsOpenMessage status={data?.status} />
          </section>

          {/* Secondary actions */}
          <section className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={signOutHandler}
              className="bg-datadarkblue hover:bg-datadarkblue/70 w-full sm:w-fit"
              size="lg"
              type="button"
            >
              Change Accounts
            </Button>
            <Button
              className="bg-datadarkblue hover:bg-datadarkblue/70 w-full sm:w-fit"
              size="lg"
              type="button"
              asChild
            >
              <Link href="https://tamudatathon.com/" target="_blank">
                Visit Event Website
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}

function _AppsClosedMessage() {
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
    <GradientButton
      className="hover:bg-datadarkblue/70 w-fit bg-black text-white"
      size="lg"
      type="button"
    >
      <Link href="/apply/application">
        {status ? "View/Edit Application" : "Start Application"}
      </Link>
    </GradientButton>
    // <div>
    //   {status === "accepted" ? (
    //     <AppsClosedMessage />
    //   ) : (
    //     <div>
    //       Applications are OPEN FOR WALK-INS
    //       <br />
    //       After applying, the Applicant Dashboard will display a qrcode to scan
    //       <br />
    //       Feel free to contact an organizer for any issues.
    //       <br />
    //       <br />
    //       <GradientButton className="text-white bg-datadarkblue hover:bg-datadarkblue/70 w-fit" size="lg" type="button">
    //         <Link href="/apply/application">
    //           {status ? "View/Edit Application" : "Start Application"}
    //         </Link>
    //       </GradientButton>
    //     </div>
    //   )}
    // </div>
  );
}
