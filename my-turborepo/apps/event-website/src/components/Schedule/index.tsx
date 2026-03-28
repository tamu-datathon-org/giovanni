"use client";

import { useState } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function Schedule(){
    const { events, loading, error, lastUpdated} = useSchedule();
    return(
        <>
            <section id="Schedule" className="relative flex flex-col items-center min-h-screen bg-red-500 mt-8 mb-8">
                <div className="relative bg-[#392514] flex flex-col items-center w-3/4 min-h-screen mt-2 mb-2 rounded-lg border-4 border-solid border-[#8D6E5E]">
                    <div className="relative flex flex-col w-full min-h-full p-4 border-2 rounded-lg">

                    </div>
                </div>
            </section>
        </>
    );
}