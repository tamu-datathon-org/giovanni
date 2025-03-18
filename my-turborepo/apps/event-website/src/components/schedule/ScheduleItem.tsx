"use client";

import { useEffect, useRef, useState } from "react";
import { person } from "@/app/resources/content";
import { cn } from "@/lib/utils";
import { Circle, Square, Triangle } from "lucide-react";

// time1 should be current time
// time2 should be the time of the event
function hasTimePassed(time1: string, time2: string) {
  return time1 > time2;
}

export interface ScheduleItemProps {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: "game" | "meal" | "rest";
  shape: "circle" | "triangle" | "square";
  tillevent?: string;
  onClick?: () => void;
}

export function ScheduleItem({
  title,
  description,
  startTime,
  endTime,
  type,
  shape,
  tillevent = "00:00:00:00",
  onClick,
}: ScheduleItemProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "game":
        return {
          hoverColor: "hover:bg-rose-400",
          cardColor: "bg-rose-600",
          textColor: "text-rose-50",
          borderColor: "border-rose-400",
          iconColor: "text-rose-600",
          label: "Game",
        };
      case "meal":
        return {
          hoverColor: "hover:bg-emerald-400",
          cardColor: "bg-emerald-600",
          textColor: "text-emerald-50",
          borderColor: "border-emerald-400",
          iconColor: "text-emerald-600",
          label: "Meal",
        };
      case "rest":
        return {
          hoverColor: "hover:bg-indigo-400",
          cardColor: "bg-indigo-600",
          textColor: "text-indigo-50",
          borderColor: "border-indigo-400",
          iconColor: "text-indigo-600",
          label: "Rest",
        };
      default:
        return {
          hoverColor: "hover:bg-slate-400",
          cardColor: "bg-slate-600",
          textColor: "text-slate-50",
          borderColor: "border-slate-400",
          iconColor: "text-slate-600",
          label: "Event",
        };
    }
  };
  const EndedEvent = {
    hoverColor: "hover:bg-slate-400",
    cardColor: "bg-slate-600",
    textColor: "text-slate-50",
    borderColor: "border-slate-400",
    iconColor: "text-slate-600",
  };

  const typeConfig = getTypeConfig(type);

  const ShapeIcon = () => {
    switch (shape) {
      case "circle":
        return (
          <Circle
            className={cn("h-4 w-4 sm:h-5 sm:w-5", typeConfig.iconColor)}
          />
        );
      case "triangle":
        return (
          <Triangle
            className={cn("h-4 w-4 sm:h-5 sm:w-5", typeConfig.iconColor)}
          />
        );
      case "square":
        return (
          <Square
            className={cn("h-4 w-4 sm:h-5 sm:w-5", typeConfig.iconColor)}
          />
        );
      default:
        return null;
    }
  };

  const timeZone = person.location;
  const locale = "en-US";
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [interval, setNewInterval] = useState(1000);
  const notSet = useRef(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);

      const seconds = now.getSeconds();

      // If seconds are 00, switch to minute updates
      if (seconds === 0 && notSet.current) {
        setNewInterval(60000); // Update every 60 seconds
        notSet.current = false;
      }
    };

    updateTime(); // Initial run to set current time immediately
    const intervalId = setInterval(updateTime, interval);

    return () => clearInterval(intervalId);
  }, [timeZone, locale, interval]); // Depend on interval for updates

  return (
    <div
      className={cn(
        "group relative flex w-full items-center gap-2 px-1 py-1 sm:gap-3 sm:px-2",
      )}
    >
      <div
        className={cn(
          "flex w-full cursor-pointer flex-col rounded-lg border-l-4 bg-opacity-30 p-2 shadow-sm transition-all sm:p-3",
          hasTimePassed(currentTime, endTime) && tillevent === "00:00:00:00"
            ? EndedEvent.borderColor
            : typeConfig.borderColor,
          hasTimePassed(currentTime, endTime) && tillevent === "00:00:00:00"
            ? EndedEvent.cardColor
            : typeConfig.cardColor,
          hasTimePassed(currentTime, endTime) && tillevent === "00:00:00:00"
            ? EndedEvent.hoverColor
            : typeConfig.hoverColor,
          "hover:shadow-md hover:ring-1 hover:ring-opacity-50",
          "group-hover:translate-x-1",
        )}
        onClick={onClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Header with title and shape icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-200 sm:text-base">
            {title}
          </h3>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-xs font-medium sm:px-2",
                hasTimePassed(currentTime, endTime) &&
                  tillevent === "00:00:00:00"
                  ? EndedEvent.cardColor
                  : typeConfig.cardColor,
                hasTimePassed(currentTime, endTime) &&
                  tillevent === "00:00:00:00"
                  ? EndedEvent.textColor
                  : typeConfig.textColor,
              )}
            >
              {typeConfig.label}
            </span>
            <ShapeIcon />
          </div>
        </div>

        {/* Time information */}
        <div className="mt-1 flex items-center text-xs text-slate-500 sm:text-sm">
          <span className="font-medium">{startTime}</span>
          <span className="mx-1">-</span>
          <span className="font-medium">{endTime}</span>
        </div>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-xs text-slate-600 sm:mt-2 sm:text-sm">
          {hasTimePassed(currentTime, startTime) && tillevent === "00:00:00:00"
            ? description
            : "???"}
        </p>
      </div>
    </div>
  );
}
