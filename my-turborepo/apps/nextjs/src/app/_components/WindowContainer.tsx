"use client";

// Ensure the component is treated as a client component
import React from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";

import { Button } from "@vanni/ui/button";

import { toast } from "~/hooks/use-toast";
import { ExitButton, Lines, TAMUy2k, TitleText } from "./preregistration-form"; // Ensure these imports are correct

interface WindowContainerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  openFunc?: (isOpen: boolean) => void;
  borderGradientStart?: string;
  borderGradientMiddle?: string;
  borderGradientEnd?: string;
}

const WindowContainer: React.FC<WindowContainerProps> = ({
  children,
  isOpen,
  openFunc,
  borderGradientStart = "#b6ddf9",
  borderGradientMiddle = "#dfe2e5",
  borderGradientEnd = "#6ba2fe",
}) => {
  const borderStyle = {
    backgroundImage: `linear-gradient(to bottom, ${borderGradientStart}, ${borderGradientMiddle}, ${borderGradientEnd})`,
  };

  openFunc = openFunc ?? (() => {});

  return (
    isOpen && (
      <div
        className={`font-XPfont w-fit scale-75 font-bold sm:scale-100 ${isOpen ? "unhidden" : "hidden"} `}
        // style={{ transform: "scale(0.5) sm:scale(1)" }}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className="xpBorder flex w-fit flex-col items-center p-3 text-center text-lg"
            style={borderStyle}
          >
            {" "}
            {/* Added px-4 for horizontal padding */}
            <div className="flex w-full flex-row items-center justify-between">
              <Lines />
              <ExitButton
                onClick={() => openFunc(false)}
                onTouchEnd={() => openFunc(false)}
              />
            </div>
            <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] p-4 lg:border-[1px]">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WindowContainer;
