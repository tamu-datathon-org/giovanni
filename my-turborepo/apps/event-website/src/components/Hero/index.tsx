"use client";
import NewspaperSection from "./Newspaper";
import Image from "next/image";
//import Card from "./card";
const Hero = () => {
  return (
    <div className="relative grid grid-cols-12 grid-rows-12 min-h-fit w-full overflow-hidden pb-8">
        {/* Desk background */}
        <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

        {/* light glow element */}
        <div className="absolute -top-1/2 -left-1/2 w-[957px] h-[913px] opacity-60 bg-blend-overlay bg-[#FFF2AA] rounded-full blur-[350px]" />

        {/*Newspaper section - centered in grid*/}
        <div className="relative z-10 col-start-2 col-span-10 row-start-3 row-span-8 flex items-top justify-center ">
            <NewspaperSection />
        </div>

        {/* cup - bottom left */}
        <div className="relative z-20 col-start-2 col-span-3 row-start-6 row-span-2 w-full aspect-square ">
            <Image
                src="/images/elements/cup.svg"
                alt="cup"
                width={600}
                height={600}
                className="object-contain"
            />
        </div>

        {/* magnifying glass - top right */}
        <div className="relative z-20 col-start-8 col-span-3 row-start-2 row-span-2 w-full aspect-square ">
            <Image
                src="/images/elements/mag.svg"
                alt="mag"
                width={600}
                height={600}
                className="object-contain"
            />
        </div>
        
    </div>
  );
};

export default Hero;