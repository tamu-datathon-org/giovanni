"use client";

// Ensure the component is treated as a client component
import React from "react";
import Image from "next/image";

import { Button } from "@vanni/ui/button";

import { ExitButton, Lines, TAMUy2k, TitleText } from "./preregistration-form"; // Ensure these imports are correct

interface WindowContainerProps {
  children: React.ReactNode;
}

const WindowContainer: React.FC<WindowContainerProps> = ({ children }) => {
  return (
    <div className="font-XPfont w-full font-bold ">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="xpBorder m-5 flex w-11/12 flex-col items-center px-4 text-center text-lg lg:w-2/5">
          {" "}
          {/* Added px-4 for horizontal padding */}
          <div className="flex w-full flex-row items-center justify-between">
            <Lines />
            <ExitButton />
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            <TAMUy2k />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowContainer;
