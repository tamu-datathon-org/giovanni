"use client";

import type { ScheduleItemProps } from "@/components/schedule/ScheduleItem";
import { useEffect, useState } from "react";
import { person } from "@/app/resources/content";
import { ScheduleItem } from "@/components/schedule/ScheduleItem";

// Sample data for the schedule
const events: ScheduleItemProps[] = [
  {
    id: 3,
    title: "Tug of War",
    description: "Work as a team to pull your opponents over the edge.",
    startTime: "09:00",
    endTime: "12:00",
    type: "game",
    shape: "square",
  },
  {
    id: 1,
    title: "Red Light, Green Light",
    description: "Don't move when the doll turns around!",
    startTime: "10:00",
    endTime: "11:30",
    type: "game",
    shape: "circle",
  },
  {
    id: 8,
    title: "Final Game",
    description: "The Squid Game itself. Winner takes all.",
    startTime: "10:00",
    endTime: "14:00",
    type: "game",
    shape: "square",
  },
  {
    id: 4,
    title: "Marbles",
    description: "Play marbles with your partner. Winner takes all.",
    startTime: "13:00",
    endTime: "15:30",
    type: "game",
    shape: "circle",
  },
  {
    id: 2,
    title: "Sugar Honeycomb",
    description: "Carefully cut out the shape without breaking it.",
    startTime: "14:00",
    endTime: "16:00",
    type: "game",
    shape: "triangle",
  },
  {
    id: 5,
    title: "Glass Stepping Stones",
    description: "Choose the right glass panel to step on.",
    startTime: "16:00",
    endTime: "18:00",
    type: "game",
    shape: "triangle",
  },
  {
    id: 6,
    title: "Dinner",
    description: "Enjoy your meal with other players.",
    startTime: "18:00",
    endTime: "19:00",
    type: "meal",
    shape: "square",
  },
  {
    id: 7,
    title: "Rest Period",
    description: "Time to rest before the next challenge.",
    startTime: "19:00",
    endTime: "21:00",
    type: "rest",
    shape: "circle",
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
        Schedule (TBD)
      </h1>
      {/* Rainbow border effect - adjusted for mobile */}
      <div className="rounded-[10%] border-[8px] border-customRed sm:rounded-[16%] sm:border-[15px]">
        <div className="rounded-[9%] border-[8px] border-customyellow sm:rounded-[14%] sm:border-[15px]">
          <div className="rounded-[8%] border-[8px] border-customgreen sm:rounded-[12%] sm:border-[15px]">
            <div className="rounded-[7%] border-[8px] border-customblue sm:rounded-[10%] sm:border-[15px]">
              <div className="rounded-[6%] border-[8px] border-custompurple sm:rounded-[7%] sm:border-[15px]">
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
  );
}


export default Schedule;
