"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import WindowContainer from "../_components/WindowContainer";
import "../_components/customCss.scss";
import DraggableComponent from "../_components/DraggableComponent";
import ScheduleIconList from "./scheduleHome";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
}

// Events array
const events: Event[] = [
  // Saturday Events
  {
    id: 1,
    name: "Check-in",
    startDate: new Date("2024-11-06T10:00:00"),
    endDate: new Date("2024-11-09T10:45:00"),
    description: "Check-in starts from 10 AM until 10:45 AM.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 2,
    name: "Opening Ceremony",
    startDate: new Date("2024-11-09T11:00:00"),
    endDate: new Date("2024-11-09T11:30:00"),
    description: "We'll introduce our sponsors, challenges, and prizes.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 3,
    name: "Hacking Starts",
    startDate: new Date("2024-11-09T11:30:00"),
    endDate: new Date("2024-11-09T23:00:00"),
    description: "Let the hacking begin!",
    location: "HERE!!",
  },
  {
    id: 4,
    name: "Lunch - Chick-Fil-A",
    startDate: new Date("2024-11-09T12:00:00"),
    endDate: new Date("2024-11-09T13:00:00"),
    description: "Enjoy lunch provided by Chick-Fil-A.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 5,
    name: "Workshop: Roni's",
    startDate: new Date("2024-11-09T13:00:00"),
    endDate: new Date("2024-11-09T13:30:00"),
    description: "Learn about Roni's data science challenge!",
    location: "MSC 2406B",
  },
  {
    id: 6,
    name: "Workshop: Intro to Git",
    startDate: new Date("2024-11-09T13:30:00"),
    endDate: new Date("2024-11-09T14:00:00"),
    description: "Introduction to Git for version control.",
    location: "MSC 2406B",
  },
  {
    id: 7,
    name: "Snack Break",
    startDate: new Date("2024-11-09T14:00:00"),
    endDate: new Date("2024-11-09T14:30:00"),
    description: "Take a break and enjoy some snacks.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 8,
    name: "Workshop: TAMIDS",
    startDate: new Date("2024-11-09T14:30:00"),
    endDate: new Date("2024-11-09T15:00:00"),
    description: "Workshop hosted by TAMIDS.",
    location: "MSC 2406B",
  },
  {
    id: 9,
    name: "Workshop: Capital One",
    startDate: new Date("2024-11-09T15:00:00"),
    endDate: new Date("2024-11-09T15:30:00"),
    description: "Workshop hosted by Capital One.",
    location: "MSC 2406B",
  },
  {
    id: 10,
    name: "Workshop: MLH",
    startDate: new Date("2024-11-09T15:30:00"),
    endDate: new Date("2024-11-09T16:00:00"),
    description: "Workshop hosted by MLH.",
    location: "MSC 2406B",
  },
  {
    id: 11,
    name: "Workshop: Baker Hughes",
    startDate: new Date("2024-11-09T16:00:00"),
    endDate: new Date("2024-11-09T16:30:00"),
    description: "Workshop hosted by Baker Hughes.",
    location: "MSC 2406B",
  },
  {
    id: 12,
    name: "Workshop: Quick and Dirty ML with SKLearn",
    startDate: new Date("2024-11-09T16:30:00"),
    endDate: new Date("2024-11-09T17:00:00"),
    description: "Learn the basics of machine learning with sklearn.",
    location: "MSC 2406B",
  },
  {
    id: 13,
    name: "Workshop: Introduction to Game Solving Algorithms",
    startDate: new Date("2024-11-09T17:00:00"),
    endDate: new Date("2024-11-09T17:30:00"),
    description: "Learn algorithms for AI game-solving.",
    location: "MSC 2406B",
  },
  {
    id: 14,
    name: "Workshop: Advanced GPT Usage",
    startDate: new Date("2024-11-09T17:30:00"),
    endDate: new Date("2024-11-09T18:00:00"),
    description: "Discover advanced ways to use GPT and other LLMs.",
    location: "MSC 2406B",
  },
  {
    id: 15,
    name: "Bob Ross Digital Painting Session",
    startDate: new Date("2024-11-09T18:00:00"),
    endDate: new Date("2024-11-09T18:45:00"),
    description: "Channel your inner artist with Bob Ross-style painting.",
    location: "MSC 2406A",
  },
  {
    id: 16,
    name: "Dinner - Roni's",
    startDate: new Date("2024-11-09T19:00:00"),
    endDate: new Date("2024-11-09T20:00:00"),
    description: "Dinner provided by Roni's.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 17,
    name: "Y2K Fashion Show",
    startDate: new Date("2024-11-09T20:00:00"),
    endDate: new Date("2024-11-09T21:00:00"),
    description: "Showcase your y2k fashion! Winners get a prize! B)",
    location: "MSC 2406A",
  },
  {
    id: 18,
    name: "Video Game Tournament!!",
    startDate: new Date("2024-11-09T23:00:00"),
    endDate: new Date("2024-11-10T00:00:00"),
    description: "Compete in our video game tournament for a chance to win some prizes ;)",
    location: "MSC 2406A",
  },

  // Sunday Events
  {
    id: 19,
    name: "Breakfast - Stella's Southern Cafe",
    startDate: new Date("2024-11-10T08:30:00"),
    endDate: new Date("2024-11-10T09:30:00"),
    description: "Start your day with breakfast from Stella's Southern Cafe.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 20,
    name: "Lunch - Panda Express",
    startDate: new Date("2024-11-10T12:30:00"),
    endDate: new Date("2024-11-10T13:00:00"),
    description: "Lunch provided by Panda Express.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 21,
    name: "Submissions Close",
    startDate: new Date("2024-11-10T13:00:00"),
    endDate: new Date("2024-11-10T13:00:00"),
    description: "Deadline to submit your projects.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 22,
    name: "Typing Contest Minievent",
    startDate: new Date("2024-11-10T14:00:00"),
    endDate: new Date("2024-11-10T15:00:00"),
    description: "Compete in a typing contest.",
    location: "MSC 2406A",
  },
  {
    id: 23,
    name: "Closing Ceremony",
    startDate: new Date("2024-11-10T15:00:00"),
    endDate: new Date("2024-11-10T16:00:00"),
    description: "Join us for the closing ceremony.",
    location: "Bethancourt Ballroom",
  },
  {
    id: 24,
    name: "T-Shirt Pickup",
    startDate: new Date("2024-11-10T17:00:00"),
    endDate: new Date("2024-11-10T17:00:00"),
    description: "Pick up your event T-shirt.",
    location: "Bethancourt Ballroom",
  },
];

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

const getNextEvent = () => {
  const now = new Date();
  return events.find((event) => event.startDate > now) || null;
};

const getCurrentEvent = () => {
  const now = new Date();
  return events.find((event) => now >= event.startDate && now <= event.endDate) || null;
};

const SchedulePage: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(getNextEvent());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(getCurrentEvent());
  const timeLeft = useCountdown(nextEvent ? nextEvent.startDate : new Date());
  const [focusedWindow, setFocusedWindow] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newNextEvent = getNextEvent();
      const newCurrentEvent = getCurrentEvent();
      if (newNextEvent && newNextEvent !== nextEvent) setNextEvent(newNextEvent);
      if (newCurrentEvent !== currentEvent) setCurrentEvent(newCurrentEvent);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [nextEvent, currentEvent]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden touch-none"
      style={{ height: "100vh" }}
    >
      <div
        className="fixed bottom-0 left-0 right-0 mb-12 flex justify-center w-full"
        style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}
      >
        <ScheduleIconList />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8 flex items-center justify-between">
          <div className="w-full text-center">
            <h1 className="inline-block pr-4 text-3xl font-bold sm:pr-0 sm:text-4xl md:text-5xl lg:text-6xl">
              Schedule
            </h1>
          </div>
        </div>

        {/* Countdown Window */}
        <DraggableComponent
          onFocus={setFocusedWindow}
          name="countdown"
          focus={focusedWindow}
          className="absolute left-4 top-20 sm:left-8 sm:top-28 md:left-[60px] md:top-[120px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => {}}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="flex h-[175px] w-[205px] flex-col items-center justify-between p-4 sm:h-[150px] sm:w-[350px] md:h-[150px] md:w-[500px] lg:h-[200px] lg:w-[400px] xl:h-[200px] xl:w-[600px]">
              <h2 className="mb-2 text-center text-md font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">
                {nextEvent ? `Countdown to ${nextEvent.name}` : "No upcoming events"}
              </h2>
              <h3 className="text-xs font-bold text-black sm:text-lg md:text-xl lg:text-2xl">
                {nextEvent ? format(nextEvent.startDate, "MMMM d, yyyy, h:mm a") : ""}
              </h3>
              <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="text-base font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">
                      {value}
                    </div>
                    <div className="text-xs uppercase text-black sm:text-sm md:text-base lg:text-lg">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WindowContainer>
        </DraggableComponent>

        {/* Current Event Window */}
        <DraggableComponent
          onFocus={setFocusedWindow}
          name="currentEvent"
          focus={focusedWindow}
          className="absolute right-0 top-20 sm:left-8 sm:top-72 md:left-[90px] md:top-[375px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => {}}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="flex h-[220px] w-[175px] flex-col items-center justify-between p-4 sm:h-[150px] sm:w-[300px] md:h-[150px] md:w-[500px] lg:h-[200px] lg:w-[300px] xl:h-[200px] xl:w-[700px]">
              {currentEvent ? (
                <>
                  <h2 className="mb-2 text-center text-md font-bold text-blue-500 sm:text-lg md:text-2xl lg:text-3xl">
                    Current Event: {currentEvent.name}
                  </h2>
                  <p className="text-sm font-medium text-blue-500 sm:text-sm md:text-base lg:text-lg">
                    {format(currentEvent.startDate, "h:mm a")} - {format(currentEvent.endDate, "h:mm a")}
                  </p>
                  <p className="text-sm text-blue-500 sm:text-sm md:text-base lg:text-lg">{currentEvent.description}</p>
                  <p className="text-sm text-blue-500 font-semibold sm:text-sm md:text-base lg:text-lg">
                    Location: {currentEvent.location}
                  </p>
                  <Image
                    src="/Pixel_PolarBear.png"
                    className="invisible absolute -bottom-4 -right-5 xl:visible"
                    width={150}
                    height={150}
                    alt="polar bear"
                  />
                </>
              ) : (
                <div>
                <h2 className="text-center text-xs font-bold text-blue-500 sm:text-lg md:text-2xl lg:text-3xl pt-4">
                  No event currently happening :O
                </h2>
                <Image
                  src="/Pixel_PolarBear.png"
                  className="visible absolute -bottom-4 -right-5 "
                  width={150}
                  height={150}
                  alt="polar bear"
                />
                </div>
              )}
            </div>
          </WindowContainer>
        </DraggableComponent>

        {/* Events Window with Saturday and Sunday Sections */}
        <DraggableComponent
          onFocus={setFocusedWindow}
          name="events"
          focus={focusedWindow}
          className="absolute right-4 top-[270px] sm:right-8 sm:top-[340px] md:right-[60px] md:top-[120px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => {}}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="flex h-[400px] w-[300px] flex-col items-center p-4 sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[400px] lg:h-[480px] lg:w-[420px]">
              <h2 className="mb-2 text-2xl font-semibold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Events!!!
              </h2>
              <div
                style={{ scrollbarWidth: "none", overflowY: "auto" }}
                className="h-full w-full space-y-2 sm:max-h-[400px] md:max-h-[370px] lg:max-h-[390px]"
              >
                <h2 className="mt-4 mb-2 text-center text-lg font-bold sm:mb-3 sm:text-xl md:mb-4 md:text-3xl lg:text-4xl">
                  Saturday
                </h2>
                {events
                  .filter(event => event.startDate.getDay() === 6) // Saturday events
                  .map(event => (
                    <div
                      key={event.id}
                      className={`compStyling clickable-box w-full cursor-pointer rounded-lg border ${
                        new Date() > event.endDate
                          ? "bg-gray-200 text-gray-500"
                          : new Date() >= event.startDate && new Date() <= event.endDate
                          ? "border-blue-500 text-blue-500 font-bold"
                          : "bg-[#f5f5f5] text-black"
                      } hover:bg-[#e4e3e4]`}
                      onClick={() => handleEventClick(event)}
                    >
                      <h3 className={`text-sm font-semibold sm:text-base md:text-lg`}>
                        {event.name}
                      </h3>
                      <p className="text-xs sm:text-sm">
                        {format(event.startDate, "MMM d, yyyy, h:mm a")} - {format(event.endDate, "h:mm a")}
                      </p>
                    </div>
                  ))}
                
                <h2 className="mt-4 mb-2 text-center text-lg font-bold sm:mb-3 sm:text-xl md:mb-4 md:text-3xl lg:text-4xl">
                  Sunday
                </h2>
                {events
                  .filter(event => event.startDate.getDay() === 0) // Sunday events
                  .map(event => (
                    <div
                      key={event.id}
                      className={`compStyling clickable-box w-full cursor-pointer rounded-lg border ${
                        new Date() > event.endDate
                          ? "bg-gray-200 text-gray-500"
                          : new Date() >= event.startDate && new Date() <= event.endDate
                          ? "border-blue-500 text-blue-500 font-bold"
                          : "bg-[#f5f5f5] text-black"
                      } hover:bg-[#e4e3e4]`}
                      onClick={() => handleEventClick(event)}
                    >
                      <h3 className={`text-sm font-semibold sm:text-base md:text-lg`}>
                        {event.name}
                      </h3>
                      <p className="text-xs sm:text-sm">
                        {format(event.startDate, "MMM d, yyyy, h:mm a")} - {format(event.endDate, "h:mm a")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </WindowContainer>
        </DraggableComponent>

        {/* Popup for Selected Event */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedEvent.name}
              </h2>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {format(selectedEvent.startDate, "MMMM d, yyyy, h:mm a")} - {format(selectedEvent.endDate, "h:mm a")}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedEvent.description || "No description available."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;