"use client";

import Image from "next/image";

export const STAT_SECTION_IMAGES = [
  { src: "/images/StatSection/collage.webp", text: "15k in Prizes", alt: "15k in Prizes" },
  { src: "/images/StatSection/DSC01559.webp", text: "600+ Hackers", alt: "600+ Hackers" },
  { src: "/images/StatSection/DSC02664.webp", text: "20+ Schools", alt: "20+ Schools" },
] as const;

export interface StatSectionImagesRefs {
  imageWrapperRef1: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef2: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef3: React.RefObject<HTMLDivElement | null>;
}

interface StatSectionImagesProps {
  refs: StatSectionImagesRefs;
}

/** Responsive sizes: full viewport width for hero images */
const HERO_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px";

/**
 * Full-screen images that slide in from the right of the viewport one by one.
 * First image uses priority for LCP; all use next/image for optimization.
 */
export default function StatSectionImages({ refs }: StatSectionImagesProps) {
  const { imageWrapperRef1, imageWrapperRef2, imageWrapperRef3 } = refs;

  return (
    <div
      className="absolute inset-0 m-4 overflow-hidden sm:m-12 lg:m-20"
      style={{ zIndex: 20 }}
      aria-hidden
    >
      {STAT_SECTION_IMAGES.map(({ src, text, alt }, i) => {
        const ref =
          i === 0
            ? imageWrapperRef1
            : i === 1
              ? imageWrapperRef2
              : imageWrapperRef3;
        return (
          <div
            key={src}
            ref={ref as React.RefObject<HTMLDivElement>}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            style={{
              zIndex: i + 1,
              // First image visible on load for LCP; others start off-screen and slide in via GSAP
              transform: "translateX(100vw)",
            }}
          >
            <div className="relative inline-block max-h-full max-w-full">
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                sizes={HERO_IMAGE_SIZES}
                priority
                className="block max-h-full max-w-full object-contain"
              />
              <div
                className="absolute inset-0 bg-black/50"
                aria-hidden
              />
              <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-[#f2f1ef] sm:text-5xl lg:text-7xl">
                {text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
