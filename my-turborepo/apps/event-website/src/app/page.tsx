import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Location from "@/components/location";
import Schedule from "@/components/Schedule";
import Workshops from "@/components/workshops";

import { ScrollUp } from "@vanni/ui/scroll-up";

const Prizes = dynamic(() => import("@/components/prizes"), {
  loading: () => <div className="min-h-[400px] py-20" />,
});

const FAQ = dynamic(() => import("@/components/faq"), {
  loading: () => <div className="min-h-[800px] bg-[#f0cf91]" />,
});

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description:
    "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};

export default function Home() {
  return (
    <>
      {/* <ScrollUp /> */}
      <div id="menu" className="scroll-mt-24">
        <Hero />
      </div>
      <div id="find-us" className="scroll-mt-24">
        <Location />
      </div> 
      <div id="workshops" className="scroll-mt-24">
        <Workshops />
      </div>
       <div id="pastries" className="scroll-mt-24">
        <Prizes />
      </div>
      <div id="Schedule" className="scroll-mt-24">
        <Schedule />
      </div>

      <div className="h-[100px] bg-[#f0cf91]" />
      <div id="baristas-note" className="scroll-mt-24">
        <FAQ />
      </div>
    </>
  );
}
