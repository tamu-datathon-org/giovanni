"use client";

import React from "react";
import Image from "next/image"; // Import the Image component from the appropriate library
import Link from "next/link";

import { Button } from "@vanni/ui/button";

interface Icon {
  name: string;
  route: string;
  image: string;
  // Add any other properties you need for the icon
}

interface IconListProps {
  className?: string;
  welcFunc: (isOpen: boolean) => void;
  applyFunc: (isOpen: boolean) => void;
}

const routes: Icon[] = [
  { name: "Home", route: "/", image: "/Pixel_ComputerIcon.png" },
  { name: "FAQ", route: "/about", image: "/Pixel_InternetIcon.png" },
  { name: "Apply", route: "/apply/application", image: "/Pixel_EmailIcon.png" },
];

const IconList: React.FC<IconListProps> = ({
  className,
  welcFunc,
  applyFunc,
}) => {
  return (
    // className='absolute top-0 grid grid-cols-2 pt-4 gap-1'
    <div className={className}>
      <div className="flex flex-row">
        {routes.map((icon) => (
          <Button
            key={icon.name}
            className="shadow-none"
            onClick={() => {
              if (icon.name === "Home") {
                welcFunc(true);
              } else if (icon.name === "Apply") {
                applyFunc(true);
              }
            }}
          >
            <div className="flex w-[100px] flex-col items-center justify-center border-white text-center duration-200 hover:bg-blue-400  hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)] focus:border-4">
              {icon.image && (
                <>
                  <Image
                    src={icon.image}
                    alt={"not found"}
                    width={100}
                    height={100}
                    className=""
                  />
                  <div className="text-wrap">{icon.name}</div>
                </>
              )}{" "}
              {/* Use the Image component with the correct props */}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IconList;
