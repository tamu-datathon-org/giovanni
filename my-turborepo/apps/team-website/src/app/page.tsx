import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "../components/About/AboutSectionTwo";
import ApplySection from "@/components/Apply/ApplySection";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import type { Metadata } from "next";
import AboutTeam from "../components/AboutTeam/AboutTeam";
import ContactBackground from "../components/Contact/ContactBackground";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description: "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <Features /> */}
      {/* <Video /> */}
      {/* <Brands /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
      <ApplySection />
      <Suspense fallback={<p>Loading team...</p>}>
        <AboutTeam />
      </Suspense>
      {/* <Testimonials /> */}
      {/* <Blog /> */}
      <Suspense fallback={<p>Loading gallery...</p>}>
        <ContactBackground />
      </Suspense>
      <Contact />
    </>
  );
}
