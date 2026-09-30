"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toDataURL } from "qrcode";

import { authClient } from "@vanni/auth/client";

import { useAuthRedirect } from "~/app/_components/auth/useAuthRedirect";
import { kodeMono } from "~/app/_components/fonts";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { EVENT_NAME } from "./application/application-form";

export const appsOpen = true;

const ASSETS = "/images/dashboard";

/** Figma 815:372 — dashboard palette. */
const INK = {
  page: "#2E6691",
  panelBorder: "#E4E4E2",
  card: "#D9D9D9",
  cardBorder: "#8FABC1",
  button: "#BCCFDE",
  buttonBorder: "#D9D9D9",
  deep: "#2E6691",
  decline: "#377BB0",
  stepActive: "#5BBFF1",
  stepIdle: "#D9D9D9",
  hatch: "#FF9A42",
} as const;

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

    const colors = [
      "#5BBFF1",
      "#BCCFDE",
      "#FF9A42",
      "#F98861",
      "#E9F6FF",
      "#ffffff",
    ];
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      rotation: Math.random() * 360,
      speed: 2 + Math.random() * 3,
      drift: -1 + Math.random() * 2,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.speed;
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  );
}

// ---------- Status -> progress step + headline ----------
const STEPS = ["no application", "applied", "decisions"] as const;

function statusView(status?: string, isLoading?: boolean) {
  if (isLoading) return { step: 0, headline: "loading ....." };
  switch (status) {
    case "pending":
      return { step: 1, headline: "application submitted ....." };
    case "accepted":
      return { step: 2, headline: "you're in! see you there ....." };
    case "checkedin":
      return { step: 2, headline: "checked in ....." };
    case "waitlisted":
      return { step: 2, headline: "you're on the waitlist ....." };
    case "rejected":
      return { step: 2, headline: "not selected this time ....." };
    default:
      return { step: 0, headline: "no application found ....." };
  }
}

// ---------- Building blocks ----------
/** Section marker: the small triangle sitting left of every panel. */
function Marker({ className = "" }: { className?: string }) {
  return (
    <Image
      src={`${ASSETS}/marker.svg`}
      alt=""
      width={22}
      height={35}
      className={`h-[26px] w-[16px] shrink-0 xl:h-[35px] xl:w-[22px] ${className}`}
    />
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Marker className="mt-4" />
      <div
        className={`flex-1 rounded-[20px] border-[5px] p-4 xl:p-5 ${className}`}
        style={{ borderColor: INK.panelBorder }}
      >
        <h2 className="font-kode text-[22px] font-semibold lowercase tracking-[-0.07em] text-white xl:text-[30px]">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  href,
  disabled,
  tone = "light",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  tone?: "light" | "deep";
}) {
  const cls =
    "mt-3 block w-full rounded-[20px] border-[5px] py-2 text-center font-kode text-[20px] font-bold lowercase tracking-[-0.07em] transition-opacity hover:opacity-90 disabled:opacity-50 xl:text-[30px]";
  const style =
    tone === "light"
      ? { backgroundColor: INK.button, borderColor: INK.buttonBorder, color: INK.deep }
      : { backgroundColor: INK.decline, borderColor: INK.buttonBorder, color: "#fff" };

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls} style={style}>
      {children}
    </button>
  );
}

/** Orange hatch rule flanking the "logged in as" line. */
function Hatch({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`select-none overflow-hidden whitespace-nowrap font-konkhmer text-[24px] uppercase leading-none xl:text-[36px] ${className}`}
      style={{ color: INK.hatch }}
    >
      ////////////////////////////
    </span>
  );
}

/**
 * Progress chevrons. The exported SVGs carry baked-in fills, so they are used
 * as masks and coloured from state — the shape stays exactly as designed while
 * the active step can follow the application status.
 */
function StepTrail({ step }: { step: number }) {
  return (
    <div className="flex flex-nowrap items-center">
      {STEPS.map((label, i) => (
        <div
          key={label}
          className={`relative h-[42px] w-[145px] shrink-0 xl:h-[51px] xl:w-[175px] ${
            i > 0 ? "-ml-[9px] xl:-ml-[11px]" : ""
          }`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: i === step ? INK.stepActive : INK.stepIdle,
              maskImage: `url(${ASSETS}/${i === 0 ? "step-chevron-first" : "step-chevron"}.svg)`,
              WebkitMaskImage: `url(${ASSETS}/${i === 0 ? "step-chevron-first" : "step-chevron"}.svg)`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center px-5 pl-7 text-center font-kode text-[14px] font-bold lowercase leading-none tracking-[-0.07em] xl:text-[20px]"
            style={{ color: INK.deep }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Figma 815:316-325 — three rounded dashes (107 x 5.7, 31px apart) leading
 * into the Union arrowhead. Not a single stretched arrow.
 */
function DashTrail() {
  return (
    <div
      className="flex origin-left scale-90 items-center gap-[31px] xl:scale-100"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[6px] w-[107px] shrink-0 rounded-full"
          style={{ backgroundColor: "#F98861" }}
        />
      ))}
      <Image
        src={`${ASSETS}/dashes-arrow.svg`}
        alt=""
        width={131}
        height={37}
        className="h-[37px] w-[131px] shrink-0"
      />
    </div>
  );
}

function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <Image
          key={i}
          src={`${ASSETS}/sparkle.svg`}
          alt=""
          width={75}
          height={86}
          className="-ml-4 h-[60px] w-[52px] first:ml-0 xl:h-[86px] xl:w-[75px]"
        />
      ))}
    </div>
  );
}

// ---------- Main Page ----------
export default function Page() {
  const { session, setSession } = useAuthRedirect();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiShown = useRef(false);
  const [qrCode, setQrCode] = useState<string>("");

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
    } catch {
      toast({
        title: "Sign-Out Error",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  }

  const generateQR = async (text: string): Promise<string> => {
    try {
      return await toDataURL(btoa(text));
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  const { data, isLoading, refetch } =
    api.application.getApplicationStatus.useQuery(
      { eventName: EVENT_NAME },
      { enabled: !!EVENT_NAME, retry: 2 },
    );

  const { data: event } = api.event.findByName.useQuery(EVENT_NAME, {
    enabled: !!EVENT_NAME,
  });

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
      if (data?.status && data.status !== "rejected") {
        setQrCode(await generateQR(data.email ?? ""));
      }
    };
    void fetchQRCode();

    if (data?.status === "accepted" && !confettiShown.current) {
      confettiShown.current = true;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [data]);

  const gridRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState<{ blue: number; orange: number }>({
    blue: -9999,
    orange: -9999,
  });

  const { step, headline } = statusView(data?.status, isLoading);

  // The blue arrow points at whatever needs attention: the offer once you are
  // accepted, then the check-in QR once the event is under way.
  const eventStarted = event?.startDate
    ? new Date() >= new Date(event.startDate)
    : false;
  const arrowTarget: "offer" | "qr" | null =
    eventStarted && qrCode
      ? "qr"
      : data?.status === "accepted"
        ? "offer"
        : null;

  /**
   * Line each arrow up with the panel it points at. The blue arrowhead sits
   * 64.6% down its SVG (tip at y=216.5 of 335) and the orange one is centred,
   * so the tips — not the boxes — are what get aligned.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const place = () => {
      const g = grid.getBoundingClientRect();
      const centerOf = (el: HTMLElement | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2 - g.top;
      };

      const blueTargetEl = arrowTarget === "offer" ? offerRef.current : qrRef.current;
      const blueCenter = centerOf(blueTargetEl);
      const blueH = blueRef.current?.offsetHeight ?? 0;

      const orangeCenter = centerOf(qrRef.current);
      const orangeH = orangeRef.current?.offsetHeight ?? 0;

      setArrowTop({
        blue: blueCenter === null ? -9999 : blueCenter - 0.646 * blueH,
        orange: orangeCenter === null ? -9999 : orangeCenter - orangeH / 2,
      });
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(grid);
    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [arrowTarget, qrCode, data?.status, isLoading]);

  return (
    <>
      {showConfetti && <Confetti />}

      <main
        className={`${kodeMono.variable} relative min-h-screen w-full overflow-hidden`}
        style={{ backgroundColor: INK.page }}
      >
        {/* decorative background */}
        <Image
          src={`${ASSETS}/noise.png`}
          alt=""
          width={650}
          height={650}
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 opacity-[0.07] mix-blend-overlay"
        />
        <Image
          src={`${ASSETS}/noise.png`}
          alt=""
          width={650}
          height={650}
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 opacity-[0.07] mix-blend-overlay"
        />
        <Image
          src={`${ASSETS}/bg-curves.svg`}
          alt=""
          width={936}
          height={776}
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 w-[700px] max-w-none opacity-80"
        />

        <div className="relative mx-auto w-full max-w-[1150px] px-5 py-16 xl:py-20">
          {/* header */}
          <h1 className="text-center font-kode text-[clamp(32px,6vw,60px)] font-bold lowercase leading-none tracking-[-0.07em] text-white">
            application dashboard
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Hatch className="hidden flex-1 text-right md:block" />
            <p className="whitespace-nowrap font-kode text-[15px] lowercase tracking-[-0.07em] text-white xl:text-[20px]">
              logged in as{" "}
              <span className="underline underline-offset-4">
                {session?.user.email ?? "_________"}
              </span>
            </p>
            <Hatch className="hidden flex-1 md:block" />
          </div>

          <div ref={gridRef} className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ---------- LEFT ---------- */}
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={`${ASSETS}/marker-lg.svg`}
                  alt=""
                  width={22}
                  height={35}
                  className="h-[26px] w-[16px] shrink-0 xl:h-[35px] xl:w-[22px]"
                />
                <div
                  className="flex-1 rounded-[20px] border-[5px] px-5 py-2"
                  style={{ borderColor: INK.panelBorder }}
                >
                  <h2 className="font-kode text-[22px] font-semibold lowercase tracking-[-0.07em] text-white xl:text-[30px]">
                    application status
                  </h2>
                </div>
              </div>

              <div className="pl-[28px] xl:pl-[34px]">
                <StepTrail step={step} />
              </div>

              {/* info card */}
              <div className="relative pl-[28px] xl:pl-[34px]">
                <div
                  className="relative min-h-[220px] rounded-[20px] border-[5px] px-6 pb-8 pt-4 xl:min-h-[260px] xl:pt-5"
                  style={{ backgroundColor: INK.card, borderColor: INK.panelBorder }}
                >
                  <span
                    className="inline-block rounded-[20px] border-[5px] px-5 py-1 font-kode text-[20px] lowercase tracking-[-0.07em] xl:text-[30px]"
                    style={{
                      backgroundColor: INK.button,
                      borderColor: INK.cardBorder,
                      color: INK.deep,
                    }}
                  >
                    info
                  </span>
                  <p
                    className="mt-8 font-kode text-[clamp(28px,4vw,50px)] lowercase leading-none tracking-[-0.07em]"
                    style={{ color: INK.deep }}
                  >
                    {headline}
                  </p>
                  <Sparkles className="absolute bottom-0 right-4 translate-y-1/3" />
                </div>
              </div>

            </div>

            {/* arrows float over the left column, aligned to their targets */}
            {arrowTarget && (
              <div
                ref={blueRef}
                className="pointer-events-none absolute left-0 hidden w-[calc(50%-12px)] lg:block"
                style={{ top: arrowTop.blue }}
                aria-hidden
              >
                <Image
                  src={`${ASSETS}/arrow-blue.svg`}
                  alt=""
                  width={521}
                  height={335}
                  className="ml-6 h-auto w-[calc(100%-24px)] max-w-[521px]"
                />
              </div>
            )}
            {arrowTarget === "offer" && qrCode && (
              <div
                ref={orangeRef}
                className="pointer-events-none absolute left-0 hidden w-[calc(50%-12px)] lg:block"
                style={{ top: arrowTop.orange }}
                aria-hidden
              >
                <div className="ml-[15px]">
                  <DashTrail />
                </div>
              </div>
            )}

            {/* ---------- RIGHT ---------- */}
            <div className="relative flex flex-col gap-4">
              <div
                className="pointer-events-none absolute -top-10 right-2 z-10 hidden items-start lg:flex"
                aria-hidden
              >
                <Image
                  src={`${ASSETS}/sparkle-lg.svg`}
                  alt=""
                  width={75}
                  height={86}
                  className="h-[86px] w-[75px]"
                />
                <Image
                  src={`${ASSETS}/dot.svg`}
                  alt=""
                  width={20}
                  height={20}
                  className="mt-1 h-[20px] w-[20px]"
                />
              </div>

              <Panel title="event info">
                <div className="mt-3 space-y-2 font-kode text-[17px] lowercase leading-none tracking-[-0.07em] text-white xl:text-[25px]">
                  <p>
                    <span style={{ color: INK.button }}>event:</span> tamu
                    datathon
                  </p>
                  <p>
                    <span style={{ color: INK.button }}>date:</span> november
                    7-8th, 2026
                  </p>
                  <p>
                    <span style={{ color: INK.button }}>location:</span>{" "}
                    bethancourt ballroom- msc
                  </p>
                </div>
              </Panel>

              <Panel title="your application">
                {appsOpen ? (
                  <ActionButton href="/apply/application">
                    {data?.status ? "view / edit application" : "start application"}
                  </ActionButton>
                ) : (
                  <p className="mt-3 font-kode text-[16px] lowercase tracking-[-0.07em] text-white/70">
                    applications are closed — keep an eye on your email!
                  </p>
                )}
              </Panel>

              <Panel title="account">
                <ActionButton onClick={signOutHandler}>
                  change accounts
                </ActionButton>
              </Panel>

              {data?.status === "accepted" && (
                <div ref={offerRef}>
                  <Panel title="admission offer response">
                  <ActionButton
                    onClick={() =>
                      updateInvitation.mutate({
                        eventName: EVENT_NAME,
                        email: session?.user.email ?? "",
                        newStatus: true,
                      })
                    }
                    disabled={updateInvitation.isPending}
                  >
                    {updateInvitation.isPending ? "saving..." : "accept offer"}
                  </ActionButton>
                  <ActionButton
                    tone="deep"
                    onClick={() =>
                      updateInvitation.mutate({
                        eventName: EVENT_NAME,
                        email: session?.user.email ?? "",
                        newStatus: false,
                      })
                    }
                    disabled={updateInvitation.isPending}
                  >
                      {updateInvitation.isPending
                        ? "saving..."
                        : "decline offer"}
                    </ActionButton>
                  </Panel>
                </div>
              )}

              {qrCode && (
                <div ref={qrRef} className="flex items-start gap-3">
                  <Marker className="mt-4" />
                  <div
                    className="relative flex-1 rounded-[20px] border-[5px] px-5 pb-5 pt-4 xl:pt-5"
                    style={{
                      backgroundColor: INK.card,
                      borderColor: INK.panelBorder,
                    }}
                  >
                    <span
                      className="inline-block rounded-[20px] border-[5px] px-4 py-1 font-kode text-[18px] font-semibold lowercase tracking-[-0.07em] xl:text-[30px]"
                      style={{
                        backgroundColor: INK.button,
                        borderColor: INK.cardBorder,
                        color: INK.deep,
                      }}
                    >
                      check in qr code
                    </span>
                    <div className="mt-5 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrCode}
                        alt="Your check-in QR code"
                        className="h-[240px] w-[240px] rounded-[8px] bg-white p-3"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
