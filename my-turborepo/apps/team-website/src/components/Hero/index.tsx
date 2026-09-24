import Image from "next/image";
import BearImage from "./bear_animation";
import Chevrons from "./Chevrons";

export default function Hero() {
  const asciiLines = [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⡌⠛⣷⡀⠀⠀⠀⠀⠀⢠⡾⠟⢡⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣆⠉⠀⠀⠀⠀⠀⠀⠈⠁⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⡀⠀⠀⠀⠀⠀⣠⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣤⣀⠀⠀⠀⣠⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⠀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡀⠀⠀⢀⣀⣤⣤⣄⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡉⠉⠉⠛⠻⢶⣤⣿⣏⠛⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣆⢀⣾⠏⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⠟⠉⣿⣇⣤⡾⠟⠋⠉⠉⣹⡟⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣧⡀⠀⠀⠀⠀⠻⢿⣿⣄⠀⠛⢤⣧⣄⠀⠀⠀⠀⠀⠀⠘⣿⢸⡧⠀⠀⠀⠀⠀⠀⢀⣠⣼⡟⠃⢀⣼⣿⠿⠛⠀⠀⠀⠀⢠⣿⠃⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣶⣤⣀⠀⠀⠀⠙⢿⣷⣄⠀⠈⠛⠿⢶⣤⣀⣀⣤⣴⡟⠹⣷⣄⣠⣤⣤⣴⠾⠟⠋⠁⠀⣰⣿⠟⠁⠀⠀⢀⣀⣤⣾⠟⠁⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⡿⠿⠷⣶⣶⣶⣿⣿⣦⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠉⠙⠛⠉⠀⠀⠀⠀⢀⣼⣿⣥⣴⣶⣶⠿⢿⣿⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⢤⠤⠤⢿⣧⣤⣄⣀⣀⠀⠀⠀⠻⣧⡀⠀⣀⣀⣤⣤⣴⡄⠀⠀⢀⣤⣦⣤⣄⣠⣀⣀⢀⣾⠋⣁⣀⣀⣀⣤⣤⣤⣾⣧⣤⣴⣴⣤⣤⣄⡀⠀⠀",
    "⠀⠀⢀⣤⣾⣿⡿⠛⠉⠀⠀⠀⠀⠈⠻⣦⡀⢈⣉⣛⠻⠽⣯⣿⣯⠉⠉⠁⠈⣿⡟⠁⠀⠀⠀⠳⣼⡍⠁⠀⠉⣩⣿⡿⠟⠛⢛⡉⠉⠀⣀⡾⠏⠀⠀⠀⠀⠉⠛⣿⣿⣦⡀",
    "⠀⠀⠘⣿⣿⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣾⣿⣿⣣⡀⣀⣸⡿⠓⠶⣤⣼⠏⠀⠀⠀⠀⠀⠀⠙⢷⣄⡶⠛⠹⣯⣀⣀⣀⣿⣿⣷⠾⠋⠁⠀⠀⠀⠀⠀⠀⢠⣼⣿⣿⠇",
    "⠀⠀⠀⠈⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⣿⣭⣽⣿⣯⣤⠶⢻⡟⠉⠳⢦⣀⠀⠀⢀⡴⠞⠉⢯⡙⠶⠦⣬⣙⣛⣿⣽⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡶⠟⠋⠉⠉⠉⢹⣷⢠⠏⠀⠀⠀⠀⠙⢦⣠⠟⠁⠀⠀⠈⢳⡄⢰⡿⠉⠉⠉⠉⠛⠷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠟⠁⠀⠀⠀⠀⠀⠀⢸⣿⡏⠀⠀⠀⠀⠀⠀⣼⣿⡄⠀⠀⠀⠀⠀⣿⡜⣷⠀⠀⠀⠀⠀⠀⠈⠙⢷⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⣴⡿⢹⣷⡀⠀⠀⠀⠀⢸⣿⣿⣿⠄⠀⡀⠀⣰⣿⡇⠘⣧⣄⠀⠀⠀⠀⠀⠀⠀⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣶⡶⠾⠿⠿⣿⣿⠏⠀⠈⢿⣿⣿⣿⣇⣀⠀⠛⠟⠋⣀⣠⣻⣿⣿⣿⠇⠀⠈⢿⣿⠿⠿⠿⢶⣶⣶⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡾⠟⠋⠉⠀⠀⠀⣠⣾⡿⠃⠀⢀⣤⣴⠿⠛⠛⠛⠛⠻⣦⢠⣿⠛⠋⠛⠛⠿⣷⣦⣄⠀⠀⠻⣷⣄⠀⠀⠀⠀⠉⠙⠳⣦⡀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡟⠀⠀⠀⠀⠀⣤⣾⣿⡏⠁⡄⢺⣿⠋⠁⠀⠀⠀⠀⠀⢰⣿⢸⣧⠀⠀⠀⠀⠀⠀⠈⠛⣿⡆⡄⠙⣿⣿⣦⡄⠀⠀⠀⠀⠈⣿⡆⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠰⣿⣆⣀⣀⣤⣶⠿⠋⣾⣟⣠⡾⠟⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠏⠈⢿⣦⠀⠀⠀⠀⠀⠀⠀⠈⠘⠿⣦⣜⣿⡍⠛⢶⣄⣀⠀⠀⣸⡧⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠋⠁⠀⠀⠀⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠋⠀⠀⠀⠻⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠋⠀⠀⠈⠉⠛⠛⠉⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡟⠁⠀⠀⠀⠀⠀⠘⢿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠏⣀⠀⠀⠀⠀⠀⠀⣠⡈⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡟⣁⣴⠟⠃⠀⠀⠀⠀⠀⠀⠿⣿⣤⣙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⡛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  ];

  return (
    <section className="grid-background-blue relative flex w-full items-center overflow-hidden bg-[#E9F6FF] pb-10 pt-20 lg:pb-14 lg:pt-28">
      {/* --- curved line + ascii map (decorative, scales with viewport) */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-0 aspect-[621/723] w-[min(95vw,615px)] opacity-40 lg:w-[min(48vw,615px)] lg:opacity-100"
        aria-hidden
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 621 723"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved line */}
          <path
            d="M0.453125 -7C159.953 7.5 361.186 89.6869 294.453 205.5C227.72 321.313 10.2089 389.32 150.453 523.5C290.697 657.68 695.418 611.35 602.096 719"
            stroke="#377BB0"
            strokeWidth="10"
          />

          {/* ASCII art */}
          <g transform="scale(1.5)">
            <text
              x="10"
              y="20"
              fill="#0e7490"
              fillOpacity="0.30"
              fontFamily="monospace"
              fontSize="10"
              style={{ whiteSpace: "pre" }}
            >
              {asciiLines.map((line, i) => (
                <tspan key={i} x="10" dy={i === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-6 sm:px-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
        {/* title */}
        <div className="text-center lg:-ml-8 lg:text-left">
          <h1 className="text-[clamp(4rem,19vw,9rem)] font-extrabold leading-none lg:text-[clamp(5rem,10.5vw,10.5rem)]">
            <span
              className="block text-[#10AEA4]"
              style={{
                WebkitTextStroke: "4px #E9F6FF",
                paintOrder: "stroke fill",
              }}
            >
              tamu
            </span>
            <span
              className="block text-[#377BB0]"
              style={{
                WebkitTextStroke: "4px #E9F6FF",
                paintOrder: "stroke fill",
              }}
            >
              datathon
            </span>
          </h1>

          {/* Orange chevrons */}
          <Chevrons className="mx-auto mt-4 h-12 w-24 sm:h-[68px] sm:w-[135px] lg:mx-0" />
        </div>

        {/* bear, stars and speech bubble move together as one unit */}
        <div className="relative mx-auto aspect-[4/5] w-[min(74vw,520px)] lg:w-[600px] lg:justify-self-end">
          <Image
            src="/images/bear_frames/stars-dots.svg"
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 600px, 74vw"
            className="pointer-events-none object-contain"
          />

          <div className="absolute left-[52%] top-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2">
            <BearImage
              className="aspect-square w-full"
              sizes="(min-width: 1024px) 420px, 52vw"
            />
          </div>

          {/* Speech bubble */}
          {/* <div className="absolute left-[12%] top-[42%] rounded-2xl bg-[#377BB0] px-6 py-2.5 text-xl font-semibold text-white sm:px-8 sm:py-3.5 sm:text-2xl">
            Hi
            <span className="absolute -right-3 top-1/2 h-0 w-0 -translate-y-1/2 border-y-10 border-l-[14px] border-y-transparent border-l-[#377BB0]" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
