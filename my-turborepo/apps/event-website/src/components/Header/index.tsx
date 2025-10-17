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
    <header className="top-0 left-0 z-50 w-full bg-[#1C0808] sticky font-anonymous">
        <div className="relative flex items-center justify-between px-4 py-4 pr-32 md:pr-40">
            <div className="flex items-end gap-6">
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
            </div>

            {/* Hamburger Menu Button */}
            <button
                onClick={navbarToggleHandler}
                className="md:hidden text-white focus:outline-none"
                aria-label="Toggle Menu"
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                </div>
            </button>

            {/* Navigation Links */}
            <div className={`md:flex justify-center items-center text-white gap-4 ${navbarOpen ? 'absolute top-full left-0 right-0 flex flex-col bg-[#1C0808] py-4 shadow-lg' : 'hidden'} md:static md:flex md:flex-row md:py-0 md:shadow-none`}>
                <a href="#location" onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Location</a>
                <a href="#prizes" onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Prizes</a>
                <a href="#sponsors" onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Sponsors</a>
                <a href="#faq" onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">FAQ</a>
            </div>
        </div>
    </header>
  );
}

export default Header;