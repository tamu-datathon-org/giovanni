"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Helper to determine if we need to go back to home for anchor links
  const getHref = (anchor: string) => {
    return pathname === "/" ? anchor : `/${anchor}`;
  };

  return (
    <header className="font-anonymous sticky left-0 top-0 z-50 w-full bg-[#1C0808]">
      <div className="relative flex h-full items-center justify-between px-4 py-4 pr-32 md:pr-40">
        <div className="flex h-full items-end gap-6">
          <Link
            href="/"
            className="inline-flex h-full items-center"
            aria-label="Home"
          >
            <Image
              src="/images/logo/event-logo.png"
              alt="logo"
              width={400}
              height={400}
              objectFit="contain"
              className="h-6 w-auto shrink-0 drop-shadow"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={navbarToggleHandler}
          className="text-white focus:outline-none md:hidden"
          aria-label="Toggle Menu"
        >
          <div className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "translate-y-[9px] rotate-45" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
            ></span>
          </div>
        </button>

        {/* Navigation Links */}
        <div
          className={`items-center justify-center gap-4 text-white md:flex ${navbarOpen ? "absolute left-0 right-0 top-full flex flex-col bg-[#1C0808] py-4 shadow-lg" : "hidden"} md:static md:flex md:flex-row md:py-0 md:shadow-none`}
        >
          <Link
            href={getHref("#location")}
            onClick={() => setNavbarOpen(false)}
            className="py-2 hover:text-gray-300 md:py-0"
          >
            Location
          </Link>
          <Link
            href={getHref("#prizes")}
            onClick={() => setNavbarOpen(false)}
            className="py-2 hover:text-gray-300 md:py-0"
          >
            Prizes
          </Link>
          <Link
            href={getHref("#sponsors")}
            onClick={() => setNavbarOpen(false)}
            className="py-2 hover:text-gray-300 md:py-0"
          >
            Sponsors
          </Link>
          <Link
            href={getHref("#faq")}
            onClick={() => setNavbarOpen(false)}
            className="py-2 hover:text-gray-300 md:py-0"
          >
            FAQ
          </Link>
          <Link
            href="/schedule"
            onClick={() => setNavbarOpen(false)}
            className="py-2 hover:text-gray-300 md:py-0"
          >
            Schedule
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
