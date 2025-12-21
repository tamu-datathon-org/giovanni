"use client";

import React from "react";
import Image from "next/image"; // Import the Image component from the appropriate library

import { useRouter } from "next/navigation";

import { Button } from "@vanni/ui/button";

interface Icon {
  name: string;
  route: string;
  image: string;
  // Add any other properties you need for the icon
}

interface IconListProps {
  className?: string;
  welcFunc?: (isOpen: boolean) => void;
  faqFunc?: (isOpen: boolean) => void;
  socialsFunc?: (isOpen: boolean) => void;
  sponFunc?: (isOpen: boolean) => void;
  prizeFunc?: (isOpen: boolean) => void;
  scheduleFunc?: () => void;
  helpQueueFunc?: () => void;
  setFocus?: (focus: string) => void;
  challengesFunc?: () => void;
}

const routes: Icon[] = [
  { name: "Welcome", route: "/", image: "/Pixel_ComputerIcon.png" },
  { name: "FAQ", route: "/about", image: "/Pixel_InternetIcon.png" },
  // { name: "Sponsor", route: "/", image: "/Pixel_WorldIcon.png" },
  // { name: "Prizes", route: "/", image: "/Pixel_CDIcon.png" },
  // { name: "Schedule", route: "/schedule", image: "/Pixel_PolarBear.png" },
  { name: "Socials", route: "/socials", image: "/Pixel_FileIcon.png" },
  // { name: "Challenges", route: "/challenges", image: "/Pixel_EmailIcon.png"},
  // { name: "Help Queue", route: "https://helpqueue.tamudatathon.com/", image: "/Pixel_RecycleIcon.png" }
];
const numPerRow = 6;
const IconList: React.FC<IconListProps> = ({
  className,
  welcFunc,
  faqFunc,
  socialsFunc,
  sponFunc,
  prizeFunc,
  scheduleFunc: _scheduleFunc,
  challengesFunc: _challengesFunc,
  helpQueueFunc: _helpQueueFunc,
  setFocus,
}) => {
  const router = useRouter();

  setFocus = setFocus ?? undefined;
  return (
    <div className={className}>
      <div className="flex max-w-full flex-col items-center lg:flex lg:flex-row lg:pb-3">
        {new Array(Math.ceil(routes.length / numPerRow))
          .fill(0)
          .map((_, outerIndex) => (
            <div
              key={`row-${outerIndex}`}
              className="flex w-fit flex-row gap-1 lg:w-fit "
            >
              {routes
                .slice(outerIndex * numPerRow, (outerIndex + 1) * numPerRow)
                .map((icon, index) => (
                  <Button
                    key={`${icon.name}-${outerIndex}-${index}`}
                    className="flex h-full w-full p-0 shadow-none"
                    onClick={() => {
                      setFocus?.(icon.name);
                      if (welcFunc && icon.name === "Welcome") {
                        welcFunc(true);
                      } else if (icon.name === "Schedule") {
                        router.push("/schedule");
                      } else if (socialsFunc && icon.name === "Socials") {
                        socialsFunc(true);
                      } else if (faqFunc && icon.name === "FAQ") {
                        faqFunc(true);
                      } else if (sponFunc && icon.name === "Sponsor") {
                        sponFunc(true);
                      } else if (prizeFunc && icon.name === "Prize") {
                        prizeFunc(true);
                      } else if (icon.name === "Challenges") {
                        router.push("/challenges");
                      } else if (prizeFunc && icon.name === "Prizes") {
                        prizeFunc(true);
                      } else if (icon.name === "Help Queue") {
                        router.push("https://helpqueue.tamudatathon.com/");
                      }
                    }}
                  >
                    <div className="flex h-auto w-12 max-w-full flex-col items-center justify-center border-white text-center duration-200 hover:bg-blue-400 hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)] focus:border-4 lg:h-auto lg:w-auto">
                      {icon.image && (
                        <>
                          <Image
                            src={icon.image}
                            alt={"not found"}
                            width={100}
                            height={100}
                            className="h-11 w-auto lg:h-[100px] lg:w-[100px] "
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
