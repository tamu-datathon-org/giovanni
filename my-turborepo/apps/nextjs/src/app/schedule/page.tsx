'use client'
import { Button } from '@vanni/ui/button';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineClose } from "react-icons/ai";
import "../_components/customCss.scss";



interface Event {
  id: number;
  name: string;
  date: Date;
  description: string;
}


// Gotta change the buzz word descriptions + this is only a tenative schedule for now
// Also change the timer from pre event to the end of the event
// Also add pictures to the pres showing

const events: Event[] = [
  { 
    id: 1, 
    name: 'Doors Open + Check-in', 
    date: new Date('2024-11-09T10:00:00'),
    description: '# **Opening Ceremony**\n\nJoin us for the kickoff of our exciting Datathon! This event will include:\n\n- Welcome speech\n- Introduction of judges\n- Overview of the challenge\n- Q&A session'
  },
  { 
    id: 2, 
    name: 'Opening Ceremony', 
    date: new Date('2024-11-09T11:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 3, 
    name: 'Hacking Starts', 
    date: new Date('2024-11-09T13:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 4, 
    name: 'Lunch and Student Org Fair', 
    date: new Date('2024-11-09T13:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 5, 
    name: 'Workshop 1', 
    date: new Date('2024-11-09T13:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 6, 
    name: 'Workshop 2', 
    date: new Date('2024-11-09T15:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 7, 
    name: 'Dinner', 
    date: new Date('2024-11-09T18:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 8, 
    name: 'Breakfast', 
    date: new Date('2024-11-10T08:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 9, 
    name: 'Workshop 3', 
    date: new Date('2024-11-10T09:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 10, 
    name: 'Hacking Ends', 
    date: new Date('2024-11-10T11:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 11, 
    name: 'Judging', 
    date: new Date('2024-11-10T12:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 12, 
    name: 'Lunch', 
    date: new Date('2024-11-10T12:30:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 13, 
    name: 'Closing Ceremony', 
    date: new Date('2024-11-10T15:00:00'),
    description: '# **Closing Ceremony**\n\nWrap up the Datathon with our closing event featuring:\n\n- Presentation of top projects\n- Awards ceremony\n- Closing remarks\n- Networking opportunity'
  },
  { 
    id: 14, 
    name: 'Event Ends', 
    date: new Date('2024-11-10T16:00:00'),
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

const getEventsByDay = (events: Event[], day: string) => {
  return events.filter(event => {
    return event.date.toLocaleDateString('en-US', { weekday: 'long' }) === day;
  });
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
          width: `650px`,
          height: `380px`,
          backgroundImage: 'url(/images/bear_with_blank_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '80px 80px 0 80px',
          position: 'relative',
        }} className='shadow-lg'>

    <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-xl w-8 h-8 flex items-center justify-center"
          >
          </button>
          <Button className="compStyling aboslute invisible lg:visible" 
            onClick={onClose}
            style={{
            position: 'absolute',
            width: '23px',
            height: '23px',
            top: '6px',
            right: '14px',
          }}>
            <AiOutlineClose className="close" style={{
            position: 'absolute',
            width: '8px',
            height: '8px'
          }}/>
          </Button>
          <div className="overflow-y-auto h-full w-full">
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        {/* remember that this bear needs to be changed but only if idea is signed off on
            could also have a noise pop up sound to alert user or add pop up to other pages
        */}
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

        {/* lower the size of the words */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-xl font-bold mb-4">Event Starting!</h2>
          <p className="mb-4">{event.name} is starting now!</p>
        </div>

        {/* This button prob gotta get changed maybe to the other button 
            tbh the button isnt really needed either click on the bear or click away
        */}
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


const SchedulePage: React.FC = () => {
  const targetDate = new Date('2024-11-09T00:00:00');
  const timeLeft = useCountdown(targetDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);

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

  

   {/* We can add a picture to the left of each event just like the previous schedules 
              Also need to add the button to the top right so it dont look that scrunched
              Also the cursor pointer can be changed but we almost there
          */}
  return (
    <div style={{
      backgroundImage: 'url(/images/datathon_plainbg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'windows95Font',
      minHeight: '100vh'
    }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >Datathon Schedule</h1>
        
        <div className="mb-8 flex justify-center">
          <div style={{
            width: `758px`,
            height: `448px`,
            backgroundImage: 'url(/images/bear_with_blank_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '120px',
            left: '60px',
            padding: '80px',
          }} className='shadow-lg'>
            <h2 className="text-5xl font-bold text-black text-center mb-5">Countdown to Datathon!</h2>

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

        <div className="mb-8 flex justify-center">
          <div style={{
            width: `420px`,
            height: `580px`, 
            backgroundImage: 'url(/images/windows95window.png)',
            backgroundSize: '100% 100%', 
            display: 'flex',
            position: 'absolute',
            flexDirection: 'column',
            alignItems: 'center',
            top: '150px',
            right: '60px',
            padding: '80px',
          }} 
          className='shadow-lg'>

            <h2 className="text-5xl font-semibold mb-4">Events!!!</h2>
            <div style={{
              alignItems: 'flex-start',
              width: '120%',
              maxHeight: '590px',
              overflowY: 'auto',
              scrollbarWidth: 'none'
            }}
            className='space-y-4'
            >
              <h2 className="text-4xl font-bold mb-5 text-center">Saturday</h2>
              {saturdayEvents.map((event) => {
                const isPast = new Date() > event.date;
                return (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg compStyling w-full border border-black ${
                      isPast ? 'bg-gray-400 text-white' : 'bg-[#f5f5f5] text-black'
                    } hover:bg-[#e4e3e4] clickable-box`}
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
              <h2 className="text-4xl font-bold mb-5 text-center">Sunday</h2>
              {sundayEvents.map((event) => {
                const isPast = new Date() > event.date;
                return (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg compStyling w-full border border-black ${
                      isPast ? 'bg-gray-400 text-white' : 'bg-[#f5f5f5] text-black'
                    } hover:bg-[#e4e3e4] cursor-pointer`}
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
        </div>
      </div>

      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      {currentEvent && (
        <EventAlertPopup 
          event={currentEvent} 
          onClose={closeEventAlert} 
          onOpenDescription={openEventDescription}
        />
      )}
      {showEventPopup && selectedEvent && (
        <EventPopup event={selectedEvent} onClose={() => setShowEventPopup(false)} />
      )}
    </div>
  );
};

export default SchedulePage;