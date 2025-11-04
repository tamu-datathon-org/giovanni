"use client";
import Image from "next/image";

const Location = () => {
    return (
        <div className="relative grid grid-cols-12 grid-rows-12 min-h-[50vh] sm:min-h-screen w-full overflow-hidden py-12 md:py-20" id="location">
            <div className="absolute inset-0 bg-[#1C0808] bg-cover bg-center bg-no-repeat" />
            {/* <div className="absolute inset-0 bg-[#2A2523] bg-cover bg-center bg-no-repeat" /> */}

            {/* Brown gradient from dark to lighter brown at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2A2523]" />

            <div className="relative z-10 col-start-1 col-span-12 row-start-1 row-span-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/elements/locationcard.svg"
                        alt="location folder"
                        fill
                    />
                </div>
            </div>

            <div className="relative z-10 col-start-7 col-span-8 row-start-9 row-span-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/elements/pen.svg"
                        alt="location folder"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
   );
};

export default Location;