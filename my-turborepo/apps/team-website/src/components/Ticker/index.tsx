"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SectionTitle } from "@vanni/ui/section-title";

//TODO: will need to change out the all black logos with white or something if sticking with the dark theme

export default function SponsorTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  const logos = [
    "/images/sponsor-logo/amd.png",
    "/images/sponsor-logo/amex.png",
    "/images/sponsor-logo/bp.png",
    "/images/sponsor-logo/cbre.png",
    "/images/sponsor-logo/celonis.png",
    "/images/sponsor-logo/dell.png",
    "/images/sponsor-logo/facebook.png",
    "/images/sponsor-logo/gm.png",
    "/images/sponsor-logo/goldman.png",
    "/images/sponsor-logo/heb.png",
    "/images/sponsor-logo/hewlett.png",
    "/images/sponsor-logo/johnson.png",
    "/images/sponsor-logo/mathworks.png",
    "/images/sponsor-logo/msy.png",
    "/images/sponsor-logo/p66.png",
    "/images/sponsor-logo/pure.png",
    "/images/sponsor-logo/qualcomm.png",
    "/images/sponsor-logo/shell.png",
    "/images/sponsor-logo/sparx.png",
    "/images/sponsor-logo/splunk.png",
    "/images/sponsor-logo/tableau.png",
    "/images/sponsor-logo/walmart.png",
  ];

  // Duplicate logos for seamless infinite loop (2 sets)
  const duplicatedLogos = [...logos, ...logos];

  useGSAP(() => {
    if (!containerRef.current) return;

    const logoWidth = 200;
    const gap = 80; // Space between logos
    const logoSpacing = logoWidth + gap;
    const singleSetWidth = logos.length * logoSpacing;

    // Position logos horizontally
    const logoElements = containerRef.current.querySelectorAll(".ticker-logo");
    gsap.set(logoElements, {
      x: (i) => i * logoSpacing,
      top: "50%",
      yPercent: -50,
    });

    // Create seamless infinite animation
    // When first set moves off screen, reset to 0 (invisible to user)
    const animation = gsap.to(containerRef.current, {
      x: -singleSetWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x: string) => {
          const num = parseFloat(x);
          // Reset position when first set has moved completely off screen
          return num <= -singleSetWidth ? "0px" : x;
        },
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#121723] pt-6">
      <SectionTitle title="Past Sponsors" paragraph={""} center mb="-40px" />

      <div className="relative h-40 w-full overflow-hidden">
        <div
          ref={containerRef}
          className="absolute left-0 top-0 h-full whitespace-nowrap"
        >
          {duplicatedLogos.map((logo, i) => (
            <div key={i} className="ticker-logo absolute h-16 w-32">
              <Image
                src={logo}
                alt={`Sponsor logo ${(i % logos.length) + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
