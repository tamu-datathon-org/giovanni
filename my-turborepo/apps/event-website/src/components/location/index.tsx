"use client";
import Image from "next/image";
import Link from "next/link";

const Location = () => {
    return (
        <div className="relative grid grid-cols-12 grid-rows-12 min-h-screen w-full overflow-hidden pb-8">
            <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

            {/* Brown on top, grey on bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C0808] via-transparent to-transparent" />

            <div className="relative z-10 col-start-2 col-span-10 row-start-3 row-span-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/elements/locationcard.svg"
                        alt="location folder"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
   );
};

export default Location;