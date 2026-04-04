"use client";

import Image from "next/image";

// Darumadrop One (larger and button), Chilanka (date)

export default function Hero() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Chilanka&family=Darumadrop+One&display=swap"
        rel="stylesheet"
      ></link>

      <section
        id="hero"
        className="relative flex min-h-screen bg-[url(/images/background.svg)]"
      >
        {/* TODO: check for redundancy for the ml shit  */}
        <div className="absolute left-0 top-0 w-[50vw] max-w-[800px]">
          {/* napkin */}
          <Image
            src="/images/group_napcup.svg"
            alt="Napkin"
            width={0}
            height={0}
            className="h-auto w-full "
          />

          <Image
            src="/images/steam.gif"
            width={0}
            height={0}
            alt="steam.gif"
            className="absolute left-[60%] top-[20%] h-auto w-[30%] w-full -translate-x-1/2"
          />
        </div>

        {/* brown panel */}
        <div className="absolute right-0 mr-[90px] h-screen w-2/5 bg-[#966952]">
          <p className="text-center  font-['Darumadrop_one'] text-5xl text-[#FAE19D] md:text-6xl lg:text-7xl">
            TAMU <br /> Datathon Lite{" "}
          </p>
          <p className="mt-8 text-center font-['Chilanka'] text-3xl text-[#FAE19D] md:text-5xl lg:text-6xl">
            April 11, 2026 <br /> ----------------
          </p>

          <a
            href="https://tamudatathon.org/apply"
            className="
                                /*
                                smaller default            padding */ /* medium screens
                                */ /*     large screens */ mx-auto
                                mt-8 block     flex w-fit items-center justify-center
                                rounded-xl
                                bg-[#FAE19D]
                                px-8 py-3 font-['Darumadrop_one']
                                text-2xl text-[#8D6E5E]
                                transition-colors
                                hover:bg-[#FFF5DA]
                                md:px-12 md:py-4 md:text-3xl
                                lg:px-16 lg:py-6 lg:text-4xl
                            "
          >
            APPLY
          </a>
        </div>
        {/* cup and stuff on the left  */}
      </section>
    </>
  );
}
