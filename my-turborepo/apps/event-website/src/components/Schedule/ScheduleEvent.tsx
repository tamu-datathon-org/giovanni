"use client";
import { useState } from "react";

interface Event {
    id: string | number;
    date: string;
    title: string;
    description: string;
}

interface ScheduleEventProps {
    event: Event;
}

export default function ScheduleEvent({ event }: ScheduleEventProps) {
    const [expanded, setExpanded] = useState(false);

    function formatDate(dateString: string) {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <div
            className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                </div>
                <span
                    className={`text-sm text-gray-500 transition-transform ${
                        expanded ? "rotate-180" : ""
                    }`}
                >
          ▼
        </span>
            </div>

            {expanded && (
                <div className="mt-3 border-t border-gray-200 pt-3 text-gray-700 animate-fadeIn">
                    <p className="whitespace-pre-wrap">{event.description}</p>
                </div>
            )}
        </div>
    );
}
