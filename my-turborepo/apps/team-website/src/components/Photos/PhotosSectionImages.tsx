"use client";

import Image from "next/image";

import { konkhmerSleokchher } from "~/app/_components/fonts";

const PHOTOS_SECTION_IMAGES = [
  {
    src: "/images/StatSection/collage.webp",
    accent: "$15k+",
    label: "in Prizes",
    alt: "15k in Prizes",
  },
  {
    src: "/images/StatSection/DSC01559.webp",
    accent: "600+",
    label: "Hackers",
    alt: "600+ Hackers",
  },
  {
    src: "/images/StatSection/DSC026641.webp",
    accent: "20+",
    label: "Schools",
    alt: "20+ Schools",
  },
] as const;

export interface PhotosSectionImagesRefs {
  imageWrapperRef1: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef2: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef3: React.RefObject<HTMLDivElement | null>;
}

interface PhotosSectionImagesProps {
  refs: PhotosSectionImagesRefs;
}

const PHOTOS_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px";

/**
 * Full-screen photos for the Photos section. The first image is visible on entry;
 * the rest start below the viewport and slide up on scroll.
 */
export default function PhotosSectionImages({ refs }: PhotosSectionImagesProps) {
  const { imageWrapperRef1, imageWrapperRef2, imageWrapperRef3 } = refs;
  const imageRefs = [imageWrapperRef1, imageWrapperRef2, imageWrapperRef3];

  return (
    <div
      className="absolute inset-0 m-8 overflow-hidden sm:m-12 lg:m-20"
      style={{ zIndex: 20 }}
      aria-hidden
    >
      {PHOTOS_SECTION_IMAGES.map(({ src, accent, label, alt }, i) => (
        <div
          key={src}
          ref={imageRefs[i] as React.RefObject<HTMLDivElement>}
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          style={{
            zIndex: i + 1,
            transform: i === 0 ? undefined : "translateY(100dvh)",
          }}
        >
          <div className="relative inline-block aspect-[9/16] h-full w-auto max-w-full sm:aspect-auto sm:max-h-full sm:w-full">
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              sizes={PHOTOS_IMAGE_SIZES}
              priority={i === 0}
              className="block h-full max-h-full w-full max-w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden />
            <span
              className={`${konkhmerSleokchher.className} absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-normal leading-none tracking-[-0.07em] sm:text-6xl lg:text-7xl`}
            >
              <span className="text-[#83EFE8]">{accent}</span>{" "}
              <span className="text-white">{label}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
