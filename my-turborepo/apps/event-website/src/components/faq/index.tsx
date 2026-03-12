
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
            {/* to change space btwn subtitle and grid, edit mt-[152px] */}
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
 
//react component, one latte, question, answer, ontoggle
const LatteFaqItem: React.FC<LatteFaqItemProps> = ({
  question, //faq question
  answer, //answer behind the latte
  isOpen, //whether the latte is open or not
  panelId, //id for accessibility
  onToggle, //on click
}) => {
  return (

    //clickable latte button
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      //styling for the button, might need to fix this (includes tab styles)
      className="group relative h-[340px] w-[250px] select-none rounded-2xl pt-12 font-chilanka focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E7D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4C321B] sm:h-[340px] sm:w-[250px] sm:pt-14"
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

        {/* latte container */}
        <div className="relative w-[400px] aspect-[5/4] sm:w-[440px]">
          <div
            className={[
              //answer text inside cup
              //to change text width, change w-[36%], sm:w-[36%]
              "pointer-events-none absolute left-1/2 top-[48%] z-20 w-[36%] -translate-x-1/2 -translate-y-1/2 text-center text-sm leading-snug text-[#F6E7D8] sm:w-[36%] sm:text-base",
              "transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <p className="whitespace-normal">{answer}</p>
          </div>

          {/* images before and after clicking on latte, latte -> latteoutline, animation */}
          <Image
            src="/images/faq/latte.png"
            alt="Latte cup"
            fill
            sizes="(max-width: 640px) 400px, 440px"
            className={[
              "absolute inset-0 h-full w-full object-contain",
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
              "absolute inset-0 h-full w-full object-contain",
              "transition-opacity duration-300 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </div>
      </div>
    </button>
  );
};
