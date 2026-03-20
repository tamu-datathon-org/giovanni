'use client'

import Image from "next/image";
// Darumadrop One (larger and button), Chilanka (date)


export default function Hero(){
    return(
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Darumadrop+One&display=swap" rel="stylesheet"></link>

            <section id="hero" className="relative h-[80vh] flex bg-[url(/images/background.svg)]">
                {/* TODO: check for redundancy for the ml shit  */}
                <div className="absolute top-0 left-0 w-[50vw] max-w-[800px]">
                    {/* napkin */}
                    <Image
                        src="/images/group_napcup.svg"
                        alt="Napkin"
                        width={0}
                        height={0}
                        className="w-full h-auto "
                    />

                    <Image
                        src="/images/steam.gif"
                        width = {0}
                        height={0}
                        alt="steam.gif"
                        className="absolute w-full h-auto top-[10%] left-[60%] w-[30%] -translate-x-1/2"
                    />


                </div>

                {/* brown panel */}
                <div className="absolute right-0 top-0 h-full w-2/5 bg-[#966952] mr-[90px] flex flex-col items-center justify-start pt-20 text-center">
                    <p className="font-['Darumadrop_one']  text-5xl lg:text-7xl md:text-6xl text-center text-[#FAE19D]">TAMU <br /> Datathon Lite </p>
                    <p className="font-['Chilanka'] text-3xl md:text-5xl lg:text-6xl text-center text-[#FAE19D] mt-8">
                        April 11, 2026 <br/> ----------------</p>

                    <a href="https://tamudatathon.org/apply"
                        className="
                                mt-8
                                px-8 py-3            /* smaller default padding */
                                md:px-12 md:py-4     /* medium screens */
                                lg:px-16 lg:py-6     /* large screens */
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
                {/* cup and stuff on the left  */}


            </section>
        </>
    )
}

