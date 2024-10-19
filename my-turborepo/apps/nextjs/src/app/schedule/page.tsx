'use client'
import { Button } from '@vanni/ui/button';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineClose } from "react-icons/ai";
import WindowContainer from "../_components/WindowContainer";
import "../_components/customCss.scss";
import Image from 'next/image';
import EventAlertPopup from './EventAlertPopup';
import DraggableComponent from '../_components/DraggableComponent';



interface Event {
  id: number;
  name: string;
  date: Date;
  description: string;
}

const events: Event[] = [
  { 
    id: 1, 
    name: 'Doors Open + Check-in', 
    date: new Date('2024-11-09T10:00:00'),
    description: ''
  },
  { 
    id: 2, 
    name: 'Opening Ceremony', 
    date: new Date('2024-11-09T12:00:00'),
    description: ''
  },
  { 
    id: 3, 
    name: 'Hacking Starts', 
    date: new Date('2024-11-09T13:00:00'),
    description: ''
  },
  { 
    id: 4, 
    name: 'Workshop 1 (to be named soon)', 
    date: new Date('2024-11-09T13:00:00'),
    description: ''
  },
  { 
    id: 5, 
    name: 'Lunch - Schlozskys!', 
    date: new Date('2024-11-09T13:30:00'),
    description: ''
  },
  { 
    id: 6, 
    name: 'Workshop 2 (to be named soon)', 
    date: new Date('2024-11-09T14:30:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Workshop 3 (to be named soon)', 
    date: new Date('2024-11-09T15:00:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Workshop 4 (to be named soon)', 
    date: new Date('2024-11-09T15:30:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Trivia! (Mini Event)', 
    date: new Date('2024-11-09T16:30:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Workshop 5 (to be named soon)', 
    date: new Date('2024-11-09T17:30:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Dinner - Ronis!', 
    date: new Date('2024-11-09T19:00:00'),
    description: ''
  },
  { 
    id: 7, 
    name: 'Bob Ross digital painting! (Mini Event)', 
    date: new Date('2024-11-09T20:00:00'),
    description: ''
  },
  {
    id: 8, 
    name: 'Breakfast - Stellas Cafe!', 
    date: new Date('2024-11-10T08:00:00'),
    description: ''
  },
  { 
    id: 9, 
    name: 'Workshop 6 (to be named soon)', 
    date: new Date('2024-11-10T09:00:00'),
    description: ''
  },
  { 
    id: 10, 
    name: 'Submissions close + Judging begins', 
    date: new Date('2024-11-10T11:45:00'),
    description: ''
  },
  { 
    id: 11, 
    name: 'Lunch - (unnamed)', 
    date: new Date('2024-11-10T12:30:00'),
    description: ''
  },
  { 
    id: 12, 
    name: 'Judging ends', 
    date: new Date('2024-11-10T13:00:00'),
    description: ''
  },
  { 
    id: 13, 
    name: 'Typing Contest! (Mini event)', 
    date: new Date('2024-11-10T14:00:00'),
    description: ''
  },
  { 
    id: 14, 
    name: 'Closing Ceremony', 
    date: new Date('2024-11-10T15:00:00'),
    description: ''
  },
  { 
    id: 15, 
    name: 'Event Ends + T-Shirt Pickup', 
    date: new Date('2024-11-10T16:00:00'),
    description: ''
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

const getEventsByDay = (events: Event[], day: string) => {
  return events.filter(event => {
    return event.date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
  });
};

interface EventPopupProps {
  event: Event;
  onClose: () => void;
  onFocus: (name: string) => void;
  focus: string;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose, onFocus, focus }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ zIndex: 9999 }}>
      <DraggableComponent
        onFocus={onFocus}
        name={`event-popup-${event.id}`}
        focus={focus}
        className="relative"
      >
        <WindowContainer isOpen={true} openFunc={() => onClose()}>
          <div style={{
            width: '650px',
            height: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
          }}>
            <div className="overflow-y-auto h-full w-full prose prose-sm max-w-none">
              <ReactMarkdown>{event.description}</ReactMarkdown>
            </div>
          </div>
        </WindowContainer>
      </DraggableComponent>
    </div>
  );
};

const SchedulePage: React.FC = () => {
  const targetDate = new Date('2024-11-09T00:00:00');
  const timeLeft = useCountdown(targetDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState(true);
  const [isEventsOpen, setIsEventsOpen] = useState(true);
  const [focusedWindow, setFocusedWindow] = useState<string>('');


  const saturdayEvents = getEventsByDay(events, 'Saturday');
  const sundayEvents = getEventsByDay(events, 'Sunday');


  useEffect(() => {
    const checkForUpcomingEvents = () => {
      const now = new Date();
      console.log("Current time:", now.toLocaleString());
      
      const upcomingEvent = events.find(event => {
        const eventTime = new Date(event.date);
        const timeDifference = eventTime.getTime() - now.getTime();
        
        const isUpcoming = timeDifference >= -6000 && timeDifference <= 6000;
                
        return isUpcoming;
      });

      if (upcomingEvent) {
        setCurrentEvent(upcomingEvent);
      } else if (currentEvent) {
        setCurrentEvent(null);
      }
    };

    const intervalId = setInterval(checkForUpcomingEvents, 10000); 
    
    checkForUpcomingEvents();

    return () => clearInterval(intervalId);
  }, []); 

  const closeEventAlert = () => {
    setCurrentEvent(null);
  };

  const openEventDescription = (event: Event) => {
    setSelectedEvent(event);
    setShowEventPopup(true);
    closeEventAlert();
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'https://tamudatathon.com';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute left-0">
            <a href="https://tamudatathon.com" onClick={handleLogoClick}>
              <Image 
                src="/Pixel_WorldIcon.png" 
                alt="go home et" 
                width={120} 
                height={120} 
                className="w-20 h-20 md:w-32 md:h-32 lg:w-[100px] lg:h-[100px]"
              />
            </a>
          </div>
          <div className="w-full text-center">
          <h1 className="text-5xl font-bold inline-block pr-4 sm:pr-0"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >Schedule</h1>
          </div>
        </div>

        <DraggableComponent
          onFocus={setFocusedWindow}
          name="countdown"
          focus={focusedWindow}
          className="absolute top-[120px] left-[60px] md:top-[120px] md:left-[60px]"
        >
          <WindowContainer isOpen={true} openFunc={setIsCountdownOpen}
          borderGradientStart="#34a4eb"
          borderGradientMiddle="#004c99"
          borderGradientEnd="#124c87"
          >
            <div className="w-[300px] h-[200px] md:w-[600px] md:h-[350px] lg:w-[758px] lg:h-[448px] p-4 md:p-12 lg:p-16 flex flex-col justify-between items-center">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-2 md:mb-4">Countdown to Datathon!</h2>
              <h3 className="text-xl font-bold text-black md:text-3xl lg:text-4xl">
                  Event: November 9th at the MSC!
                </h3>
              <div className="flex justify-center space-x-2 md:space-x-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="text-xl md:text-3xl lg:text-4xl font-bold text-black">{value}</div>
                    <div className="text-xs md:text-base lg:text-xl uppercase text-black">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </WindowContainer>
        </DraggableComponent>

        <DraggableComponent
          onFocus={setFocusedWindow}
          name="events"
          focus={focusedWindow}
          className="absolute top-[340px] right-[20px] md:top-[120px] md:right-[60px]"
        >
        <WindowContainer 
            isOpen={isEventsOpen} 
            openFunc={() => {}}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          > 
           <div className="w-[300px] h-[300px] md:w-[400px] md:h-[450px] lg:w-[420px] lg:h-[480px] p-4 md:p-8 lg:p-10 flex flex-col items-center">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-4">Events!!!</h2>
              <div style= {{scrollbarWidth:'none',
                overflowY: 'auto'
              }}className={`w-full max-h-[250px] md:max-h-[370px] lg:max-h-[390px] space-y-2 md:space-y-4`}>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-center">Saturday</h2>
                {saturdayEvents.map((event) => {
                  const isPast = new Date() > event.date;
                  return (
                    <div
                      key={event.id}
                      className={`p-2 md:p-4 rounded-lg compStyling w-full border border-black cursor-pointer clickable-box ${
                        isPast ? 'bg-gray-400 text-white' : 'bg-[#f5f5f5] text-black'
                      } hover:bg-[#e4e3e4]`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className="text-sm md:text-lg font-semibold">{event.name}</h3>
                      <p className="text-xs md:text-sm">
                        {event.date.toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                  );
                })}
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-center">Sunday</h2>
                {sundayEvents.map((event) => {
                  const isPast = new Date() > event.date;
                  return (
                    <div
                      key={event.id}
                      className={`p-2 md:p-4 rounded-lg compStyling w-full border border-black cursor-pointer clickable-box ${
                        isPast ? 'bg-gray-400 text-white' : 'bg-[#f5f5f5] text-black'
                      } hover:bg-[#e4e3e4]`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <h3 className="text-sm md:text-lg font-semibold">{event.name}</h3>
                      <p className="text-xs md:text-sm">
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
          </WindowContainer>
        </DraggableComponent>
      </div>
      {currentEvent && (
        <EventAlertPopup 
          event={currentEvent} 
          onClose={closeEventAlert} 
          onOpenDescription={openEventDescription}
        />
      )}
    </div>
  );
};
export default SchedulePage;