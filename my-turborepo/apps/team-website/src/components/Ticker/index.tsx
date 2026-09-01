import Image from "next/image";

import { konkhmerSleokchher } from "~/app/_components/fonts";
import { Marquee } from "~/components/ui/marquee";

const ROW_1 = [
  "/images/sponsor-logo/amd.webp",
  "/images/sponsor-logo/amex.webp",
  "/images/sponsor-logo/bp.webp",
  // "/images/sponsor-logo/cbre.webp",
  // "/images/sponsor-logo/celonis.webp",
  "/images/sponsor-logo/dell.webp",
  "/images/sponsor-logo/facebook.webp",
  "/images/sponsor-logo/gm.webp",
  "/images/sponsor-logo/goldman.webp",
  "/images/sponsor-logo/heb.webp",
];

const ROW_2 = [
  "/images/sponsor-logo/HPE.webp",
  "/images/sponsor-logo/johnson.webp",
  // "/images/sponsor-logo/mathworks.webp",
  // "/images/sponsor-logo/msy.webp",
  "/images/sponsor-logo/p66.webp",
  // "/images/sponsor-logo/pure.webp",
  "/images/sponsor-logo/qualcomm.webp",
  "/images/sponsor-logo/shell.webp",
  // "/images/sponsor-logo/sparx.webp",
  "/images/sponsor-logo/splunk.webp",
  "/images/sponsor-logo/tableau.webp",
  "/images/sponsor-logo/walmart.webp",
];

function LogoRow({ logos }: { logos: string[] }) {
  return (
    <>
      {logos.map((logo) => (
        <div
          key={logo}
          className="relative h-12 w-28 shrink-0 sm:h-16 sm:w-36 lg:h-20 lg:w-44"
        >
          <Image
            src={logo}
            alt={logo.split("/").pop()?.replace(/\.webp$/, "") ?? "Sponsor logo"}
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
      className={`${konkhmerSleokchher.variable} flex w-full flex-col items-center justify-center bg-[#F3F3F3] py-10`}
    >
      <h2 className="mb-4 font-konkhmer text-5xl font-normal text-[#377BB0] sm:mb-6 sm:text-6xl md:text-7xl">
        SPONSORS
      </h2>

      <div className="flex w-full flex-col gap-6 sm:gap-8">
        <Marquee>
          <LogoRow logos={ROW_1} />
        </Marquee>
        <Marquee reverse>
          <LogoRow logos={ROW_2} />
        </Marquee>
      </div>
    </div>
  );
}
