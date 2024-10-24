"use client";

import React from "react";
import Image from "next/image"; // Import the Image component from the appropriate library

import { redirect } from "next/navigation";

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
  sponFunc: (isOpen: boolean) => void;
  prizeFunc: (isOpen: boolean) => void;
  setFocus: (focus: string) => void;
}

const routes: Icon[] = [
  { name: "Welcome", route: "/", image: "/Pixel_ComputerIcon.png" },
  { name: "FAQ", route: "/about", image: "/Pixel_InternetIcon.png" },
  { name: "Sponsor", route: "/", image: "/Pixel_WorldIcon.png" },
  { name: "Prizes", route: "/", image: "/Pixel_CDIcon.png" },
  { name: "Apply", route: "/apply/application", image: "/Pixel_EmailIcon.png" },
  { name: "Schedule", route: "/schedule", image: "/Pixel_CDIcon.png" },
  { name: "Socials", route: "/socials", image: "/Pixel_FileIcon.png" },
];
const numPerRow = 6;
const IconList: React.FC<IconListProps> = ({
  className,
  welcFunc,
  applyFunc,
  faqFunc,
  socialsFunc,
  sponFunc,
  prizeFunc,
  setFocus,
}) => {
  return (
    // className='absolute top-0 grid grid-cols-2 pt-4 gap-1'
    <div className={className}>
      <div className="flex flex-col items-center lg:flex lg:flex-row max-w-full lg:pb-3">
        {new Array(Math.ceil(routes.length / numPerRow)).fill(0).map((_, outerIndex) => (
          <div key={`row-${outerIndex}`} className="flex flex-row w-fit gap-1 lg:w-fit ">
            {routes.slice(outerIndex * numPerRow, (outerIndex + 1) * numPerRow).map((icon, index) => (
              <Button
                key={`${icon.name}-${outerIndex}-${index}`}
                className="flex shadow-none w-full h-full p-0"
                onClick={() => {
                  setFocus(icon.name);
                  if (icon.name === "Welcome") {
                    welcFunc(true);
                  } else if (icon.name === "Apply") {
                    applyFunc(true);
                  } else if (icon.name === "Schedule") {
                    redirect("/schedule");
                  } else if (icon.name === "Socials") {
                    socialsFunc(true);
                  } else if (icon.name === "FAQ") {
                    faqFunc(true);
                  } else if (icon.name === "Sponsor") {
                    sponFunc(true);
                  } else if (icon.name === "Prizes") {
                    prizeFunc(true);
                  }
                }}
              >
                <div className="flex flex-col w-12 h-auto lg:w-[100px] lg:h-[100px] max-w-full items-center justify-center border-white text-center duration-200 hover:bg-blue-400 hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)] focus:border-4">
                  {icon.image && (
                    <>
                      <Image
                        src={icon.image}
                        alt={"not found"}
                        width={100}
                        height={100}
                        className="w-auto h-11 lg:w-[100px] lg:h-[100px] "
                      />
                      <div className="text-wrap">{icon.name}</div>
                    </>
                  )}
                </div>
              </Button>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default IconList;
