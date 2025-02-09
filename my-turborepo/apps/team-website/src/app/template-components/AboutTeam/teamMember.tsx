import Image from "next/image";
import React from "react";

export interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, position }) => {
  return (
    <div className="px-4">
      <div className="text-center w-40">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
        />
        <h3 className="text-base font-semibold text-black dark:text-white">
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
