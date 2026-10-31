"use client";

import { useCallback, useEffect, useState } from "react";

interface Event {
  id: string | number;
  date: string | number;
  title: string;
  description: string;
}

export default function CMSPage() {
  // Not asserted non-null: the deploy may legitimately be missing this, and a
  // silent failure here renders an empty list that looks like a working page.
  const API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
  const isConfigured = typeof API_URL === "string" && API_URL.length > 0;
  const [error, setError] = useState<string | null>(null);
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
  const loadEvents = useCallback(async () => {
    if (!isConfigured) {
      setError(
        "NEXT_PUBLIC_GOOGLE_SHEET_API_URL is not set. This page cannot load or save events until it is configured at build time.",
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Schedule API responded ${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as Event[];
      setEvents(data);
    } catch (e) {
      setEvents([]);
      setError(
        `Could not load events from the schedule API. ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL, isConfigured]);

  // Add or edit event
  const handleSubmit = async () => {
    if (!isFormValid || !isConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const action = editingId ? "edit" : "add";
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          action,
          id: String(form.id),
          date: String(form.date),
          title: String(form.title),
          description: String(form.description),
        }),
      });
      if (!res.ok) {
        throw new Error(`Schedule API responded ${res.status} ${res.statusText}`);
      }

      // Reset form
      setForm({ id: "", date: "", title: "", description: "" });
      setEditingId(null);
      await loadEvents();
    } catch (e) {
      setError(
        `Could not save the event. ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const handleDelete = async (id: string | number) => {
    if (!isConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "delete", id: String(id) }),
      });
      if (!res.ok) {
        throw new Error(`Schedule API responded ${res.status} ${res.statusText}`);
      }
      await loadEvents();
    } catch (e) {
      setError(
        `Could not delete the event. ${e instanceof Error ? e.message : String(e)}`,
      );
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
    void loadEvents();
  }, [loadEvents]);

  return (
    <main className="relative mx-auto max-w-xl p-6">
      {/* 🔹 Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <h1 className="mb-6 text-2xl font-bold">Schedule CMS</h1>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          <p className="font-semibold">Schedule API unavailable</p>
          <p className="mt-1">{error}</p>
          {isConfigured && (
            <button
              onClick={() => void loadEvents()}
              className="mt-2 rounded bg-red-600 px-3 py-1 text-white"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Form */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl">
          {editingId ? "Edit Event" : "Add Event"}
        </h2>
        <input
          className="mb-2 w-full border p-2"
          placeholder="ID"
          value={String(form.id)}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          disabled={!!editingId}
        />
        <input
          type="date"
          className="mb-2 w-full border p-2"
          value={String(form.date)}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          className="mb-2 w-full border p-2"
          placeholder="Title"
          value={String(form.title)}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="mb-2 w-full border p-2"
          placeholder="Description"
          value={String(form.description)}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading || !isConfigured}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
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
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Event list */}
      <div className="text-black">
        <h2 className="mb-2 text-xl">Current Events</h2>
        {events.map((e) => (
          <div
            key={String(e.id)}
            className="mb-2 flex items-center justify-between rounded border bg-gray-50 p-3 shadow-sm"
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
                className="rounded bg-blue-600 px-3 py-1 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                disabled={loading}
                className="rounded bg-red-600 px-3 py-1 text-white"
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
