
"use client";

import Image from "next/image";
import React, { useId, useState } from "react";

interface FaqItem { question: string; answer: string }

const ITEMS: FaqItem[] = [
  { question: "What is TAMU Datathon Lite?", answer: "TD Lite is a smaller, more **beginner** friendly version of our main event. It's a **one-day event**, but it will have everything Datathon normally has including free food, swag, workshops, and prizes!" },
  { question: "Where is the event?", answer: "The event takes place at **Peterson**. Once you enter the building, organizers will be there to guide you to the main room! If you have any questions regarding transportation or parking, please **reach out to us on Discord.**" },
  { question: "Why should I come?", answer: "**It is completely free!** Learn Data Science with interactive challenges and prizes. If you struggle to start to learn, TDLite offers a **beginner-focused** space to compete in. We have mentors to help and **free swag/food.**" },
  { question: "How do I sign up?", answer: "Head over to https://tamudatathon.org/apply to get started! Admission decisions will be released shortly after registration closes." },
  { question: "How much do I need to know?", answer: "If you are **new to data science**, TD Lite is the perfect time and place to learn. We will provide **introductory workshops and mentors** to guide you throughout the competition. We are committed to helping you build something you can be proud of!" },
  { question: "Who can attend?", answer: "TD Lite is open to **beginner students** currently enrolled at **Texas A&M** who are at least **18 years old**. We welcome students from all majors!" },
  { question: "What should I bring?", answer: "All you need is a **laptop and a charger** to get started at TD Lite! You may bring other items such as a pillow or a debugging duck if you wish to. Also make sure to **check the weather** in case you might need an umbrella :D." },
  { question: "Have another question?", answer: "Send us an email at connect@tamudatathon.com or reach out to us on Discord!" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idBase = useId();

  return (
    <section
      aria-label="Frequently Asked Questions"
      //clipping/overflow happens here, might need to change in future depending on other components
      className="relative z-30 w-full overflow-y-visible [overflow-x:clip] bg-[#FAE19D] py-32 sm:py-24" //yellow background/outer faq container
      id="faq"
    >
      {/* outer brown rec section size*/}
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="relative overflow-visible rounded-3xl bg-[#966952] p-5 sm:p-8">
          {/* vine decorations*/}
          <Image
            src="/images/faq/vines1.png"
            alt="Vines decoration"
            width={320}
            height={220}
            //top left vine styling
            className="pointer-events-none absolute -left-[20px] -top-[100px] z-20 h-auto w-[160px] sm:w-[330px] sm:-left-10 sm:-top-[242px] lg:w-[370px] -rotate-3"
            priority
          />
          <Image
            src="/images/faq/vines2.png"
            alt="Vines decoration"
            width={320}
            height={220}
            //top right vine styling
            //className="pointer-events-none absolute -right-[220px] -top-[124px] z-20 h-auto w-[400px] sm:w-[460px] lg:w-[540px] -rotate-[14deg]"
            className="pointer-events-none absolute -right-[92px] -top-[50px] z-20 h-auto w-[250px] sm:w-[460px] sm:-right-[220px] sm:-top-[124px] lg:w-[540px] -rotate-[14deg]"
            priority
          />

          {/* inner dark-brown rectangle */}
          <div className="relative rounded-2xl bg-[#4C321B] px-4 pb-8 pt-4 sm:px-8 sm:pb-10 sm:pt-5">
            {/* Transparent strip to allow vines to visually overlap into the inner rectangle */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 sm:h-16" />

            {/* title and subtitle */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-darumadropone tracking-wide text-[#FFFFFF]">
                FAQ
              </h2>
              <p className="mt-2 text-base font-chilanka tracking-wide text-[#FFFFFF]/90 sm:text-3xl">
                Click on the lattes!
              </p>
            </div>

            {/* 3x3 grid lattes */}
            {/* to change space btwn subtitle and grid, change mt-[152px] */}
            {/* to change padding for grid, change gap-y-20 */}
            <div className="mt-[48px] grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:mt-[132px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-24 lg:grid-cols-4 lg:gap-x-12">
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
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface LatteFaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  panelId: string;
  onToggle: () => void;
}




//clickable links and **bold**/colored text inside answer strings
const renderAnswerContent = (text: string): React.ReactNode => {
  const linkPattern = /(https:\/\/tamudatathon\.org\/apply|connect@tamudatathon\.com)/g;
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

  //allows for bolding in the answer text, wrap with **hi**
  return text.split(boldPattern).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);

      return (
        <strong
          key={index}
          className="font-bold text-[#FAE19D]"
        >
          {renderLinks(boldText, `bold-${index}`)}
        </strong>
      );
    }

    return <React.Fragment key={index}>{renderLinks(part, `plain-${index}`)}</React.Fragment>;
  });
};
 



//react component, one latte
const LatteFaqItem: React.FC<LatteFaqItemProps> = ({
  question, //faq question
  answer, //answer behind the latte
  isOpen, //whether the latte is open or not
  panelId, //id for accessibility
  onToggle, //on click
}) => {
  

  /*
  Highlight text under latte functionality:
  tracks if mouse is dragging (highlighting) or clicking. 
  if clicking, then just close the latte. 
  if dragging, then allow user to select text without closing latte
  */

  const [mouseDownPos, setMouseDownPos] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!mouseDownPos) return; //allows user to highlight text without the latte closing again

    //calc dist btwn mouse down and click, used to tell diff btwn click and drag (highlight)
    const distance = Math.sqrt(
      Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2)
    );

    //latte opens only if click (small distance)
    if (distance < 5) {
      onToggle();
    }

    setMouseDownPos(null);
  };


  return (
    //wrapper container, both question and latte
    <div
      className="group relative h-[200px] w-[148px] rounded-2xl pt-10 font-chilanka sm:h-[300px] sm:w-[220px] sm:pt-12"
    >
      <div
        id={panelId}
        className={[
          //visible content: question label, latte images, and in-cup answer text
          "absolute inset-x-0 bottom-0 z-30 flex flex-col items-center",
          "transition-opacity duration-300 ease-out",
        ].join(" ")}
      >
        {/* question text above the latte wrapper */}
        <div className="pointer-events-none relative z-40 mb-3 w-full px-2 sm:mb-4">
          <div className="mx-auto max-w-[220px] text-center text-xs font-darumadropone leading-snug text-white sm:max-w-[240px] sm:text-2xl">
            {question}
          </div>
        </div>

        {/* latte container and images */}
        <div className="relative w-[230px] aspect-[5/4] sm:w-[380px]">
        <div
          className={[
            "absolute left-1/2 top-[48%] z-20 w-[40%] -translate-x-1/2 -translate-y-1/2 text-center text-[9px] leading-snug text-[#F6E7D8] sm:w-[36%] sm:text-sm",
            "transition-opacity duration-300 ease-out",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {/* answer text customization, wraps the text */}
          <p 
            className="whitespace-normal break-words [overflow-wrap:anywhere] select-text cursor-text"
            onMouseDown={(e) => {
              e.stopPropagation();
              setMouseDownPos(null); //prevents click event(closing latte) when trying to highlight text
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderAnswerContent(answer)}
          </p>
        </div>

          {/* images before and after clicking on latte, latte -> latteoutline, and fade animation */}
          <Image
            src="/images/faq/latte.png"
            alt="Latte cup"
            fill
            sizes="(max-width: 640px) 360px, 380px"
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
            sizes="(max-width: 640px) 360px, 380px"
            className={[
              "pointer-events-none absolute inset-0 h-full w-full object-contain",
              "transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          {/* clickable button (overlay for interaction) */}
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            aria-expanded={isOpen}
            aria-controls={panelId}
            //adds red border for debugging button
            //className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] sm:w-[260px] h-full border-2 border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B] rounded"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[148px] sm:w-[220px] h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B] rounded"
          />
        </div>
      </div>
    </div>
  );
};
