"use client";

import { useSchedule } from "@/hooks/useSchedule";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Image from "next/image";

/** Display the time string exactly as it comes from the sheet. */
function formatTime(raw: string): string {
    if (!raw) return "—";
    return raw;
}

export default function Schedule() {
    const { events, loading, error, lastUpdated } = useSchedule();
    const width    = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width < 1024;

    const maxWidth = isMobile ? "100%" : isTablet ? "500px" : "700px";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0cf91] p-4">
            <div className="relative w-full" style={{ maxWidth }}>
                {/* left vine */}
                {/* <Image
                    src="/images/left_vine.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="absolute left-0 top-0 -translate-y-1/2 -translate-x-1/2 w-16 md:w-24 z-20 pointer-events-none"
                /> */}

                {/* right vine */}
                {/* <Image
                    src="/images/right_vine.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-16 md:w-24 z-20 pointer-events-none"
                /> */}
                <section
                    id="Schedule"
                    className="relative bg-[#3d2f1f] rounded-xl p-8 md:p-12 w-full border-4 border-[#8D6E5E]"
                    style={{ maxWidth }}
                >
                    {/* <Image
                        src="/images/left_vine.svg"
                        alt=""
                        width={96}
                        height={96}
                        className="absolute left-0 top-0 -translate-y-1/2 -translate-x-1/2 w-16 md:w-24 z-20 pointer-events-none"
                    /> */}
                    {/* Inner decorative border */}
                    <div className="absolute inset-3 border-2 border-white rounded-xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl md:text-4xl tracking-widest text-white uppercase font-darumadrop-one">
                                Schedule
                            </h1>
                            <svg className="w-48 h-3 mx-auto mt-2" viewBox="0 0 200 12">
                                <path
                                    d="M5 6 Q 30 2, 50 6 T 100 6 T 150 6 T 195 6"
                                    stroke="white"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-center">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
                            </div>
                        )}

                        {/* Error — visible now */}
                        {!loading && error && (
                            <p className="text-center text-red-300 text-sm font-['Chilanka']">
                                ⚠ {error}
                            </p>
                        )}

                        {/* Events */}
                        {!loading && !error && events.length === 0 && (
                            <p className="text-center text-white/50 text-sm font-['Chilanka']">
                                No events found.
                            </p>
                        )}

                        {!loading && events.length > 0 && (
                            <div className="space-y-5">
                                {events.map((item, index) => (
                                    <div key={item.id ?? index} className="flex items-baseline gap-2">
                                        <span className="text-white font-darumadrop-one text-xl whitespace-nowrap">
                                            {item.title}
                                        </span>
                                        <span className="flex-1 border-b-2 border-dotted border-white/70 mx-1 mb-1" />
                                        <span className="text-white font-darumadrop-one text-xl whitespace-nowrap">
                                            {formatTime(item.startTime)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Last updated */}
                        {lastUpdated && (
                            <p className="mt-8 text-center text-xs text-white/40">
                                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}