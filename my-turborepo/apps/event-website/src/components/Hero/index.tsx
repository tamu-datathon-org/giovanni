"use client";
import NewspaperSection from "./Newspaper";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="w-full h-full">
            <div className="relative grid grid-cols-10 [grid-template-rows:repeat(10,1fr)] md:[grid-template-rows:repeat(14,80px)] min-h-screen sm:min-h-fit w-full overflow-hidden pb-8">
                {/* Desk background */}
                <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

                {/* Newspaper section */}
                <div className="relative z-10 col-start-1 col-span-10 row-start-1 row-span-8 flex items-top justify-center transform translate-y-4">
                    <NewspaperSection />

                    {/* magnifying glass - top right of newspaper */}
                    <div className="absolute top-0 right-20 -translate-y-8 w-[450px] h-[450px] pointer-events-none hidden md:block">
                        <Image
                            src="/images/elements/mag.svg"
                            alt="mag"
                            fill
                            className="object-contain"
                        />
                    </div>
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
                {/* lamp - top area */}
                <div className="absolute top-0 left--10 z-10 w-[1200px] h-[1200px] pointer-events-none hidden md:block">
                <Image src="/images/elements/Lamp.svg"
                       alt="lamp"
                       width={1500}
                       height={1500}
                       className="object-contain" />
                </div>

            </div>
        </div>
    );
};

export default Hero;
