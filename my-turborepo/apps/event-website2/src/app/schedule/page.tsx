"use client";

import type { ScheduleItemProps } from "@/components/schedule/ScheduleItem";
import React from "react";
import { ScheduleItem } from "@/components/schedule/ScheduleItem";

// Sample data for the schedule
const events: ScheduleItemProps[] = [
  {
    id: 1,
    title: "Red Light, Green Light",
    description: "Don't move when the doll turns around!",
    day: "Monday",
    startTime: "10:00",
    endTime: "11:30",
    type: "game",
    shape: "circle",
  },
  {
    id: 2,
    title: "Sugar Honeycomb",
    description: "Carefully cut out the shape without breaking it.",
    day: "Tuesday",
    startTime: "14:00",
    endTime: "16:00",
    type: "game",
    shape: "triangle",
  },
  {
    id: 3,
    title: "Tug of War",
    description: "Work as a team to pull your opponents over the edge.",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "12:00",
    type: "game",
    shape: "square",
  },
  {
    id: 4,
    title: "Marbles",
    description: "Play marbles with your partner. Winner takes all.",
    day: "Thursday",
    startTime: "13:00",
    endTime: "15:30",
    type: "game",
    shape: "circle",
  },
  {
    id: 5,
    title: "Glass Stepping Stones",
    description: "Choose the right glass panel to step on.",
    day: "Friday",
    startTime: "16:00",
    endTime: "18:00",
    type: "game",
    shape: "triangle",
  },
  {
    id: 6,
    title: "Dinner",
    description: "Enjoy your meal with other players.",
    day: "Monday",
    startTime: "18:00",
    endTime: "19:00",
    type: "meal",
    shape: "square",
  },
  {
    id: 7,
    title: "Rest Period",
    description: "Time to rest before the next challenge.",
    day: "Wednesday",
    startTime: "19:00",
    endTime: "21:00",
    type: "rest",
    shape: "circle",
  },
  {
    id: 8,
    title: "Final Game",
    description: "The Squid Game itself. Winner takes all.",
    day: "Saturday",
    startTime: "10:00",
    endTime: "14:00",
    type: "game",
    shape: "square",
  },
];

function Schedule() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="w-full text-center text-5xl">Schedule</h1>
      {events.map((event) => (
        <ScheduleItem key={event.id} {...event} />
      ))}
    </div>
  );
}

export default Schedule;
