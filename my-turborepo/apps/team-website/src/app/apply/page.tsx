"use client";

import { useEffect, useRef, useState } from "react";
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

// ---------- Confetti ----------
function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      rotation: number;
      speed: number;
      drift: number;
    }[] = [];

    const colors = [
      "#ff6b6b",
      "#ffd93d",
      "#6bcb77",
      "#4d96ff",
      "#ff922b",
      "#cc5de8",
      "#f06595",
      "#74c0fc",
    ];

    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)]!,
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 2,
        drift: Math.random() * 2 - 1,
      });
    }

    let frame: number;
    let elapsed = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elapsed++;

      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;
        p.rotation += 2;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      }

      if (elapsed < 300) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

// ---------- Decision Banner ----------
function DecisionBanner({
  status,
  isLoading,
  gradient,
}: {
  status?: string;
  isLoading: boolean;
  gradient: string;
}) {
  const statusLabel = isLoading
    ? "LOADING..."
    : status
      ? status.toUpperCase()
      : "NO APPLICATION FOUND";

  const statusMessage: Record<string, string> = {
    accepted: "🎉 Congratulations! You've been accepted!",
    rejected: "Thank you for applying. Unfortunately you were not selected.",
    waitlisted: "You're on the waitlist — hang tight!",
    pending: "Your application is under review.",
    checkedin: "✅ You're checked in! Welcome to the event.",
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
      <div className="mb-1 text-sm font-medium uppercase tracking-widest text-white/60">
        Application Status
      </div>
      <div
        className={`bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl ${gradient}`}
      >
        {statusLabel}
      </div>
      {status && (
        <p className="mt-2 text-sm text-white/70">
          {statusMessage[status] ?? ""}
        </p>
      )}
    </div>
  );
}

// ---------- QR Code Card ----------
function QRCard({ qrCode }: { qrCode: string }) {
  async function handleSave() {
    try {
      const res = await fetch(qrCode, { mode: "cors" });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

      const blob = await res.blob();
      const type = blob.type || "image/png";
      const fileName = "Check_In_QR_Code.png";
      const file = new File([blob], fileName, { type });

      if (!navigator.share || !navigator.canShare) {
        throw new Error("Web Share API not supported");
      }

      if (!navigator.canShare({ files: [file] })) {
        throw new Error("This device/browser cannot share this file");
      }

      await navigator.share({
        files: [file],
        title: "Check-in QR Code",
      });

      toast({
        title: "QR Code shared",
        description: "On iPhone, choose Save Image or Add to Photos.",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to share QR code";

      try {
        const a = document.createElement("a");
        a.href = qrCode;
        a.download = "check-in-qr.png";
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast({
          title: "Download Started Successfully",
          description: "Check your downloads folder",
        });
      } catch {
        toast({
          title: "Could not save QR code",
          description: "Please take a screenshot instead",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="text-lg font-semibold text-white">Check-in QR Code</div>
      <p className="text-sm text-white/60">
        Click the QR code to save it as an image
      </p>
      <button
        onClick={handleSave}
        className="group relative mx-auto cursor-pointer overflow-hidden rounded-xl border-4 border-gray-400 p-2 transition-all hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
        title="Click to save QR code"
      >
        <div className="relative h-48 w-48">
          <Image
            src={qrCode}
            alt="Check-in QR Code"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-sm font-semibold text-white">⬇ Save Image</span>
        </div>
      </button>
    </div>
  );
}

// ---------- Main Page ----------
export default function Page() {
  const { session, setSession } = useAuthRedirect();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiShown = useRef(false);

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

  const { data, isLoading, refetch } =
    api.application.getApplicationStatus.useQuery(
      { eventName: EVENT_NAME },
      { enabled: !!EVENT_NAME, retry: 2 },
    );

  const updateInvitation = api.application.updateInvitationStatus.useMutation({
    onSuccess: () => {
      toast({
        title: "Response saved!",
        description: "Your invitation response has been updated successfully.",
      });
      void refetch();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description:
          "Could not update your invitation status. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const fetchQRCode = async () => {
      if (data?.status !== "rejected") {
        const qr = await generateQR(data?.email ?? "");
        setQrCode(qr);
      }
    };
    void fetchQRCode();

    if (data?.status === "accepted" && !confettiShown.current) {
      confettiShown.current = true;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [data]);

  let gradient = "from-blue-400 to-cyan-500";
  if (!isLoading) {
    switch (data?.status) {
      case "pending":
        gradient = "from-gray-300 to-cyan-500";
        break;
      case "accepted":
        gradient = "from-pink-400 to-cyan-400";
        break;
      case "rejected":
        gradient = "from-red-400 to-orange-500";
        break;
      case "checkedin":
        gradient = "from-green-400 to-emerald-500";
        break;
      case "waitlisted":
        gradient = "from-yellow-400 to-amber-500";
        break;
    }
  }

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="flex min-h-screen w-full justify-center px-4 py-24">
        <div className="w-full max-w-4xl">
          <div className="mx-auto flex w-full flex-col gap-6 text-white">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold md:text-4xl">
                Applicant Dashboard
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Logged in as{" "}
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                  {session?.user.email}
                </span>
              </p>
            </div>

            {/* Decision Banner */}
            <DecisionBanner
              status={data?.status}
              isLoading={isLoading}
              gradient={gradient}
            />

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* QR Code */}
                {qrCode && <QRCard qrCode={qrCode} />}

                {/* Event Info */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-3 text-lg font-semibold">
                    📅 Event Info
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    <div>
                      <span className="text-white/50">Event:</span> TAMU
                      Datathon Lite
                    </div>
                    <div>
                      <span className="text-white/50">Date:</span> April 11,
                      2026
                    </div>
                    <div>
                      <span className="text-white/50">Location:</span> Texas A&M
                      University
                    </div>
                    <div>
                      <span className="text-white/50">Contact:</span>{" "}
                      <span className="text-cyan-400">
                        connect@tamudatathon.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* Your Application */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-3 text-lg font-semibold">
                    📋 Your Application
                  </div>
                  <div className="flex flex-col gap-3">
                    {appsOpen && (
                      <Button
                        className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                        size="lg"
                        type="button"
                      >
                        <Link
                          href="/apply/application"
                          className="w-full text-white"
                        >
                          {data?.status
                            ? "View / Edit Application"
                            : "Start Application"}
                        </Link>
                      </Button>
                    )}
                    {!appsOpen && (
                      <p className="text-sm text-white/60">
                        Applications are closed. We are reviewing submissions —
                        keep an eye on your email!
                      </p>
                    )}
                  </div>
                </div>

                {/* Accept / Decline — only shown when accepted */}
                {data?.status === "accepted" && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="mb-1 text-lg font-semibold">
                      🎟️ Admission Offer Response
                    </div>
                    <p className="mb-4 text-sm text-white/60">
                      Let us know whether you accept or decline your offer.
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() =>
                          updateInvitation.mutate({
                            eventName: EVENT_NAME,
                            email: session?.user.email ?? "",
                            newStatus: true,
                          })
                        }
                        disabled={updateInvitation.isPending}
                        className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
                      >
                        {updateInvitation.isPending
                          ? "Saving..."
                          : "Accept Offer"}
                      </button>
                      <button
                        onClick={() =>
                          updateInvitation.mutate({
                            eventName: EVENT_NAME,
                            email: session?.user.email ?? "",
                            newStatus: false,
                          })
                        }
                        disabled={updateInvitation.isPending}
                        className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
                      >
                        {updateInvitation.isPending
                          ? "Saving..."
                          : "Decline Offer"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-3 text-lg font-semibold">
                    🔗 Quick Links
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                      size="sm"
                      type="button"
                    >
                      <Link
                        href="https://tamudatathon.com/"
                        target="_blank"
                        className="w-full text-white"
                      >
                        Event Website
                      </Link>
                    </Button>
                    <Button
                      className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                      size="sm"
                      type="button"
                    >
                      <Link
                        href="https://discord.com/invite/pHsNmjuWSc"
                        target="_blank"
                        className="w-full text-white"
                      >
                        Discord
                      </Link>
                    </Button>
                    <Button
                      className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                      size="sm"
                      type="button"
                    >
                      <Link
                        href="https://www.instagram.com/tamudatathon/"
                        target="_blank"
                        className="w-full text-white"
                      >
                        Instagram
                      </Link>
                    </Button>
                    <Button
                      className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                      size="sm"
                      type="button"
                    >
                      <Link
                        href="https://www.youtube.com/@tamu-datathon/featured"
                        target="_blank"
                        className="w-full text-white"
                      >
                        YouTube
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Account */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-3 text-lg font-semibold">⚙️ Account</div>
                  <Button
                    onClick={signOutHandler}
                    className="bg-datadarkblue hover:bg-datadarkblue/70 w-full text-white"
                    size="lg"
                    type="button"
                  >
                    Change Accounts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    <GradientButton
      className="bg-datadarkblue hover:bg-datadarkblue/70 w-fit text-white"
      size="lg"
      type="button"
    >
      <Link href="/apply/application">
        {status ? "View/Edit Application" : "Start Application"}
      </Link>
    </GradientButton>
  );
}
