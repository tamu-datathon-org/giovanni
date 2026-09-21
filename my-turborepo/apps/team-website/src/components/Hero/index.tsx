import Image from "next/image";
import FlickerImage from "./bear_animation";

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
    <section className="grid-background-blue relative min-h-screen w-full overflow-hidden bg-[#E9F6FF] flex items-center justify-center">
      {/* stars and dots background */}
      <div
        className="absolute z-[500] pointer-events-none"
        style={{ top: "0%", right: "8%" }}
        >
        <Image
            src="/images/bear_frames/stars-dots.svg"
            width={500}
            height={500}
            alt=""
        />
      </div>
      {/* bear animation */}
      <div className="absolute z-[999]" style={{ top: "20%", right: "14%" }}>
        <FlickerImage />
      </div>
      {/* Speech bubble */}
      <div
        className="absolute z-[999]"
        style={{ top: "30%", right: "38%" }}
      >
        <div className="relative bg-[#377BB0] text-white font-semibold text-lg px-5 py-2 rounded-2xl">
            Hi

          <div
            className="absolute"
            style={{
                right: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "10px solid #377BB0",
            }}
          />
        </div>
      </div>
      {/* --- curved line */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[615.46px] h-[726px]">
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
      </div>


      <div className="relative z-10 w-full max-w-6xl px-8">
        {/* suppose to be the top arrow but looks weird  */}
        {/* <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-gray-400">01</span>
          <div className="flex items-center flex-1">
            <div className="flex-1 flex items-center gap-3">
              <span className="h-[3px] w-16 bg-orange-500" />
              <span className="h-[3px] w-16 bg-orange-500" />
              <span className="h-[3px] w-16 bg-orange-500" />
            </div>
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              className="ml-1"
            >
              <path
                d="M0 12H32M32 12L22 2M32 12L22 22"
                stroke="#F97316"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div> */}


        {/* title  */}
        <h1 className="leading-none">
            <span
                className="block text-[6rem] md:text-[9rem] font-extrabold text-[#10AEA4]"
                style={{
                WebkitTextStroke: "4px #E9F6FF",
                paintOrder: "stroke fill",
                }}
            >
                tamu
            </span>
            <span
                className="block text-[7rem] md:text-[9rem] font-extrabold text-[#377BB0]"
                style={{
                WebkitTextStroke: "4px #E9F6FF",
                paintOrder: "stroke fill",
                }}
            >
                datathon
            </span>
        </h1>

        {/* Orange chevrons */}
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          fill="none"
          className="mt-4"
        >
          <path d="M0 15L25 30L0 45" stroke="#F97316" strokeWidth="8" />
          <path d="M35 15L60 30L35 45" stroke="#F97316" strokeWidth="8" />
          <path d="M70 15L95 30L70 45" stroke="#F97316" strokeWidth="8" />
        </svg>
      </div>
    </section>
  );
}
