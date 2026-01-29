import type React from "react";
import Image from "next/image";

import { SectionTitle } from "@vanni/ui/section-title";

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
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="cursor-pointer rounded-full bg-[#4A90E2] px-8 py-3 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#5BA0F2]">
        <span className="text-lg font-semibold text-white">
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
      <div className="mx-auto max-w-5xl">
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
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
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

export const eventsOrdered = [
  {
    url: "https://2019.tamudatathon.com/",
    year: 2019,
    logo: "/images/past-logo/TD2019",
    lite: false,
    label: "2019 Datathon",
    season: "Fall",
  },
  {
    url: "https://2020.tamudatathon.com/",
    year: 2020,
    logo: "/images/past-logo/TD2020",
    lite: false,
    label: "2020 Datathon",
    season: "Fall",
  },
  {
    url: "https://2021.tamudatathon.com/",
    year: 2021,
    logo: "/images/past-logo/TD2021",
    lite: false,
    label: "2021 Datathon",
    season: "Fall",
  },
  {
    url: "https://2022.tamudatathon.com/",
    year: 2022,
    logo: "/images/past-logo/TD2022",
    lite: false,
    label: "2022 Datathon",
    season: "Fall",
  },
  {
    url: "https://2024.tamudatathon.com/",
    year: 2024,
    logo: "/images/past-logo/TD2024",
    lite: false,
    label: "2024 Datathon",
    season: "Fall",
  },
  {
    url: "https://2025-lite.tamudatathon.com/",
    year: 2025,
    logo: "/images/past-logo/TDL2025",
    lite: true,
    label: "2025 Lite Datathon",
    season: "Spring",
  },
  {
    url: "https://2025.tamudatathon.com/",
    year: 2025,
    logo: "/images/past-logo/TD2025",
    lite: false,
    label: "2025 Datathon",
    season: "Fall",
  },
];
