"use client";
import { useEffect, useState } from "react";
import ScheduleEvent from "@/components/Schedule/ScheduleEvent"; // adjust path if needed

interface Event {
    id: string | number;
    date: string;
    title: string;
    description: string;
}

export default function SchedulePage() {
    const API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL!;
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data: Event[] = await res.json();

            const sorted = [...data].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            setEvents(sorted);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">📅 Event Schedule</h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {events.map((e) => (
                        <ScheduleEvent key={String(e.id)} event={e} />
                    ))}
                </div>
            )}
        </main>
    );
}
