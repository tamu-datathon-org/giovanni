
"use client";

import Image from "next/image";
import React, { useId, useState } from "react";

interface FaqItem { question: string; answer: string }

const ITEMS: FaqItem[] = [
  { question: "What is TAMU Datathon Lite?", answer: "TD Lite is a smaller, more beginner friendly version of our main event. It's a one-day event, but it will have everything Datathon normally has including free food, swag, workshops, and prizes!" },
  { question: "Where is the event?", answer: "The event takes place at the ILCB. Once you enter the building, organizers will be there to guide you to the main room! If you have any questions regarding transportation or parking, please reach out to us on Discord." },
  { question: "Why should I come?", answer: "It is completely free! Learn Data Science with interactive challenges and prizes. If you struggle to start to learn, TDLite offers a beginner-focused space to compete in. We have mentors to help and free swag/food." },
  { question: "How do I sign up?", answer: "Head over to https://tamudatathon.org/apply to get started! Admission decisions will be released shortly after registration closes." },
  { question: "How much do I need to know?", answer: "If you are new to data science, TD Lite is the perfect time and place to learn. We will provide introductory workshops and mentors to guide you throughout the competition. We are committed to helping you build something you can be proud of!" },
  { question: "Who can attend?", answer: "TD Lite is open to beginner students currently enrolled at Texas A&M who are at least 18 years old. We welcome students from all majors!" },
  { question: "What should I bring?", answer: "All you need is a laptop and a charger to get started at TD Lite! You may bring other items such as a pillow or a debugging duck if you wish to. Also make sure to check the weather in case you might need an umbrella :D." },
  { question: "Have another question?", answer: "Send us an email at connect@tamudatathon.com or reach out to us on Discord!" },
  { question: "Placeholder question", answer: "Placeholder answer" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idBase = useId();

  return (
    <section
      aria-label="Frequently Asked Questions"
      //clipping/overflow happens here, might need to change in future depending on other components
      className="relative z-30 w-full overflow-y-visible [overflow-x:clip] bg-[#FAE19D] py-16 sm:py-24" //yellow background/outer faq container
      id="faq"
    >
      <div className="mx-auto max-w-[1080px] px-4"> {/* outer brown rec section size*/}
        <div className="relative overflow-visible rounded-3xl bg-[#966952] p-6 sm:p-10">
          {/* vine decorations*/}
          <Image
            src="/images/faq/vines1.png"
            alt="Vines decoration"
            width={320}
            height={220}
            //top left vine styling
            className="pointer-events-none absolute -left-10 -top-[242px] z-20 h-auto w-[270px] sm:w-[330px] lg:w-[370px] -rotate-3"
            priority
          />
          <Image
            src="/images/faq/vines2.png"
            alt="Vines decoration"
            width={320}
            height={220}
            //top right vine styling
            className="pointer-events-none absolute -right-[220px] -top-[124px] z-20 h-auto w-[400px] sm:w-[460px] lg:w-[540px] -rotate-[14deg]"
            priority
          />

          {/* Inner dark-brown rectangle (adjust px/py or rounded to change its size/look) */}
          <div className="relative rounded-2xl bg-[#4C321B] px-5 pb-10 pt-4 sm:px-10 sm:pb-12 sm:pt-6">
            {/* Transparent strip to allow vines to visually overlap into the inner rectangle */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 sm:h-16" />

            {/* title and subtitle */}
            <div className="text-center">
              <h2 className="text-7xl font-darumadropone tracking-wide text-[#FFFFFF] sm:text-8xl">
                FAQ
              </h2>
              <p className="mt-3 text-lg font-chilanka tracking-wide text-[#FFFFFF]/90 sm:text-4xl">
                Click on the lattes!
              </p>
            </div>

            {/* 3x3 grid lattes */}
            {/* to change space btwn subtitle and grid, change mt-[152px] */}
            {/* to change padding for grid, change gap-y-16, sm:gap-y-20 */}
            <div className="mt-[152px] grid grid-cols-1 justify-items-center gap-x-6 gap-y-28 sm:mt-[156px] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-32 lg:grid-cols-3">
              {ITEMS.slice(0, 9).map((it, i) => {
                const panelId = `${idBase}-faq-${i}`;
                return (
                  <LatteFaqItem
                    key={i}
                    question={it.question}
                    answer={it.answer}
                    isOpen={openIndex === i}
                    panelId={panelId}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
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




//clickable links in answer text
const renderAnswerWithLinks = (text: string): React.ReactNode => {
  const linkPattern = /(https:\/\/tamudatathon\.org\/apply|connect@tamudatathon\.com)/g;

  return text.split(linkPattern).map((part, index) => {
    if (part === "https://tamudatathon.org/apply") {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-[#F6E7D8] underline-offset-2"
        >
          {part}
        </a>
      );
    }

    if (part === "connect@tamudatathon.com") {
      return (
        <a
          key={index}
          href="mailto:connect@tamudatathon.com"
          className="underline decoration-[#F6E7D8] underline-offset-2"
        >
          {part}
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
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
  
  ///////////////////Functionality for highlighting the text under the latte, tracks if mouse is dragging (highlighting)
  //or clicking. if clicking, then just close the latte. if dragging, then allow user to select text without closing latte
  
  const [mouseDownPos, setMouseDownPos] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  //for highlighting text and clicking button without triggering onToggle when highlighting
  const handleClick = (e: React.MouseEvent) => {
    if (!mouseDownPos) return; //allows user to highlight text without the latte closing again

    //prevents latte from toggling if user clicks and drags on the button itself
    // Calculate distance between mouse down and click
    const distance = Math.sqrt(
      Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2)
    );

    // Only toggle if mouse moved less than 5 pixels (click, not a drag)
    if (distance < 5) {
      onToggle();
    }

    setMouseDownPos(null);
  };

  ///////////////////////////////////////////////////////////////////////

  return (

    //wrapper container, both question and latte
    <div
      className="group relative h-[340px] w-[250px] rounded-2xl pt-12 font-chilanka sm:h-[340px] sm:w-[250px] sm:pt-14"
    >
      <div
        id={panelId}
        className={[
          //visible content: question label, latte images, and in-cup answer text
          "absolute inset-x-0 bottom-0 z-10 flex flex-col items-center",
          "transition-opacity duration-300 ease-out",
        ].join(" ")}
      >
        {/* question text above the latte wrapper */}
        <div className="pointer-events-none relative z-20 mb-4 w-full px-2 sm:mb-5">
          <div className="mx-auto max-w-[240px] text-center text-xl font-darumadropone leading-snug text-white sm:max-w-[270px] sm:text-3xl">
            {question}
          </div>
        </div>

        {/* latte container and images */}
        <div className="relative w-[400px] aspect-[5/4] sm:w-[440px]">
        <div
          className={[
            "absolute left-1/2 top-[48%] z-20 w-[36%] -translate-x-1/2 -translate-y-1/2 text-center text-sm leading-snug text-[#F6E7D8] sm:w-[36%] sm:text-base",
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
            {renderAnswerWithLinks(answer)}
          </p>
        </div>

          {/* images before and after clicking on latte, latte -> latteoutline, and fade animation */}
          <Image
            src="/images/faq/latte.png"
            alt="Latte cup"
            fill
            sizes="(max-width: 640px) 400px, 440px"
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
            sizes="(max-width: 640px) 400px, 440px"
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
            //className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-full border-2 border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B] rounded"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B] rounded"
          />
        </div>
      </div>
    </div>
  );
};
