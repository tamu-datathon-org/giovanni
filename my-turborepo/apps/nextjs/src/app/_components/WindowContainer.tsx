"use client";

// Ensure the component is treated as a client component
import React from "react";
import Image from "next/image";

import { Button } from "@vanni/ui/button";

import { toast } from "~/hooks/use-toast";
import { ExitButton, Lines, TAMUy2k, TitleText } from "./preregistration-form"; // Ensure these imports are correct

interface WindowContainerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  openFunc: (isOpen: boolean) => void;
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

  return (
    isOpen && (
      <div
        className={`font-XPfont w-fit font-bold ${isOpen ? "unhidden" : "hidden"}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="xpBorder p-3 flex w-fit flex-col items-center text-center text-lg" style={borderStyle}>
            <div className="flex w-full flex-row items-center justify-between">
              <Lines />
              <ExitButton
                onClick={() => openFunc(false)}
                onTouchEnd={() => openFunc(false)}
              />
            </div>
            <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WindowContainer;
