import React from "react";

interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, position }) => {
  return (
    <div className="w-full px-4">
      <div className="mb-8 text-center">
        <img
          src={image}
          alt={name}
          className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
        />
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {name}
        </h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          {position}
        </p>
      </div>
    </div>
  );
};

export default TeamMember;