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
    startTime: "08:00am",
    endTime: "09:00am",
    type: "directive",
    shape: "square",
  },
  {
    id: 2,
    title: "Opening Ceremony Begins",
    description: "Let the games begin.",
    startTime: "09:00am",
    endTime: "09:30am",
    type: "directive",
    shape: "square",
  },
  {
    id: 30,
    title: "Hacking Begins",
    description: "Lets Go!",
    startTime: "9:30am",
    endTime: "3:30pm",
    type: "game",
    shape: "triangle",
  },
  {
    id: 31,
    title: "Scavenger Hunt Begins",
    description: "Find the items!",
    startTime: "9:30am",
    endTime: "3:30pm",
    type: "game",
    shape: "triangle",
  },
  {
    id: 40,
    title: "Beginner ML Workshop",
    description: "Knowledge",
    startTime: "9:50am",
    endTime: "11:10am",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 1,
    title: "Web Scraping Workshop",
    description: "Knowledge",
    startTime: "10:30am",
    endTime: "10:50am",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 1,
    title: "Prompting Workshop",
    description: "Knowledge",
    startTime: "11:20am",
    endTime: "11:40pm",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 60,
    title: "Lunch",
    description: "Scrumdiddilyumptious",
    startTime: "12:00pm",
    endTime: "01:00pm",
    type: "meal",
    shape: "circle",
  },
  {
    id: 1,
    title: "3rd Party ML Workshop",
    description: "Knowledge",
    startTime: "1:30pm",
    endTime: "1:50pm",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 1,
    title: "Command Line / Terminal Workshop",
    description: "Knowledge",
    startTime: "2:10pm",
    endTime: "2:30pm",
    type: "workshop",
    shape: "triangle",
  },
  {
    id: 101,
    title: "Submissions Close",
    description: "That's a wrap!",
    startTime: "3:30pm",
    endTime: "3:30pm",
    type: "game",
    shape: "square",
  },
  {
    id: 102,
    title: "Mini Event",
    description: "Have Fun!",
    startTime: "3:30pm",
    endTime: "4:00pm",
    type: "game",
    shape: "square",
  },
  {
    id: 100,
    title: "Closing Ceremony Begins",
    description: "That's a wrap!",
    startTime: "4:00pm",
    endTime: "4:30am",
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
      <div className="rounded-[100px] border-[8px] border-customRed sm:rounded-[150px] sm:border-[20px]">
        <div className="rounded-[90px] border-[8px] border-customyellow sm:rounded-[130px] sm:border-[20px]">
          <div className="rounded-[80px] border-[8px] border-customgreen sm:rounded-[110px] sm:border-[20px]">
            <div className="rounded-[70px] border-[8px] border-customblue sm:rounded-[90px] sm:border-[20px]">
              <div className="rounded-[63px] border-[8px] border-custompurple sm:rounded-[70px] sm:border-[20px]">
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
