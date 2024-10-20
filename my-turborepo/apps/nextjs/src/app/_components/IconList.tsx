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
  faqFunc: (isOpen: boolean) => void;
  socialsFunc: (isOpen: boolean) => void;
  setFocus: (focus: string) => void;
}

const routes: Icon[] = [
  { name: "Welcome", route: "/", image: "/Pixel_ComputerIcon.png" },
  { name: "FAQ", route: "/about", image: "/Pixel_InternetIcon.png" },
  { name: "Apply", route: "/apply/application", image: "/Pixel_EmailIcon.png" },
  { name: "Socials", route: "/socials", image: "/Pixel_FileIcon.png" },
];

const IconList: React.FC<IconListProps> = ({
  className,
  welcFunc,
  applyFunc,
  faqFunc,
  socialsFunc,
  setFocus,
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
              setFocus(icon.name);
              if (icon.name === "Welcome") {
                welcFunc(true);
              } else if (icon.name === "Apply") {
                applyFunc(true);
              } else if (icon.name === "FAQ") {
                faqFunc(true);
              } else if (icon.name === "Socials") {
                socialsFunc(true);
              }
            }}
          >
            <div className="flex w-[75px] flex-col items-center justify-center border-white text-center duration-200 hover:bg-blue-400 hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)]  focus:border-4 lg:w-[100px]">
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
