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
  LOCATION_PANEL_BLUE,
  LOCATION_PANEL_GREEN,
];

export default function Location() {
  return (
    <section
      id="location"
      aria-label="Event Info"
      className="relative z-40 flex justify-center overflow-x-clip overflow-y-visible bg-[#f0cf91] px-2 py-6 md:py-12"
    >
      <div className="relative w-[min(96vw,980px)] max-w-full overflow-visible">
        <div className="relative z-20 overflow-visible rounded-[18px] border-[3px] border-[#8d6e5e] bg-[#966952] px-3 pb-28 pt-10 sm:px-4 sm:pb-32 md:pb-44 md:pt-12">
          {/* Decorative plants stay behind content; anchored to the rounded card */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PLANT_LEFT}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-10 top-10 z-30 h-auto w-[55%] -translate-x-1/4 -translate-y-1/4 object-contain sm:left-[-16%] sm:top-[-9%] sm:w-[44%] sm:translate-x-0 sm:translate-y-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PLANT_RIGHT}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-10 top-10 z-30 h-auto w-[58%] -translate-y-1/4 translate-x-1/4 object-contain sm:right-[-18%] sm:top-[-11%] sm:w-[45%] sm:translate-x-0 sm:translate-y-0"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-[-2%] top-0 z-20 flex w-[104%] overflow-visible"
          >
            {locationPanels.map((src, i) => (
              <div
                key={i}
                className="flex min-w-0 w-1/10 h-[70px] items-center justify-center sm:h-[86px] md:h-[96px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="block h-full w-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="relative z-20 mt-[72px] px-8 sm:mt-[86px] sm:px-12 md:mt-[96px] md:px-16">
            <div className="mx-auto flex min-w-fit w-[70%] max-w-[420px] items-center justify-center rounded-[30px] border-[5px] border-[#401c0f] bg-[#663c26] p-[4px]">
              <div className="flex h-full w-full items-center justify-center rounded-[24px] border-[3px] border-[#966952] bg-[#663c26] p-2">
                <span className="font-darumadrop-one text-[34px] leading-none text-[#fae19d] sm:text-[40px]">
                  EVENT INFO
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 md:gap-8">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">
                    DATE
                  </div>
                  <div className="font-chilanka text-[40px] leading-tight text-[#fae19d] sm:text-[46px]">
                    April 11th 2026
                  </div>
                  <div className="font-chilanka text-[40px] leading-tight text-[#fae19d] sm:text-[46px]">
                    9:00 AM - 5:00 PM
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">
                    LOCATION
                  </div>
                  <div className="font-chilanka text-[40px] leading-tight text-[#fae19d] sm:text-[46px]">
                    Peterson
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">
                    PARKING
                  </div>
                  <div className="font-chilanka text-[36px] leading-tight text-[#fae19d] sm:text-[42px]">
                    Closest parking garage:{" "}
                    <span className="italic">Central Parking Garage</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 self-start">
                <div className="font-darumadrop-one text-[28px] leading-none text-[#fae19d] sm:text-[34px]">
                  MAP
                </div>
                <div className="overflow-hidden rounded-[12px] border-4 border-[rgba(250,225,157,0.35)]">
                  <iframe
                    title="Texas A&M campus map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Peterson%20Building%20Texas%20A%26M%20University&output=embed"
                    className="block h-[280px] w-full border-0 sm:h-[320px] md:h-[460px]"
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
          className="pointer-events-none absolute -right-[6%] top-[86%] z-30 h-auto w-[42%] object-contain sm:-right-[11%] sm:top-[90%] sm:z-10 sm:w-[34%]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/location/bear.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-[6%] top-[64%] z-30 h-auto w-[35%] object-contain sm:-left-[11%] sm:top-[69%] sm:w-[40%]"
        />
      </div>
    </section>
  );
}
