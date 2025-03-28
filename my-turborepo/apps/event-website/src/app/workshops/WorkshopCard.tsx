import React from "react";


type WorkshopCardProp = {
  title: string;
  description: string;
  location: string;
  date: string;
}

const WorkshopCard: React.FC<{ workshop: WorkshopCardProp }> = ({ workshop }) => {
  const { title, description, location, date } = workshop;
  return (
    <div className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
      <span className="text-sm opacity-50">{date} | {location}</span>
      <div className="h-4"></div>
      <p className="font-normal text-white">{description}</p>
    </div>
  );
};


const WorkshopSection: React.FC = () => {
  const workshops = [
    {
      title: "ETAM Workshop",
      date: "March 27 7:00 - 8:00 PM",
      location: "ILCB 206",
      description: "Focusing on ETAM applications, resunme buiding and intership prep along with headshots",
    },
    {
      title: "Python Beginner Workshop",
      date: "April 1 7:00 - 8:00 PM",
      location: "ILCB 206",
      description: "Learn skills to conquer challenges at TD Lite!",
    },
    {
      title: "Challenge Walkthrough",
      date: "April 3 7:00 - 8:00 PM",
      location: "ILCB 206",
      description: "We'll teach you the steps taking on a challenge and with taking on NEW challenges ourselves!",
    },
  ];

  return (
    <div id="workshops">
      <h1 className="w-full text-center text-3xl sm:text-4xl font-[myfont]">Workshops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {workshops.map((workshop, index) => (
          <WorkshopCard workshop={workshop}/>
        ))}
      </div>
    </div>
  );
};

export default WorkshopSection;


