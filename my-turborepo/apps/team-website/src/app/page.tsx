import dynamic from "next/dynamic";

import { ScrollUp } from "@vanni/ui/scroll-up";

import Announcement from "~/components/Announcement";
import Hero from "~/components/Hero";

const PastEventsSection = dynamic(() => import("~/components/PastEvents"), {
  ssr: true,
  loading: () => (
    <section className="bg-[#377BB0] px-4 py-16">
      <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white/10 py-24" />
    </section>
  ),
});

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
    <section className="bg-[#e9f6ff] px-4 py-16">
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
      <Announcement />
      <div id="home" className="scroll-mt-20 lg:scroll-mt-0">
        <Hero />
      </div>
      <AboutUs />
      <div id="past-events" className="scroll-mt-20 lg:scroll-mt-0">
        <PastEventsSection />
      </div>
      <div id="team" className="scroll-mt-20 lg:scroll-mt-0">
        <AboutTeam />
      </div>
      <div id="sponsors" className="scroll-mt-20 lg:scroll-mt-0">
        <SponsorTicker />
      </div>
    </>
  );
}
