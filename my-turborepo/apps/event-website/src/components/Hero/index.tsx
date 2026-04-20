"use client";
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
                className="relative flex min-h-screen flex-col md:flex-row bg-[url(/images/background.svg)]"
            >
                {/* CHANGED: w-2/3 → w-3/5 for a better visual balance with the brown panel.
                    CHANGED: added items-center and md:min-h-screen so the cup is
                    vertically centered in its column instead of floating at the top. */}
                <div className="relative flex w-full items-start justify-center md:w-3/5 md:min-h-screen md:justify-start">
                    <Image
                        src="/images/group_napcup.svg"
                        alt="Napkin"
                        width={napkinWidth}
                        height={napkinHeight}
                        priority
                        sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                        // CHANGED: removed lg:w-6/7 → w-full so the image fills
                        // its container properly without awkward leftover space
                        className="block h-auto w-full md:max-w-[85%]"
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

                {/* CHANGED: w-1/3 → w-2/5 to give the panel more breathing room
                    so text and button don't feel cramped at desktop sizes */}
                <div
                    className="
                        flex w-full flex-col items-center justify-center
                        bg-[#966952]
                        px-6 py-10 text-center
                        md:w-2/5
                        md:min-h-screen

                    "
                    >
                    <p className="text-center font-darumadrop-one text-5xl text-[#FAE19D] sm:text-6xl md:text-6xl lg:text-8xl">
                        TAMU <br /> Datathon Lite
                    </p>

                    <p className="mt-6 text-center font-['Chilanka'] text-3xl text-[#FAE19D] sm:text-3xl md:mt-8 md:text-4xl lg:text-6xl">
                        April 11, 2026 <br />
                    </p>

                    <p className="mt-6 text-center font-['Chilanka'] text-lg text-[#B4D8EE] sm:text-xl md:mt-8 md:text-2xl lg:text-4xl">
                        Applications Closed
                    </p>

                    <div className="w-full border-b-4 border-dashed border-[#FAE19D] my-6" />


                    <div className="flex flex-col items-center gap-4 mt-6 md:mt-8 w-full">

                        <a
                            href="https://td26.ctfd.io/"
                            className="
                            w-fit text-center
                            border-4
                            border-[#B4D8EE]
                            rounded-xl
                            bg-[#F7EEDF]
                            font-darumadrop-one
                            text-[#533A24]

                            transition-transform
                            hover:-translate-y-2
                            hover:shadow-xl
                            "
                            style={{
                                padding: isMobile
                                    ? "12px 24px"
                                    : isTablet
                                    ? "14px 32px"
                                    : "18px 40px",
                                fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
                            }}
                        >
                            CHALLENGES
                        </a>

                        <a
                            href="https://helpqueue.tamudatathon.com/"
                            className="
                            w-fit text-center
                            border-4
                            border-[#B4D8EE]
                            rounded-xl
                            bg-[#F7EEDF]
                            font-darumadrop-one
                            text-[#533A24]

                            transition-transform
                            hover:-translate-y-2
                            hover:shadow-xl
                            "
                            style={{
                                padding: isMobile
                                    ? "12px 24px"
                                    : isTablet
                                    ? "14px 32px"
                                    : "18px 40px",
                                fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
                            }}
                        >
                            HELP QUEUE
                        </a>
                    </div>

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
