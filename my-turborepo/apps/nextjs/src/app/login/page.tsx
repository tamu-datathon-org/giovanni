import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";

import "../_components/customCss.scss";

export const runtime = "edge";

function LoginButton({
  connectionId,
  redirectUri,
  buttonText,
}: {
  connectionId: string;
  redirectUri?: string;
  buttonText: string;
}) {
  return (
    <Button
      className="compStyling w-full border border-black bg-[#f5f5f5] text-black hover:bg-[#e4e3e4] hover:text-black"
      size="lg"
      formAction={async () => {
        "use server";
        await signIn("auth0", redirectUri ? { redirectTo: redirectUri } : {}, {
          connection: connectionId,
        });
      }}
    >
      {buttonText}
    </Button>
  );
}

export default function LoginPage() {
  return (
    <main className="font-XPfont bg-large-device flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="xpBorder flex w-2/5 flex-col items-center justify-center p-2">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="invisible w-full pr-2 lg:visible">
            {" "}
            {/**Random Lines */}
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
            <div className="horizontal-line"></div>
          </div>
          <Button className="compStyling invisible lg:visible">
            <AiOutlineClose className="close" />
          </Button>
        </div>
        <div className="relative mt-2 flex w-full flex-col items-center justify-center border border-black bg-[#e4e3e4] p-8 shadow-inner">
          <h1 className="text-center text-6xl">
            <span className="odd:text-teal-400">T</span>
            <span className="even:text-cyan-700">A</span>
            <span className="odd:text-teal-400 ">M</span>
            <span className="even:text-cyan-700">U</span> DATATHON{" "}
          </h1>
          <h1 className="text-5xl tracking-tight">Log In</h1>
          <div className="w-full text-[#9c9c9c]">
            <text className="">Post version 202.4</text>
            <hr className="absolute left-0 h-0.5 w-2/5 rounded border-0 bg-[#9c9c9c] dark:bg-[#e4e3e4]"></hr>
          </div>
          {/*<AuthShowcase />*/}

          <div className="w-1/2 pt-4">
            <form className="flex w-full flex-col gap-2">
              <LoginButton
                connectionId="apple"
                buttonText="Sign in with Apple"
              />
              <LoginButton
                connectionId="github"
                buttonText="Sign in with GitHub"
              />
              <LoginButton
                connectionId="google-oauth2"
                buttonText="Sign in with Google"
              />
            </form>
          </div>

          <Image
            src="/Pixel_PolarBear.png"
            className="invisible absolute -bottom-4 -right-5 lg:visible "
            width={200}
            height={200}
            alt="polar bear"
          />
        </div>
      </div>
    </main>
  );
}
