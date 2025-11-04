"use client";

import { useCallback, useEffect, useState } from "react";
import TimelineDay from "@/components/timeline";
import { EventCountdown } from "@/components/timeline/EventCountdown";

export interface Event {
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
  { value: "fun times", label: "Fun Times" },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const API_URL = "/api/schedule";

  const sortEvents = (data: Event[]) =>
    [...data].sort((a, b) =>
      a.day === b.day
        ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        : a.day - b.day,
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
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const setInStorage = (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn("localStorage not available:", err);
    }
  };

  const loadEvents = useCallback(async (checkForChanges = false) => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as Event[];
      console.log("Received data:", data);

      if (!Array.isArray(data)) {
        throw new Error("API did not return an array");
      }

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

        if (checkForChanges && changed) {
          console.log("Schedule changed — reloading UI.");
        }
      } else {
        console.log("No changes detected — skipping reload.");
      }
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError(err instanceof Error ? err.message : "Failed to load schedule");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cachedString = getFromStorage(CACHE_KEY);
    if (cachedString) {
      try {
        const cachedData = JSON.parse(cachedString) as Event[];
        const sorted = sortEvents(cachedData);
        setEvents(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to parse cached data:", err);
      }
    }

    void loadEvents();
    const interval = setInterval(() => {
      void loadEvents(true);
    }, CACHE_TIME);
    return () => clearInterval(interval);
  }, [loadEvents]);

  const day1Events = events.filter((e) => e.day === 1);
  const day2Events = events.filter((e) => e.day === 2);

  return (
    <main className="min-h-screen bg-[#322C29] p-4 font-serif md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* SVG Title Container */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sche.svg"
              alt="Schedule Title"
              className="h-auto w-full"
            />
          </div>
        </div>

        <EventCountdown events={events} />

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-lg px-4 py-2 font-serif transition-all ${
              selectedCategory === "all"
                ? "bg-[#F5EDE4] font-bold text-black"
                : "bg-[#4A423D] text-[#F5EDE4] hover:bg-[#5A524D]"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-lg px-4 py-2 font-serif transition-all ${
                selectedCategory === category.value
                  ? "bg-[#F5EDE4] font-bold text-black"
                  : "bg-[#4A423D] text-[#F5EDE4] hover:bg-[#5A524D]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {lastUpdated && (
          <p className="mb-6 text-center font-serif text-sm text-gray-300">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}

        {error && (
          <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 font-serif text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
