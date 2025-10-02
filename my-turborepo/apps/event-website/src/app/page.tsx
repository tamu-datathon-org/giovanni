//import { ThemedButton } from "@/components/ui/themed-button";
//import Image from "next/image";
import Hero from "@/components/Hero";
import ScrollUp from "@/components/Common/ScrollUp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description: "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};


export default function Home() {

  return (
    <>
        <ScrollUp />
        <Hero />

    </>
    // <div className="flex flex-col h-screen w-full items-center justify-center relative">
    //   <div className="absolute inset-0">
    //     {/* Header */}
    //     <Image
    //       src="/images/landing-page/LandingPage-phone.png"
    //       alt="Landing page background"
    //       fill
    //       className="object-cover object-center block sm:hidden"
    //       priority
    //     />
    //     {/* Desktop image */}
    //     <Image
    //       src="/images/landing-page/LandingPage.png"
    //       alt="Landing page background"
    //       fill
    //       className="object-cover object-center hidden sm:block"
    //       priority
    //     />
    //   </div>
    //   <div className="pl-2 flex-1 absolute w-full top-[47vh] left-[50%] translate-y-[-50%] translate-x-[-50%] sm:top-[65vh] transform rotate-[0.5deg] z-10">
    //     <p className="text-xl sm:text-4xl font-semi text-foreground text-center mb-2 sm:mb-6 font-['KoPub_Batang']">APPLICATIONS CLOSE OCT. 25</p>
    //     <div className="flex flex-row justify-center items-center w-full">
    //       <a
    //         href="https://tamudatathon.org/apply"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <ThemedButton
    //           className="w-[50vw] h-12 sm:h-16 text-xl sm:text-4xl px-8 sm:px-16"
    //         >
    //           Apply Now!
    //         </ThemedButton>
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};