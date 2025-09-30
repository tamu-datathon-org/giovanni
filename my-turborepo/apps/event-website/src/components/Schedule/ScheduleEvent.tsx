"use client";

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
    // Format date nicely
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
            key={String(event.id)}
            className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
        >
            <p className="text-sm text-gray-600 mb-1">{formatDate(event.date)}</p>
            <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
        </div>
    );
}
