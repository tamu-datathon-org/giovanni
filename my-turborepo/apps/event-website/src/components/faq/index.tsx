"use client";

import React, { useId, useState } from "react";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Image from "next/image";
interface FaqItem {
  question: string;
  answer: string;
}

const ITEMS: FaqItem[] = [
  {
    question: "What is TAMU Datathon Lite?",
    answer:
      "TD Lite is a smaller, more **beginner** friendly version of our main event. It's a **one-day event**, but it will have everything Datathon normally has including free food, swag, workshops, and prizes!",
  },
  {
    question: "Where is the event?",
    answer:
      "The event takes place at **Peterson**. Once you enter the building, organizers will be there to guide you to the main room! If you have any questions regarding transportation or parking, please **reach out to us on Discord.**",
  },
  {
    question: "Why should I come?",
    answer:
      "**It is completely free!** Learn Data Science with interactive challenges and prizes. If you struggle to start to learn, TDLite offers a **beginner-focused** space to compete in. We have mentors to help and **free swag/food.**",
  },
  {
    question: "How do I sign up?",
    answer:
      "Head over to https://tamudatathon.org/apply to get started! Admission decisions will be released shortly after registration closes.",
  },
  {
    question: "How much do I need to know?",
    answer:
      "If you are **new to data science**, TD Lite is the perfect time and place to learn. We will provide **introductory workshops and mentors** to guide you throughout the competition. We are committed to helping you build something you can be proud of!",
  },
  {
    question: "Who can attend?",
    answer:
      "TD Lite is open to **beginner students** currently enrolled at **Texas A&M** who are at least **18 years old**. We welcome students from all majors!",
  },
  {
    question: "What should I bring?",
    answer:
      "All you need is a **laptop and a charger** to get started at TD Lite! You may bring other items such as a pillow or a debugging duck if you wish to. Also make sure to **check the weather** in case you might need an umbrella :D.",
  },
  {
    question: "Have another question?",
    answer:
      "Send us an email at connect@tamudatathon.com or reach out to us on Discord!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idBase = useId();
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

  // Dynamic container max width - matches Prizes/Location
  const getContainerMaxWidth = () => {
    if (isMobile) return "96vw";
    if (isSmallTablet) return "680px";
    if (isMediumTablet) return "780px";
    if (isSmallDesktop) return "880px";
    if (isLargeDesktop) return "960px";
    return "1020px";
  };

  // Dynamic section padding
  const getSectionPadding = () => {
    if (isMobile) return { py: "80px" };
    if (isSmallTablet) return { py: "72px" };
    if (isMediumTablet) return { py: "80px" };
    if (isSmallDesktop) return { py: "88px" };
    return { py: "96px" };
  };

  // Dynamic outer card padding
  const getOuterCardPadding = () => {
    if (isMobile) return "16px";
    if (isSmallTablet) return "20px";
    if (isMediumTablet) return "24px";
    return "28px";
  };

  // Dynamic inner card padding
  const getInnerCardPadding = () => {
    if (isMobile) return { px: "12px", pt: "14px", pb: "24px" };
    if (isSmallTablet) return { px: "20px", pt: "16px", pb: "28px" };
    if (isMediumTablet) return { px: "24px", pt: "18px", pb: "32px" };
    return { px: "28px", pt: "20px", pb: "36px" };
  };

  // Dynamic title font size
  const getTitleFontSize = () => {
    if (isMobile) return "32px";
    if (isSmallTablet) return "40px";
    if (isMediumTablet) return "48px";
    if (isSmallDesktop) return "52px";
    return "56px";
  };

  // Dynamic subtitle font size
  const getSubtitleFontSize = () => {
    if (isMobile) return "14px";
    if (isSmallTablet) return "18px";
    if (isMediumTablet) return "20px";
    if (isSmallDesktop) return "22px";
    return "24px";
  };

  // Dynamic grid margin top
  const getGridMarginTop = () => {
    if (isMobile) return "36px";
    if (isSmallTablet) return "72px";
    if (isMediumTablet) return "84px";
    if (isSmallDesktop) return "96px";
    return "108px";
  };

  // Dynamic grid gaps
  const getGridGaps = () => {
    if (isMobile) return { x: "16px", y: "32px" };
    if (isSmallTablet) return { x: "20px", y: "56px" };
    if (isMediumTablet) return { x: "28px", y: "64px" };
    if (isSmallDesktop) return { x: "36px", y: "72px" };
    return { x: "44px", y: "80px" };
  };

  // Dynamic latte dimensions
  const getLatteDimensions = () => {
    if (isMobile) return { wrapperW: "120px", wrapperH: "160px", containerW: "180px", pt: "32px" };
    if (isSmallTablet) return { wrapperW: "160px", wrapperH: "220px", containerW: "280px", pt: "40px" };
    if (isMediumTablet) return { wrapperW: "175px", wrapperH: "240px", containerW: "310px", pt: "44px" };
    if (isSmallDesktop) return { wrapperW: "190px", wrapperH: "260px", containerW: "340px", pt: "48px" };
    return { wrapperW: "200px", wrapperH: "280px", containerW: "360px", pt: "52px" };
  };

  // Dynamic question text size
  const getQuestionFontSize = () => {
    if (isMobile) return "10px";
    if (isSmallTablet) return "16px";
    if (isMediumTablet) return "18px";
    if (isSmallDesktop) return "19px";
    return "20px";
  };

  // Dynamic answer text size
  const getAnswerFontSize = () => {
    if (isMobile) return "8px";
    if (isSmallTablet) return "11px";
    if (isMediumTablet) return "12px";
    return "13px";
  };

  // Dynamic answer container width
  const getAnswerWidth = () => {
    if (isMobile) return "38%";
    if (isSmallTablet) return "36%";
    return "35%";
  };

  // Dynamic vine 1 (top-left) styles
  const getVine1Styles = () => {
    if (isMobile) return { width: "130px", left: "-16px", top: "-80px", rotate: "-3deg" };
    if (isSmallTablet) return { width: "220px", left: "-28px", top: "-160px", rotate: "-3deg" };
    if (isMediumTablet) return { width: "260px", left: "-32px", top: "-190px", rotate: "-3deg" };
    if (isSmallDesktop) return { width: "290px", left: "-36px", top: "-210px", rotate: "-3deg" };
    return { width: "320px", left: "-40px", top: "-230px", rotate: "-3deg" };
  };

  // Dynamic vine 2 (top-right) styles
  const getVine2Styles = () => {
    if (isMobile) return { width: "200px", right: "-72px", top: "-40px", rotate: "-14deg" };
    if (isSmallTablet) return { width: "340px", right: "-160px", top: "-90px", rotate: "-14deg" };
    if (isMediumTablet) return { width: "400px", right: "-185px", top: "-105px", rotate: "-14deg" };
    if (isSmallDesktop) return { width: "450px", right: "-200px", top: "-115px", rotate: "-14deg" };
    return { width: "500px", right: "-210px", top: "-120px", rotate: "-14deg" };
  };

  // Dynamic button dimensions
  const getButtonDimensions = () => {
    if (isMobile) return "120px";
    if (isSmallTablet) return "160px";
    if (isMediumTablet) return "175px";
    if (isSmallDesktop) return "190px";
    return "200px";
  };

  // Prevent flash of unstyled content
  if (windowWidth === 0) {
    return (
      <section
        id="faq"
        aria-label="Frequently Asked Questions"
        className="flex min-h-[400px] items-center justify-center bg-[#f0cf91]"
      >
        <div className="animate-pulse text-2xl text-[#4c321b]">Loading...</div>
      </section>
    );
  }

  const sectionPadding = getSectionPadding();
  const innerCardPadding = getInnerCardPadding();
  const gridGaps = getGridGaps();
  const latteDims = getLatteDimensions();
  const vine1 = getVine1Styles();
  const vine2 = getVine2Styles();

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="relative z-30 w-full overflow-y-visible [overflow-x:clip] bg-[#f0cf91]"
      id="faq"
      style={{
        paddingTop: sectionPadding.py,
        paddingBottom: sectionPadding.py,
      }}
    >
      {/* outer container */}
      <div
        className="mx-auto px-4"
        style={{ maxWidth: getContainerMaxWidth() }}
      >
        <div
          className="relative overflow-visible rounded-3xl bg-[#966952]"
          style={{ padding: getOuterCardPadding() }}
        >
          {/* vine decorations */}
          <Image
            src="/images/faq/vines1.png"
            alt="Vines decoration"
            width={320}
            height={220}
            className="pointer-events-none absolute z-20 h-auto"
            style={{
              width: vine1.width,
              left: vine1.left,
              top: vine1.top,
              transform: `rotate(${vine1.rotate})`,
            }}
            priority
          />
          <Image
            src="/images/faq/vines2.png"
            alt="Vines decoration"
            width={320}
            height={220}
            className="pointer-events-none absolute z-20 h-auto"
            style={{
              width: vine2.width,
              right: vine2.right,
              top: vine2.top,
              transform: `rotate(${vine2.rotate})`,
            }}
            priority
          />

          {/* inner dark-brown rectangle */}
          <div
            className="relative rounded-2xl bg-[#4C321B]"
            style={{
              paddingLeft: innerCardPadding.px,
              paddingRight: innerCardPadding.px,
              paddingTop: innerCardPadding.pt,
              paddingBottom: innerCardPadding.pb,
            }}
          >
            {/* Transparent strip for vines overlap */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 sm:h-14" />

            {/* title and subtitle */}
            <div className="text-center">
              <h2
                className="font-darumadropone tracking-wide text-[#FFFFFF]"
                style={{ fontSize: getTitleFontSize() }}
              >
                FAQ
              </h2>
              <p
                className="mt-2 font-chilanka tracking-wide text-[#FFFFFF]/90"
                style={{ fontSize: getSubtitleFontSize() }}
              >
                Click on the lattes!
              </p>
            </div>

            {/* latte grid */}
            <div
              className="grid grid-cols-2 justify-items-center lg:grid-cols-4"
              style={{
                marginTop: getGridMarginTop(),
                columnGap: gridGaps.x,
                rowGap: gridGaps.y,
              }}
            >
              {ITEMS.map((it, i) => {
                const panelId = `${idBase}-faq-${i}`;
                return (
                  <div key={i}>
                    <LatteFaqItem
                      question={it.question}
                      answer={it.answer}
                      isOpen={openIndex === i}
                      panelId={panelId}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                      latteDims={latteDims}
                      questionFontSize={getQuestionFontSize()}
                      answerFontSize={getAnswerFontSize()}
                      answerWidth={getAnswerWidth()}
                      buttonWidth={getButtonDimensions()}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* screen indicator comment out in production */}
      {/* {process.env.NODE_ENV === "development" && (
        <p className="mt-4 text-center text-xs text-[#4c321b]/50">
          FAQ Base: {Math.round(baseUnit)}px | Width: {windowWidth}px
        </p>
      )} */}
    </section>
  );
}

interface LatteFaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  panelId: string;
  onToggle: () => void;
  latteDims: { wrapperW: string; wrapperH: string; containerW: string; pt: string };
  questionFontSize: string;
  answerFontSize: string;
  answerWidth: string;
  buttonWidth: string;
}

// Clickable links and **bold**/colored text inside answer strings
const renderAnswerContent = (text: string): React.ReactNode => {
  const linkPattern =
    /(https:\/\/tamudatathon\.org\/apply|connect@tamudatathon\.com)/g;
  const boldPattern = /(\*\*[^*]+\*\*)/g;

  const renderLinks = (content: string, keyPrefix: string) => {
    return content.split(linkPattern).map((part, index) => {
      if (part === "https://tamudatathon.org/apply") {
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-[#FAE19D] underline decoration-[#FAE19D] underline-offset-2"
          >
            {part}
          </a>
        );
      }
      if (part === "connect@tamudatathon.com") {
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href="mailto:connect@tamudatathon.com"
            className="text-[#FAE19D] underline decoration-[#FAE19D] underline-offset-2"
          >
            {part}
          </a>
        );
      }
      return <React.Fragment key={`${keyPrefix}-text-${index}`}>{part}</React.Fragment>;
    });
  };

  return text.split(boldPattern).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-[#FAE19D]">
          {renderLinks(boldText, `bold-${index}`)}
        </strong>
      );
    }
    return <React.Fragment key={index}>{renderLinks(part, `plain-${index}`)}</React.Fragment>;
  });
};

// React component, one latte
const LatteFaqItem: React.FC<LatteFaqItemProps> = ({
  question,
  answer,
  isOpen,
  panelId,
  onToggle,
  latteDims,
  questionFontSize,
  answerFontSize,
  answerWidth,
  buttonWidth,
}) => {
  const [mouseDownPos, setMouseDownPos] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!mouseDownPos) return;
    const distance = Math.sqrt(
      Math.pow(e.clientX - mouseDownPos.x, 2) +
        Math.pow(e.clientY - mouseDownPos.y, 2),
    );
    if (distance < 5) {
      onToggle();
    }
    setMouseDownPos(null);
  };

  return (
    <div
      className="group relative rounded-2xl font-chilanka"
      style={{
        width: latteDims.wrapperW,
        height: latteDims.wrapperH,
        paddingTop: latteDims.pt,
      }}
    >
      <div
        id={panelId}
        className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center transition-opacity duration-300 ease-out"
      >
        {/* question text above the latte */}
        <div className="pointer-events-none relative z-40 mb-2 w-full px-1 sm:mb-3">
          <div
            className="mx-auto text-center font-darumadropone leading-snug text-white"
            style={{ fontSize: questionFontSize }}
          >
            {question}
          </div>
        </div>

        {/* latte container and images */}
        <div
          className="relative aspect-[5/4]"
          style={{ width: latteDims.containerW }}
        >
          <div
            className={[
              "absolute left-1/2 top-[48%] z-20 -translate-x-1/2 -translate-y-1/2 text-center leading-snug text-[#F6E7D8]",
              "transition-opacity duration-300 ease-out",
              isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            style={{
              width: answerWidth,
              fontSize: answerFontSize,
            }}
          >
            <p
              className="cursor-text select-text whitespace-normal break-words [overflow-wrap:anywhere]"
              onMouseDown={(e) => {
                e.stopPropagation();
                setMouseDownPos(null);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderAnswerContent(answer)}
            </p>
          </div>

          {/* latte images */}
          <Image
            src="/images/faq/latte.png"
            alt="Latte cup"
            fill
            sizes="(max-width: 640px) 180px, 360px"
            className={[
              "pointer-events-none absolute inset-0 h-full w-full object-contain",
              "transition-opacity duration-300 ease-out",
              isOpen ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <Image
            src="/images/faq/latteoutline.png"
            alt="Latte outline"
            fill
            sizes="(max-width: 640px) 180px, 360px"
            className={[
              "pointer-events-none absolute inset-0 h-full w-full object-contain",
              "transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          {/* clickable button */}
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleClick}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B]"
            style={{ width: buttonWidth }}
          />
        </div>
      </div>
    </div>
  );
};