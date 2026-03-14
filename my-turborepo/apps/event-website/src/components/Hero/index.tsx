'use client'

import Image from "next/image";
// Darumadrop One (larger and button), Chilanka (date)


export default function Hero(){
    return(
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Darumadrop+One&display=swap" rel="stylesheet"></link>

            <section id="hero" className="min-h-screen flex items-center justify-center bg-[url(/images/background.svg)]">
                {/* TODO: check for redundancy for the ml shit  */}
                <div className="w-2/5 h-screen bg-[#966952] ml-auto mr-[90px]">
                    <p className="font-['Darumadrop_one']  text-5xl lg:text-9xl md:text-6xl text-center text-[#FAE19D]">TAMU <br /> Datathon Lite </p>
                    <p className="font-['Chilanka'] text-3xl md:text-5xl lg:text-6xl text-center text-[#FAE19D] mt-8">April 11, 2026 <br/> ----------------</p>
                    <a href="https://tamudatathon.org/apply"
                        className="mt-8 px-12 py-6 md:px-16 md:py-8 lg:px-20 lg:py-10 rounded-xl font-['Darumadrop_one'] text-3xl md:text-4xl lg:text-5xl bg-[#FAE19D] text-[#8D6E5E] hover:bg-[#FFF5DA] transition-colors block mx-auto w-fit"
                                >
                        APPLY
                    </a>

                </div>
                {/* cup and stuff on the left  */}
                <div className="ml-auto">
                    <Image
                        src="/images/steam.gif"
                        alt="steam.gif"
                        className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    />


                </div>

            </section>
        </>
    )
}

