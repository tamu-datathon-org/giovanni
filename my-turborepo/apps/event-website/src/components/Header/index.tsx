"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Header = () => {
    //nav bar toggle
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
      setNavbarOpen(!navbarOpen);
    };

    return (
    <header className="top-0 left-0 z-40 w-full bg-[#1C0808]">
        <div className="relative flex items-center justify-between px-4">
            <div className="flex items-end gap-6 py-2">
                <a href="/" className="inline-flex items-center" aria-label="Home">
                    <Image
                        src="/images/logo/event-logo.svg"
                        alt="logo"
                        width={200}
                        height={100}
                        className="h-6 w-auto shrink-0 drop-shadow"
                        priority
                    />
                </a>
                {/* <Link
                    href="/schedule"
                    className="inline-flex place-content-center
                        text-3xl
                        font-medium
                        text-white
                        hover:text-yellow-300
                        drop-shadow
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white/60"
                    >
                    Schedule
                </Link> */}
            </div>

        </div>

    </header>
  );
}

export default Header;