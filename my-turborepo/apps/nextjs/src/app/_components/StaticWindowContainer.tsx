"use client";

// Ensure the component is treated as a client component
import React from "react";
import { Lines } from "./preregistration-form"; // Ensure these imports are correct

interface StaticWindowContainerProps {
    children: React.ReactNode;
    borderGradientStart?: string;
    borderGradientMiddle?: string;
    borderGradientEnd?: string;
}

const StaticWindowContainer: React.FC<StaticWindowContainerProps> = ({
    children,
    borderGradientStart = "#b6ddf9",
    borderGradientMiddle = "#dfe2e5",
    borderGradientEnd = "#6ba2fe",
}) => {
    const borderStyle = {
        backgroundImage: `linear-gradient(to bottom, ${borderGradientStart}, ${borderGradientMiddle}, ${borderGradientEnd})`,
    };

    return (
        <div
            className={`font-XPfont w-fit font-bold unhidden`}
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
                    </div>
                    <div className="relative mt-3 flex w-full flex-col items-center overflow-hidden border-0 border-[#585958] bg-[#e4e3e4] lg:border-[1px]">
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticWindowContainer;
