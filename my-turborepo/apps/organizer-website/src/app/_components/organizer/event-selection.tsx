"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { env } from "~/env";
import { api } from "~/trpc/react";

const STORAGE_KEY = "organizer.selectedEventName";

type EventSelectionContextValue = {
  eventName: string;
  setEventName: (name: string) => void;
  events: { id: string; name: string; startDate: Date; endDate: Date }[];
  isLoading: boolean;
};

const EventSelectionContext = createContext<EventSelectionContextValue | null>(
  null,
);

function readStoredEventName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function EventSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultEvent = env.NEXT_PUBLIC_EVENT_NAME;
  const [eventName, setEventNameState] = useState(defaultEvent);
  const [hydrated, setHydrated] = useState(false);

  const eventsQuery = api.event.listAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const stored = readStoredEventName();
    if (stored) setEventNameState(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !eventsQuery.data?.length) return;
    const names = new Set(eventsQuery.data.map((e) => e.name));
    if (!names.has(eventName)) {
      const fallback =
        (names.has(defaultEvent) ? defaultEvent : eventsQuery.data[0]?.name) ??
        defaultEvent;
      setEventNameState(fallback);
      try {
        localStorage.setItem(STORAGE_KEY, fallback);
      } catch {
        /* ignore */
      }
    }
  }, [hydrated, eventsQuery.data, eventName, defaultEvent]);

  const setEventName = useCallback((name: string) => {
    setEventNameState(name);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      eventName,
      setEventName,
      events: eventsQuery.data ?? [],
      isLoading: eventsQuery.isLoading,
    }),
    [eventName, setEventName, eventsQuery.data, eventsQuery.isLoading],
  );

  return (
    <EventSelectionContext.Provider value={value}>
      {children}
    </EventSelectionContext.Provider>
  );
}

export function useOrganizerEvent() {
  const ctx = useContext(EventSelectionContext);
  if (!ctx) {
    throw new Error(
      "useOrganizerEvent must be used within EventSelectionProvider",
    );
  }
  return ctx;
}
