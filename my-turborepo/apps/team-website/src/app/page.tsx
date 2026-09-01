import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { ScrollUp } from "@vanni/ui/scroll-up";

import Hero from "~/components/Hero";
import Photos from "~/components/Photos";
import { SectionDivider } from "~/components/SectionDivider";
import { env } from "~/env";

const PastEventsSection = dynamic(() => import("~/components/PastEvents"), {
    ssr: true,
    loading: () => (
      <section className="bg-[#121723] px-4 py-16">
        <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white/10 py-24" />
      </section>
    ),
  }
);

const AboutUs = dynamic(() => import("~/components/AboutUs"), {
  ssr: true,
  loading: () => (
    <section className="bg-[#377BB0] px-4 py-16">
      <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white/10 py-24" />
    </section>
  ),
});

const AboutTeam = dynamic(() => import("~/components/AboutTeam"), {
  ssr: true,
  loading: () => (
    <section className="bg-[#F3F3F3] px-4 py-16">
      <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-[#D9D9D9]/40 py-24" />
    </section>
  ),
});

const SponsorTicker = dynamic(() => import("~/components/Ticker"), {
  ssr: true,
  loading: () => (
    <div className="flex w-full flex-col items-center justify-center bg-[#F3F3F3] py-16">
      <div className="h-40 w-full animate-pulse rounded bg-white/10" />
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <AboutUs />
      <Photos />
      <PastEventsSection />
      <SectionDivider variant="curvy" />
      <SponsorTicker />
      <AboutTeam />
    </>
  );
}
