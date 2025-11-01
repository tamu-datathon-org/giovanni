"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const [navbarOpen, setNavbarOpen] = useState(false);

    const navbarToggleHandler = () => {
      setNavbarOpen(!navbarOpen);
    };

    // Helper to determine if we need to go back to home for anchor links
    const getHref = (anchor: string) => {
        return pathname === '/' ? anchor : `/${anchor}`;
    };

    return (
    <header className="top-0 left-0 z-50 w-full bg-[#1C0808] sticky font-anonymous">
        <div className="relative flex items-center justify-between px-4 py-4 pr-32 md:pr-40">
            <div className="flex items-end gap-6">
                <Link href="/" className="inline-flex items-center" aria-label="Home">
                    <Image
                        src="/images/logo/event-logo.svg"
                        alt="logo"
                        width={300}
                        height={100}
                        className="h-6 w-auto shrink-0 drop-shadow"
                        priority
                    />
                </Link>
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
                <Link href={getHref('#location')} onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Location</Link>
                <Link href={getHref('#prizes')} onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Prizes</Link>
                <Link href={getHref('#sponsors')} onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Sponsors</Link>
                <Link href={getHref('#faq')} onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">FAQ</Link>
                <Link href="/schedule" onClick={() => setNavbarOpen(false)} className="py-2 md:py-0 hover:text-gray-300">Schedule</Link>
            </div>
        </div>
    </header>
  );
}

export default Header;