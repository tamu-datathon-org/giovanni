import Image from "next/image";

const PRIZE_FRAME_SVG = "/images/prizes/frame.svg";
const RIBBON_SVG = "/images/prizes/ribbon.svg";
const RIBBON_SVG_ALT = "/images/prizes/ribbon-alt.svg";
const PLANT_SIDE = "/images/prizes/plant-side.png";

const prizes = [
  {
    category: "First Place",
    name: "Alienware Gaming Monitor",
    ribbonRight: true,
    imageSrc: "/images/prizes/prize1.png",
  },
  {
    category: "Second Place",
    name: "Keychron Mechanical Keyboard",
    ribbonRight: false,
    imageSrc: "/images/prizes/prize2.png",
  },
  {
    category: "Third Place",
    name: "JBL Bluetooth Speaker",
    ribbonRight: true,
    imageSrc: "/images/prizes/prize3.png",
  },

];

export default function Prizes() {
  return (
    <section
      id="prizes"
      aria-label="Prizes"
      className="relative z-10 flex flex-col items-center overflow-visible bg-[#f0cf91] px-0 pt-8 pb-3 sm:px-1 sm:pt-20 sm:pb-10 [--prize-base:clamp(160px,40vw,440px)] md:px-2 md:pt-24 md:pb-14 md:[--prize-base:clamp(105px,26vw,440px)]"
    >
      {/* Bottom-left hanging basket (half visible) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PLANT_SIDE}
        alt=""
        aria-hidden
        className="pointer-events-none absolute z-0 hidden h-auto w-[calc(var(--prize-base)*698/491*1.22824)] scale-x-[-1] object-contain md:block"
        style={{
          top: "calc(var(--prize-base) * 530 / 491)",
          left: "calc(var(--prize-base) * -440 / 491)",
        }}
      />

      <h2
        className="font-darumadrop-one relative z-10 text-center leading-none tracking-wide text-[#4c321b]"
        style={{ fontSize: "calc(var(--prize-base) * 0.1955)" }}
      >
        PRIZES
      </h2>

      <div
        className="relative z-10 mt-4 flex w-full max-w-[1164px] flex-col"
        style={{ marginTop: "calc(var(--prize-base) * 0.12)" }}
      >
        {prizes.map((prize, i) => {
          const imageLeft = i % 2 === 0;
          const ribbonSrc = prize.ribbonRight ? RIBBON_SVG : RIBBON_SVG_ALT;
          const rowGap = //gap btwn prizes
            i === 0
              ? "0"
              : "calc(var(--prize-base) * 0.10)";
          const rowShiftClass = prize.ribbonRight // only shift on md+ screens
            ? "md:[transform:translateX(calc(var(--prize-base)*-0.28))]"
            : "md:[transform:translateX(calc(var(--prize-base)*0.28))]";

          return (
            <div
              key={i}
              className={`flex w-full items-center gap-[calc(var(--prize-base)*0.15)] ${imageLeft ? "justify-center" : "flex-row-reverse justify-center"} ${rowShiftClass}`}
              style={{ marginTop: rowGap }}
            >
              <div
                className="relative shrink-0"
                style={{
                  width: "var(--prize-base)",
                  height: "var(--prize-base)",
                }}
              >
                <Image
                  src={PRIZE_FRAME_SVG}
                  alt=""
                  fill
                  className="relative z-0 object-contain"
                  unoptimized
                />
                <div
                  className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                  style={{
                    width: "calc(var(--prize-base) * 0.78)",
                    height: "calc(var(--prize-base) * 0.78)",
                  }}
                >
                  <div
                    className="h-full w-full prize-sway"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <Image
                      src={prize.imageSrc}
                      alt={prize.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div
                className={`flex min-w-0 shrink-0 flex-col gap-[calc(var(--prize-base)*0.08)] ${imageLeft ? "items-start" : "items-end"}`}
              >
                <div
                  className="relative shrink-0"
                  style={{
                    width: "calc(var(--prize-base) * 0.8289 * 1.14)",
                    height: "calc(var(--prize-base) * 0.1365 * 1.14)",
                  }}
                >
                  <Image
                    src={ribbonSrc}
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                  <span
                    className="font-chilanka absolute inset-0 flex items-center justify-center whitespace-nowrap px-2 text-center leading-none text-[#4c321b] md:top-3 md:-left-12 top-1 -left-6"
                    style={{
                      fontSize: "calc(var(--prize-base) * 0.0733 * 1.14)",
                    }}
                  >
                    {prize.category}
                  </span>
                </div>

                <p
                  className={`${imageLeft ? "text-left" : "text-right"} font-darumadrop-one leading-[0.95] text-[#4c321b]`}
                  style={{
                    fontSize: "calc(var(--prize-base) * 0.1303 * 1.14)",
                    //long prize names wrap onto several lines
                    width: "calc(var(--prize-base) * 0.95)",
                    whiteSpace: "normal",
                    overflowWrap: "anywhere",
                  }}
                >
                  {prize.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
