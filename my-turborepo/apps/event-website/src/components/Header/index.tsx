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
    <>
      <header className={`header left-0 top-0 z-40 flex w-full items-center`}>
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-[8rem] max-w-full px-4 xl:mr-12">
              <Link href="/" className={`header-logo block w-full py-8`}>
                <Image
                  src="/images/logo/event-logo.svg"
                  alt="logo"
                  width={100}
                  height={50}
                  className="w-full dark:hidden"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                    }`}
                >
                  {/* <ul className="block lg:flex">
                    <li className="group relative">

                      <Link
                        href="/schedule"
                        className="flex py-2 text-lg text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                      >
                        Schedule
                      </Link>
                    </li>
                  </ul> */}
                </nav>
              </div>
              {/* <div className="flex items-center justify-end pr-16 lg:pr-0">

              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;