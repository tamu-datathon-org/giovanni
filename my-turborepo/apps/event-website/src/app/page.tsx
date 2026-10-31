import type { Metadata } from "next";
import dynamic from "next/dynamic";
import EventInformation from "@/components/EventInformation";
import Hero from "@/components/Hero";
import { Rail } from "@/components/Rail";
import Location from "@/components/location";
import Schedule from "@/components/Schedule";
import { CasinoTransition } from "@/components/CasinoTransition";
import Workshops from "@/components/workshops";
import { ScrollUp } from "@vanni/ui/scroll-up";
import { Footer } from "@/components/Hero/Footer";
import { Menu } from "@/components/menu/Menu"
import { SectionGround } from "@/components/SectionGround";

// Transparent: it sits on the background shared with Schedule below.
const Prizes = dynamic(() => import("@/components/prizes"), {
  loading: () => <div className="min-h-[1400px]" />,
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
      <Menu />
      <Hero />
      <EventInformation />
      <Rail shine="ball" />
      <CasinoTransition variant="coins" />
      {/* One background behind both, so the pattern runs on unbroken from Prizes into Schedule. */}
      <div className="relative bg-[#6C0204]">
        <SectionGround align="bottom">
          <Prizes ground={false} />
          <Schedule ground={false} />
        </SectionGround>
      </div>
      <Sponsors />
      <Rail shine="view" overlay />
      <FAQ />
      <Footer/>
    </>
  );
}
