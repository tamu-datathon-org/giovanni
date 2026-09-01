"use client";

import ScrambleTextGrid from "./scramble";

export default function Hero() {
  return (
    <main className="grid-background-sm min-h-screen bg-white px-6 py-16">
      <div className="mt-2 text-right justify-start text-orange-400 text-4xl font-normal font-['Konkhmer_Sleokchher'] uppercase">/////////////////////////////////</div>
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}

        <header className="mb-10 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">

          </p>
          <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
            <span className="text-[#10AEA4]">TAMU</span>
            <span className="text-[#377BB0]">Datathon</span>
          </h1>
          <p className="mt-4 mx-auto font-mono mt-3 max-w-xl text-[#FF9A42]">
            Data, AI and Machine learning focused hackathon
          </p>
        </header>

        {/* Contained grid panel */}
        {/* <section className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"> */}
          {/* fixed height wraps the grid so it stays a small portion */}
          {/* <div className="h-[320px] w-full sm:h-[380px]">
            <ScrambleTextGrid
              cols={22}
              rows={9}
              fontSize={14}
              gapX={12}
              gapY={8}
              background="#ffffff"
              phrases={[
                "DATA SCIENCE",
                "MACHINE LEARNING",
                "ALGORITHM",
                "HACKATHON",
                "AI",
              ]}
            />
          </div> */}
        {/* </section> */}

        {/* Optional caption / CTA below
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            Six phrases hidden in the grid — how many can you spot?
          </p>
          <a
            href="#join"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-[#0d1526] transition-colors hover:bg-emerald-400"
          >
            Join the club →
          </a>
        </div> */}
      </div>
      <div className="mt-8 text-left justify-start text-orange-400 text-4xl font-normal font-['Konkhmer_Sleokchher'] uppercase">/////////////////////////////////</div>
    </main>
  );
}