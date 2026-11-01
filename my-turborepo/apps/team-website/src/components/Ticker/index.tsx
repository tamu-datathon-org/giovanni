import Image from "next/image";

import GridBackground from "~/components/GridBackground";
import { Marquee } from "~/components/ui/marquee";

interface Logo {
  src: string;
  /** Used as the image's alt text. */
  name: string;
}

const logo = (file: string, name: string): Logo => ({
  src: `/images/sponsor-logo/${file}.webp`,
  name,
});

// Alphabetical by name, split across the two scrolling rows.
const ROW_1: Logo[] = [
  logo("amd", "AMD"),
  logo("amex", "American Express"),
  logo("bp", "bp"),
  // logo("cbre", "CBRE"),
  // logo("celonis", "Celonis"),
  logo("conocophillips", "ConocoPhillips"),
  logo("databricks", "Databricks"),
  logo("dell", "Dell Technologies"),
  logo("facebook", "Facebook"),
  logo("gm", "General Motors"),
  logo("goldman", "Goldman Sachs"),
  logo("heb", "H-E-B"),
  logo("HPE", "Hewlett Packard Enterprise"),
];

const ROW_2: Logo[] = [
  logo("hitachi-digital", "Hitachi Digital"),
  logo("johnson", "Johnson & Johnson"),
  // logo("mathworks", "MathWorks"),
  // logo("msy", "MSY"),
  logo("p66", "Phillips 66"),
  // logo("pure", "Pure Storage"),
  logo("qualcomm", "Qualcomm"),
  logo("serpapi", "SerpApi"),
  logo("shell", "Shell"),
  // logo("sparx", "Sparx"),
  logo("splunk", "Splunk"),
  logo("tableau", "Tableau"),
  logo("sec", "Texas A&M Student Engineers' Council"),
  logo("walmart", "Walmart"),
];

function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <>
      {logos.map(({ src, name }) => (
        <div
          key={src}
          className="relative h-12 w-28 shrink-0 sm:h-16 sm:w-36 lg:h-20 lg:w-44"
        >
          <Image
            src={src}
            alt={name}
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
            fill
            className="object-contain"
          />
        </div>
      ))}
    </>
  );
}

export default function SponsorTicker() {
  return (
    <div
      className={`relative w-full bg-[#e9f6ff] py-10`}
    >
      <GridBackground className="opacity-10" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <h2 className="mb-4 font-konkhmer text-5xl font-normal text-[#377BB0] sm:mb-6 sm:text-6xl md:text-7xl">
          SPONSORS
        </h2>

        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <Marquee className="![animation-duration:55s]">
            <LogoRow logos={ROW_1} />
          </Marquee>
          <Marquee reverse className="![animation-duration:50s]">
            <LogoRow logos={ROW_2} />
          </Marquee>
        </div>
      </div>
    </div>
  );
}
