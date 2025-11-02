"use client";
import { useEffect, useState } from "react";

interface Event {
    id: string | number;
    date: string | number;
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
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // ✅ Always coerce to string before validating
    const isFormValid =
        String(form.id).trim() !== "" &&
        String(form.date).trim() !== "" &&
        String(form.title).trim() !== "" &&
        String(form.description).trim() !== "";

    // Fetch events
    const loadEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json() as Event[];
            setEvents(data);
        } finally {
            setLoading(false);
        }
    };

    // Add or edit event
    const handleSubmit = async () => {
        if (!isFormValid) return;
        setLoading(true);
        try {
            const action = editingId ? "edit" : "add";
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    action,
                    id: String(form.id),
                    date: String(form.date),
                    title: String(form.title),
                    description: String(form.description),
                }),
            });

            // Reset form
            setForm({ id: "", date: "", title: "", description: "" });
            setEditingId(null);
            await loadEvents();
        } finally {
            setLoading(false);
        }
    };

    // Delete event
    const handleDelete = async (id: string | number) => {
        setLoading(true);
        try {
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ action: "delete", id: String(id) }),
            });
            await loadEvents();
        } finally {
            setLoading(false);
        }
    };

    // Enter edit mode
    const handleEdit = (event: Event) => {
        setForm({
            id: String(event.id),
            date: String(event.date),
            title: String(event.title),
            description: String(event.description),
        });
        setEditingId(String(event.id));
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <main className="max-w-xl mx-auto p-6 relative">
            {/* 🔹 Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Loading...</p>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6">Schedule CMS</h1>

            {/* Form */}
            <div className="mb-8">
                <h2 className="text-xl mb-2">{editingId ? "Edit Event" : "Add Event"}</h2>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="ID"
                    value={String(form.id)}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    disabled={!!editingId}
                />
                <input
                    type="date"
                    className="border p-2 w-full mb-2"
                    value={String(form.date)}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Title"
                    value={String(form.title)}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    className="border p-2 w-full mb-2"
                    placeholder="Description"
                    value={String(form.description)}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <div className="flex gap-2">
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {editingId ? "Save Changes" : "Add Event"}
                    </button>
                    {editingId && (
                        <button
                            onClick={() => {
                                setForm({ id: "", date: "", title: "", description: "" });
                                setEditingId(null);
                            }}
                            disabled={loading}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Event list */}
            <div className="text-black">
                <h2 className="text-xl mb-2">Current Events</h2>
                {events.map((e) => (
                    <div
                        key={String(e.id)}
                        className="border rounded p-3 mb-2 bg-gray-50 shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{String(e.date)}</p>
                            <p>
                                <b>{e.title}</b>
                            </p>
                            <p>{e.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(e)}
                                disabled={loading}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(e.id)}
                                disabled={loading}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
