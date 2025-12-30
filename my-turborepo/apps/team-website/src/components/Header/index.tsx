"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import menuData from "./menuData";
import { ScrollProgress } from "./ScrollProgess";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  useGSAP(
    () => {
      const nav = navRef.current;
      const container = containerRef.current;
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (!nav || !container || !logo || !navItems) return;

      // Floating state - use left/right instead of width for centering
      gsap.set(nav, {
        left: "10%",
        right: "10%",
        top: "1rem",
        width: "auto",
      });

      // Set initial padding for inner container
      gsap.set(container, {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "1rem",
      });

      // Scroll transformation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top+=20 top",
            end: "top+=120 top",
            scrub: true,
          },
        })
        .to(
          nav,
          {
            left: "0%",
            right: "0%",
            top: "0rem",
            borderRadius: "0rem",
            ease: "power2.out",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          },
          0,
        )
        .to(
          container,
          {
            paddingLeft: "0rem",
            paddingRight: "0rem",
            borderRadius: "0rem",
            ease: "power2.out",
          },
          0,
        )
        .to(
          logo,
          {
            paddingLeft: "1rem",
            ease: "power2.out",
          },
          0,
        )
        .to(
          navItems,
          {
            paddingRight: "1rem",
            ease: "power2.out",
          },
          0,
        );
    },
    { scope: navRef },
  );

  return (
    <>
      <header
        ref={navRef}
        className="header fixed z-40 flex flex-col items-center transition"
      >
        <ScrollProgress />
        <div
          ref={containerRef}
          className="mx-auto w-full bg-[#2f58aa]/10 backdrop-blur-[100px]"
        >
          <div className="flex w-full items-center py-0">
            <div ref={logoRef} className="relative left-0 flex-shrink-0 px-4">
              <Link href="/" className={`header-logo block w-full pl-1`}>
                <Image
                  src="/images/logo/logoTD.png"
                  alt="logo"
                  width={100}
                  height={50}
                  className="w-[60px] dark:hidden"
                />
                <Image
                  src="/images/logo/logoTD.png"
                  alt="logo"
                  width={100}
                  height={50}
                  className="hidden w-[60px] dark:block"
                />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-5">
                    {menuData.map((menuItem, index) => (
                      <li
                        key={index}
                        className="w-contain group relative rounded-xl bg-gray-500/10 px-2"
                      >
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className="flex py-1 text-lg text-white/70 transition-colors hover:text-white dark:text-white/70 dark:hover:text-white lg:mr-0 lg:inline-flex"
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="text-dark flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            {menuItem.submenu && (
                              <div
                                className={`submenu dark:bg-dark relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                  openIndex === index ? "block" : "hidden"
                                }`}
                              >
                                {menuItem.submenu.map(
                                  (
                                    submenuItem: typeof menuItem,
                                    subIndex: number,
                                  ) => (
                                    <Link
                                      href={submenuItem.path ?? "#"}
                                      key={subIndex}
                                      className="text-dark block rounded py-2.5 text-sm hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                    >
                                      {submenuItem.title}
                                    </Link>
                                  ),
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div
                ref={navItemsRef}
                className="flex items-center justify-end pr-16 lg:pr-0"
              ></div>
            </div>
            <div
              className="flex-shrink-0 px-4"
              style={{ width: "calc(8rem + 2rem)" }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
