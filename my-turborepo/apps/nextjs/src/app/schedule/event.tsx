import React from "react";
import { format } from "date-fns";
import Countdown from "react-countdown";

interface EventItemProps {
  name: string;
  date: Date;
}

const EventItem: React.FC<EventItemProps> = ({ name, date }) => {
  const isPast = new Date() > date;

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Event has passed</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div
      className={`mb-4 rounded-lg border p-4 ${isPast ? "bg-gray-200 text-gray-500" : "bg-white"}`}
    >
      <h3 className="text-xl font-semibold">{name}</h3>
      <p>Time: {format(date, "PPpp")}</p>
      <div className="mt-2">
        {isPast ? (
          <span>Event has passed</span>
        ) : (
          <Countdown date={date} renderer={renderer} />
        )}
      </div>
    </div>
  );
};

export default EventItem;
