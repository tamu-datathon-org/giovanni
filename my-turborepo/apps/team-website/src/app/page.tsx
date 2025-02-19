import AboutSectionOne from "@/app/template-components/About/AboutSectionOne";
import AboutSectionTwo from "./template-components/About/AboutSectionTwo";
import ApplySection from "@/app/template-components/Apply/ApplySection";
import Blog from "@/app/template-components/Blog";
import Brands from "@/app/template-components/Brands";
import ScrollUp from "@/app/template-components/Common/ScrollUp";
import Contact from "@/app/template-components/Contact";
import Features from "@/app/template-components/Features";
import Hero from "@/app/template-components/Hero";
import Testimonials from "@/app/template-components/Testimonials";
import Video from "@/app/template-components/Video";
import { Metadata } from "next";
import AboutTeam from "./template-components/AboutTeam/AboutTeam";
import { Carousel, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
      <AboutSectionTwo/>
      <ApplySection/>
      <AboutTeam />
      {/* <Testimonials /> */}
      <Blog />
      <Contact />
    </>
  );
}
