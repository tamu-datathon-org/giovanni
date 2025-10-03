"use client";
import NewspaperSection from "./Newspaper";
import Image from "next/image";
import Card from "./card";
const Hero = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-start overflow-hidden">
        {/* Desk background */}
        <div className="absolute inset-0 bg-[url('/images/landing-page/desk1.png')] bg-cover bg-center bg-no-repeat" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

        {/*SVG sections */}
        <div className="relative z-10 w-full h-full max-w-6xl mt-[10vh] flex items-center justify-center bg-red-500">
            <NewspaperSection />
            {/*
            <div className="absolute left-0 bottom-0 w-[15%] min-w-[50px]">
                <Image
                    src="/images/elements/cup.svg"
                    alt="cup"
                    fill
                    className="object-contain"

                />
            </div>


            <div className="absolute right-0 top-5 w-[10%] min-w-[40px]">
                <Image
                    src="/images/elements/mag.svg"
                    alt="mag"
                    fill
                    className="object-contain"
                />
            </div> */}
        </div>
    </div>
  );
};

export default Hero;
