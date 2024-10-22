import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@vanni/ui/button";

interface Event {
  id: number;
  name: string;
  date: Date;
  description: string;
}

interface EventAlertPopupProps {
  event: Event;
  onClose: () => void;
  onOpenDescription: (event: Event) => void;
}

const EventAlertPopup: React.FC<EventAlertPopupProps> = ({
  event,
  onClose,
  onOpenDescription,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-full max-w-sm rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/images/wipbear.png"
          style={{
            width: "530px",
            height: "180px",
            right: "7px",
            position: "absolute",
            objectFit: "contain",
          }}
          onClick={() => onOpenDescription(event)}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
          <h2 className="mb-4 text-xl font-bold">Event Starting!</h2>
          <p className="mb-4">{event.name} is starting now!</p>
        </div>

        <Button
          onClick={onClose}
          className="absolute right-2 top-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};

export default EventAlertPopup;
