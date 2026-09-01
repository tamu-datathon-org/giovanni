"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { konkhmerSleokchher } from "~/app/_components/fonts";

import menuData from "./menuData";

/**
 * The Figma file draws the sidebar two ways. Flip this to switch:
 *   "flush" — Desktop-2 (13:57): panel at x=0, 295 wide, full bleed.
 *   "inset" — Desktop-4 (36:317): panel at x=17/y=11, 274 wide, floating.
 * Widths below are the Figma values at a 1440 frame, scaled down one step at
 * lg so the 48px nav type still fits on smaller laptops.
 */
type SidebarVariant = "flush" | "inset";

const SIDEBAR_VARIANT = "flush" as SidebarVariant;

const VARIANTS: Record<
  SidebarVariant,
  { panel: string; logo: string; nav: string; offset: string }
> = {
  flush: {
    panel: "inset-y-0 left-0 w-[184px] xl:w-[240px]",
    logo: "ml-[48px] mt-[32px] w-[72px] xl:ml-[64px] xl:mt-[42px] xl:w-[94px]",
    nav: "mt-[4px] pl-[24px] pr-[6px] xl:pl-[32px] xl:pr-[8px]",
    offset: "lg:pl-[184px] xl:pl-[240px]",
  },
  inset: {
    panel: "bottom-[11px] left-[14px] top-[9px] w-[170px] xl:w-[222px]",
    logo: "ml-[38px] mt-[25px] w-[72px] xl:ml-[50px] xl:mt-[33px] xl:w-[94px]",
    nav: "mt-[13px] pl-[14px] pr-[6px] xl:pl-[18px] xl:pr-[8px]",
    offset: "lg:pl-[198px] xl:pl-[250px]",
  },
};

const variant = VARIANTS[SIDEBAR_VARIANT];

/** Panel fill, Figma 36:317. */
const PANEL_BG = "#377BB0";
/** Active label colour, Figma 36:320. */
const ACTIVE_INK = "#83EFE8";
/** Collapsed rail dots, Figma 36:495 (active, 79px) / 36:496 (idle, 45px). */
const IDLE_DOT = "#EEEEEE";
const DOT_ACTIVE_PX = 32;
const DOT_IDLE_PX = 18;

/**
 * Sections the rail highlights. The hero's #about is deliberately absent: it
 * is an animated <h1> inside a pinned ScrollTrigger rather than a real
 * section, so its rect is frozen for the length of the pin and highlighting it
 * flickers. #about-us is the standalone section on the angela-aboutus branch —
 * listing it here means the nav starts highlighting it the moment that merges.
 */
const TRACKED_IDS = new Set([
  "home",
  "about-us",
  "past-events",
  "sponsors",
  "team",
]);

/**
 * Fallback ids to try when a nav target is missing, in priority order. Until
 * angela-aboutus merges we fall back to the hero's #about keyframe.
 */
const CLICK_ALIASES: Record<string, string[]> = {
  "about-us": ["about-us", "about"],
};

const resolveTarget = (id: string) =>
  (CLICK_ALIASES[id] ?? [id]).find((candidate) =>
    document.getElementById(candidate),
  ) ?? null;

/** "/#past-events" -> "past-events"; anything else (e.g. "/apply") -> null. */
const sectionIdOf = (path?: string) =>
  path?.startsWith("/#") ? path.slice(2) : null;

/**
 * Scroll with our own easing. The hero reveal is scrubbed by scroll position,
 * so the browser's native smooth scroll (~500ms) blows through the whole
 * animation in a couple of frames. Taking longer lets it actually play.
 */
const easedScrollTo = (top: number, duration = 1400) => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const start = window.scrollY;
  const delta = top - start;
  if (prefersReduced || delta === 0) {
    window.scrollTo({ top, behavior: "instant" });
    return;
  }
  const began = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - began) / duration);
    // easeInOutQuad
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    // "instant" is required: styles/index.css sets scroll-behavior: smooth
    // globally, which would make each of these steps its own animated scroll
    // and fight the easing.
    window.scrollTo({ top: start + delta * eased, behavior: "instant" });
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Header = ({
  collapsed = false,
  onToggle,
}: {
  /** Collapsed shows the dots rail (Figma 36:492) instead of the labels. */
  collapsed?: boolean;
  onToggle?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  // /apply is auth-gated, so clicking APPLY usually lands on
  // /login?callbackUrl=%2Fapply. Keep APPLY lit through that redirect rather
  // than dropping the highlight mid-flow. Read in an effect, not during
  // render, so the server and client markup agree.
  const [applyPending, setApplyPending] = useState(false);

  useEffect(() => {
    setApplyPending(
      pathname === "/login" &&
        new URLSearchParams(window.location.search)
          .get("callbackUrl")
          ?.startsWith("/apply") === true,
    );
  }, [pathname]);

  // Track which section owns the viewport, motion.dev scroll-highlight style.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }

    const ids = menuData
      .map((item) => sectionIdOf(item.path))
      .filter((id): id is string => id !== null && TRACKED_IDS.has(id));

    let frame = 0;

    const update = () => {
      frame = 0;
      // Active = the last tracked section whose top has crossed a line near
      // the top of the viewport. Each section implicitly owns the range from
      // its own top to the next one's, which keeps the highlight monotonic.
      const line = window.innerHeight * 0.2;
      let current: string | null = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      // While the hero still owns the viewport and the real #about-us section
      // has not merged yet, hand the highlight to ABOUT US once the hero's
      // reveal has actually faded in. The keyframe's rect never moves (it is
      // pinned), so the reveal itself is the only reliable signal.
      if (current === "home" && !document.getElementById("about-us")) {
        const keyframe = document.getElementById("about");
        if (keyframe && Number(getComputedStyle(keyframe).opacity) >= 0.5) {
          current = "about-us";
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    // The hero pins itself with ScrollTrigger and the sections below are
    // dynamic, so the first measurement lands before the real layout exists.
    // Re-measure whenever the document changes height.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof menuData)[number],
  ) => {
    // Kill ScrollTriggers before routing to /apply, otherwise GSAP tears down
    // nodes React still owns and throws Node.removeChild.
    if (pathname === "/" && item.path === "/apply") {
      e.preventDefault();
      setNavbarOpen(false);
      void import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((s) => s.kill());
        router.push("/apply");
      });
      return;
    }

    const sectionId = pathname === "/" ? sectionIdOf(item.path) : null;
    if (sectionId) {
      e.preventDefault();
      const target = resolveTarget(sectionId);
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target === "about") {
        // The hero's #about already sits on screen at scrollY 0, so
        // scrollIntoView is a no-op and the reveal never plays. One viewport
        // down is where the animation has finished. Once the real #about-us
        // section merges, the branch below handles it normally.
        easedScrollTo(window.innerHeight);
      } else if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setNavbarOpen(false);
  };

  const labelClass = (isActive: boolean) =>
    `block font-konkhmer uppercase tracking-[0.64px] transition-all duration-300 ${
      isActive
        ? "text-[19px] leading-[29px] xl:text-[26px] xl:leading-[40px]"
        : "text-[14px] leading-[29px] text-white xl:text-[18px] xl:leading-[40px]"
    }`;

  return (
    <>
      {/* ---------- DESKTOP: blue sidebar (Figma 36:317 / 13:57) ---------- */}
      <header
        className={`${konkhmerSleokchher.variable} fixed z-50 hidden flex-col overflow-hidden transition-[width] duration-300 lg:flex ${
          collapsed ? "inset-y-0 left-0 w-[80px]" : variant.panel
        }`}
        style={{ backgroundColor: PANEL_BG }}
      >
        {collapsed ? (
          /* ---- collapsed: dots rail (Figma 36:492 / 36:495 / 36:496) ---- */
          <div className="flex flex-col items-center pt-[26px]">
            <Link href="/" aria-label="TAMU Datathon home">
              <Image
                src="/images/td-logos/logo/logoTD26.png"
                alt="TAMU Datathon logo"
                width={348}
                height={242}
                sizes="44px"
                className="h-auto w-[44px]"
                priority
              />
            </Link>

            <nav className="mt-9">
              <ul className="flex flex-col items-center gap-[26px]">
                {menuData.map((item) => {
                  const id = sectionIdOf(item.path);
                  const isActive =
                    id !== null
                      ? id === activeId
                      : (Boolean(item.path) &&
                          pathname.startsWith(item.path!)) ||
                        (item.path === "/apply" && applyPending);
                  return (
                    <li key={item.id} className="flex h-8 items-center">
                      <Link
                        href={item.path ?? "#"}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-label={item.title}
                        aria-current={isActive ? "true" : undefined}
                        title={item.title}
                        className="block rounded-full transition-all duration-300 hover:opacity-80"
                        style={{
                          width: isActive ? DOT_ACTIVE_PX : DOT_IDLE_PX,
                          height: isActive ? DOT_ACTIVE_PX : DOT_IDLE_PX,
                          backgroundColor: isActive ? ACTIVE_INK : IDLE_DOT,
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        ) : (
          <>
            <Link
              href="/"
              aria-label="TAMU Datathon home"
              className={variant.logo}
            >
              <Image
                src="/images/td-logos/logo/logoTD26.png"
                alt="TAMU Datathon logo"
                width={348}
                height={242}
                sizes="116px"
                className="h-auto w-full"
                priority
              />
            </Link>

            <nav className={variant.nav}>
              <ul>
                {menuData.map((item) => {
                  const id = sectionIdOf(item.path);
                  // Section links follow the scroll; route links (APPLY) light
                  // up when you are on that route.
                  const isActive =
                    id !== null
                      ? id === activeId
                      : (Boolean(item.path) &&
                          pathname.startsWith(item.path!)) ||
                        (item.path === "/apply" && applyPending);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path ?? "#"}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={isActive ? "true" : undefined}
                        className={labelClass(isActive)}
                        style={isActive ? { color: ACTIVE_INK } : undefined}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        )}

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Show navigation" : "Hide navigation"}
            title={collapsed ? "Show navigation" : "Hide navigation"}
            className={`rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white ${
              collapsed
                ? "mx-auto mt-5"
                : "absolute right-2 top-3"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

      </header>

      {/* ---------- MOBILE: top bar + overlay ---------- */}
      <header
        className={`${konkhmerSleokchher.variable} fixed inset-x-0 top-0 z-50 lg:hidden`}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: PANEL_BG }}
        >
          <Link href="/" aria-label="TAMU Datathon home">
            <Image
              src="/images/td-logos/logo/logoTD26.png"
              alt="TAMU Datathon logo"
              width={348}
              height={242}
              sizes="64px"
              className="h-auto w-[64px]"
              priority
            />
          </Link>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Mobile Menu"
            aria-expanded={navbarOpen}
            className="rounded-lg px-3 py-2 ring-primary focus:ring-2"
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
        </div>

        <nav
          className={`absolute inset-x-0 top-full px-6 py-4 shadow-lg transition-all duration-300 ${
            navbarOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          style={{ backgroundColor: PANEL_BG }}
        >
          <ul>
            {menuData.map((item) => {
              const id = sectionIdOf(item.path);
              const isActive = id !== null && id === activeId;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path ?? "#"}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-current={isActive ? "true" : undefined}
                    className="block py-1 font-konkhmer text-[22px] uppercase leading-[40px] tracking-[0.64px] text-white"
                    style={isActive ? { color: ACTIVE_INK } : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
