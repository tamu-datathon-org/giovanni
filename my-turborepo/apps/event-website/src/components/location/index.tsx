"use client";
import Image from "next/image";
import Link from "next/link";

const Location = () => {
    return (
        <div className="relative grid grid-cols-12 grid-rows-12 min-h-screen w-full overflow-hidden">
            <Image
                src="/images/logo/event-logo.svg"
                alt="logo"
                height={200}
                width={200}
                className="h-16 w-auto shrink-0 drop-shadow"
                priority
            />
        </div>
   );
};

export default Location;