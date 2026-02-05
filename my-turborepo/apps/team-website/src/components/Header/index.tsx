"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import menuData from "./menuData";
import { ScrollProgress } from "./ScrollProgess";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  // pill animation refs (GSAP timelines with tweenTo, set after dynamic import)
  type PillTimeline = {
    tweenTo: (label: string, opts: { duration: number }) => void;
  };
  const pillRefs = useRef<Array<HTMLLIElement | null>>([]);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pillTimelines = useRef<Array<PillTimeline | null>>([]);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) =>
    setOpenIndex(openIndex === index ? -1 : index);

  const pathname = usePathname();

  // Handle navigation clicks for smooth scrolling to sections
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof menuData)[number],
  ) => {
    // Only handle hash links on the home page
    if (pathname === "/" && item.path?.startsWith("/#")) {
      const sectionId = item.path.replace("/#", "");
      e.preventDefault();
      if (sectionId === "home") {
        // Go to the very start of the page so the Hero animation is at the beginning
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }
      setNavbarOpen(false);
      return;
    }
    // For mobile menu, always close it after navigation
    setNavbarOpen(false);
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let killScrollTrigger: (() => void) | null = null;
    let killPillResize: (() => void) | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const logo = logoRef.current;
        const navItems = navItemsRef.current;

        if (!nav || !container || !logo || !navItems) return;

        // ======================
        // NAVBAR SCROLL ANIMATION
        // ======================
        gsap.set(nav, {
          left: "10%",
          right: "10%",
          top: "1rem",
          width: "auto",
        });

        gsap.set(container, {
          paddingLeft: "1rem",
          paddingRight: "1rem",
          borderRadius: "1rem",
          backdropFilter: "blur(24px) saturate(150%)",
        });

        const scrollTl = gsap
          .timeline({
            scrollTrigger: {
              trigger: document.body,
              start: "top+=20 top",
              end: "top+=120 top",
              scrub: true,
            },
          })
          .to(nav, {
            left: "0%",
            right: "0%",
            top: "0rem",
            borderRadius: "0rem",
            ease: "power2.out",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05)",
          })
          .to(
            container,
            {
              paddingLeft: "0rem",
              paddingRight: "0rem",
              borderRadius: "0rem",
              backdropFilter: "blur(20px) saturate(150%)",
              ease: "power2.out",
            },
            0,
          )
          .to(logo, { paddingLeft: "1rem" }, 0)
          .to(navItems, { paddingRight: "1rem" }, 0);

        const st = scrollTl.scrollTrigger;
        killScrollTrigger = () => {
          scrollTl.kill();
          st?.kill();
        };

        // ======================
        // PILL HOVER ANIMATION
        // ======================
        const setupPill = (i: number) => {
          const pill = pillRefs.current[i];
          const circle = circleRefs.current[i];
          if (!pill || !circle) return;

          // Ensure the pill label doesn't wrap (wrapping changes height and breaks geometry)
          const label = pill.querySelector<HTMLElement>(".pill-label");
          label?.classList.add("whitespace-nowrap");

          const h = pill.offsetHeight || 1;
          const w = pill.offsetWidth || 1;
          const R = ((w * w) / 4 + h * h) / (2 * h);
          const D = Math.ceil(2 * R);

          gsap.set(circle, {
            width: D,
            height: D,
            bottom: -D / 2,
            left: "50%",
            xPercent: -50,
            scale: 0,
            transformOrigin: "50% 100%",
          });

          const tl = gsap.timeline({ paused: true });
          tl.addLabel("idle");
          tl.to(circle, {
            scale: 1.2,
            duration: 0.45,
            ease: "power3.out",
          });
          if (label) {
            tl.to(
              label,
              {
                y: -6,
                duration: 0.35,
                ease: "power3.out",
              },
              0,
            );
          }
          tl.addLabel("hover");

          pillTimelines.current[i] = tl;
        };

        // Initial setup (after fonts/layout settle)
        requestAnimationFrame(() => {
          pillRefs.current.forEach((_, i) => setupPill(i));
        });

        // Recompute geometry on resize (labels/pills can change width at breakpoints)
        const onResize = () => {
          pillRefs.current.forEach((_, i) => setupPill(i));
        };
        window.addEventListener("resize", onResize);
        killPillResize = () => window.removeEventListener("resize", onResize);
      },
    );

    return () => {
      killScrollTrigger?.();
      killPillResize?.();
    };
  }, []);

  return (
    <header ref={navRef} className="fixed z-40 flex w-full justify-center">
      <ScrollProgress />

      <div
        ref={containerRef}
        className="bg-gray-dark/50 relative mx-auto w-full border border-white/10 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="flex items-center">
          {/* LOGO */}
          <div ref={logoRef} className="px-4">
            <Link href="/">
              <Image
                src="/images/past-logos/TD2024.png"
                alt="TAMU Datathon logo"
                width={100}
                height={100}
                sizes="100px"
                className="h-12 w-auto shrink-0 object-contain drop-shadow"
                priority
              />
            </Link>
          </div>

          {/* NAV */}
          <nav className="flex flex-1 justify-center" ref={navItemsRef}>
            <ul className="hidden gap-2 lg:flex">
              {menuData.map((item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    pillRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer overflow-hidden rounded-full px-4 py-2"
                  onMouseEnter={() =>
                    pillTimelines.current[index]?.tweenTo("hover", {
                      duration: 0.25,
                    })
                  }
                  onMouseLeave={() =>
                    pillTimelines.current[index]?.tweenTo("idle", {
                      duration: 0.2,
                    })
                  }
                >
                  {/* expanding circle */}
                  <span
                    ref={(el) => {
                      circleRefs.current[index] = el;
                    }}
                    className="absolute rounded-full bg-white/10"
                  />

                  <Link
                    href={item.path ?? "#"}
                    onClick={(e) => handleNavClick(e, item)}
                    className="pill-label relative z-10 whitespace-nowrap text-white/70 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={navbarToggleHandler}
            aria-label="Mobile Menu"
            className="mr-4 block rounded-lg px-3 py-2 ring-primary focus:ring-2 lg:hidden"
          >
            <span
              className={`relative my-1.5 block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? "top-2 rotate-45" : ""
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? "-top-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* RIGHT */}
          {/* <div ref={navItemsRef} className="px-4">
            <ThemeToggler />
          </div> */}
        </div>

        {/* MOBILE MENU */}
        <nav
          className={`bg-gray-dark/50 absolute right-0 top-full z-50 mt-2 w-[250px] rounded-lg border border-white/10 px-6 py-4 shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 lg:hidden ${
            navbarOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <ul className="space-y-2">
            {menuData.map((item, index) => (
              <li key={index}>
                {item.path ? (
                  <Link
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className="block py-2 text-white/70 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleSubmenu(index)}
                      className="flex w-full items-center justify-between py-2 text-white/70 transition-colors hover:text-white"
                    >
                      {item.title}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 25 24"
                        className={`transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    {item.submenu && (
                      <ul
                        className={`ml-4 space-y-1 border-l border-white/10 pl-4 ${
                          openIndex === index ? "block" : "hidden"
                        }`}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.path ?? "#"}
                              onClick={(e) => {
                                if (pathname === "/" && subItem.path?.startsWith("/#")) {
                                  const sectionId = subItem.path.replace("/#", "");
                                  const element = document.getElementById(sectionId);
                                  if (element) {
                                    e.preventDefault();
                                    element.scrollIntoView({ behavior: "smooth" });
                                  }
                                }
                                setNavbarOpen(false);
                              }}
                              className="block py-1.5 text-sm text-white/60 transition-colors hover:text-white"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
