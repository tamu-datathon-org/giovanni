"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { SectionTitle } from "@vanni/ui/section-title";

//TODO: will need to change out the all black logos with white or something if sticking with the dark theme

export default function SponsorTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const logos = [
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
    "/images/sponsor-logo/hewlett.webp",
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

  // Duplicate logos for seamless infinite loop (2 sets)
  const duplicatedLogos = [...logos, ...logos];

  useGSAP(() => {
    if (!containerRef.current) return;

    let killAnimation: (() => void) | null = null;

    const runAnimation = () => {
      if (!containerRef.current) return;
      // Read actual logo width from DOM after layout (matches responsive w-24 sm:w-32)
      const firstLogo = containerRef.current.querySelector(".ticker-logo");
      const logoWidth =
        firstLogo instanceof HTMLElement ? firstLogo.offsetWidth : 128;
      const gap = logoWidth < 100 ? 24 : 32; // Tighter: 24px on mobile, 32px on desktop
      const logoSpacing = logoWidth + gap;
      const singleSetWidth = logos.length * logoSpacing;

      const logoElements =
        containerRef.current.querySelectorAll(".ticker-logo");
      gsap.set(logoElements, {
        x: (i) => i * logoSpacing,
        top: "50%",
        yPercent: -50,
      });

      // Infinite carousel: animate left, wrap position when first set scrolls off
      // so the duplicate set is in view and the loop is seamless
      const animation = gsap.to(containerRef.current, {
        x: -singleSetWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            const num = parseFloat(x);
            // Wrap back so icons "come back around" seamlessly (2 identical sets)
            if (num <= -singleSetWidth) {
              return `${num + singleSetWidth}px`;
            }
            return x;
          },
        },
      });

      animationRef.current = animation;

      killAnimation = () => {
        animationRef.current = null;
        animation.kill();
      };
    };

    const rafId = requestAnimationFrame(() => {
      runAnimation();
    });
    return () => {
      cancelAnimationFrame(rafId);
      if (killAnimation) killAnimation();
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#121723] cursor-pointer">
      <SectionTitle title="Past Sponsors" paragraph={""} center mb="-40px" />

      <div
        className="relative h-28 w-full overflow-hidden sm:h-40"
        onMouseEnter={() => animationRef.current?.pause()}
        onMouseLeave={() => animationRef.current?.resume()}
      >
        <div
          ref={containerRef}
          className="absolute left-0 top-0 h-full whitespace-nowrap"
        >
          {duplicatedLogos.map((logo, i) => (
            <div
              key={i}
              className="ticker-logo absolute h-10 w-24 sm:h-16 sm:w-32"
            >
              <Image
                src={logo}
                alt={`Sponsor logo ${(i % logos.length) + 1}`}
                sizes="100px"
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
