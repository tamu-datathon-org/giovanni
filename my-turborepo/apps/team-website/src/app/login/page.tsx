"use client";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaWindows } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { normalizeCallbackPath } from "@vanni/auth/callback-url";

import Chevrons from "~/components/Hero/Chevrons";
import { toast } from "~/hooks/use-toast";
import LoginButton from "../_components/auth/login_button";

const ASSETS = "/images/dashboard";

/**
 * Apply dashboard palette, laid over the homepage's graph paper. Tailwind needs
 * literal class names, so the provider buttons repeat these as hex values.
 */
const INK = {
  paper: "#E9F6FF",
  panel: "#2E6691",
  panelBorder: "#377BB0",
  button: "#BCCFDE",
  cardBorder: "#8FABC1",
  deep: "#2E6691",
  hatch: "#FF9A42",
  teal: "#10AEA4",
  blue: "#377BB0",
} as const;

const providerButton =
  "h-auto w-full rounded-[20px] border-[5px] border-[#D9D9D9] bg-[#BCCFDE] px-4 py-2 font-kode text-[20px] font-bold lowercase tracking-[-0.07em] text-[#2E6691] shadow-none transition-opacity hover:bg-[#BCCFDE] hover:opacity-90 xl:text-[24px]";

/** Dashboard section marker, recoloured so it reads on the light paper. */
function Marker({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 35"
      aria-hidden
      className={`h-[26px] w-[16px] shrink-0 xl:h-[35px] xl:w-[22px] ${className}`}
    >
      <path d="M22 16.1538L0 0V35L22 16.1538Z" fill={INK.blue} />
    </svg>
  );
}

/** Orange hatch rule, as on the dashboard's "logged in as" line. */
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

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = normalizeCallbackPath(searchParams.get("callbackUrl"));
  const message = searchParams.get("message") ?? undefined;
  const errorDescription = searchParams.get("error_description") ?? undefined;

  useEffect(() => {
    if (message === "unauthorized") {
      toast({
        title: "Unauthorized",
        description: "You do not have access to that page. Try signing in with a different account.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (message === "signedout") {
      toast({
        title: "Signed out",
        description: "You have been signed out.",
        variant: "success",
        duration: 3000,
      });
      return;
    }

    if (message === "Only @tamu.edu email addresses are allowed.") {
      toast({
        title: "Email not allowed",
        description: "Only @tamu.edu email addresses are allowed.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const description = errorDescription ?? message;
    if (description) {
      toast({
        title: "Sign-in failed",
        description,
        variant: "destructive",
        duration: 4000,
      });
    }
  }, [errorDescription, message]);

  return (
    <section
      className="grid-background-blue relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 pb-16 pt-24 lg:py-20"
      style={{ backgroundColor: INK.paper }}
    >
      {/* the homepage hero's curved line, kept faint and to the right so it
          doesn't cut through the centred content */}
      <svg
        viewBox="0 0 621 723"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 aspect-[621/723] w-[min(95vw,615px)] opacity-40 lg:w-[min(30vw,440px)]"
      >
        <path
          d="M0.453125 -7C159.953 7.5 361.186 89.6869 294.453 205.5C227.72 321.313 10.2089 389.32 150.453 523.5C290.697 657.68 695.418 611.35 602.096 719"
          stroke={INK.blue}
          strokeWidth="10"
        />
      </svg>

      <div className="relative z-10 w-full max-w-[520px]">
        {/* title */}
        <h1 className="text-center text-[clamp(3.5rem,15vw,6.5rem)] font-extrabold leading-none">
          <span
            className="block"
            style={{
              color: INK.teal,
              WebkitTextStroke: `4px ${INK.paper}`,
              paintOrder: "stroke fill",
            }}
          >
            tamu
          </span>
          <span
            className="block"
            style={{
              color: INK.blue,
              WebkitTextStroke: `4px ${INK.paper}`,
              paintOrder: "stroke fill",
            }}
          >
            datathon
          </span>
        </h1>

        <Chevrons className="mx-auto mt-3 h-10 w-20 sm:h-12 sm:w-24" />

        <div className="mt-4 flex items-center justify-center gap-3">
          <Hatch className="hidden flex-1 text-right sm:block" />
          <p
            className="whitespace-nowrap font-kode text-[15px] lowercase tracking-[-0.07em] xl:text-[20px]"
            style={{ color: INK.deep }}
          >
            sign in to continue
          </p>
          <Hatch className="hidden flex-1 sm:block" />
        </div>

        {/* provider panel */}
        <div className="relative mt-8">
          <Marker className="absolute right-full top-5 mr-3 hidden sm:block" />

          <div
            className="pointer-events-none absolute -top-12 right-2 z-10 hidden items-start sm:flex"
            aria-hidden
          >
            <Image
              src={`${ASSETS}/sparkle-lg.svg`}
              alt=""
              width={75}
              height={86}
              className="h-[60px] w-[52px] xl:h-[86px] xl:w-[75px]"
            />
            <Image
              src={`${ASSETS}/dot.svg`}
              alt=""
              width={20}
              height={20}
              className="mt-1 h-[20px] w-[20px]"
            />
          </div>

          <div
            className="relative rounded-[20px] border-[5px] px-5 pb-10 pt-5 xl:px-6 xl:pt-6"
            style={{ backgroundColor: INK.panel, borderColor: INK.panelBorder }}
          >
            <span
              className="inline-block rounded-[20px] border-[5px] px-5 py-1 font-kode text-[20px] font-semibold lowercase tracking-[-0.07em] xl:text-[30px]"
              style={{
                backgroundColor: INK.button,
                borderColor: INK.cardBorder,
                color: INK.deep,
              }}
            >
              sign in
            </span>

            <p
              className="mt-5 font-kode text-[17px] lowercase leading-none tracking-[-0.07em] xl:text-[22px]"
              style={{ color: INK.button }}
            >
              pick a provider below
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <LoginButton
                title="Google"
                connectionId="google-oauth2"
                callbackUrl={callbackUrl}
                className={providerButton}
                logo={<FcGoogle />}
              />
              <LoginButton
                title="Windows"
                connectionId="windowslive"
                callbackUrl={callbackUrl}
                className={providerButton}
                logo={<FaWindows />}
              />
              <LoginButton
                title="GitHub"
                connectionId="github"
                callbackUrl={callbackUrl}
                className={providerButton}
                logo={<FaGithub />}
              />
            </div>

            <Sparkles className="absolute bottom-0 left-4 translate-y-1/3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
