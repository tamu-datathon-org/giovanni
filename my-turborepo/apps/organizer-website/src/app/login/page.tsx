"use client";
import LoginButton from "../_components/auth/login_button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaWindows } from "react-icons/fa";
import { toast } from "~/hooks/use-toast";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const message = searchParams.get("message") ?? undefined;
  const errorDescription = searchParams.get("error_description") ?? undefined;
  // Better Auth puts the failure reason here (e.g. account_not_linked)
  const errorCode = searchParams.get("error") ?? undefined;

  useEffect(() => {
    if (errorCode === "account_not_linked") {
      toast({
        title: "Sign-in problem",
        description:
          "We found an existing account for this email but couldn't sign you in with this provider. Try the provider you first signed up with, or contact us.",
        variant: "destructive",
        duration: 8000,
      });
      return;
    }

    if (message === "unauthorized") {
      toast({
        title: "Unauthorized",
        description: "You do not have access to that page. Try signing in with a different account. (TAMU Email Required)",
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
  }, [errorCode, errorDescription, message]);

  return (
    <div className="flex flex-col items-center justify-center pb-8 h-screen">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-datalightblue text-center">
            tamu
            <span className="text-datadarkblue">datathon</span>
          </h1>
          <p className="text-2xl font-semibold tracking-tight text-white text-center mt-1">
            organizer
          </p>
          <p className="text-sm mb-10 text-white text-center mt-4">
            Sign in with a provider below
          </p>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-4 mx-auto px-4">
          <LoginButton
            title="Google"
            connectionId="google-oauth2"
            callbackUrl={callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FcGoogle />}
          />
          <LoginButton
            title="Windows"
            connectionId="windowslive"
            callbackUrl={callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FaWindows />}
          />
          <LoginButton
            title="GitHub"
            connectionId="github"
            callbackUrl={callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FaGithub />}
          />
        </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
