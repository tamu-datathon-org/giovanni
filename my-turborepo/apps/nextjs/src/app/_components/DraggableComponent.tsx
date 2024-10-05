"use client";

import React from "react";
import Draggable from "react-draggable";
import WindowContainer from "~/app/_components/WindowContainer";
import {ExitButton, Lines, TAMUy2k} from "~/app/_components/preregistration-form";
import {toast} from "~/hooks/use-toast";

const DraggableComponent: React.FC = ({ children, xPos, yPos }) => {
    return (
        <Draggable handle=".handle" bounds="parent" defaultPosition={{x: xPos, y: yPos}}>
            <div className="font-XPfont font-bold handle">
                <div className="flex flex-col items-center justify-center">
                    <div className="xpBorder m-5 flex w-11/12 flex-col items-center px-4 text-center text-lg">
                        {" "}
                        {/* Added px-4 for horizontal padding */}
                        <div className="flex w-full flex-row items-center justify-between">
                            <Lines/>
                            <ExitButton onClick={() => {
                                toast({
                                    variant: "success",
                                    title: "The rest of the site is under construction!",
                                    description: "Please apply, or check it out later.",
                                });
                            }}/>
                        </div>
                        <div
                            className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
                            <div className="p-6">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};
    export default DraggableComponent;