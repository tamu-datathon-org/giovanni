const RSVP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfSH9azCH7-Q6WEzBU1BqFadxGpfc1yJ0ud2Yn7U0aUx156MA/viewform?usp=publish-editor";

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

export default function Workshops() {
  return (
    <section
      aria-label="Workshops"
      className="relative z-20 flex justify-center overflow-visible bg-[#f0cf91] px-2 py-6 md:py-12"
    >
      <div className="relative w-[min(96vw,980px)]">
        <div className="relative z-20 overflow-visible rounded-[18px] border-[3px] border-[#8d6e5e] bg-[#966952] px-3 pb-10 pt-10 sm:px-4 sm:pb-12 md:pb-14 md:pt-12">
          <div className="relative z-20 px-4 sm:px-8 md:px-16">
            <div className="mx-auto flex min-w-fit w-[70%] max-w-[420px] items-center justify-center rounded-[30px] border-[5px] border-[#401c0f] bg-[#663c26] p-[4px]">
              <div className="flex h-full w-full items-center justify-center rounded-[24px] border-[3px] border-[#966952] bg-[#663c26] p-2">
                <span className="font-darumadrop-one text-[34px] leading-none text-[#fae19d] sm:text-[40px]">
                  WORKSHOPS
                </span>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-[640px] text-center font-chilanka text-[22px] leading-snug text-[#fae19d] sm:text-[26px] md:mt-6">
              Free sessions the week before Datathon Lite—come learn with us on campus.
            </p>

            <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
              {workshops.map((w) => (
                <div
                  key={w.dateLabel}
                  className="rounded-[12px] border-4 border-[rgba(250,225,157,0.35)] bg-[#663c26]/90 p-5 sm:p-6"
                >
                  <div className="font-darumadrop-one text-[26px] leading-none text-[#fae19d] sm:text-[30px]">
                    {w.dateLabel}
                  </div>
                  <div className="mt-3 font-darumadrop-one text-[22px] leading-tight tracking-wide text-[#fae19d]/95 sm:text-[26px]">
                    {w.title}
                  </div>
                  <p className="mt-3 font-chilanka text-[20px] leading-snug text-[#fae19d] sm:text-[22px]">
                    {w.description}
                  </p>
                  <div className="mt-5 grid gap-3 border-t border-[rgba(250,225,157,0.2)] pt-4">
                    <div className="grid gap-0.5">
                      <span className="font-darumadrop-one text-lg text-[#fae19d]/90 sm:text-xl">
                        TIME
                      </span>
                      <span className="font-chilanka text-[26px] leading-tight text-[#fae19d] sm:text-[28px]">
                        {w.time}
                      </span>
                    </div>
                    <div className="grid gap-0.5">
                      <span className="font-darumadrop-one text-lg text-[#fae19d]/90 sm:text-xl">
                        ROOM
                      </span>
                      <span className="font-chilanka text-[26px] leading-tight text-[#fae19d] sm:text-[28px]">
                        {w.room}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
              <p className="text-center font-chilanka text-[20px] text-[#fae19d] sm:text-[22px]">
                Please RSVP if you plan to attend.
              </p>
              <a
                href={RSVP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#FAE19D] px-8 py-3 font-darumadrop-one text-2xl text-[#8D6E5E] shadow-xl transition-colors hover:bg-[#FFF5DA] sm:px-10 sm:py-4 sm:text-3xl"
              >
                RSVP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
