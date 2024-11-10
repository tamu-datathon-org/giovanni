"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import WindowContainer from "../_components/WindowContainer";

import "../_components/customCss.scss";

import Image from "next/image";

import DraggableComponent from "../_components/DraggableComponent";
import ScheduleIconList from "./scheduleHome";

interface Event {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
}

// TODO: Refactor and put this in a separate file
// Events array
const events: Event[] = [
  // Saturday Events
  {
    id: 1,
    name: "Check-in",
    startDate: new Date("2024-11-09T10:00:00"),
    endDate: new Date("2024-11-09T11:00:00"),
    description: "Check-in starts from 10 AM until 11 AM.",
    location: "Tables outside MSC Bethancourt Ballroom",
  },
  {
    id: 2,
    name: "Opening Ceremony",
    startDate: new Date("2024-11-09T11:00:00"),
    endDate: new Date("2024-11-09T11:30:00"),
    description: "We'll introduce our sponsors, challenges, and prizes!",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 3,
    name: "Hacking Starts",
    startDate: new Date("2024-11-09T11:30:00"),
    endDate: new Date("2024-11-09T11:30:00"),
    description: "Let the hacking begin!",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 4,
    name: "Lunch - Chick-Fil-A",
    startDate: new Date("2024-11-09T12:00:00"),
    endDate: new Date("2024-11-09T13:00:00"),
    description: "Enjoy lunch provided by Chick-Fil-A.",
    location: "MSC Bethancourt Ballroom",
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
    name: "TD Workshop: Intro to Git",
    startDate: new Date("2024-11-09T13:30:00"),
    endDate: new Date("2024-11-09T14:00:00"),
    description:
      "You've probably heard of git or GitHub before but what is it? Why do we use it? How can you set it up and use it for yourself? This workshop answers all this and more!",
    location: "MSC 2406A",
  },
  {
    id: 7,
    name: "Snack Break",
    startDate: new Date("2024-11-09T14:00:00"),
    endDate: new Date("2024-11-09T14:30:00"),
    description: "Take a break and enjoy some snacks.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 8,
    name: "TAMIDS Workshop: Fundamentals of Image Classification with a Simple Neural Network",
    startDate: new Date("2024-11-09T14:30:00"),
    endDate: new Date("2024-11-09T15:00:00"),
    description:
      "Participants will focus on fundamental aspects of image classification using the Keras API with a handwritten digit dataset. They will learn key steps including image (matrix) structures, dataset loading and preparation, neural network construction for classification, and model training. Through hands-on exercises, participants will understand the fundamental components of machine learning, especially neural networks.",
    location: "MSC 2406B",
  },
  {
    id: 9,
    name: "Workshop: Capital One",
    startDate: new Date("2024-11-09T15:00:00"),
    endDate: new Date("2024-11-09T15:30:00"),
    description: "Workshop hosted by Capital One.",
    location: "MSC 2406A",
  },
  {
    id: 11,
    name: "Baker Hughes: Data Downsampling Techniques for Machine Learning Efficiency",
    startDate: new Date("2024-11-09T16:00:00"),
    endDate: new Date("2024-11-09T16:30:00"),
    description:
      "Workshop hosted by Baker Hughes on data downsampling techniques for ML efficiency.",
    location: "MSC 2406A",
  },
  {
    id: 12,
    name: "TD Workshop: Quick and Dirty ML with SKLearn",
    startDate: new Date("2024-11-09T16:30:00"),
    endDate: new Date("2024-11-09T17:00:00"),
    description:
      "Machine learning is a series of linear algebra, calculus, probability, statistics, and a lot of other advanced math concepts that you need a PHd to fully understand. But luckily, we don't need to know any of that to use it in our code! This workshop is a simple introduction to how you can make use of the power of numerous Machine Learning models using sklearn in just 5 lines of code!",
    location: "MSC 2406B",
  },
  {
    id: 13,
    name: "TD Workshop: Introduction to Game Solving Algorithms",
    startDate: new Date("2024-11-09T17:00:00"),
    endDate: new Date("2024-11-09T17:30:00"),
    description:
      "We'll teach you the basics of the algorithms that are used to power the AI bots that play board games and give you hints on how to solve our challenge.",
    location: "MSC 2406A",
  },
  {
    id: 14,
    name: "Workshop: Advanced GPT Usage",
    startDate: new Date("2024-11-09T17:30:00"),
    endDate: new Date("2024-11-09T18:00:00"),
    description:
      "We'll cover interesting ways for you to apply GPT (and other LLMs) to provide more meaningful output, as well as how to use them beyond just their web interfaces.",
    location: "MSC 2406B",
  },
  {
    id: 15,
    name: "Bob Ross Digital Painting Session",
    startDate: new Date("2024-11-09T18:00:00"),
    endDate: new Date("2024-11-09T18:45:00"),
    description:
      "Follow along to a BOB ROSS tutorial with MS Paint (or equivalent app) using ONLY TOUCHPADS (NO PENS, TOUCHSCREENS, OR MOUSES ALLOWED). Post it in the Bob Ross channel for a chance to win some prizes!!",
    location: "MSC 2406A",
  },
  {
    id: 16,
    name: "Dinner - Roni's",
    startDate: new Date("2024-11-09T19:15:00"),
    endDate: new Date("2024-11-09T20:00:00"),
    description: "Dinner provided by Roni's.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 17,
    name: "Y2K Fashion Show",
    startDate: new Date("2024-11-09T20:00:00"),
    endDate: new Date("2024-11-09T21:00:00"),
    description:
      "Showcase your y2k fashion! Winners get a prize! Come in your most amazing y2k fit with your best catwalk.",
    location: "MSC 2406A",
  },
  {
    id: 18,
    name: "Video Game Tournament!!",
    startDate: new Date("2024-11-09T23:00:00"),
    endDate: new Date("2024-11-10T00:00:00"),
    description:
      "Compete in our video game tournament for a chance to win some prizes ;)",
    location: "MSC 2406A",
  },

  // Sunday Events
  {
    id: 19,
    name: "Breakfast - Stella's Southern Cafe",
    startDate: new Date("2024-11-10T08:30:00"),
    endDate: new Date("2024-11-10T09:30:00"),
    description: "Start your day with breakfast from Stella's Southern Cafe.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 20,
    name: "Baker Hughes Challenge Submission Closes",
    startDate: new Date("2024-11-10T11:15:00"),
    endDate: new Date("2024-11-10T11:30:00"),
    description: "Deadline to submit your projects for Baker Hughes Challenge.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 21,
    name: "Lunch - Panda Express",
    startDate: new Date("2024-11-10T12:30:00"),
    endDate: new Date("2024-11-10T13:00:00"),
    description: "Lunch provided by Panda Express.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 22,
    name: "Submissions Close",
    startDate: new Date("2024-11-10T13:00:00"),
    endDate: new Date("2024-11-10T13:00:00"),
    description: "Deadline to submit your projects.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 23,
    name: "Judging Starts",
    startDate: new Date("2024-11-10T13:00:00"),
    endDate: new Date("2024-11-10T13:00:00"),
    description: "Judging for Capital One and Roni's Challenges starts. Logistics TBA",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 24,
    name: "Typing Contest Minievent",
    startDate: new Date("2024-11-10T14:00:00"),
    endDate: new Date("2024-11-10T15:00:00"),
    description: "Compete in a typing contest.",
    location: "MSC 2406A",
  },
  {
    id: 25,
    name: "Judging Concludes",
    startDate: new Date("2024-11-10T15:00:00"),
    endDate: new Date("2024-11-10T15:00:00"),
    description: "Judging for Capital One and Roni's Challenges ends. Other challenges will be graded.",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 26,
    name: "Closing Ceremony",
    startDate: new Date("2024-11-10T15:00:00"),
    endDate: new Date("2024-11-10T16:00:00"),
    description:
      "Join us for the closing ceremony where we announce the winners of TAMU Datathon!",
    location: "MSC Bethancourt Ballroom",
  },
  {
    id: 27,
    name: "T-Shirt Pickup",
    startDate: new Date("2024-11-10T:00:00"),
    endDate: new Date("2024-11-10T17:00:00"),
    description: "Pick up your event T-shirt.",
    location: "MSC Bethancourt Ballroom",
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
  return (
    events.find((event) => now >= event.startDate && now <= event.endDate) ||
    null
  );
};

const SchedulePage: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(getNextEvent());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(
    getCurrentEvent(),
  );
  const timeLeft = useCountdown(nextEvent ? nextEvent.startDate : new Date());
  const [focusedWindow, setFocusedWindow] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newNextEvent = getNextEvent();
      const newCurrentEvent = getCurrentEvent();
      if (newNextEvent && newNextEvent !== nextEvent)
        setNextEvent(newNextEvent);
      if (newCurrentEvent !== currentEvent) setCurrentEvent(newCurrentEvent);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [nextEvent, currentEvent]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div
      className="fixed inset-0 touch-none overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div
        className="fixed bottom-0 left-0 right-0 mb-12 flex w-full justify-center"
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
          className="absolute left-0 top-20 sm:left-8 sm:top-28 md:left-[60px] md:top-[120px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => { }}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="tabletRange:w-[250px] flex h-[175px] w-[190px] flex-col items-center justify-between p-4 sm:h-[150px] sm:w-[350px] md:h-[150px] md:w-[500px] lg:h-[200px] lg:w-[400px] xl:h-[200px] xl:w-[600px]">
              <h2 className="text-md tabletRange:text-sm mb-2 text-center font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">
                {nextEvent
                  ? `Countdown to ${nextEvent.name}`
                  : "No upcoming events"}
              </h2>
              <h3 className="tabletRange:text-sm text-xs font-bold text-black sm:text-lg md:text-xl lg:text-2xl">
                {nextEvent
                  ? format(nextEvent.startDate, "MMMM d, yyyy, h:mm a")
                  : ""}
              </h3>
              <div className="tabletRange:text-xs flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="tabletRange:text-sm text-base font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">
                      {value}
                    </div>
                    <div className="tabletRange:text-sm text-xs uppercase text-black sm:text-sm md:text-base lg:text-lg">
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
          className="ipadRange:top-[320px] tabletRange:left-5 absolute right-0 top-20 sm:left-8 sm:top-72 md:left-[90px] md:top-[375px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => { }}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="h700:w-[150px] ipadRange:w-[570px] tabletRange:w-[190px] flex h-[220px] w-[175px] flex-col items-center justify-between p-4 sm:h-[150px] sm:w-[300px] md:h-[150px] md:w-[500px] lg:h-[200px] lg:w-[520px] xl:h-[200px] xl:w-[700px]">
              {currentEvent ? (
                <>
                  <h2 className="text-md tabletRange:text-sm mb-2 text-center font-bold text-black sm:text-lg md:text-2xl lg:text-3xl">
                    Current Event: {currentEvent.name}
                  </h2>
                  <p className="text-sm font-medium text-black sm:text-sm md:text-base lg:text-lg">
                    {format(currentEvent.startDate, "h:mm a")} -{" "}
                    {format(currentEvent.endDate, "h:mm a")}
                  </p>
                  <p className="text-sm text-black sm:text-sm md:text-base lg:text-lg">
                    {currentEvent.description}
                  </p>
                  <p className="text-sm font-semibold text-black sm:text-sm md:text-base lg:text-lg">
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
                  <h2 className="tabletRange:text-sm pt-4 text-center text-xs font-bold text-blue-500 sm:text-lg md:text-2xl lg:text-3xl">
                    No event currently happening! <br />
                    Check the countdown for our next one :D
                  </h2>
                  <Image
                    src="/Pixel_PolarBear.png"
                    className="tabletRange:w-[100px] visible absolute -bottom-4 -right-5 "
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
          className="tabletRange:right-[10px] ipadRange:top-[500px] ipadproRange:top-[620px] tabletRange:top-[150px] absolute right-4 top-[270px] sm:right-8 sm:top-[340px] md:right-[60px] md:top-[120px]"
        >
          <WindowContainer
            isOpen={true}
            openFunc={() => { }}
            borderGradientStart="#34a4eb"
            borderGradientMiddle="#004c99"
            borderGradientEnd="#124c87"
          >
            <div className="tabletRange:h-[300px] ipadproRange:w-[600px] h700:h-[250px] ipadRange:h-[300px] flex h-[420px] w-[300px] flex-col items-center p-4 sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[400px] lg:h-[480px] lg:w-[420px]">
              <h2 className="mb-2 text-2xl font-semibold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Events!!!
              </h2>
              <p>Click on the event for more information!</p>
              <div
                style={{ scrollbarWidth: "none", overflowY: "auto" }}
                className="h-full w-full space-y-2 sm:max-h-[400px] md:max-h-[370px] lg:max-h-[390px]"
              >
                <h2 className="mb-2 mt-4 text-center text-lg font-bold sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-3xl">
                  Saturday
                </h2>
                {events
                  .filter((event) => event.startDate.getDay() === 6) // Saturday events
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`compStyling clickable-box w-full cursor-pointer rounded-lg border ${new Date() > event.endDate
                        ? "bg-gray-200 text-gray-500 line-through" // Entire div with line-through for past events
                        : new Date() >= event.startDate &&
                          new Date() <= event.endDate
                          ? "border-blue-500 font-bold text-blue-500"
                          : "bg-[#f5f5f5] text-black"
                        } hover:bg-[#e4e3e4]`}
                      onClick={() => handleEventClick(event)}
                    >
                      <h3 className="text-sm font-semibold sm:text-base md:text-lg">
                        {event.name}
                      </h3>
                      <p className="text-xs sm:text-sm">
                        {format(event.startDate, "MMM d, yyyy, h:mm a")} -{" "}
                        {format(event.endDate, "h:mm a")}
                      </p>
                      <p className="text-sm font-semibold sm:text-base md:text-lg">
                        {event.location}
                      </p>
                    </div>
                  ))}

                <h2 className="mb-2 mt-4 p-2 text-center text-lg font-bold sm:mb-3 sm:text-xl md:mb-4 md:text-2xl lg:text-3xl">
                  Sunday
                </h2>
                {events
                  .filter((event) => event.startDate.getDay() === 0) // Sunday events
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`compStyling clickable-box w-full cursor-pointer rounded-lg border ${new Date() > event.endDate
                        ? "bg-gray-200 text-gray-500"
                        : new Date() >= event.startDate &&
                          new Date() <= event.endDate
                          ? "border-blue-500 font-bold text-blue-500"
                          : "bg-[#f5f5f5] text-black"
                        } hover:bg-[#e4e3e4]`}
                      onClick={() => handleEventClick(event)}
                    >
                      <h3
                        className={`text-sm font-semibold sm:text-base md:text-lg`}
                      >
                        {event.name}
                      </h3>
                      <p className="text-xs sm:text-sm">
                        {format(event.startDate, "MMM d, yyyy, h:mm a")} -{" "}
                        {format(event.endDate, "h:mm a")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </WindowContainer>
        </DraggableComponent>

        {/* Popup for Selected Event */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6">
              <button
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
              <h2 className="mb-4 text-2xl font-bold">{selectedEvent.name}</h2>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {format(selectedEvent.startDate, "MMMM d, yyyy, h:mm a")} -{" "}
                {format(selectedEvent.endDate, "h:mm a")}
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
