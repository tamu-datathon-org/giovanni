"use client";

import { ExitButton, Lines, TAMUy2k, TitleText } from "./preregistration-form"; // Ensure these imports are correct

import { Button } from "@vanni/ui/button";
import Image from "next/image";
// Ensure the component is treated as a client component
import React from "react";
import { toast } from "~/hooks/use-toast";

interface WindowContainerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  openFunc: (isOpen: boolean) => void;
}

const WindowContainer: React.FC<WindowContainerProps> = ({ children, isOpen, openFunc }) => {
  return (
    <div className={`font-XPfont w-fit font-bold ${isOpen ? "unhidden" : "hidden"}`}>
      <div className="flex flex-col items-center justify-center z-50">
        <div className="xpBorder flex w-fit flex-col items-center px-4 text-center text-lg">
          {/* Added px-4 for horizontal padding */}
          <div className="flex w-full flex-row items-center justify-between">
            <Lines />
            <ExitButton onClick={() => { openFunc(false); }} onTouchEnd={() => { openFunc(false); }} />
          </div>
          <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowContainer;
