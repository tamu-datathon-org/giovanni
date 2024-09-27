"use client"; // Ensure the component is treated as a client component

import React from "react";
import { Button } from "@vanni/ui/button";
import Image from "next/image";
import { Lines, ExitButton, TitleText, TAMUy2k } from "./preregistration-form"; // Ensure these imports are correct

interface WindowContainerProps {
  children: React.ReactNode;
}

const WindowContainer: React.FC<WindowContainerProps> = ({ children }) => {
  return (
    <div className="font-XPfont font-bold w-full ">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="xpBorder m-5 flex w-11/12 flex-col items-center text-center text-lg lg:w-2/5 px-4"> {/* Added px-4 for horizontal padding */}
          <div className="flex w-full flex-row items-center justify-between">
            <Lines />
            <ExitButton />
          </div>
          <TAMUy2k />
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowContainer;