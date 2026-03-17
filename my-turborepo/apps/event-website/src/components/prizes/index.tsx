import Image from "next/image";

import "./prizes.css";

const PRIZE_FRAME_SVG = "/images/prizes/frame.svg";
const RIBBON_SVG = "/images/prizes/ribbon.svg";
const RIBBON_SVG_ALT = "/images/prizes/ribbon-alt.svg";
const PLANT_SIDE = "/images/prizes/plant-side.png";

const prizes = [
  {
    category: "Best Challenge",
    name: "PRIZE NAME HERE",
    showRibbon: true,
    ribbonRight: true,
  },
  {
    category: "Best Challenge",
    name: "PRIZE NAME HERE",
    showRibbon: true,
    ribbonRight: false,
  },
  {
    category: "Best Challenge",
    name: "PRIZE NAME HERE",
    showRibbon: true,
    ribbonRight: true,
  },
  {
    category: "Best Challenge",
    name: "PRIZE NAME HERE",
    showRibbon: true,
    ribbonRight: false,
  },
];

export default function Prizes() {
  return (
    <section
      aria-label="Prizes"
      className="prizes-section relative flex flex-col items-center overflow-x-clip bg-[#f0cf91] px-1 py-8 sm:py-10 md:px-2 md:py-16 lg:px-2 xl:px-2"
      id="prizes"
    >
      {/* Right plant: hangs from above section, right side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PLANT_SIDE}
        alt=""
        className="prizes-section__plant-right"
        aria-hidden
      />
      {/* Left plant: lower in section, left side, mirrored */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PLANT_SIDE}
        alt=""
        className="prizes-section__plant-left"
        aria-hidden
      />

      <h2 className="prizes-section__title relative z-10 font-darumadrop-one text-center text-[#4c321b] font-normal leading-none tracking-wide">
        PRIZES
      </h2>

      <div className="prizes-section__content relative z-10 mx-auto w-full flex flex-col">
        {prizes.map((prize, i) => {
          const imageLeft = i % 2 === 0;
          const ribbonSrc = prize.ribbonRight ? RIBBON_SVG : RIBBON_SVG_ALT;
          return (
            <div
              key={i}
              data-row={i + 1}
              className={`prizes-section__row ${imageLeft ? "prizes-section__row--image-left" : "prizes-section__row--image-right"}`}
            >
              <div className="prizes-section__plate">
                <Image
                  src={PRIZE_FRAME_SVG}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 767px) 160px, 307px"
                  unoptimized
                />
              </div>

              <div className="prizes-section__copy">
                {prize.showRibbon && (
                  <div className="prizes-section__ribbon">
                    <Image
                      src={ribbonSrc}
                      alt=""
                      fill
                      className="object-contain object-left"
                      sizes="(max-width: 767px) 160px, 254px"
                      unoptimized
                    />
                    <span className="prizes-section__ribbon-label font-chilanka font-normal text-[#4c321b]">
                      {prize.category}
                    </span>
                  </div>
                )}
                <p className="prizes-section__prize-name font-darumadrop-one text-left font-normal leading-tight text-[#4c321b]">
                  {(() => {
                    const lastSpace = prize.name.lastIndexOf(" ");
                    const line1 = lastSpace >= 0 ? prize.name.slice(0, lastSpace) : prize.name;
                    const line2 = lastSpace >= 0 ? prize.name.slice(lastSpace + 1) : "";
                    return line2 ? (
                      <>
                        {line1}
                        <br />
                        {line2}
                      </>
                    ) : (
                      line1
                    );
                  })()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
