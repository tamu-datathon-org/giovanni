"use client";

import { useSchedule } from "@/hooks/useSchedule";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { EventCountdown } from "./EventCountdown";
import { useState, useEffect } from "react";
import Image from "next/image";

//format the time in accordance to the google sheet
function formatTime(raw: string): string {
    if (!raw) return "—";
    return raw;
}

// if event has passed
function isEventPassed(endTime: string): boolean {
    if (!endTime) return false;
    const eventEnd = new Date(endTime).getTime();
    const now = Date.now();
    return now > eventEnd;
}


export default function Schedule() {
    const { events, loading, error, lastUpdated, getCatColor } = useSchedule();
    const width    = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width < 1024;

    const maxWidth = isMobile ? "100%" : isTablet ? "500px" : "700px";
    // re-render every minute to update passed events
    const [, setTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1);
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#f0cf91] p-4">
            <div className="relative w-full" style={{ maxWidth }}>
                <EventCountdown events={events}/>
                {/* contains light brown outer boarder */}
                <section id="Schedule"
                    className="relative bg-[#3d2f1f] rounded-xl p-8 md:p-12 w-full border-4 border-[#8D6E5E]"
                    style={{ maxWidth }}
                >
                    {/* inner decorative border (white)*/}
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
                                {events.map((item, index) => {
                                    const passed = isEventPassed(item.endTime);

                                    return (
                                        <div
                                            key={item.id ?? index}
                                            className={`flex items-baseline gap-2 transition-all duration-300 ${
                                                passed ? "opacity-60" : ""
                                            }`}
                                        >
                                            {/* Event Title to add color cats do getCatColor(item.category) */}
                                            <span
                                                style={{
                                                    color: passed ? "#888888" : getCatColor(item.category),
                                                }}
                                                className={`font-darumadrop-one text-md sm:text-lg md:text-2xl lg:text-3xl whitespace-nowrap transition-all duration-300 ${
                                                    passed ? "line-through decoration-2" : ""
                                                }`}
                                            >
                                                {item.title}
                                            </span>

                                            {/* Dotted Line */}
                                            <span
                                                className={`flex-1 border-b-2 border-dotted mx-1 mb-1 transition-all duration-300 ${
                                                    passed ? "border-white/30" : "border-white/70"
                                                }`}
                                            />

                                            {/* Event Time */}
                                            <span
                                                style={{
                                                    color: passed ? "#888888" : getCatColor(item.category),
                                                }}
                                                className={`font-darumadrop-one text-md sm:text-lg md:text-2xl lg:text-3xl whitespace-nowrap transition-all duration-300 ${
                                                    passed ? "line-through decoration-2" : ""
                                                }`}
                                            >
                                                {formatTime(item.displayStart)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Last updated */}
                        {/* {lastUpdated && (
                            <p className="mt-8 text-center text-xs text-white/40">
                                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                            </p>
                        )} */}
                    </div>
                </section>
            </div>
        </div>
    );
}