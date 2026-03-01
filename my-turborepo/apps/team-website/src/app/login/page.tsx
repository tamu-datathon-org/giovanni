"use client";
import LoginButton from "../_components/auth/login_button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaWindows } from "react-icons/fa";
import { toast } from "~/hooks/use-toast";

export default function LoginPage({
  searchParams
}: {
  searchParams: { callbackUrl: string | undefined, message: string | undefined };
}) {
  if (searchParams.message === "unauthorized") {
    toast({
      title: "Unauthorized",
      description: "You do not have access to that page. Try signing in with a different account.",
      variant: "destructive",
      duration: 3000,
    });
  } else if (searchParams.message === "signedout") {
    toast({
      title: "Signed out",
      description: "You have been signed out.",
      variant: "success",
      duration: 3000,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center pb-8 h-screen">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-datalightblue">
            tamu
            <span className="text-datadarkblue">datathon</span>
          </h1>
          <p className="text-sm mb-10 text-white text-center">
            Sign in with a provider below
          </p>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-4 mx-auto px-4">
          <LoginButton
            title="Google"
            connectionId="google-oauth2"
            callbackUrl={searchParams.callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FcGoogle />}
          />
          <LoginButton
            title="Windows"
            connectionId="windowslive"
            callbackUrl={searchParams.callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FaWindows />}
          />
          <LoginButton
            title="GitHub"
            connectionId="github"
            callbackUrl={searchParams.callbackUrl}
            className="bg-datadarkblue hover:bg-datadarkblue/70"
            logo={<FaGithub />}
          />
        </div>
    </div>
  );
}