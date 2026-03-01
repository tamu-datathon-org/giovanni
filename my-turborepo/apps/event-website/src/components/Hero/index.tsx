'use client'

export default function Hero() {
  return (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
            href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Economica:wght@400;700&display=swap"
            rel="stylesheet"
        />

        <style jsx>{`
            @keyframes swing {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
            }
            .swing {
            transform-origin: top center;
            animation: swing 4s ease-in-out infinite;
            }
        `}</style>

        <section id="hero" className="min-h-screen flex items-center justify-center bg-[#A1CDFF] px-4">
            <div className="flex flex-col items-center swing w-[min(700px,90vw)] -mt-20">

                {/* Nail + Strings — uses 100% width so it scales with container */}
                <svg
                    viewBox="0 0 700 180"
                    className="w-full shrink-0"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <line x1="350" y1="12" x2="45" y2="168" stroke="#9CA3AF" strokeWidth="2.5" />
                    <line x1="350" y1="12" x2="655" y2="168" stroke="#9CA3AF" strokeWidth="2.5" />
                    <circle cx="350" cy="12" r="10" fill="#6B7280" />
                </svg>

                {/* Sign board */}
                <div className="relative -mt-4 w-full">
                    <div className="w-full bg-[#FBE29E] rounded-2xl shadow-[0_0_0_8px_white,0_0_0_14px_#9CA3AF] sm:shadow-[0_0_0_12px_white,0_0_0_20px_#9CA3AF]">
                        <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 py-10 sm:py-14">
                            <p className="self-start ml-2 sm:ml-4 font-['Bonheur_Royale'] text-[clamp(2rem,8vw,4.5rem)] text-[#1a1a1a] leading-none">Sorry...</p>

                            <p className="text-center mt-4 font-['Economica'] font-bold text-[clamp(2.5rem,10vw,5.5rem)] text-[#1a1a1a] leading-tight">
                                More coming
                                <br />
                                soon !
                            </p>

                            <a
                                href="https://tamudatathon.org/apply"
                                className="mt-6 px-10 sm:px-12 py-2 rounded font-sans text-base sm:text-lg font-medium bg-[#C4A94D] text-[#1a1a1a] hover:bg-[#b39a42] transition-colors inline-block"
                                >
                                Apply
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}