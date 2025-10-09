"use client";
import NewspaperSection from "./Newspaper";
import Image from "next/image";
//import Card from "./card";
const Hero = () => {
  return (
    <div className="relative grid grid-cols-10 [grid-template-rows:repeat(10,1fr)] md:[grid-template-rows:repeat(14,80px)] min-h-screen sm:min-h-fit w-full overflow-hidden pb-8">
        {/* Desk background */}
        <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

        {/* light glow element */}
        {/* <div className="absolute -top-1/2 -left-1/2 w-[957px] h-[913px] opacity-60 bg-blend-overlay bg-[#FFF2AA] rounded-full blur-[350px]" /> */}

        {/*Newspaper section - centered in grid*/}
        <div className="relative z-10 col-start-1 col-span-10 row-start-1 row-span-8 flex items-top justify-center transform translate-y-4">
            <NewspaperSection />
        </div>

        {/* cup - bottom left */}
        <div className="relative z-20 col-start-1 md:col-start-2 col-span-3 row-start-7 md:row-start-9 row-span-3 w-full aspect-square max-w-[325px]">
            <Image
                src="/images/elements/cup.svg"
                alt="cup"
                width={600}
                height={600}
                className="object-contain"
            />
        </div>

        {/* magnifying glass - top right */}
        <div className="relative z-20 col-start-8 row-start-1 sm:col-start-8 sm:row-start-1 col-span-3 sm:col-span-2 row-span-3 sm:row-span-2 w-full aspect-square ">
            <Image
                src="/images/elements/mag.svg"
                alt="mag"
                width={600}
                height={600}
                className="object-contain"
            />
        </div>
        <div className="relative z-20 col-start-1 col-span-8 row-start-1 row-span-8 w-full aspect-square pointer-events-none">
            <Image
                src="/images/elements/Lamp.svg"
                alt="mag"
                width={1000}
                height={1000}
                className="object-contain"
            />
        </div>
    </div>
  );
};

export default Hero;