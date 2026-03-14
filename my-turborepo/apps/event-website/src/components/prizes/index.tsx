import Image from "next/image";

import "./prizes.css";

const PRIZE_FRAME_SVG = "/images/prizes/frame.svg";
const RIBBON_SVG = "/images/prizes/ribbon.svg";
const RIBBON_SVG_ALT = "/images/prizes/ribbon-alt.svg";
const PLANT_LEFT = "/images/prizes/plant-left.png";
const PLANT_RIGHT = "/images/prizes/plant-right.png";

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
      className="prizes-section relative flex flex-col items-center overflow-x-clip bg-[#f0cf91] px-4 py-8 sm:py-10 md:px-5 md:py-16 lg:px-6 xl:px-4"
      id="prizes"
    >
      <div className="prizes-section__vine-left" aria-hidden>
        <Image
          src={PLANT_LEFT}
          alt=""
          fill
          className="object-left object-contain"
          sizes="(max-width: 768px) 200px, 40vw"
        />
      </div>
      <div className="prizes-section__vine-right" aria-hidden>
        <Image
          src={PLANT_RIGHT}
          alt=""
          fill
          className="object-right object-contain"
          sizes="(max-width: 768px) 200px, 40vw"
        />
      </div>

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
