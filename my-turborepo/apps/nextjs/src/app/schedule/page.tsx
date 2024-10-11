'use client'
import React, { useEffect, useState } from 'react';
import WindowContainer from "../_components/WindowContainer";
import "../_components/customCss.scss";
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

const SchedulePage: React.FC = () => {
  const targetDate = new Date('2024-11-09T00:00:00');
  const timeLeft = useCountdown(targetDate);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isCountdownOpen, setIsCountdownOpen] = useState(true);
  const [focusedWindow, setFocusedWindow] = useState<string>('');

  // test
  const [activeWindow, setActiveWindow] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  //


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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="w-full text-center">
            <h1 className="text-5xl font-bold inline-block pr-4 sm:pr-0"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >Datathon Schedule (WIP)</h1>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-black">More stuff via updates soon!</h3>


          </div>
        </div>

        <div className="flex justify-center items-center"> {/* Centering wrapper */}
        <DraggableComponent
          onFocus={setFocusedWindow}
          name="countdown"
          focus={focusedWindow}
          className="top-[120px] left-[90px] md:top-[120px] md:left-[90px]"
        >
            <WindowContainer isOpen={true} openFunc={setIsCountdownOpen}>
              <div className="w-[300px] h-[200px] md:w-[600px] md:h-[350px] lg:w-[758px] lg:h-[448px] p-4 md:p-12 lg:p-16 flex flex-col justify-between items-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-2 md:mb-4">Countdown to Datathon!</h2>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-black">Event: November 9th</h3>
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
        </div>
      </div>
    </div>
  );
};
export default SchedulePage;