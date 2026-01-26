import type React from "react";
import Image from "next/image";

export interface EventProp {
  url: string;
  logo: string;
  label: string;
  year: number;
  lite?: boolean;
  season?: string;
}

export const EventButton: React.FC<EventProp> = ({ url, label, season, year }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="bg-[#4A90E2] hover:bg-[#5BA0F2] transition-colors rounded-full py-3 px-8 text-center cursor-pointer">
        <span className="text-white font-semibold text-lg">
          {season} {year}
        </span>
      </div>
    </a>
  );
};

export const PastIterationsSection: React.FC = () => {
  const leftColumn = eventsOrdered.filter((_, index) => index < 4);
  const rightColumn = eventsOrdered.filter((_, index) => index >= 4);

  return (
    <section className="bg-[#1a2332] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center mb-12">
          Past Iterations
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Mascot Image */}
          <div className="flex-shrink-0 w-48 md:w-64">
            <Image
              src="/mascot/td Datathon mascot chibi.svg"
              alt="Datathon Mascot"
              width={256}
              height={256}
              className="w-full h-auto"
            />
          </div>

          {/* Event Buttons Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
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
