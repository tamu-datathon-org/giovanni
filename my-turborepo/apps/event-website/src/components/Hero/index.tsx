import Image from "next/image";

// Darumadrop One (larger and button), Chilanka (date)

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative flex h-screen flex-col bg-[url(/images/background.svg)] md:flex-row"
      >
        {/* cup+napkin — full width on mobile, left half on desktop */}
        <div className="relative flex w-full justify-center md:absolute md:left-0 md:top-0 md:block md:w-[50vw] md:max-w-[800px]">
          <Image
            src="/images/group_napcup.svg"
            alt="Napkin"
            width={696}
            height={711}
            priority
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
            className="block h-auto w-full lg:w-6/7"
          />

          <Image
            src="/images/steam.gif"
            alt="steam.gif"
            width={2388}
            height={1668}
            className="absolute left-[60%] top-[10%] h-auto w-[60%] -translate-x-1/2"
            loading="lazy"
            sizes="60vw"
          />
        </div>

        {/* Brown panel — bottom on mobile, right side on desktop */}
        <div
          className="
                    flex w-full flex-[0.85] flex-col items-center justify-center bg-[#966952]
                    px-6 pb-8 pt-10 mt-4 md:mt-0
                    text-center md:absolute md:right-0 md:top-0
                md:mr-[90px] md:h-full md:w-1/3 md:justify-center
                    md:pb-10
                md:pt-0
                "
        >
          <p className="text-center font-['Darumadrop_one'] text-5xl text-[#FAE19D] sm:text-6xl md:text-6xl lg:text-8xl">
            TAMU <br /> Datathon Lite
          </p>
          <p className="mt-6 text-center font-['Chilanka'] text-3xl text-[#FAE19D] sm:text-3xl md:mt-8 md:text-4xl lg:text-6xl">
            April 11, 2026 <br />
          </p>
          <p className="mt-6 text-center font-['Chilanka'] text-xl text-[#FAE19D] sm:text-xl md:mt-8 md:text-2xl lg:text-4xl">
            Applications Close <span className="font-['Darumadrop_one'] text-xl text-[#FAE19D] sm:text-xl md:mt-8 md:text-2xl lg:text-4xl">April 9</span>
          </p>

          <a
            href="https://tamudatathon.org/apply"
            className="
                            mt-6 rounded-xl
                            bg-[#FAE19D] px-8
                            py-3 font-['Darumadrop_one']
                            text-3xl text-[#8D6E5E]
                            shadow-xl
                            transition-colors
                            hover:bg-[#FFF5DA] md:mt-8 md:px-12
                            md:py-4 md:text-3xl
                            lg:px-16
                            lg:py-6
                            lg:text-4xl
                        "
          >
            APPLY
          </a>
        </div>
      </section>
    </>
  );
}
