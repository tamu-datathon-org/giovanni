import type { ReactNode } from "react";

const RSVP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfSH9azCH7-Q6WEzBU1BqFadxGpfc1yJ0ud2Yn7U0aUx156MA/viewform?usp=publish-editor";

const NOISE_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='.35'/></svg>\")";

const workshops = [
  {
    dateLabel: "APRIL 7",
    title: "ML BASICS",
    description: "Learning the basics of machine learning.",
    time: "7:00 – 8:00 PM",
    room: "PETR 126",
  },
  {
    dateLabel: "APRIL 9",
    title: "PANDAS & PYTHON",
    description:
      "For the first time ever: a TAMU Datathon × Phi Sigma Rho workshop on Pandas and Python.",
    time: "7:00 – 8:00 PM",
    room: "ETB 1035",
  },
] as const;

function MenuBoardChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-2xl border-4 border-[#b4d8ee]/40 bg-[#fdf3e3] text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1rem-3px)] opacity-10 [background-image:radial-gradient(circle_at_20%_10%,rgba(180,216,238,0.45),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(180,216,238,0.25),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1rem-3px)] opacity-30 mix-blend-multiply"
        style={{ backgroundImage: NOISE_BG }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-2 overflow-hidden rounded-l-[calc(1rem-3px)] bg-[#b4d8ee]/10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Workshops() {
  return (
    <section
      aria-label="Workshops"
      className="relative z-20 flex justify-center overflow-visible bg-[#f0cf91] px-3 py-10 sm:px-4 sm:py-14 md:py-16"
    >
      <div className="relative w-full max-w-[920px]">
        <div className="relative">
          <MenuBoardChrome>
          <div className="px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10 md:px-12 md:pb-12 md:pt-12">
            <header className="text-center">
              <p className="font-chilanka text-lg tracking-wide text-[#8D6E5E] sm:text-xl md:text-2xl">
                This week&apos;s specials
              </p>
              <h2 className="mt-2 font-darumadrop-one text-[2.25rem] leading-none tracking-wide text-[#4C321B] sm:text-5xl md:text-6xl">
                WORKSHOPS
              </h2>
              <div
                className="mx-auto mt-4 h-1 max-w-[200px] rounded-full bg-[#b4d8ee]"
                aria-hidden
              />
              <p className="mx-auto mt-5 max-w-[540px] font-chilanka text-lg leading-snug text-[#4C321B]/90 sm:text-xl md:text-2xl">
                Come learn with us the week before Datathon Lite!
              </p>
            </header>

            <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-10 md:items-start">
              {workshops.map((w, i) => (
                <article
                  key={w.dateLabel}
                  className={`relative mx-auto w-full max-w-[400px] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(76,50,27,0.14)] ${
                    i % 2 === 0 ? "-rotate-1 md:-rotate-1" : "rotate-1 md:rotate-1"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border-[3px] border-[#4C321B]/20 bg-gradient-to-b from-[#fffefb] to-[#f7efe4] shadow-[0_8px_24px_rgba(76,50,27,0.1)]">
                    <div className="relative bg-[#966952]/90 px-4 py-3 sm:px-5 sm:py-3.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-darumadrop-one text-xl tracking-wide text-[#fae19d] sm:text-2xl">
                          {w.dateLabel}
                        </span>
                        <span className="font-chilanka text-sm uppercase tracking-[0.2em] text-[#fae19d]/80">
                          Admit one
                        </span>
                      </div>
                      <p className="mt-1 font-darumadrop-one text-lg leading-tight text-[#fae19d]/95 sm:text-xl">
                        {w.title}
                      </p>
                    </div>

                    <div className="space-y-4 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
                      <p className="font-chilanka text-lg leading-snug text-[#4C321B] sm:text-xl">
                        {w.description}
                      </p>
                      <dl className="grid gap-3 border-t border-dotted border-[#4C321B]/25 pt-4">
                        <div>
                          <dt className="font-darumadrop-one text-sm tracking-wide text-[#8D6E5E] sm:text-base">
                            TIME
                          </dt>
                          <dd className="font-chilanka text-xl text-[#4C321B] sm:text-2xl">
                            {w.time}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-darumadrop-one text-sm tracking-wide text-[#8D6E5E] sm:text-base">
                            ROOM
                          </dt>
                          <dd className="font-chilanka text-xl text-[#4C321B] sm:text-2xl">
                            {w.room}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-md md:mt-14">
              <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-[#4C321B]/25 bg-[#fefdf8] px-5 py-6 text-center shadow-inner sm:px-6 sm:py-7">
                <p className="mt-2 font-chilanka text-lg text-[#4C321B] sm:text-xl">
                  Please RSVP if you plan to attend.
                </p>
                <a
                  href={RSVP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center text-center rounded-xl bg-[#FAE19D] px-8 py-3 font-darumadrop-one text-2xl leading-none text-[#8D6E5E] shadow-[0_10px_24px_rgba(76,50,27,0.15)] transition-colors hover:bg-[#FFF5DA] sm:px-10 sm:py-4 sm:text-3xl"
                >
                  {/* font is not centered */}
                  <span className="-translate-y-[4px]">RSVP</span>
                </a>
              </div>
            </div>
          </div>
        </MenuBoardChrome>
        </div>
      </div>
    </section>
  );
}
