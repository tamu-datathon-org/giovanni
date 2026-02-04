"use client";

export const STAT_SECTION_IMAGES = [
  { src: "/images/StatSection/collage.webp", text: "15k in Prizes" },
  { src: "/images/StatSection/DSC01559.JPG", text: "600+ Hackers" },
  { src: "/images/StatSection/DSC02664.JPG", text: "20+ Schools" },
] as const;

export interface StatSectionImagesRefs {
  imageWrapperRef1: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef2: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef3: React.RefObject<HTMLDivElement | null>;
}

interface StatSectionImagesProps {
  refs: StatSectionImagesRefs;
}

/**
 * Full-screen images that slide in from the right of the viewport one by one.
 * Initial position is off-screen right (100vw) so they only appear when GSAP animates them in.
 */
export default function StatSectionImages({ refs }: StatSectionImagesProps) {
  const { imageWrapperRef1, imageWrapperRef2, imageWrapperRef3 } = refs;

  return (
    <div
      className="absolute inset-0 m-4 overflow-hidden sm:m-12 lg:m-20"
      style={{ zIndex: 20 }}
      aria-hidden
    >
      {STAT_SECTION_IMAGES.map(({ src, text }, i) => {
        const ref =
          i === 0
            ? imageWrapperRef1
            : i === 1
              ? imageWrapperRef2
              : imageWrapperRef3;
        return (
          <div
            key={src}
            ref={ref}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            style={{
              zIndex: i + 1,
              // Start off-screen to the right; GSAP will animate to x: 0 only after text has shown
              transform: "translateX(100vw)",
            }}
          >
            <div className="relative inline-block max-h-full max-w-full">
              <img
                src={src}
                alt=""
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
