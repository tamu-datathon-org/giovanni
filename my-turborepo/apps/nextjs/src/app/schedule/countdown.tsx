import React from "react";
import { format } from "date-fns";
import Countdown from "react-countdown";

import EventItem from "./event";

const targetDate = new Date("2024-11-09T00:00:00");

const events = [
  { name: "Check-in & Career Fair", date: new Date("2024-11-09T010:00:00") },
  { name: "Opening Ceremony", date: new Date("2024-11-09T11:00:00") },
];

const CountdownComponent: React.FC = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>The day has arrived!</span>;
    } else {
      return (
        <div className="text-4xl font-bold">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="rounded-lg bg-blue-500 p-4 text-white">
                {days}
              </div>
              <div className="mt-2">Days</div>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-green-500 p-4 text-white">
                {hours}
              </div>
              <div className="mt-2">Hours</div>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-yellow-500 p-4 text-white">
                {minutes}
              </div>
              <div className="mt-2">Minutes</div>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-red-500 p-4 text-white">
                {seconds}
              </div>
              <div className="mt-2">Seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 text-3xl font-bold">
        Countdown to November 9th, 2024
      </h1>
      <p className="mb-4">Current time: {format(new Date(), "PPpp")}</p>
      <Countdown date={targetDate} renderer={renderer} />
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Event Schedule</h2>
        {events.map((event, index) => (
          <EventItem key={index} name={event.name} date={event.date} />
        ))}
      </div>
    </div>
  );
};

export default CountdownComponent;
