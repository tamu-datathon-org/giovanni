"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { person } from "@/app/resources/content";

const LandingPage = () => {
  const timeZone = person.location;
  const locale = "en-US";
  const [currentTime, setCurrentTime] = useState("");
  const [timeUntilEvent, setTimeUntilEvent] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format current time
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);

      // Calculate time until April 5th
      const currentYear = now.getFullYear();
      const eventDate = new Date(currentYear, 3, 5); // Month is 0-indexed, so 3 = April

      // If April 5th has already passed this year, use next year's date
      if (now > eventDate) {
        eventDate.setFullYear(currentYear + 1);
      }

      const timeDiff = eventDate.getTime() - now.getTime();

      // Convert time difference to days, hours, minutes, seconds
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Add leading zeros to single digits
      const padZero = (num: number) => (num < 10 ? `0${num}` : num);
      setTimeUntilEvent(
        `${padZero(days)}:${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`,
      );
    };

    updateTime(); // Initial run to set current time immediately
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]); // Depend on interval for updates

  return (
    <div className="align-center relative flex w-full flex-col justify-center -p-3">
      <div className="relative aspect-[16/9] h-[100px] w-full">
        <Image
          src="/images/landing-page/TAMU.png"
          alt="TAMU Logo"
          fill
          className="object-contain"
        />
      </div>
      <div className="relative aspect-[16/9] h-[100px] w-full">
        <Image
          src="/images/landing-page/datathon.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="relative flex h-[350px] w-full items-center justify-center">
        <Image
          src="/images/landing-page/ellipse.png"
          alt="Ellipse"
          width={450}
          height={450}
          className="absolute z-0 h-[450px] w-[450px]"
        />
        <Image
          src="/images/landing-page/bearicon.png"
          alt="Bear Icon"
          width={300}
          height={300}
          className="relative z-10 h-[300px] w-[300px]"
        />
      </div>
      {/* <div className="font-squid-game text-3xl">Time till Event:</div>
      <div className="font-count-down mt-2 inline-block rounded-md px-3 py-1 text-2xl text-red-600 sm:px-4 sm:py-2 sm:text-3xl">
        {timeUntilEvent}
      </div> */}
      <div className="relative mb-2">
        <div className="font-squid-game text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,0,135,0.7)]">
          TIME TILL EVENT
        </div>
        <div className="absolute -inset-x-4 top-1/2 h-[1px] bg-[#FF0087]/50"></div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 rounded-lg bg-[#FF0087]/20 blur-md"></div>
        <div className="font-count-down relative grid grid-cols-4 gap-2 rounded-lg border-2 border-[#FF0087] bg-black/80 p-4 text-center">
          {timeUntilEvent.split(":").map((unit, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-3xl font-bold text-[#FF0087] sm:text-4xl">
                {unit}
              </span>
              <span className="text-xs font-squid-game pt-1 text-[#15F5BA] sm:text-sm">
                {index === 0
                  ? "DAYS"
                  : index === 1
                    ? "HOURS"
                    : index === 2
                      ? "MINS"
                      : "SECS"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:gap-56 pt-10 flex-wrap">
        <Link href="/apply">
          <button className="aspect-[3/1] w-56 font-squid-game rounded-3xl border-2 border-white bg-[#FF0087] text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#FF0087] hover:shadow-[0_0_15px_rgba(255,0,135,0.7)]">
            Apply
          </button>
        </Link>
        <Link href="/">
          <button className="aspect-[3/1] w-56 font-squid-game rounded-3xl border-2 border-white bg-[#15F5BA] text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#15F5BA] hover:shadow-[0_0_15px_rgba(21,245,186,0.7)]">
            Discord
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
