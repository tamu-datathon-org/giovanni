"use client";

import React from "react";
import TeamMember from "./teamMember";

const AboutTeam = () => {
  const teamMembers = Array.from({ length: 24 }).map((_, index) => ({
    image: `/images/teampics/placeholder.jpg`,
    name: `Team Member ${index + 1}`,
    position: "Position",
  }));

  return (
    <>
      <div className="container mx-auto text-center">
        <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          About the Team
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutTeam;