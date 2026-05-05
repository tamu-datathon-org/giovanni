"use client";

import Image from "next/image";
import { useWindowWidth } from "@/hooks/useWindowWidth";

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
  const windowWidth = useWindowWidth();

  // Breakpoints
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const isSmallTablet = windowWidth >= 768 && windowWidth < 900;
  const isMediumTablet = windowWidth >= 900 && windowWidth < 1024;
  const isSmallDesktop = windowWidth >= 1024 && windowWidth < 1280;
  const isLargeDesktop = windowWidth >= 1280 && windowWidth < 1536;
  const isXLDesktop = windowWidth >= 1536;

  // Dynamic prize base size - mobile stays same, desktop increased
  const getPrizeBase = () => {
    if (isMobile) return Math.min(Math.max(140, windowWidth * 0.38), 280);
    if (isSmallTablet) return Math.min(Math.max(180, windowWidth * 0.26), 240);
    if (isMediumTablet) return Math.min(Math.max(200, windowWidth * 0.26), 280);
    if (isSmallDesktop) return Math.min(Math.max(240, windowWidth * 0.24), 320);
    if (isLargeDesktop) return Math.min(Math.max(280, windowWidth * 0.22), 360);
    return Math.min(Math.max(320, windowWidth * 0.2), 400); // XL desktop
  };

  const prizeBase = getPrizeBase();

  // Dynamic heading size
  const getHeadingSize = () => {
    if (isMobile) return prizeBase * 0.24;
    if (isSmallTablet) return prizeBase * 0.22;
    if (isMediumTablet) return prizeBase * 0.2;
    if (isSmallDesktop) return prizeBase * 0.18;
    return prizeBase * 0.16;
  };

  // Dynamic padding
  const getPadding = () => {
    if (isMobile) return { px: "0px", pt: "28px", pb: "12px" };
    if (isSmallTablet) return { px: "4px", pt: "48px", pb: "28px" };
    if (isMediumTablet) return { px: "6px", pt: "56px", pb: "32px" };
    if (isSmallDesktop) return { px: "8px", pt: "64px", pb: "40px" };
    if (isLargeDesktop) return { px: "8px", pt: "72px", pb: "48px" };
    return { px: "8px", pt: "80px", pb: "56px" };
  };

  // Dynamic row shift amount
  const getRowShift = () => {
    if (isMobile) return 0;
    if (isSmallTablet) return prizeBase * 0.2;
    if (isMediumTablet) return prizeBase * 0.24;
    if (isSmallDesktop) return prizeBase * 0.28;
    if (isLargeDesktop) return prizeBase * 0.32;
    return prizeBase * 0.35;
  };

  // Dynamic gap between prize and text
  const getPrizeGap = () => {
    if (isMobile) return prizeBase * 0.08;
    if (isSmallTablet) return prizeBase * 0.12;
    if (isMediumTablet) return prizeBase * 0.14;
    return prizeBase * 0.16;
  };

  // Dynamic row gap between prizes
  const getRowGap = () => {
    if (isMobile) return prizeBase * 0.06;
    if (isSmallTablet) return prizeBase * 0.08;
    if (isMediumTablet) return prizeBase * 0.1;
    return prizeBase * 0.12;
  };

  // Dynamic ribbon sizing
  const getRibbonScale = () => {
    if (isMobile) return 1.0;
    if (isSmallTablet) return 1.08;
    if (isMediumTablet) return 1.12;
    if (isSmallDesktop) return 1.15;
    return 1.18;
  };

  // Dynamic ribbon text offset
  const getRibbonOffset = () => {
    if (isMobile) return { top: "2px", left: "-20px" };
    if (isSmallTablet) return { top: "6px", left: "-32px" };
    if (isMediumTablet) return { top: "8px", left: "-40px" };
    if (isSmallDesktop) return { top: "10px", left: "-48px" };
    if (isLargeDesktop) return { top: "12px", left: "-52px" };
    return { top: "14px", left: "-56px" };
  };

  // Dynamic prize name width
  const getPrizeNameWidth = () => {
    if (isMobile) return prizeBase * 0.9;
    if (isSmallTablet) return prizeBase * 1.0;
    if (isMediumTablet) return prizeBase * 1.05;
    return prizeBase * 1.1;
  };

  // Dynamic font size multipliers
  const getCategoryFontSize = () => {
    const baseSize = prizeBase * 0.0733;
    if (isMobile) return baseSize * 1.1;
    if (isSmallTablet) return baseSize * 1.2;
    if (isMediumTablet) return baseSize * 1.25;
    return baseSize * 1.3;
  };

  const getPrizeNameFontSize = () => {
    const baseSize = prizeBase * 0.1303;
    if (isMobile) return baseSize * 1.05;
    if (isSmallTablet) return baseSize * 1.15;
    if (isMediumTablet) return baseSize * 1.2;
    return baseSize * 1.25;
  };

  // Dynamic plant positioning
  const getPlantStyles = () => {
    const scaleFactor = isMobile ? 0 : isSmallTablet ? 0.9 : isMediumTablet ? 1.0 : isSmallDesktop ? 1.1 : isLargeDesktop ? 1.2 : 1.3;
    const plantWidth = prizeBase * (698 / 491) * scaleFactor;
    const plantTop = prizeBase * (530 / 491) * scaleFactor * 0.85;
    const plantLeft = prizeBase * (-440 / 491) * scaleFactor * 0.8;

    return {
      width: `${plantWidth}px`,
      top: `${plantTop}px`,
      left: `${plantLeft}px`,
    };
  };

  // Dynamic max width for container
  const getMaxWidth = () => {
    if (isMobile) return "100%";
    if (isSmallTablet) return "720px";
    if (isMediumTablet) return "850px";
    if (isSmallDesktop) return "980px";
    if (isLargeDesktop) return "1100px";
    return "1200px";
  };

  // Prevent flash of unstyled content
  if (windowWidth === 0) {
    return (
      <section
        id="prizes"
        aria-label="Prizes"
        className="flex min-h-[400px] items-center justify-center bg-[#f0cf91]"
      >
        <div className="animate-pulse text-2xl text-[#4c321b]">Loading...</div>
      </section>
    );
  }

  const padding = getPadding();
  const rowShift = getRowShift();
  const ribbonOffset = getRibbonOffset();
  const ribbonScale = getRibbonScale();
  const plantStyles = getPlantStyles();

  return (
    <section
      id="prizes"
      aria-label="Prizes"
      className="relative z-10 flex flex-col items-center overflow-visible bg-[#f0cf91]"
      style={{
        paddingLeft: padding.px,
        paddingRight: padding.px,
        paddingTop: padding.pt,
        paddingBottom: padding.pb,
      }}
    >
      {/* Bottom-left hanging basket (half visible) */}
      {!isMobile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={PLANT_SIDE}
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-0 h-auto scale-x-[-1] object-contain"
          style={plantStyles}
        />
      )}

      <h2
        className="font-darumadrop-one relative z-10 text-center leading-none tracking-wide text-[#4c321b]"
        style={{ fontSize: `${getHeadingSize()}px` }}
      >
        PRIZES
      </h2>

      <div
        className="relative z-10 flex w-full flex-col items-center"
        style={{
          marginTop: `${prizeBase * 0.1}px`,
          maxWidth: getMaxWidth(),
        }}
      >
        {prizes.map((prize, i) => {
          const imageLeft = i % 2 === 0;
          const ribbonSrc = prize.ribbonRight ? RIBBON_SVG : RIBBON_SVG_ALT;
          const rowGap = i === 0 ? 0 : getRowGap();

          // Calculate row shift
          const translateX = isMobile
            ? 0
            : prize.ribbonRight
              ? -rowShift
              : rowShift;

          return (
            <div
              key={i}
              className={`flex w-full items-center ${imageLeft ? "justify-center" : "flex-row-reverse justify-center"}`}
              style={{
                marginTop: `${rowGap}px`,
                gap: `${getPrizeGap()}px`,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {/* Prize frame with image */}
              <div
                className="relative shrink-0"
                style={{
                  width: `${prizeBase}px`,
                  height: `${prizeBase}px`,
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
                    width: `${prizeBase * 0.78}px`,
                    height: `${prizeBase * 0.78}px`,
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

              {/* Prize info */}
              <div
                className={`flex min-w-0 shrink-0 flex-col ${imageLeft ? "items-start" : "items-end"}`}
                style={{ gap: `${prizeBase * 0.06}px` }}
              >
                {/* Ribbon with category */}
                <div
                  className="relative shrink-0"
                  style={{
                    width: `${prizeBase * 0.8289 * ribbonScale}px`,
                    height: `${prizeBase * 0.1365 * ribbonScale}px`,
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
                    className="font-chilanka absolute inset-0 flex items-center justify-center whitespace-nowrap px-2 text-center leading-none text-[#4c321b]"
                    style={{
                      fontSize: `${getCategoryFontSize()}px`,
                      top: ribbonOffset.top,
                      left: ribbonOffset.left,
                    }}
                  >
                    {prize.category}
                  </span>
                </div>

                {/* Prize name */}
                <p
                  className={`${imageLeft ? "text-left" : "text-right"} font-darumadrop-one leading-[0.95] text-[#4c321b]`}
                  style={{
                    fontSize: `${getPrizeNameFontSize()}px`,
                    width: `${getPrizeNameWidth()}px`,
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

      {/* comment out for production */}
      {/* {process.env.NODE_ENV === "development" && (
        <p className="mt-4 text-xs text-[#4c321b]/50">
          Prize Base: {Math.round(prizeBase)}px | Width: {windowWidth}px |
          {isMobile
            ? " 📱 Mobile"
            : isSmallTablet
              ? " 📟 Small Tablet"
              : isMediumTablet
                ? " 📟 Medium Tablet"
                : isSmallDesktop
                  ? " 💻 Small Desktop"
                  : isLargeDesktop
                    ? " 🖥️ Large Desktop"
                    : " 🖥️ XL Desktop"}
        </p>
      )} */}
    </section>
  );
}