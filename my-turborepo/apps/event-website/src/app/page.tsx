//import { ThemedButton } from "@/components/ui/themed-button";
//import Image from "next/image";
import Hero from "@/components/Hero";
import ScrollUp from "@/components/Common/ScrollUp";
import type { Metadata } from "next";
import Location from "@/components/location";
import FAQ from "@/components/faq"
import Prizes from "@/components/prizes"

export const metadata: Metadata = {
  title: "TAMU Datathon",
  description: "TAMU Datathon is a 24-hour hackathon hosted by Texas A&M University.",
};


export default function Home() {

  return (
    <>
        <ScrollUp />
        <Hero />
        <Location />
        <Prizes/>
        {/* sponsers */}
        <FAQ/>

    </>

  );
};