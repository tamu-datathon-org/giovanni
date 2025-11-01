"use client";
import { useEffect, useState } from "react";

interface Event {
    day: number;
    id: string | number;
    startTime: string;
    endTime: string;
    title: string;
    location: string | number;
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

function TimelineDay({ dayNumber, dayName, events }: { dayNumber: number; dayName: string; events: Event[] }) {
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
                        {events.map((event, index) => (
                            <div key={event.id} className="flex gap-4 md:gap-6 relative group">
                                {/* Time */}
                                <div className="w-24 md:w-28 flex-shrink-0 text-right pt-1">
                                    <span
                                        className={`text-base md:text-lg font-medium font-serif ${
                                            index === highlightIndex ? 'text-red-600' : 'text-black'
                                        }`}
                                    >
                                        {formatTime(event.startTime)}
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="flex flex-col items-center relative">
                                    <div
                                        className={`w-5 h-5 rounded-full z-10 flex-shrink-0 mt-1 ${
                                            index === highlightIndex
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
                                            index === highlightIndex
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


const CACHE_KEY = "cachedScheduleData";
const CACHE_TIME = 20000; // 10 seconds

export default function SchedulePage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    // Use local API endpoint instead of Google Sheets directly
    const API_URL = '/api/schedule';

    // sorts by time and day
    const sortEvents = (data: Event[]) =>
        [...data].sort((a, b) =>
            a.day === b.day
                ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                : a.day - b.day
        );

    // Utility: deep compare two arrays of events
    const hasChanged = (oldData: Event[], newData: Event[]) => {
        if (oldData.length !== newData.length) return true;
        return oldData.some((oldItem, i) => {
            const newItem = newData[i];
            return (
                oldItem.day !== newItem.day ||
                oldItem.id !== newItem.id ||
                oldItem.startTime !== newItem.startTime ||
                oldItem.endTime !== newItem.endTime ||
                oldItem.title !== newItem.title ||
                oldItem.location !== newItem.location
            );
        });
    };

    // Safe localStorage wrapper
    const getFromStorage = (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    };

    const setInStorage = (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.warn('localStorage not available:', err);
        }
    };

    // event loading
    const loadEvents = async (checkForChanges = false) => {
        if (!API_URL) {
            setError('API URL not configured');
            setLoading(false);
            return;
        }

        try {
            console.log('Fetching from:', API_URL);
            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: Event[] = await res.json();
            console.log('Received data:', data);
            console.log('First event location:', data[0]?.location);

            if (!Array.isArray(data)) {
                throw new Error('API did not return an array');
            }

            const sorted = sortEvents(data);

            // Get cached version
            const cachedString = getFromStorage(CACHE_KEY);
            const cached = cachedString ? JSON.parse(cachedString) : [];

            // Check for changes
            const changed = hasChanged(cached, sorted);

            // If first load or detected change
            if (!checkForChanges || changed) {
                setEvents(sorted);
                setInStorage(CACHE_KEY, JSON.stringify(sorted));
                setInStorage(`${CACHE_KEY}_time`, Date.now().toString());
                setLastUpdated(Date.now());
                setError(null);

                if (checkForChanges && changed) {
                    console.log("🔄 Schedule changed — reloading UI.");
                }
            } else {
                console.log("✅ No changes detected — skipping reload.");
            }
        } catch (err) {
            console.error("Error fetching schedule:", err);
            setError(err instanceof Error ? err.message : 'Failed to load schedule');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        // Load from cache immediately if available
        const cachedString = getFromStorage(CACHE_KEY);
        if (cachedString) {
            try {
                const cachedData: Event[] = JSON.parse(cachedString);
                setEvents(sortEvents(cachedData));
                setLoading(false);
            } catch (err) {
                console.error('Failed to parse cached data:', err);
            }
        }

        // Load fresh data & start auto-refresh
        loadEvents();
        const interval = setInterval(() => loadEvents(true), CACHE_TIME);
        return () => clearInterval(interval);
    }, []);

    const day1Events = events.filter(e => e.day === 1);
    const day2Events = events.filter(e => e.day === 2);

    return (
        <main className="min-h-screen bg-[#3A3A3A] p-4 md:p-8 font-serif">
            <div className="max-w-7xl mx-auto">
                {/* SVG Title Container */}
                <div className="flex justify-center mb-8">
                    <div className="w-full max-w-2xl">
                        {/* Place your SVG image here */}
                        <img src="/images/sche.svg" alt="Schedule Title" className="w-full h-auto" />
                    </div>
                </div>
                {lastUpdated && (
                    <p className="text-center text-sm text-gray-300 mb-6 font-serif">
                        Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                    </p>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 font-serif">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Day 1 column */}
                        <TimelineDay dayNumber={1} dayName="SATURDAY" events={day1Events} />

                        {/* Day 2 column */}
                        <TimelineDay dayNumber={2} dayName="SUNDAY" events={day2Events} />
                    </div>
                )}
            </div>
        </main>
    );
}

