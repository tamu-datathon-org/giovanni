"use client";
import { useEffect, useState } from "react";
import TimelineDay from "@/components/timeline";

interface Event {
    day: number;
    id: string | number;
    startTime: string;
    endTime: string;
    title: string;
    location: string | number;
    category: string; // Can be comma-separated like "workshops,company events"
}

const CACHE_KEY = "cachedScheduleData";
const CACHE_TIME = 20000; // 20 seconds

// Define the fixed category order and display names
const CATEGORIES = [
    { value: "required", label: "Required" },
    { value: "workshop", label: "Workshop" },
    { value: "company event", label: "Company Event" },
    { value: "food", label: "Food" },
    { value: "fun times", label: "Fun Times" }
];

export default function SchedulePage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const API_URL = '/api/schedule';

    const sortEvents = (data: Event[]) =>
        [...data].sort((a, b) =>
            a.day === b.day
                ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                : a.day - b.day
        );

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
                oldItem.location !== newItem.location ||
                oldItem.category !== newItem.category
            );
        });
    };

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

            if (!Array.isArray(data)) {
                throw new Error('API did not return an array');
            }

            const sorted = sortEvents(data);

            const cachedString = getFromStorage(CACHE_KEY);
            const cached = cachedString ? JSON.parse(cachedString) : [];

            const changed = hasChanged(cached, sorted);

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
        if (typeof window === 'undefined') return;

        const cachedString = getFromStorage(CACHE_KEY);
        if (cachedString) {
            try {
                const cachedData: Event[] = JSON.parse(cachedString);
                const sorted = sortEvents(cachedData);
                setEvents(sorted);
                setLoading(false);
            } catch (err) {
                console.error('Failed to parse cached data:', err);
            }
        }

        loadEvents();
        const interval = setInterval(() => loadEvents(true), CACHE_TIME);
        return () => clearInterval(interval);
    }, []);

    const day1Events = events.filter(e => e.day === 1);
    const day2Events = events.filter(e => e.day === 2);

    return (
        <main className="min-h-screen bg-[#322C29] p-4 md:p-8 font-serif">
            <div className="max-w-7xl mx-auto">
                {/* SVG Title Container */}
                <div className="flex justify-center mb-8">
                    <div className="w-full max-w-2xl">
                        <img src="/images/sche.svg" alt="Schedule Title" className="w-full h-auto" />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-2 rounded-lg font-serif transition-all ${
                            selectedCategory === "all"
                                ? "bg-[#F5EDE4] text-black font-bold"
                                : "bg-[#4A423D] text-[#F5EDE4] hover:bg-[#5A524D]"
                        }`}
                    >
                        All
                    </button>
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`px-4 py-2 rounded-lg font-serif transition-all ${
                                selectedCategory === category.value
                                    ? "bg-[#F5EDE4] text-black font-bold"
                                    : "bg-[#4A423D] text-[#F5EDE4] hover:bg-[#5A524D]"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
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
                        <TimelineDay
                            dayNumber={1}
                            dayName="SATURDAY"
                            events={day1Events}
                            selectedCategory={selectedCategory}
                        />

                        <TimelineDay
                            dayNumber={2}
                            dayName="SUNDAY"
                            events={day2Events}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}