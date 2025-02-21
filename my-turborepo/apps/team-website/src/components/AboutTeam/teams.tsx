import type { TeamMemberProps } from "./teamMember";
import TeamMember from "./teamMember";

interface TeamsProps {
  teamMembers: TeamMemberProps[];
  description: string;
}

const Teams: React.FC<TeamsProps> = ({ teamMembers, description }) => {
  return (
    <>
      <div className="container w-full mx-auto text-center rounded-lg">
        <div className="flex flex-row flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
            />
          ))}
        </div>
        {/* <h2 className="mt-4 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
          {description}
        </h2> */}
      </div>
    </>
  );
};

export default Teams;