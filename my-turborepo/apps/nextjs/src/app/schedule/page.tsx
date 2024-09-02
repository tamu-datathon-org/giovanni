'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Event {
  id: number;
  name: string;
  date: Date;
  description: string;
}

// Might gotta edit around some of the markdown styling for this to appear better
const events: Event[] = [
  { 
    id: 1, 
    name: 'Opening Ceremony', 
    date: new Date('2024-11-09T09:00:00'),
    description: '# **Opening Ceremony**\n\nJoin us for the kickoff of our exciting Datathon! This event will include:\n\n- Welcome speech\n- Introduction of judges\n- Overview of the challenge\n- Q&A session'
  },
  { 
    id: 5, 
    name: 'Closing Ceremony', 
    date: new Date('2024-11-09T17:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
];


const useCountdown = (targetDate: any) => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return timeLeft;
};

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative max-w-2xl w-full m-4 max-h-[80vh] overflow-hidden">
        <div style={{
          width: `610px`,
          height: `360px`,
          backgroundImage: 'url(/images/bear_with_blank_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '80px 80px 0 80px',
          position: 'relative',
        }}>
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-xl w-8 h-8 flex items-center justify-center"
            
          >
            {/* Can edit the close button and placement later just a placeholder for now*/}
            &times;
          </button>
          <div className="overflow-y-auto h-full w-full">
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};


const SchedulePage: React.FC = () => {
  const targetDate = new Date('2024-11-09T00:00:00');
  const timeLeft = useCountdown(targetDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div style={{
      backgroundImage: 'url(/images/Wallpaper_Blur.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily:'windows95Font',
      minHeight:'100vh'
    }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Datathon Schedule</h1>
        
        <div className="mb-8 flex justify-center">
          <div style={{
            width: `610px`,
            height: `360px`,
            backgroundImage: 'url(/images/bear_with_blank_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '80px',
          }}>
            <h2 className="text-5xl font-bold text-black text-center mb-8">Countdown to Big D!</h2>

            <div className="flex justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-4xl font-bold text-black">{value}</div>
                  <div className="text-xl uppercase text-black">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Event List</h2>
          {events.map((event) => {
            const isPast = new Date() > event.date;
            return (
              <div
                key={event.id}
                className={`p-4 rounded-lg shadow ${
                  isPast ? 'bg-gray-200 text-gray-500' : 'bg-white'
                } cursor-pointer hover:bg-gray-100 transition-colors`}
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-sm">
                  {event.date.toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default SchedulePage;