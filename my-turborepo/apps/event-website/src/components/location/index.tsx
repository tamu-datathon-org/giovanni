"use client";
import Image from "next/image";

const Location = () => {
    return (
        <div className="relative grid grid-cols-12 grid-rows-12 min-h-screen w-full overflow-hidden py-16">
            <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" />

            {/* Brown on top, grey on bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C0808] via-transparent to-transparent" />

            <div className="relative z-10 col-start-1 col-span-12 row-start-1 row-span-12 flex items-center justify-center">
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

            <div className="relative z-10 col-start-7 col-span-8 row-start-8 md:row-start-9 row-span-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/elements/pen.svg"
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