import type React from "react";
import Image from "next/image";

import { SectionTitle } from "@vanni/ui/section-title";

import { eventsOrdered } from "./logos";

export interface EventProp {
  url: string;
  logo: string;
  label: string;
  year: number;
  lite?: boolean;
  season?: string;
}

export const EventButton: React.FC<EventProp> = ({
  url,
  label,
  season,
  year,
  logo,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full overflow-visible"
    >
      <div className="relative flex cursor-pointer flex-row items-center justify-start gap-5 overflow-visible rounded-2xl border border-white/10 bg-[#4A90E2]/95 px-4 py-3.5 shadow-lg shadow-black/25 ring-1 ring-inset ring-white/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-[#5BA0F2] hover:shadow-xl hover:shadow-[#4A90E2]/30 hover:ring-white/30">
        <div className="-my-3 flex shrink-0 drop-shadow-lg">
          <Image
            src={logo}
            alt={label}
            width={100}
            height={100}
            className="h-14 w-14 min-w-14 object-contain"
          />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white drop-shadow-sm">
          {season} {year}
        </span>
      </div>
    </a>
  );
};

export const PastEventsSection: React.FC = () => {
  const leftColumn = eventsOrdered.filter((_, index) => index < 4);
  const rightColumn = eventsOrdered.filter((_, index) => index >= 4);

  return (
    <section className="bg-[#121723] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title="Past Events" paragraph={""} center mb="40px" />

        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Mascot Image */}
          <div className="w-48 flex-shrink-0 md:w-64">
            <Image
              src="/mascot/td Datathon mascot chibi.svg"
              alt="Datathon Mascot"
              width={256}
              height={256}
              className="h-auto w-full"
            />
          </div>

          {/* Event Buttons Grid */}
          <div className="grid w-full max-w-2xl flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              {leftColumn.map((event) => (
                <EventButton
                  key={event.label}
                  url={event.url}
                  logo={event.logo}
                  label={event.label}
                  year={event.year}
                  lite={event.lite}
                  season={event.season}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8">
              {rightColumn.map((event) => (
                <EventButton
                  key={event.label}
                  url={event.url}
                  logo={event.logo}
                  label={event.label}
                  year={event.year}
                  lite={event.lite}
                  season={event.season}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
