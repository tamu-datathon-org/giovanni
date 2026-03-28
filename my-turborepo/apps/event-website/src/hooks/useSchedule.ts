"use client";

import { useCallback, useEffect, useState } from "react";

export interface Event {
  id: string | number;
  startTime: string;
  endTime: string;
  title: string;
  location: string | number;
  category: string;
}

const CACHE_KEY = "cachedScheduleData";
const CACHE_TIME = 20000;

const sortEvents = (data: Event[]) =>
    [...data].sort((a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

const hasChanged = (oldData: Event[], newData: Event[]) => {
    if (oldData.length !== newData.length) return true;
    return oldData.some((oldItem, i) => {
        const newItem = newData[i];
        return (
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
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    const loadEvents = useCallback(async (checkForChanges = false) => {
        try {
        const res = await fetch("/api/schedule");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = (await res.json()) as Event[];
        if (!Array.isArray(data)) throw new Error("API did not return an array");

        const sorted = sortEvents(data);
        const cachedString = getFromStorage(CACHE_KEY);
        const cached = cachedString ? (JSON.parse(cachedString) as Event[]) : [];
        const changed = hasChanged(cached, sorted);

        if (!checkForChanges || changed) {
            setEvents(sorted);
            setInStorage(CACHE_KEY, JSON.stringify(sorted));
            setInStorage(`${CACHE_KEY}_time`, Date.now().toString());
            setLastUpdated(Date.now());
            setError(null);
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load schedule");
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        const cachedString = getFromStorage(CACHE_KEY);
        if (cachedString) {
        try {
            setEvents(sortEvents(JSON.parse(cachedString) as Event[]));
            setLoading(false);
        } catch (err) {
            console.error("Failed to parse cached data:", err);
        }
        }
        void loadEvents();
        const interval = setInterval(() => void loadEvents(true), CACHE_TIME);
        return () => clearInterval(interval);
    }, [loadEvents]);

    return {
        events,
        loading,
        error,
        lastUpdated,
    };
}