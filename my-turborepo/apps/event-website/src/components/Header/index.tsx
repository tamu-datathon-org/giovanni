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

  const getHref = (anchor: string) => {
    return pathname === "/" ? anchor : `/${anchor}`;
  };

  return (
    <div className="absolute font-anonymous top-4 left-0 right-0 z-50 w-full bg-transparent pointer-events-none">
      <header className="flex flex-col w-fit md:w-full md:max-w-5xl ml-8 md:mx-auto rounded-2xl bg-white border-4 border-[#B4D8EE]  shadow-lg pointer-events-auto">
        <div className="flex h-full w-full items-center justify-start md:justify-between px-6 py-3 text-[#B4D8EE]">
          {/* Hamburger Menu Button - Left side on mobile */}
          <button
            onClick={navbarToggleHandler}
            className="text-[#B4D8EE] focus:outline-none md:hidden"
            aria-label="Toggle Menu"
          >
            <div className="flex h-8 w-10 flex-col justify-between">
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "translate-y-[9px] rotate-45" : ""}`}></span>
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-full bg-white transition-all duration-300 ${navbarOpen ? "-translate-y-[9px] -rotate-45" : ""}`}></span>
            </div>
          </button>

          {/* Logo - Hidden on mobile, larger size */}
          <Link href="/" className="hidden md:inline-flex h-full items-center" aria-label="Home">
            <Image
              src="/images/tdlite2026.png"
              alt="logo"
              width={500}
              height={500}
              className="h-10 w-auto shrink-0 drop-shadow"
              style={{ objectFit: "contain" }}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation Links - Left aligned */}
          <div className="hidden items-center gap-4 text-[#B4D8EE] md:flex">
            <Link href={getHref("#location")} className="hover:text-gray-400">Location</Link>
            <Link href={getHref("#prizes")} className="hover:text-gray-400">Prizes</Link>
            <Link href={getHref("#faq")} className="hover:text-gray-400">FAQ</Link>
          </div>
        </div>

        {/* Mobile Dropdown - Left aligned */}
        {navbarOpen && (
          <div className="flex flex-col items-start gap-2 rounded-b-2xl bg-white pb-4 px-6 text-[#B4D8EE] md:hidden">
            <Link href={getHref("#location")} onClick={() => setNavbarOpen(false)} className="py-2 hover:text-gray-300">Location</Link>
            <Link href={getHref("#prizes")} onClick={() => setNavbarOpen(false)} className="py-2 hover:text-gray-300">Prizes</Link>
            <Link href={getHref("#faq")} onClick={() => setNavbarOpen(false)} className="py-2 hover:text-gray-300">FAQ</Link>

          </div>
        )}
      </header>
    </div>
  );
};

export default Header;