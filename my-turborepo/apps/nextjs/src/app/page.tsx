import type { Metadata } from "next";
import { Suspense } from "react";

import AboutSectionOne from "~/components/About/AboutSectionOne";
import AboutSectionTwo from "~/components/About/AboutSectionTwo";
import AboutTeam from "~/components/AboutTeam/AboutTeam";
import ApplySection from "~/components/Apply/ApplySection";
import ScrollUp from "~/components/Common/ScrollUp";
import Contact from "~/components/Contact";
import ContactBackground from "~/components/Contact/ContactBackground";
import Hero from "~/components/Hero";
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
  // TODO: Find out if this is important
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jullerino",
  //   creator: "@jullerino",
  // },
};

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
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
  // return (
  //   <>
  //     <Link
  //       id="mlh-trust-badge"
  //       className="mlh-trust-badge"
  //       href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
  //       target="_blank"
  //     >
  //       <img
  //         src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
  //         alt="Major League Hacking 2025 Hackathon Season"
  //         className="w-full"
  //       />
  //     </Link>
  //     <div className="h-screen w-screen overflow-hidden">
  //       <div className="flex h-screen flex-col items-center justify-center">
  //         <div className="flex h-full w-full items-center justify-center lg:relative ">
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
