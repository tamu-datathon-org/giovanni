"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemedButton } from "@/components/ui/themed-button";

const Hero = () => {

    return (
    <div className="flex flex-col h-screen w-full items-center justify-center relative">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[url('/images/landing-page/desk.png')] bg-cover" />
        {/* Gradient overlay - transitions to dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C0808]" />

        {/* rest of the stuff */}
        <div className="relative z-10">

            <Image
                src="/images/elements/newspaper.svg"
                alt="Newspaper background"
                width={200}
                height={200}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    </div>
    );
}

export default Hero;