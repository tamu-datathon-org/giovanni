"use client"
import Image from "next/image";
// Darumadrop One (larger and button), Chilanka (date)

// export default function Hero(){
//     return(
//         <>
//             <link rel="preconnect" href="https://fonts.googleapis.com"/>
//             <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
//             <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Darumadrop+One&display=swap" rel="stylesheet"></link>

//             <section id="hero" className="min-h-screen flex items-center justify-center bg-[url(/images/background.svg)]">
//                 <div className="w-2/5 h-screen bg-[#966952] ml-auto mr-[90px]">
//                     <p className="font-['Darumadrop_one']  text-5xl lg:text-9xl md:text-6xl text-center text-[#B4D8EE]">TAMU <br /> Datathon Lite </p>
//                     <p className="font-['Chilanka'] text-3xl md:text-5xl lg:text-6xl text-center text-[#B4D8EE] mt-8">April 11, 2026 <br/> ----------------</p>
//                     <a href="https://tamudatathon.org/apply"
//                         className="mt-8 px-12 py-6 md:px-16 md:py-8 lg:px-20 lg:py-10 rounded-xl font-['Darumadrop_one'] text-3xl md:text-4xl lg:text-5xl bg-[#B4D8EE] text-[#8D6E5E] hover:bg-[#ECCC91] transition-colors block mx-auto w-fit"
//                                 >
//                         APPLY
//                     </a>

//                 </div>

//             </section>
//         </>
//     )
// }

export default function Hero() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Economica:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <style jsx>{`
        @keyframes swing {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .swing {
          transform-origin: top center;
          animation: swing 4s ease-in-out infinite;
        }
      `}</style>

      <section
        id="hero"
        className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#d7eaff]  to-[#A1CDFF] px-4"
      >
        <div className="swing -mt-20 flex w-[min(700px,90vw)] flex-col items-center">
          {/* Nail + Strings — uses 100% width so it scales with container */}
          <svg
            viewBox="0 0 700 180"
            className="w-full shrink-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              x1="350"
              y1="12"
              x2="45"
              y2="168"
              stroke="#9CA3AF"
              strokeWidth="2.5"
            />
            <line
              x1="350"
              y1="12"
              x2="655"
              y2="168"
              stroke="#9CA3AF"
              strokeWidth="2.5"
            />
            <circle cx="350" cy="12" r="10" fill="#6B7280" />
          </svg>

          {/* Sign board */}
          <div className="relative -mt-4 w-full">
            {/* Wooden frame */}
            <div className="w-full rounded-[26px] bg-[#4B2E20] p-2 shadow-[0_18px_0_0_rgba(75,46,32,1)]">
              {/* Chalkboard */}
              <div className="flex h-full flex-col items-center justify-center rounded-[20px] border-[3px] border-[#FDF5E6]/60 bg-[#141921] p-6 py-8 sm:p-8 sm:py-10">
                {/* Top chalk accent line */}
                <div className="mb-4 h-[2px] w-24 rounded-full bg-[#FDF5E6]/70 sm:w-32" />

                <p className="text-center font-['Fredericka_the_Great'] text-[clamp(2.1rem,6vw,3.4rem)] leading-tight text-[#FDF5E6]">
                  TD-Lite Café
                  <br />
                  <span className="mt-1 inline-block text-[#eab968]">April 11th 2026</span>
                </p>

                <p className="mt-5 text-center font-['Fredericka_the_Great'] text-[clamp(2.4rem,7vw,3.8rem)] leading-tight text-[#FDF5E6]">
                  More brewing
                  <br />
                  soon!
                </p>

                <a
                  href="https://tamudatathon.org/apply"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#FDF5E6] bg-[#4b2e20] px-8 py-2 font-['Fredericka_the_Great'] text-sm uppercase tracking-[0.22em] text-[#FDF5E6] shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-transform duration-100 hover:-translate-y-[1px] hover:scale-[1.05] hover:border-[#4b2e20] hover:bg-white hover:text-[#4b2e20] hover:shadow-[0_4px_0_rgba(8,8,8,0.9)] active:translate-y-[1px] active:scale-[0.97] active:shadow-[0_0_0_rgba(0,0,0,0.9)] sm:px-10 sm:text-base "
                >
                  <span>Apply</span>
                </a>

                {/* Bottom chalk accent line */}
                <div className="mt-6 h-[2px] w-16 rounded-full bg-[#FDF5E6]/60 sm:w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}