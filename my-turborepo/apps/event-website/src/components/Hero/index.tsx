'use client'

import Image from "next/image";
// Darumadrop One (larger and button), Chilanka (date)


export default function Hero(){
    return(
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Darumadrop+One&display=swap" rel="stylesheet"></link>

            <section id="hero" className="relative min-h-[75vh] flex flex-col md:flex-row bg-[url(/images/background.svg)]">

                {/* cup+napkin — full width on mobile, left half on desktop */}
                <div className="relative w-full md:w-[50vw] md:max-w-[800px] md:absolute md:top-0 md:left-0 flex justify-center md:block">
                    {/* Mobile-only image */}
                    <Image
                        src="/images/napkin+cup_mobile.svg"
                        alt="Napkin"
                        width={0}
                        height={0}
                        className="w-3/4 h-auto block md:hidden"
                    />

                    {/* Desktop-only image */}
                    <Image
                        src="/images/group_napcup.svg"
                        alt="Napkin"
                        width={0}
                        height={0}
                        className="w-full h-auto hidden md:block lg:w-3/4"
                    />

                    <Image
                        src="/images/steam.gif"
                        width={0}
                        height={0}
                        alt="steam.gif"
                        className="absolute w-[30%] h-auto top-[10%] left-[60%] -translate-x-1/2"
                    />
                </div>

                {/* Brown panel — bottom on mobile, right side on desktop */}
                <div className="
                    w-full md:absolute md:right-0 md:top-0 md:h-full md:w-2/5 md:mr-[90px]
                    bg-[#966952]
                    flex flex-col items-center justify-center
                    py-10 md:pt-20 md:pb-10 md:justify-start
                    text-center
                    px-6
                ">
                    <p className="font-['Darumadrop_one'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-[#FAE19D]">
                        TAMU <br /> Datathon Lite
                    </p>
                    <p className="font-['Chilanka'] text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-center text-[#FAE19D] mt-6 md:mt-8">
                        April 11, 2026 <br/> ----------------
                    </p>

                    <a
                        href="https://tamudatathon.org/apply"
                        className="
                            mt-6 md:mt-8
                            px-8 py-3
                            md:px-12 md:py-4
                            lg:px-16 lg:py-6
                            rounded-xl
                            font-['Darumadrop_one']
                            text-2xl md:text-3xl lg:text-4xl
                            bg-[#FAE19D] text-[#8D6E5E]
                            hover:bg-[#FFF5DA]
                            transition-colors
                        "
                    >
                        APPLY
                    </a>
                </div>

            </section>
        </>
    );
}