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
import { PastEventsSection } from "../components/PastEvents";
import { SectionDivider } from "~/components/SectionDivider";
import SponsorTicker from "~/components/Ticker";
import { env } from "~/env";

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

export default function HomePage() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <PastEventsSection />
      <SectionDivider variant="jagged" />
      <Suspense fallback={<p>Loading team...</p>}>
        <AboutTeam />
      </Suspense>
      <SectionDivider variant="curvy" />
      <SponsorTicker />
    </>
  );
}
