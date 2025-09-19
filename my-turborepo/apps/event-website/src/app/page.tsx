"use client";

import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import { ApplyButton } from "@/components/ui/apply-buttom";


export default function Home() {
  const router = useRouter()

  const handleApplyClick = () => {
    // Redirect to team website application page
    window.open('https://tamudatathon.org/apply', '_blank')
    // Or use Next.js router for internal navigation:
    // router.push('/apply')
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain
                   bg-[url('/images/landing-page/Landing-Page-phone.png')]
                   sm:bg-[url('/images/landing-page/LandingPage.png')]
                   sm:bg-cover sm:bg-center"
      />



      <div className="flex-1 absolute w- h-80 bottom-20 mb-16 ">
        <a
          href="https://tamudatathon.org/apply"
          target="_blank"
          rel="noopener noreferrer"

        >
          <p className="text-6xl font-semi text-foreground mb-8 font-['KoPub_Batang']">APPLICATIONS CLOSE OCT. 24</p>
          <div className="flex justify-center h-[100px]">
            <ApplyButton />
          </div>
        </a>
      </div>
    </div>
  );
};