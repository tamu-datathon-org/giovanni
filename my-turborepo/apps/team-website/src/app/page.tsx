import type { Metadata } from "next";
import { Suspense } from "react";

import { ScrollUp } from "@vanni/ui/scroll-up";

import AboutSectionOne from "~/components/About/AboutSectionOne";
import AboutSectionTwo from "~/components/About/AboutSectionTwo";
import AboutTeam from "~/components/AboutTeam/AboutTeam";
import ApplySection from "~/components/Apply/ApplySection";
import Contact from "~/components/Contact";
import ContactBackground from "~/components/Contact/ContactBackground";
import Hero from "~/components/Hero";
import SponsorTicker from "~/components/Ticker";
import { env } from "~/env";
import { PastIterationsSection } from "~/components/pastEvents";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "TAMU Datathon",
  description: "A&M's Data Science Hackathon",
  openGraph: {
    title: "TAMU Datathon",
    description: "A&M's Data Science Hackathon",
    url: "https://tamudatathon.com",
    siteName: "TAMU Datathon",
  },
};
//TODO: MAKE SURE TO MOVE SPONSOR TICKER AFTER EVERYTHING IS FINALIZED !!!!!!!!!! <-------- DON'T FORGET!!!!

export default function HomePage() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <ApplySection /> */}
      <Suspense fallback={<p>Loading team...</p>}>
        <AboutTeam />
      </Suspense>
      {/* <Suspense fallback={<p>Loading gallery...</p>}>
        <ContactBackground />
      </Suspense> */}
      <PastIterationsSection />

      <SponsorTicker/>
      <Contact />
    </>
  );
}
