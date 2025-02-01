import AboutSectionOne from "@/app/template-components/About/AboutSectionOne";
import Blog from "@/app/template-components/Blog";
import Brands from "@/app/template-components/Brands";
import ScrollUp from "@/app/template-components/Common/ScrollUp";
import Contact from "@/app/template-components/Contact";
import Features from "@/app/template-components/Features";
import Hero from "@/app/template-components/Hero";
import Testimonials from "@/app/template-components/Testimonials";
import Video from "@/app/template-components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
