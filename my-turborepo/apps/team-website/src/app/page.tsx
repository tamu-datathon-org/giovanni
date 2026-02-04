import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { ScrollUp } from "@vanni/ui/scroll-up";

import Hero from "~/components/Hero";
import { SectionDivider } from "~/components/SectionDivider";
import { env } from "~/env";

const PastEventsSection = dynamic(
  () =>
    import("~/components/PastEvents/pastEvents").then((m) => ({
      default: m.PastEventsSection,
    })),
  {
    ssr: true,
    loading: () => (
      <section className="bg-[#121723] px-4 py-16">
        <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white/10 py-24" />
      </section>
    ),
  }
);

const AboutTeam = dynamic(() => import("~/components/AboutTeam/AboutTeam"), {
  ssr: true,
  loading: () => (
    <section className="bg-[#121723] px-4 py-16">
      <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white/10 py-24" />
    </section>
  ),
});

const SponsorTicker = dynamic(() => import("~/components/Ticker"), {
  ssr: true,
  loading: () => (
    <div className="flex w-full flex-col items-center justify-center bg-[#121723] py-16">
      <div className="h-40 w-full animate-pulse rounded bg-white/10" />
    </div>
  ),
});

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
      <AboutTeam />
      <SectionDivider variant="curvy" />
      <SponsorTicker />
    </>
  );
}
