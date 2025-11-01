"use client";
import { useEffect, useState } from "react";

interface Event {
    day: number;
    id: string | number;
    startTime: string;
    endTime: string;
    title: string;
    location: string | number;
    category: string; // Can be comma-separated like "workshops,company events"
}

function formatTime(dateString: string) {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

export default function TimelineDay({
    dayNumber,
    dayName,
    events,
    selectedCategory = "all"
}: {
    dayNumber: number;
    dayName: string;
    events: Event[];
    selectedCategory?: string;
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    // Find the current/active event
    const highlightIndex = events.findIndex((event, index) => {
        const startTime = new Date(event.startTime).getTime();
        const nextEvent = events[index + 1];
        const endTime = nextEvent
            ? new Date(nextEvent.startTime).getTime()
            : new Date(event.endTime).getTime();

        const now = currentTime.getTime();
        return now >= startTime && now < endTime;
    });

    return (
        <div className="w-full bg-[#F5EDE4] shadow-lg overflow-hidden font-serif">
            {/* header */}
            <div className="bg-[#F5EDE4] p-6 border-b-4 border-black">
                <h1 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wide font-serif">
                    {dayName}
                </h1>
            </div>

            {/* Timeline Container */}
            <div className="bg-[#F5EDE4] p-6 md:p-8">
                {events.length === 0 ? (
                    <p className="text-center text-gray-600 font-serif">No events scheduled</p>
                ) : (
                    <div className="space-y-0">
                        {events.map((event, index) => {
                            // Handle multiple categories (comma-separated)
                            const eventCategories = (event.category || '')
                                .split(',')
                                .map(cat => cat.toLowerCase().trim());
                            const selectedCat = selectedCategory.toLowerCase().trim();
                            const isFiltered = selectedCat !== "all" && !eventCategories.includes(selectedCat);
                            const isDimmed = isFiltered;

                            return (
                                <div
                                    key={event.id}
                                    className={`flex gap-4 md:gap-6 relative group transition-opacity duration-300 ${
                                        isDimmed ? 'opacity-30' : 'opacity-100'
                                    }`}
                                >
                                    {/* Time */}
                                    <div className="w-24 md:w-28 flex-shrink-0 text-right pt-1">
                                        <span
                                            className={`text-base md:text-lg font-medium font-serif ${
                                                index === highlightIndex && !isDimmed ? 'text-red-600' : 'text-black'
                                            }`}
                                        >
                                            {formatTime(event.startTime)}
                                        </span>
                                    </div>

                                    {/* Timeline */}
                                    <div className="flex flex-col items-center relative">
                                        <div
                                            className={`w-5 h-5 rounded-full z-10 flex-shrink-0 mt-1 ${
                                                index === highlightIndex && !isDimmed
                                                    ? 'bg-red-600 border-4 border-red-600'
                                                    : 'bg-black border-4 border-black'
                                            }`}
                                        />
                                        {index < events.length - 1 && (
                                            <div
                                                className="w-0.5 bg-black flex-grow absolute top-6"
                                                style={{ height: "calc(100% - 0.5rem)" }}
                                            />
                                        )}
                                    </div>

                                    {/* Event Details */}
                                    <div className="flex-1 pb-4 pt-0.5">
                                        <h2
                                            className={`text-lg md:text-xl font-serif ${
                                                index === highlightIndex && !isDimmed
                                                    ? 'text-red-600 font-medium'
                                                    : 'text-black'
                                            }`}
                                        >
                                            {event.title}
                                        </h2>
                                        {event.location && (
                                            <p className="text-sm md:text-base text-gray-800 mt-1 font-serif">
                                                {event.location || 'No location specified'}
                                            </p>
                                        )}
                                        {/* {event.category && (
                                            <p className="text-xs text-gray-600 mt-1 font-serif italic">
                                                {event.category}
                                            </p>
                                        )} */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}