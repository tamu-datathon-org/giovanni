"use client";

import { useSchedule } from "@/hooks/useSchedule";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Image from "next/image";

export default function Schedule() {
    const { events, loading, lastUpdated } = useSchedule();
    const width = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width < 1024;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAE19D] p-4">
            <div className="relative w-full" style={{ maxWidth: isMobile ? '100%' : isTablet ? '500px' : '700px' }}>
                {/* left vine */}
                {/* <Image
                    src="/images/left_vine.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 md:w-24 z-20 pointer-events-none"
                /> */}

                {/* right vine */}
                {/* <Image
                    src="/images/right_vine.svg"
                    alt=""
                    width={96}
                    height={96}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-16 md:w-24 z-20 pointer-events-none"
                /> */}

                <section id="Schedule" className="relative bg-[#3d2f1f] rounded-xl p-8 md:p-12 w-full shadow-2xl"
                    style={{ maxWidth: isMobile ? '100%' : isTablet ? '500px' : '700px' }}>

                    <div className="absolute inset-3 border-2 border-[#5a4a3a] rounded-xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* title */}
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl md:text-4xl tracking-widest text-white uppercase"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
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

                        {/* Events */}
                        {loading ? (
                        <div className="flex justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
                        </div>
                        ) : (
                        <div className="space-y-5">
                            {events.map((item, index) => (
                            <div key={index} className="flex items-baseline gap-2">
                                <span className="text-white font-bold text-lg whitespace-nowrap"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {item.title}
                                </span>
                                <span className="flex-1 border-b-2 border-dotted border-white/70 mx-1 mb-1" />
                                <span className="text-white font-bold text-lg whitespace-nowrap"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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