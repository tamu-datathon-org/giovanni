import { cn } from "@/lib/utils";
import { Circle, Square, Triangle } from "lucide-react";

export interface ScheduleItemProps {
  id: number;
  title: string;
  description: string;
  day: string;
  startTime: string;
  endTime: string;
  type: "game" | "meal" | "rest";
  shape: "circle" | "triangle" | "square";
  onClick?: () => void;
}

export function ScheduleItem({
  title,
  description,
  startTime,
  endTime,
  type,
  shape,
  onClick,
}: ScheduleItemProps) {
  const getShapeIcon = (shape: "circle" | "triangle" | "square") => {
    switch (shape) {
      case "circle":
        return <Circle className="h-5 w-5" />;
      case "triangle":
        return <Triangle className="h-5 w-5" />;
      case "square":
        return <Square className="h-5 w-5" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "game":
        return "bg-[#FF0080] text-white";
      case "meal":
        return "bg-[#10B981] text-white";
      case "rest":
        return "bg-[#6366F1] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div
      className={cn(
        "container mx-1 cursor-pointer overflow-hidden rounded-md p-2 shadow-md transition-transform hover:scale-[1.02]",
        getEventTypeColor(type),
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-1 text-sm font-bold">
        {getShapeIcon(shape)}
        <span className="truncate">{title}</span>
      </div>
      <div className="mt-1 text-xs opacity-90">
        {startTime} - {endTime}
      </div>
      <div className="mt-1 line-clamp-2 text-xs">{description}</div>
    </div>
  );
}
