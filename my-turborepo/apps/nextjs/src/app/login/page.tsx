import "../_components/customCss.scss";

import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@vanni/ui/button";
import Image from "next/image";
import { LoginButton } from "../_components/auth/login_button";

export const runtime = "edge";

export default function LoginPage(props: {searchParams: { callbackUrl: string | undefined}}) {
  return (
    <main className="font-XPfont bg-large-device flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="xpBorder flex max-w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="w-full pr-2">
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
          <Button className="compStyling2">
            <AiOutlineClose className="close" />
          </Button>
        </div>
        <div className="relative mt-2 flex w-full flex-col items-center justify-center border border-black bg-[#e4e3e4] p-8 px-16">
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
          <div className="w-3/5 pt-4">
            <form className="flex w-full flex-col gap-2">
              <LoginButton
                connectionId="github"
                buttonText="Sign in with GitHub"
                searchParams={props.searchParams}
              />
              <LoginButton
                connectionId="google-oauth2"
                buttonText="Sign in with Google"
                searchParams={props.searchParams}
              />
              <LoginButton
                connectionId="windowslive"
                buttonText="Sign in with Microsoft"
                searchParams={props.searchParams}
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
