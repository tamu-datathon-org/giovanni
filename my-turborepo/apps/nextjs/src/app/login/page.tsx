import { signIn } from "@vanni/auth";
import { Button } from "@vanni/ui/button";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import '../_components/customCss.scss';

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
    <Button className='bg-[#f5f5f5] compStyling border border-black text-black hover:bg-[#e4e3e4] hover:text-black w-full'
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
    <main className="font-XPfont bg-large-device bg-cover bg-no-repeat bg-center h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center xpBorder p-2 w-2/5">
            <div className="flex flex-row w-full items-center justify-center">
                <div className="w-full pr-2 lg:visible invisible"> {/**Random Lines */}
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                    <div className="horizontal-line"></div>
                </div>
                <Button className="compStyling lg:visible invisible"><AiOutlineClose className="close"/></Button>
            </div>
            <div
                className='flex flex-col justify-center items-center relative shadow-inner w-full bg-[#e4e3e4] border border-black p-8 mt-2'>
                <h1 className="text-6xl text-center">
                    <span className="odd:text-teal-400">T</span>
                    <span className="even:text-cyan-700">A</span>
                    <span className="odd:text-teal-400 ">M</span>
                    <span className="even:text-cyan-700">U</span> DATATHON </h1>
                <h1 className="text-5xl tracking-tight">
                    Log In
                </h1>
                <div className='w-full text-[#9c9c9c]'>
                    <text className=''>Post version 202.4</text>
                    <hr className="absolute left-0 w-2/5 h-0.5 bg-[#9c9c9c] border-0 rounded dark:bg-[#e4e3e4]"></hr>

                </div>
                {/*<AuthShowcase />*/}

                <div className='w-1/2 pt-4'>
                    <form className="flex flex-col w-full gap-2">
                        <LoginButton connectionId="apple" buttonText="Sign in with Apple"/>
                        <LoginButton connectionId="github" buttonText="Sign in with GitHub"/>
                        <LoginButton
                            connectionId="google-oauth2"
                            buttonText="Sign in with Google"
                        />
                    </form>
                </div>

                <Image src="/Pixel_PolarBear.png" className="absolute -bottom-4 -right-5 invisible lg:visible "
                       width={200}
                       height={200} alt="polar bear"/>
            </div>
        </div>
    </main>
  );
}
