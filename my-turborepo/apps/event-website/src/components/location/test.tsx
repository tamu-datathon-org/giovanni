"use client";

import Image from "next/image";

export default function Tester(){
    return(
        <>
        <section id="location" className="relative bg-[#FAE19D] flex h-screen flex-col md:flex-row">
            <div className="relative flex w-full justify-center md:absolute md:left-0 md:top-0 md:block md:w-[50vw] md:max-w-[800px] bg-red-500">
                <Image
                    src="/images/event_info_bg.svg"
                    alt="frame"
                    width={0}
                    height={0}
                    className="lg:w-6/7 hidden h-auto w-full md:block"
                />
            </div>
        </section>
        </>
    );
}