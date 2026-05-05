"use client";

import Image from "next/image";
import { useWindowWidth } from "@/hooks/useWindowWidth";

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
  const windowWidth = useWindowWidth();

  // Breakpoints - matching Prizes component
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const isSmallTablet = windowWidth >= 768 && windowWidth < 900;
  const isMediumTablet = windowWidth >= 900 && windowWidth < 1024;
  const isSmallDesktop = windowWidth >= 1024 && windowWidth < 1280;
  const isLargeDesktop = windowWidth >= 1280 && windowWidth < 1536;
  const isXLDesktop = windowWidth >= 1536;

  // Base unit for scaling - proportional to Prizes component
  const getBaseUnit = () => {
    if (isMobile) return Math.min(Math.max(140, windowWidth * 0.38), 280);
    if (isSmallTablet) return Math.min(Math.max(180, windowWidth * 0.26), 240);
    if (isMediumTablet) return Math.min(Math.max(200, windowWidth * 0.26), 280);
    if (isSmallDesktop) return Math.min(Math.max(240, windowWidth * 0.24), 320);
    if (isLargeDesktop) return Math.min(Math.max(280, windowWidth * 0.22), 360);
    return Math.min(Math.max(320, windowWidth * 0.2), 400);
  };

  const baseUnit = getBaseUnit();

  // Dynamic container max width - matches Prizes
  const getContainerWidth = () => {
    if (isMobile) return "96vw";
    if (isSmallTablet) return "680px";
    if (isMediumTablet) return "780px";
    if (isSmallDesktop) return "880px";
    if (isLargeDesktop) return "960px";
    return "1020px";
  };

  // Dynamic section padding
  const getSectionPadding = () => {
    if (isMobile) return { py: "24px" };
    if (isSmallTablet) return { py: "36px" };
    if (isMediumTablet) return { py: "44px" };
    if (isSmallDesktop) return { py: "52px" };
    return { py: "60px" };
  };

  // Dynamic card padding
  const getCardPadding = () => {
    if (isMobile) return { px: "12px", pt: "40px", pb: "100px" };
    if (isSmallTablet) return { px: "14px", pt: "44px", pb: "110px" };
    if (isMediumTablet) return { px: "16px", pt: "48px", pb: "120px" };
    if (isSmallDesktop) return { px: "16px", pt: "48px", pb: "130px" };
    return { px: "16px", pt: "48px", pb: "140px" };
  };

  // Dynamic panel height
  const getPanelHeight = () => {
    if (isMobile) return "60px";
    if (isSmallTablet) return "68px";
    if (isMediumTablet) return "74px";
    if (isSmallDesktop) return "80px";
    return "86px";
  };

  // Dynamic content margin top
  const getContentMarginTop = () => {
    if (isMobile) return "64px";
    if (isSmallTablet) return "72px";
    if (isMediumTablet) return "78px";
    if (isSmallDesktop) return "84px";
    return "90px";
  };

  // Dynamic content padding
  const getContentPadding = () => {
    if (isMobile) return "24px";
    if (isSmallTablet) return "32px";
    if (isMediumTablet) return "40px";
    if (isSmallDesktop) return "48px";
    return "56px";
  };

  // Dynamic title font size
  const getTitleFontSize = () => {
    if (isMobile) return "28px";
    if (isSmallTablet) return "30px";
    if (isMediumTablet) return "32px";
    if (isSmallDesktop) return "34px";
    return "36px";
  };

  // Dynamic heading size (DATE, LOCATION, etc.)
  const getHeadingSize = () => {
    if (isMobile) return "22px";
    if (isSmallTablet) return "24px";
    if (isMediumTablet) return "26px";
    if (isSmallDesktop) return "28px";
    return "30px";
  };

  // Dynamic text size
  const getTextSize = () => {
    if (isMobile) return "28px";
    if (isSmallTablet) return "28px";
    if (isMediumTablet) return "30px";
    if (isSmallDesktop) return "32px";
    return "34px";
  };

  // Dynamic small text size (parking info)
  const getSmallTextSize = () => {
    if (isMobile) return "24px";
    if (isSmallTablet) return "24px";
    if (isMediumTablet) return "26px";
    if (isSmallDesktop) return "28px";
    return "30px";
  };

  // Dynamic grid gap
  const getGridGap = () => {
    if (isMobile) return "16px";
    if (isSmallTablet) return "20px";
    if (isMediumTablet) return "24px";
    if (isSmallDesktop) return "28px";
    return "32px";
  };

  // Dynamic map height - scaled down significantly
  const getMapHeight = () => {
    if (isMobile) return "220px";
    if (isSmallTablet) return "240px";
    if (isMediumTablet) return "260px";
    if (isSmallDesktop) return "280px";
    if (isLargeDesktop) return "300px";
    return "320px";
  };

  // Dynamic title badge max width
  const getTitleBadgeMaxWidth = () => {
    if (isMobile) return "280px";
    if (isSmallTablet) return "300px";
    if (isMediumTablet) return "320px";
    if (isSmallDesktop) return "340px";
    return "360px";
  };

  // Dynamic plant sizes
  const getLeftPlantWidth = () => {
    if (isMobile) return "50%";
    if (isSmallTablet) return "40%";
    if (isMediumTablet) return "38%";
    return "36%";
  };

  const getRightPlantWidth = () => {
    if (isMobile) return "52%";
    if (isSmallTablet) return "42%";
    if (isMediumTablet) return "40%";
    return "38%";
  };

  const getBasketWidth = () => {
    if (isMobile) return "50%";
    if (isSmallTablet) return "52%";
    if (isMediumTablet) return "54%";
    return "56%";
  };

  const getBearWidth = () => {
    if (isMobile) return "32%";
    if (isSmallTablet) return "34%";
    if (isMediumTablet) return "36%";
    return "38%";
  };

  // Prevent flash of unstyled content
  if (windowWidth === 0) {
    return (
      <section
        id="location"
        aria-label="Event Info"
        className="flex min-h-[400px] items-center justify-center bg-[#f0cf91]"
      >
        <div className="animate-pulse text-2xl text-[#966952]">Loading...</div>
      </section>
    );
  }

  const sectionPadding = getSectionPadding();
  const cardPadding = getCardPadding();

  return (
    <section
      id="location"
      aria-label="Event Info"
      className="relative z-40 flex justify-center overflow-visible bg-[#f0cf91] px-2"
      style={{
        paddingTop: sectionPadding.py,
        paddingBottom: sectionPadding.py,
      }}
    >
      <div
        className="relative"
        style={{ width: getContainerWidth(), maxWidth: "96vw" }}
      >
        <div
          className="relative z-20 overflow-visible rounded-[18px] border-[3px] border-[#8d6e5e] bg-[#966952]"
          style={{
            paddingLeft: cardPadding.px,
            paddingRight: cardPadding.px,
            paddingTop: cardPadding.pt,
            paddingBottom: cardPadding.pb,
          }}
        >
          {/* Decorative plants */}
          <div
            className="pointer-events-none absolute z-30 aspect-[1640/2360]"
            style={{
              width: getLeftPlantWidth(),
              left: isMobile ? "-40px" : "-14%",
              top: isMobile ? "40px" : "-8%",
              transform: isMobile ? "translate(-25%, -25%)" : "translate(0, 0)",
            }}
          >
            <Image
              src={PLANT_LEFT}
              alt=""
              aria-hidden
              fill
              priority
              sizes="(max-width: 768px) 50vw, 360px"
              className="object-contain"
            />
          </div>
          <div
            className="pointer-events-none absolute z-30 aspect-[1640/2360]"
            style={{
              width: getRightPlantWidth(),
              right: isMobile ? "-40px" : "-16%",
              top: isMobile ? "40px" : "-10%",
              transform: isMobile ? "translate(25%, -25%)" : "translate(0, 0)",
            }}
          >
            <Image
              src={PLANT_RIGHT}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 52vw, 380px"
              className="object-contain"
            />
          </div>

          {/* Panel strip */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 z-20 grid grid-cols-10"
          >
            {locationPanels.map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ height: getPanelHeight() }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="block h-full w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div
            className="relative z-20"
            style={{
              marginTop: getContentMarginTop(),
              paddingLeft: getContentPadding(),
              paddingRight: getContentPadding(),
            }}
          >
            {/* Title badge */}
            <div
              className="mx-auto flex min-w-fit items-center justify-center rounded-[24px] border-[4px] border-[#401c0f] bg-[#663c26] p-[3px]"
              style={{
                width: "70%",
                maxWidth: getTitleBadgeMaxWidth(),
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[20px] border-[2px] border-[#966952] bg-[#663c26] p-2">
                <span
                  className="font-darumadrop-one leading-none text-[#fae19d]"
                  style={{ fontSize: getTitleFontSize() }}
                >
                  EVENT INFO
                </span>
              </div>
            </div>

            {/* Info grid */}
            <div
              className="grid md:grid-cols-2"
              style={{
                marginTop: isMobile ? "20px" : "28px",
                gap: getGridGap(),
              }}
            >
              <div className="grid gap-3">
                {/* Date */}
                <div className="grid gap-1">
                  <div
                    className="font-darumadrop-one leading-none text-[#fae19d]"
                    style={{ fontSize: getHeadingSize() }}
                  >
                    DATE
                  </div>
                  <div
                    className="font-chilanka leading-tight text-[#fae19d]"
                    style={{ fontSize: getTextSize() }}
                  >
                    April 11th 2026
                  </div>
                  <div
                    className="font-chilanka leading-tight text-[#fae19d]"
                    style={{ fontSize: getTextSize() }}
                  >
                    9:00 AM - 5:00 PM
                  </div>
                </div>

                {/* Location */}
                <div className="grid gap-1">
                  <div
                    className="font-darumadrop-one leading-none text-[#fae19d]"
                    style={{ fontSize: getHeadingSize() }}
                  >
                    LOCATION
                  </div>
                  <div
                    className="font-chilanka leading-tight text-[#fae19d]"
                    style={{ fontSize: getTextSize() }}
                  >
                    Peterson (118)
                  </div>
                </div>

                {/* Parking */}
                <div className="grid gap-1">
                  <div
                    className="font-darumadrop-one leading-none text-[#fae19d]"
                    style={{ fontSize: getHeadingSize() }}
                  >
                    PARKING
                  </div>
                  <div
                    className="font-chilanka leading-tight text-[#fae19d]"
                    style={{ fontSize: getSmallTextSize() }}
                  >
                    <span className="italic">Lot 54, Lot 55 (Free)</span>
                    <br />
                    <span className="italic">Central Parking Garage (Paid)</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="grid gap-2 self-start">
                <div
                  className="font-darumadrop-one leading-none text-[#fae19d]"
                  style={{ fontSize: getHeadingSize() }}
                >
                  MAP
                </div>
                <div className="overflow-hidden rounded-[10px] border-[3px] border-[rgba(250,225,157,0.35)]">
                  <iframe
                    title="Texas A&M campus map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Peterson%20Building%20Texas%20A%26M%20University&output=embed"
                    className="block w-full border-0"
                    style={{ height: getMapHeight() }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Under-panel decorative elements */}
        <div
          className="pointer-events-none absolute z-0 aspect-[1640/2360] sm:z-10"
          style={{
            width: getBasketWidth(),
            right: isMobile ? "-17%" : "-22%",
            top: isMobile ? "93%" : "78%",
          }}
        >
          <Image
            src={LOCATION_BASKET}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 50vw, 500px"
            className="object-contain"
          />
        </div>
        <div
          className="pointer-events-none absolute z-30 aspect-[2388/1668]"
          style={{
            width: getBearWidth(),
            left: isMobile ? "-6%" : "-10%",
            top: isMobile ? "66%" : "70%",
          }}
        >
          <Image
            src="/images/location/bear.png"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 35vw, 360px"
            className="object-contain"
          />
        </div>
      </div>

      {/* comment out for production */}
      {/* {process.env.NODE_ENV === "development" && (
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[#4c321b]/50">
          Location Base: {Math.round(baseUnit)}px | Width: {windowWidth}px
        </p>
      )} */}
    </section>
  );
}