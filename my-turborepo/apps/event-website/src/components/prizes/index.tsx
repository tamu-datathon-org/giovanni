import Image from "next/image";

const PRIZE_FRAME_SVG = "/images/prizes/frame.svg";
const RIBBON_SVG = "/images/prizes/ribbon.svg";
const RIBBON_SVG_ALT = "/images/prizes/ribbon-alt.svg";
const PLANT_SIDE = "/images/prizes/plant-side.png";

const prizes = [
  { category: "Best Challenge", name: "PRIZE NAME HERE", ribbonRight: true },
  { category: "Best Challenge", name: "PRIZE NAME HERE", ribbonRight: false },
  { category: "Best Challenge", name: "PRIZE NAME HERE", ribbonRight: true },
  { category: "Best Challenge", name: "PRIZE NAME HERE", ribbonRight: false },
];

export default function Prizes() {
  const base = "clamp(105px, 26vw, 440px)";

  // Alternating left/right shift so each pair steps outward like Figma
  

  return (
    <section
      id="prizes"
      aria-label="Prizes"
      className="relative z-10 flex flex-col items-center overflow-visible bg-[#f0cf91] px-1 py-8 sm:py-10 md:px-2 md:py-14 [--prize-scale:1] max-[767px]:[--prize-scale:0.98] [--prize-zig-shift:0.35] max-[767px]:[--prize-zig-shift:0.28] [--basket-left-m:-0.621] max-[767px]:[--basket-left-m:-0.59]"
      style={{
        ["--prize-base" as string]: `calc(${base} * var(--prize-scale))`, 
      }}
    >


      {/* Bottom-left hanging basket (half visible) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PLANT_SIDE}
        alt=""
        aria-hidden
        className="pointer-events-none absolute z-0 h-auto w-[calc(var(--prize-base)*698/491*0.85)] scale-x-[-1] object-contain"
        style={{ top: "calc(var(--prize-base) * 700 / 491)", left: "calc(var(--prize-base) * var(--basket-left-m))" }}
      />

      <h2
        className="relative z-10 text-center font-darumadrop-one leading-none tracking-wide text-[#4c321b]"
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
          const rowGap = i === 0 ? "0" : i === 2 ? "calc(var(--prize-base) * 0.05)" : "calc(var(--prize-base) * 0.05)";

          return (
            <div
              key={i}
              className={`flex w-full items-center gap-[calc(var(--prize-base)*0.15)] ${imageLeft ? "justify-center" : "flex-row-reverse justify-center"}`}
              style={{
                marginTop: rowGap,
                transform: `translateX(calc(var(--prize-base) * ${imageLeft ? -1 : 1} * var(--prize-zig-shift)))`,
              }}
            >
              <div
                className="relative shrink-0"
                style={{ width: "var(--prize-base)", height: "var(--prize-base)" }}
              >
                <Image src={PRIZE_FRAME_SVG} alt="" fill className="object-contain" unoptimized />
              </div>

              <div className={`flex min-w-0 shrink-0 flex-col gap-[calc(var(--prize-base)*0.08)] ${imageLeft ? "items-start" : "items-end"}`}>
                <div
                  className="relative shrink-0"
                  style={{
                    width: "calc(var(--prize-base) * 0.8289 * 1.14)",
                    height: "calc(var(--prize-base) * 0.1365 * 1.14)",
                  }}
                >
                  <Image src={ribbonSrc} alt="" fill className="object-contain" unoptimized />
                  <span
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-2 text-center font-chilanka leading-none text-[#4c321b]"
                    style={{ fontSize: "calc(var(--prize-base) * 0.0733 * 1.14)" }}
                  >
                    {prize.category}
                  </span>
                </div>

                <p
                  className={`${imageLeft ? "text-left" : "text-right"} font-darumadrop-one leading-[0.95] text-[#4c321b]`}
                  style={{ fontSize: "calc(var(--prize-base) * 0.1303 * 1.14)" }}
                >
                  PRIZE NAME
                  <br />
                  HERE
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
