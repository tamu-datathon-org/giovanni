import React from "react";

const WorkshopCard: React.FC<{ title: string; description: string; imgSrc: string }> = ({ title, description, imgSrc }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg w-full h-48 object-cover" src={imgSrc} alt={title} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const WorkshopSection: React.FC = () => {
  const workshops = [
    {
      title: "ETAM Workshop",
      description: " info",
      imgSrc: "",
    },
    {
      title: "Python Beginner Workshop",
      description: "info",
      imgSrc: "",
    },
    {
      title: "Challenge Walkthrough",
      description: "info",
      imgSrc: "",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {workshops.map((workshop, index) => (
        <WorkshopCard
          key={index}
          title={workshop.title}
          description={workshop.description}
          imgSrc={workshop.imgSrc}
        />
      ))}
    </div>
  );
};

export default WorkshopSection;


