"use client";

import type { Event } from "@/app/schedule/page";
import { useEffect, useState } from "react";

interface EventCountdownProps {
  events: Event[];
}

export function EventCountdown({ events }: EventCountdownProps) {
  const [currentEvent, setCurrentEvent] = useState<{
    title: string;
    timeLeft: string;
  } | null>(null);
  const [nextEvent, setNextEvent] = useState<{
    title: string;
    timeLeft: string;
  } | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      let current: { title: string; timeLeft: string } | null = null;
      let next: { title: string; timeLeft: string } | null = null;

      for (const event of events) {
        if (!event.startTime || !event.endTime || !event.title) {
          console.warn("[v0] Invalid event data:", event);
          continue;
        }

        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);

        if (!(eventStart instanceof Date) || isNaN(eventStart.getTime())) {
          console.warn("[v0] Invalid event start date:", event.startTime);
          continue;
        }

        if (!(eventEnd instanceof Date) || isNaN(eventEnd.getTime())) {
          console.warn("[v0] Invalid event end date:", event.endTime);
          continue;
        }

        const nowTime = now.getTime();
        const startTime = eventStart.getTime();
        const endTime = eventEnd.getTime();

        if (nowTime >= startTime && nowTime < endTime) {
          const timeUntilEnd = endTime - nowTime;
          const hours = Math.floor(timeUntilEnd / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((timeUntilEnd % (1000 * 60)) / 1000);

          current = {
            title: event.title,
            timeLeft: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
          };
        }

        if (nowTime < startTime && !next) {
          const timeUntilStart = startTime - nowTime;
          const hours = Math.floor(timeUntilStart / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeUntilStart % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

          next = {
            title: event.title,
            timeLeft: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
          };
        }
      }

      setCurrentEvent(current);
      setNextEvent(next);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [events]);

  if (!currentEvent && !nextEvent) {
    return null;
  }

  return (
    <div className="mb-8 border-4 border-double border-[#8B7355] bg-[#D4C5B9] p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {currentEvent ? (
          <div className="border-l-4 border-[#8B7355] pl-4">
            <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#322C29]">
              NOW HAPPENING
            </p>
            <p className="mt-2 font-mono text-3xl font-bold tracking-wider text-[#322C29]">
              {currentEvent.timeLeft}
            </p>
            <p className="mt-2 font-serif text-base text-[#5A4A42]">
              {currentEvent.title}
            </p>
          </div>
        ) : (
          <div className="border-l-4 border-[#8B7355] pl-4">
            <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              No Current Event
            </p>
            <p className="mt-2 font-serif text-base text-[#5A4A42]">
              Awaiting next event...
            </p>
          </div>
        )}

        {nextEvent ? (
          <div className="border-l-4 border-[#8B7355] pl-4">
            <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#322C29]">
              NEXT EVENT
            </p>
            <p className="mt-2 font-mono text-3xl font-bold tracking-wider text-[#322C29]">
              {nextEvent.timeLeft}
            </p>
            <p className="mt-2 font-serif text-base text-[#5A4A42]">
              {nextEvent.title}
            </p>
          </div>
        ) : (
          <div className="border-l-4 border-[#8B7355] pl-4">
            <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Schedule Complete
            </p>
            <p className="mt-2 font-serif text-base text-[#5A4A42]">
              All events have concluded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
