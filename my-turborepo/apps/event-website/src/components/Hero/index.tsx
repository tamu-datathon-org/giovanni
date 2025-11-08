"use client";

import Image from "next/image";

import NewspaperSection from "./Newspaper";

const Hero = () => {
  return (
    <div className="h-full w-full">
      <div className="relative grid min-h-screen w-full grid-cols-10 overflow-hidden pb-8 [grid-template-rows:repeat(10,1fr)] sm:min-h-fit md:[grid-template-rows:repeat(14,80px)]">
        {/* Desk background */}
        <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

        {/* Newspaper section */}
        <div className="items-top relative z-10 col-span-10 col-start-1 row-span-8 row-start-2 flex translate-y-4 transform justify-center">
          <NewspaperSection />

          {/* magnifying glass - top right of newspaper */}
          <div className="pointer-events-none absolute right-20 top-0 hidden h-[450px] w-[450px] -translate-y-8 md:block">
            <Image
              src="/images/elements/mag.svg"
              alt="mag"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* cup - bottom left */}
        <div className="relative z-20 col-span-3 col-start-1 row-span-3 row-start-7 aspect-square w-full max-w-[325px] md:col-start-2 md:row-start-9">
          <Image
            src="/images/elements/cup.svg"
            alt="cup"
            width={600}
            height={600}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        {/* lamp - top area */}
        <div className="pointer-events-none absolute left--10 top-0 z-10 hidden h-[1200px] w-[1200px] md:block">
          <Image
            src="/images/elements/Lamp.svg"
            alt="lamp"
            width={1500}
            height={1500}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
