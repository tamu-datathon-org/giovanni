import React from 'react';
import { Button } from '@vanni/ui/button';
import { AiOutlineClose } from "react-icons/ai";

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

const EventAlertPopup: React.FC<EventAlertPopupProps> = ({ event, onClose, onOpenDescription }) => {
  return (
    <div 
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="rounded-lg p-6 max-w-sm w-full m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src="/images/wipbear.png" 
          style={{
            width: '530px',
            height: '180px',
            right: '7px',
            position: 'absolute',
            objectFit: 'contain',
          }}
          onClick={() => onOpenDescription(event)}
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-xl font-bold mb-4">Event Starting!</h2>
          <p className="mb-4">{event.name} is starting now!</p>
        </div>

        <Button 
          onClick={onClose}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};

export default EventAlertPopup;