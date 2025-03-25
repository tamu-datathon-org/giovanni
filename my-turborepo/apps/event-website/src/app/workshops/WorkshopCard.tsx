import React from "react";


type WorkshopCardProp = {
  title: string;
  description: string;
}

const WorkshopCard: React.FC<WorkshopCardProp> = ({ title, description }) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
  );
};


const WorkshopSection: React.FC = () => {
  const workshops = [
    {
      title: "ETAM Workshop",
      description: " info",
    },
    {
      title: "Python Beginner Workshop",
      description: "info",
    },
    {
      title: "Challenge Walkthrough",
      description: "info",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {workshops.map((workshop, index) => (
        <WorkshopCard key={index} title={workshop.title} description={workshop.description} />
      ))}
    </div>
  );
};

export default WorkshopSection;


