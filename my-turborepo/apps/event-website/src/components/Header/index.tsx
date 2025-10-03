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
        <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
                <div className="flex items-end gap-6 px-4 py-3">
                    <a href="/" className="inline-flex items-end py-4" aria-label="Home">
                        <Image
                            src="/images/logo/event-logo.svg"
                            alt="logo"
                            width={200}
                            height={100}
                            className="h-16 w-auto shrink-0 drop-shadow"
                            priority
                        />
                    </a>
                    <Link
                        href="/schedule"
                        className="inline-flex
                            py-4 text-3xl
                            font-medium
                            text-white
                            hover:text-yellow-300
                            drop-shadow
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white/60"
                        >
                        Schedule
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;