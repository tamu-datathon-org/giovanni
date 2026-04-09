"use client";

import Image from "next/image";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function Hero() {
    const windowWidth = useWindowWidth();

    // Breakpoints
    const isMobile = windowWidth > 0 && windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isDesktop = windowWidth >= 1024;

    // Dynamic image sizes
    const napkinWidth = isMobile ? 400 : isTablet ? 550 : 696;
    const napkinHeight = isMobile ? 409 : isTablet ? 562 : 711;

    // Dynamic steam positioning
    const steamLeftPosition = isMobile ? "55%" : "60%";
    const steamTopPosition = isMobile ? "5%" : "10%";
    const steamWidth = isMobile ? "50%" : "60%";

    // Prevent flash of unstyled content
    if (windowWidth === 0) {
        return (
        <section
            id="hero"
            className="flex h-screen items-center justify-center bg-[url(/images/background.svg)]"
        >
            <div className="animate-pulse text-2xl text-[#966952]">Loading...</div>
        </section>
        );
    }

    return (
        <>
            <section
                id="hero"
                className="relative flex h-screen flex-col bg-[url(/images/background.svg)] md:flex-row"
            >
                {/* cup+napkin — full width on mobile, left half on desktop */}
                <div className="relative flex w-full justify-center md:absolute md:left-0 md:top-0 md:block md:w-[50vw] md:max-w-[800px]">
                    <Image
                        src="/images/group_napcup.svg"
                        alt="Napkin"
                        width={napkinWidth}
                        height={napkinHeight}
                        priority
                        sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                        className="block h-auto w-full lg:w-6/7"
                    />
                    <Image
                        src="/images/steam.gif"
                        alt="steam.gif"
                        width={2388}
                        height={1668}
                        className="absolute h-auto -translate-x-1/2"
                        style={{
                        left: steamLeftPosition,
                        top: steamTopPosition,
                        width: steamWidth,
                        }}
                        loading="lazy"
                        sizes="60vw"
                    />
                </div>

                {/* Brown panel — bottom on mobile, right side on desktop */}
                <div
                    className="
                        flex w-full flex-[0.85] flex-col items-center justify-center bg-[#966952]
                        px-6 pb-8 pt-10 mt-4 md:mt-0
                        text-center md:absolute md:right-0 md:top-0
                        md:mr-[90px] md:h-full md:w-1/3 md:justify-center
                        md:pb-10
                        md:pt-0
                    "
                    >
                    <p className="text-center font-darumadrop-one text-5xl text-[#FAE19D] sm:text-6xl md:text-6xl lg:text-8xl">
                        TAMU <br /> Datathon Lite
                    </p>

                    <p className="mt-6 text-center font-['Chilanka'] text-3xl text-[#FAE19D] sm:text-3xl md:mt-8 md:text-4xl lg:text-6xl">
                        April 11, 2026 <br />
                    </p>

                    <p className="mt-6 text-center font-['Chilanka'] text-xl text-[#FAE19D] sm:text-xl md:mt-8 md:text-2xl lg:text-4xl">
                        Applications Close{" "}
                        <span className="font-['Darumadrop_one'] text-xl text-[#FAE19D] sm:text-xl md:mt-8 md:text-2xl lg:text-4xl">
                        April 9
                        </span>
                    </p>

                    {/* Dynamic button size based on screen */}
                    <a
                        href="https://tamudatathon.org/apply"
                        className="
                        mt-6 rounded-xl
                        bg-[#FAE19D]
                        font-darumadrop-one
                        text-[#8D6E5E]
                        shadow-xl
                        transition-colors
                        hover:bg-[#FFF5DA]
                        md:mt-8
                        "
                        style={{
                        padding: isMobile
                            ? "12px 32px"
                            : isTablet
                            ? "16px 48px"
                            : "24px 64px",
                        fontSize: isMobile ? "24px" : isTablet ? "28px" : "36px",
                        }}
                    >
                        APPLY
                    </a>

                    {/* dev mode only - comment out for production (shows current screensize) */}
                    {/* {process.env.NODE_ENV === "development" && (
                        <p className="mt-4 text-xs text-[#FAE19D]/50">
                        {isMobile ? "📱 Mobile" : isTablet ? "📟 Tablet" : "🖥️ Desktop"} ({windowWidth}px)
                        </p>
                    )} */}
                </div>
            </section>
        </>
    );
}
