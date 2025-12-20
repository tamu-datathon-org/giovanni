import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

import { ScrollUp } from "@vanni/ui/scroll-up";

// Lazy load below-the-fold components to reduce initial bundle size
const Location = dynamic(() => import("@/components/location"), {
  loading: () => <div className="min-h-[50vh] sm:min-h-screen" />,
});

const Prizes = dynamic(() => import("@/components/prizes"), {
  loading: () => <div className="min-h-[400px] py-20" />,
});

const Sponsors = dynamic(() => import("@/components/sponsor"), {
  loading: () => <div className="min-h-[600px] bg-[#322C29]" />,
});

const FAQ = dynamic(() => import("@/components/faq"), {
  loading: () => (
    <div className="min-h-[800px] bg-gradient-to-b from-[#322C29] to-[#1B0706]" />
  ),
});

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description:
    "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Location />
      <Prizes />
      <Sponsors />
      <FAQ />
    </>
  );
}
