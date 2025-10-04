"use client";
import { useEffect, useState } from "react";
import ScheduleEvent from "@/components/Schedule/ScheduleEvent";

interface Event {
    id: string | number;
    date: string;
    title: string;
    description: string;
}

const CACHE_KEY = "cachedScheduleData";
const CACHE_TIME = 10000; // 10 seconds

export default function SchedulePage() {
    const API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL!;
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    // Utility: sort events consistently for comparison
    const sortEvents = (data: Event[]) =>
        [...data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

    // Utility: deep compare two arrays of events
    const hasChanged = (oldData: Event[], newData: Event[]) => {
        if (oldData.length !== newData.length) return true;
        return oldData.some((oldItem, i) => {
            const newItem = newData[i];
            return (
                oldItem.id !== newItem.id ||
                oldItem.date !== newItem.date ||
                oldItem.title !== newItem.title ||
                oldItem.description !== newItem.description
            );
        });
    };

    const loadEvents = async (checkForChanges = false) => {
        try {
            const res = await fetch(API_URL);
            const data: Event[] = await res.json();
            const sorted = sortEvents(data);

            // Get cached version
            const cachedString = localStorage.getItem(CACHE_KEY);
            const cached = cachedString ? JSON.parse(cachedString) : [];

            // Check for changes
            const changed = hasChanged(cached, sorted);

            // If first load or detected change
            if (!checkForChanges || changed) {
                setEvents(sorted);
                localStorage.setItem(CACHE_KEY, JSON.stringify(sorted));
                localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());
                setLastUpdated(Date.now());

                if (checkForChanges && changed) {
                    console.log("🔄 Schedule changed — reloading UI.");
                }
            } else {
                console.log("✅ No changes detected — skipping reload.");
            }
        } catch (err) {
            console.error("Error fetching schedule:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load from cache immediately if available
        const cachedString = localStorage.getItem(CACHE_KEY);
        if (cachedString) {
            const cachedData: Event[] = JSON.parse(cachedString);
            setEvents(sortEvents(cachedData));
            setLoading(false);
        }

        // Load fresh data & start auto-refresh
        loadEvents();
        const interval = setInterval(() => loadEvents(true), CACHE_TIME);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">📅 Event Schedule</h1>

            {lastUpdated && (
                <p className="text-center text-sm text-gray-500 mb-4">
                    Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                </p>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {events.length > 0 ? (
                        events.map((e) => <ScheduleEvent key={String(e.id)} event={e} />)
                    ) : (
                        <p className="text-center text-gray-600">No events found.</p>
                    )}
                </div>
            )}
        </main>
    );
}
