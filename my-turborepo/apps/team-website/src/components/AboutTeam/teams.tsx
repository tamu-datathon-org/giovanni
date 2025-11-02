import type React from "react";

import type { TeamMemberProps } from "./teamMember";
import TeamMember from "./teamMember";

interface TeamsProps {
  teamMembers: TeamMemberProps[];
  description: string;
}

const Teams: React.FC<TeamsProps> = ({ teamMembers, description }) => {
  return (
    <>
      <div className="container mx-auto w-full rounded-lg text-center">
        <h2 className="mb-4 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
          {description}
        </h2>
        <div className="flex flex-row flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Teams;
