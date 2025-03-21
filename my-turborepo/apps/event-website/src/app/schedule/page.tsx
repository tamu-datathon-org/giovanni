"use client";

import type { ScheduleItemProps } from "@/components/schedule/ScheduleItem";
import { useEffect, useState } from "react";
import { person } from "@/app/resources/content";
import { ScheduleItem } from "@/components/schedule/ScheduleItem";

// Sample data for the schedule
const events: ScheduleItemProps[] = [
  {
    id: 1,
    title: "Check-in Begins",
    description: "Come check in.",
    startTime: "08:30am",
    endTime: "09:00am",
    type: "directive",
    shape: "square",
  },
  {
    id: 2,
    title: "Opening Ceremony Begins",
    description: "Let the games begin.",
    startTime: "09:00am",
    endTime: "10:00am",
    type: "directive",
    shape: "square",
  },
  {
    id: 8,
    title: "Workshop",
    description: "Knowledge",
    startTime: "10:30am",
    endTime: "11:00am",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 5,
    title: "New Challenge",
    description: "TBA",
    startTime: "11:00am",
    endTime: "12:00pm",
    type: "game",
    shape: "triangle",
  },
  {
    id: 4,
    title: "Lunch",
    description: "Scrumdiddilyumptious",
    startTime: "12:00pm",
    endTime: "01:00pm",
    type: "meal",
    shape: "circle",
  },
  {
    id: 6,
    title: " New Challenge",
    description: "TBA",
    startTime: "01:00pm",
    endTime: "02:00pm",
    type: "game",
    shape: "triangle",
  },
  {
    id: 5,
    title: "Mini-event",
    description: "TBA",
    startTime: "03:00pm",
    endTime: "03:30pm",
    type: "minigame",
    shape: "circle",
  },
  {
    id: 12,
    title: "Closing Ceremony Begins",
    description: "That's a wrap!",
    startTime: "04:00pm",
    endTime: "04:30am",
    type: "directive",
    shape: "square",
  },
];

function Schedule() {
  const timeZone = person.location;
  const locale = "en-US";
  const [currentTime, setCurrentTime] = useState("");
  const [timeUntilEvent, setTimeUntilEvent] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format current time
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);

      // Calculate time until April 5th
      const currentYear = now.getFullYear();
      const eventDate = new Date(currentYear, 3, 5); // Month is 0-indexed, so 3 = April

      // If April 5th has already passed this year, use next year's date
      if (now > eventDate) {
        eventDate.setFullYear(currentYear + 1);
      }

      const timeDiff = eventDate.getTime() - now.getTime();

      // Convert time difference to days, hours, minutes, seconds
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Add leading zeros to single digits
      const padZero = (num: number) => (num < 10 ? `0${num}` : num);
      setTimeUntilEvent(
        `${padZero(days)}:${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`,
      );
    };

    updateTime(); // Initial run to set current time immediately
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]); // Depend on interval for updates

  return (
    <div className="mx-auto flex w-full flex-col gap-2 px-4 md:w-4/5 lg:w-1/2">
      <h1 className="w-full pb-4 text-center font-[myfont] text-3xl sm:text-4xl md:text-5xl">
        Schedule
      </h1>
      {/* Rainbow border effect - adjusted for mobile */}
      <div className="rounded-[10%] border-[8px] border-red-500 sm:rounded-[16%] sm:border-[15px]">
        <div className="rounded-[9%] border-[8px] border-orange-500 sm:rounded-[15%] sm:border-[15px]">
          <div className="border-yellow rounded-[8%] border-[8px] sm:rounded-[14%] sm:border-[15px]">
            <div className="rounded-[7%] border-[8px] border-green-500 sm:rounded-[13%] sm:border-[15px]">
              <div className="rounded-[6%] border-[8px] border-blue-500 sm:rounded-[12%] sm:border-[15px]">
                <div className="rounded-[5%] border-[8px] border-blue-950 sm:rounded-[11%] sm:border-[15px]">
                  {/* Schedule items container */}
                  <div className="flex flex-col items-center gap-3 py-20 md:20 sm:gap-4">
                    {events.map((event) => (
                      <ScheduleItem
                        key={event.id}
                        {...event}
                        tillevent={timeUntilEvent}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
