import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Location from "@/components/location";
import Schedule from "@/components/Schedule";
import Workshops from "@/components/workshops";
import { ScrollUp } from "@vanni/ui/scroll-up";
import { Footer } from "@/components/Hero/Footer";

const Prizes = dynamic(() => import("@/components/prizes"), {
  loading: () => <div className="min-h-[400px] py-20" />,
});

const Sponsors = dynamic(() => import("@/components/sponsor"), {
  loading: () => <div className="min-h-[640px] bg-[#6C0204]" />,
});

const FAQ = dynamic(() => import("@/components/faq"), {
  loading: () => <div className="min-h-[800px] bg-[#6C0204]" />,
});

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description:
    "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* Ready Just need  */}
      {/* <Schedule />
      <Sponsors />
      <FAQ /> 
      <Footer/> */}
    </>
  );
}
