"use client";

import { useCallback, useEffect, useState } from "react";
// FIXME: uncomment the colors if you want color for the diff categories
export interface Event {
    id: string | number;
    startTime: string;      // raw ISO — for countdown
    endTime: string;        // raw ISO — for countdown
    displayStart: string;   // formatted — for schedule display
    displayEnd: string;     // formatted — for schedule display
    title: string;
    location: string | number;
    category: string;
}

const CACHE_KEY = "cachedScheduleData";
const POLL_INTERVAL = 20_000; // 20 s

// only highlight on workshops and food
const catColor: Record<string, string> = {
    workshop: "#B4D8EE",
    food: "#F0CF91",
    "fun stuff": "#CDDBA6",
    deadline: "#FF8478",

};

// default is white
function getCatColor(category: string): string {
    if (!category) return "#FFFFFF";
    const key = category.trim().toLowerCase();
    return catColor[key] ?? "#FFFFFF";
}

/** Return the time portion as-is — we don't need date parsing. */
function normalizeTime(raw: unknown): string {
    if (!raw) return "";
    const str = String(raw).trim();

    // Parse as a real Date object since it's a full JS date string
    const date = new Date(str);
    if (!isNaN(date.getTime())) {
        let hour = date.getHours();
        const minute = String(date.getMinutes()).padStart(2, "0");
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    return str;
}

// timer and schedule need two diff times the timer depends on actual
const normalizeEvent = (e: Record<string, unknown>): Event => ({
    id:           e.id as string | number,
    startTime:    String(e.startTime ?? ""),
    endTime:      String(e.endTime ?? ""),
    displayStart: normalizeTime(e.startTime),
    displayEnd:   normalizeTime(e.endTime),
    title:        String(e.title ?? ""),
    location:     e.location as string | number,
    category:     String(e.category ?? ""),
});

const sortEvents = (data: Event[]) =>
    [...data].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

const hasChanged = (oldData: Event[], newData: Event[]) => {
    if (oldData.length !== newData.length) return true;
    return oldData.some((oldItem, i) => {
        const n = newData[i];
        return (
            oldItem.id        !== n.id        ||
            oldItem.displayStart !== n.displayStart ||
            oldItem.displayEnd   !== n.displayEnd  ||
            oldItem.title     !== n.title     ||
            oldItem.location  !== n.location  ||
            oldItem.category  !== n.category
        );
    });
};



// Safe localStorage helpers (SSR-safe)
const getFromStorage = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try { return localStorage.getItem(key); } catch { return null; }
};
const setInStorage = (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(key, value); } catch (err) {
        console.warn("localStorage not available:", err);
    }
};

export function useSchedule() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    const loadEvents = useCallback(async (checkForChanges = false) => {
        try {
            const res = await fetch("/api/schedule", { cache: "no-store" });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const json: unknown = await res.json();

            // The API wraps errors as { error: string, data: [] }
            if (!Array.isArray(json)) {
                const maybeError = json as { error?: string };
                throw new Error(maybeError?.error ?? "API did not return an array");
            }

            const sorted = sortEvents(
                (json as Record<string, unknown>[]).map(normalizeEvent)
            );

            const cachedString = getFromStorage(CACHE_KEY);
            const cached: Event[] = cachedString
                ? (JSON.parse(cachedString) as Event[])
                : [];

            if (!checkForChanges || hasChanged(cached, sorted)) {
                setEvents(sorted);
                setInStorage(CACHE_KEY, JSON.stringify(sorted));
                setLastUpdated(Date.now());
                setError(null);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed to load schedule";
            setError(msg);
            console.error("[useSchedule]", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Show cached data immediately while we fetch fresh data
        const cachedString = getFromStorage(CACHE_KEY);
        if (cachedString) {
            try {
                setEvents(sortEvents(JSON.parse(cachedString) as Event[]));
                setLoading(false);
            } catch (err) {
                console.error("Failed to parse cached schedule data:", err);
            }
        }

        void loadEvents();
        const interval = setInterval(() => void loadEvents(true), POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [loadEvents]);

    return { events, loading, error, lastUpdated, getCatColor };
}