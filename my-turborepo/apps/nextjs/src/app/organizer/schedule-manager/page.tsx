"use client";
import { useEffect, useState } from "react";
import { env } from "~/env";

interface Event {
    id: string;
    date: string;
    title: string;
    description: string;
}

export default function CMSPage() {
    const API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL!;
    const [events, setEvents] = useState<Event[]>([]);
    const [form, setForm] = useState<Event>({
        id: "",
        date: "",
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const isFormValid =
        form.id.trim() !== "" &&
        form.date.trim() !== "" &&
        form.title.trim() !== "" &&
        form.description.trim() !== "";

    // Fetch events
    const loadEvents = async () => {
        const res = await fetch(API_URL);
        const data: Event[] = await res.json();
        setEvents(data);
    };

    // Add event
    const addEvent = async () => {
        if(!isFormValid){ return; } // prevent submission of invalid form
        setLoading(true); // show loading spinner/screen
        try{
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(form),
            });
            setForm({ id: "", date: "", title: "", description: "" });
            loadEvents();
        } finally {
            setLoading(false); // hide loading spinner/screen
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <main className="max-w-xl mx-auto p-6">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Submitting...</p>
                    </div>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-6">Schedule CMS</h1>

            <div className="mb-8">
                <h2 className="text-xl mb-2">Add Event</h2>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="ID"
                    value={form.id}
                    onChange={(e) => setForm({...form, id: e.target.value})}
                />
                <input
                    type="date"
                    className="border p-2 w-full mb-2"
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                />
                <textarea
                    className="border p-2 w-full mb-2"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                />
                <button
                    onClick={addEvent}
                    disabled={!isFormValid || loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Add Event"}
                </button>
            </div>

            <div className="text-black">
                <h2 className="text-xl mb-2">Current Events</h2>
                {events.map((e) => (
                    <div
                        key={e.id}
                        className="border rounded p-3 mb-2 bg-gray-50 shadow-sm"
                    >
                        <p className="font-semibold">{e.date}</p>
                        <p>
                            <b>{e.title}</b>
                        </p>
                        <p>{e.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
