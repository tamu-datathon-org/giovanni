"use client";

const PLANT_LEFT = "/images/location/plant-left.png";
const PLANT_RIGHT = "/images/location/plant-right.png";
const LOCATION_BASKET = "/images/prizes/plant-side.png";

const LOCATION_PANEL_BLUE = "/images/location/location-panel-blue.svg";
const LOCATION_PANEL_GREEN = "/images/location/location-panel-green.svg";
const locationPanels = [
  LOCATION_PANEL_BLUE,
  LOCATION_PANEL_GREEN,
  LOCATION_PANEL_BLUE,
  LOCATION_PANEL_GREEN,
  LOCATION_PANEL_BLUE,
  LOCATION_PANEL_GREEN,
  LOCATION_PANEL_BLUE,
  LOCATION_PANEL_GREEN,
];

export default function Location() {
  return (
    <section id="location" aria-label="Event Info" className="relative z-20 flex justify-center overflow-visible bg-[#f0cf91] px-2 py-6 md:py-10">
      <div className="relative w-[min(96vw,980px)]">
        {/* Decorative plants stay behind content */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLANT_LEFT}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[-16%] top-[-9%] z-40 h-auto w-[44%] object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLANT_RIGHT}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-18%] top-[-11%] z-40 h-auto w-[45%] object-contain"
        />

        <div className="relative z-20 overflow-visible rounded-[18px] border-[6px] border-[#8d6e5e] bg-[#966952] px-3 pb-28 pt-10 sm:px-4 sm:pb-32 md:pb-44 md:pt-12">
          <div aria-hidden className="pointer-events-none absolute left-[-2%] top-0 z-30 flex w-[104%]">
            {locationPanels.map((src, i) => (
              <div key={i} className="h-[70px] w-1/8 sm:h-[86px] md:h-[96px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="block h-full w-full object-contain" />
              </div>
            ))}
          </div>

          <div className="relative z-20 mt-[72px] px-8 sm:mt-[86px] sm:px-12 md:mt-[96px] md:px-16">
            <div className="mx-auto flex w-[70%] max-w-[420px] items-center justify-center rounded-[30px] border-[5px] border-[#401c0f] bg-[#663c26] p-[4px]">
              <div className="flex h-full w-full items-center justify-center rounded-[24px] border-[3px] border-[#966952] bg-[#663c26] py-2">
                <span className="font-darumadrop-one text-[34px] leading-none text-[#fae19d] sm:text-[40px]">EVENT INFO</span>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 md:gap-8">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">DATE</div>
                  <div className="font-chilanka text-[40px] leading-tight text-[#fae19d] sm:text-[46px]">April 11th 2026</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">LOCATION</div>
                  <div className="font-chilanka text-[40px] leading-tight text-[#fae19d] sm:text-[46px]">Peterson</div>
                </div>
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">PARKING</div>
                  <div className="font-chilanka text-[36px] leading-tight text-[#fae19d] sm:text-[42px]">
                    Closest parking garage: <span className="italic">(update name here)</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 self-start">
                <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">MAP</div>
                <div className="overflow-hidden rounded-[12px] border-4 border-[rgba(250,225,157,0.35)]">
                  <iframe
                    title="Texas A&M campus map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Peterson%20Building%20Texas%20A%26M%20University&output=embed"
                    className="block h-[280px] w-full border-0 sm:h-[320px] md:h-[360px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Under-panel decorative elements */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOCATION_BASKET}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-[11%] top-[90%] z-10 h-auto w-[34%] object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/location/bear.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-[11%] top-[69%] z-30 h-auto w-[40%] object-contain"
        />
      </div>
    </section>
  );
}
