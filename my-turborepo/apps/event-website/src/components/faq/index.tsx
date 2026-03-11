"use client";

import React, { useState } from "react";

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
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently Asked Questions" className="w-full bg-gradient-to-b from-[#322C29] to-[#1B0706] pb-20" id="faq">
      <div className="flex flex-col gap-y-36 max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-6xl font-bold font-anonymous text-center text-white">FAQ</h2>

        {/* 1/row mobile, 2/row sm, 3/row lg (9 items total makes a 3x3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-36 justify-items-center">
          {ITEMS.map((it, i) => (
            <FaqCard
              key={i}
              title={it.question}
              subtitle1={it.answer}
              sealText="FAQ"
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  widthClass?: string;
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  footer?: string;
  sealText?: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

const FaqCard: React.FC<CardProps> = ({
  widthClass = "w-[300px] sm:w-[350px]",
  title = "",
  subtitle1 = "",
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="card">
      <div
        className={["relative bg-black", widthClass, "font-anonymous transition-all duration-700 aspect-[21/11] sm:aspect-[21/10] flex items-center justify-center"].join(
          " "
        )}
      >
        <div
            className={`transition-all flex flex-col items-center py-5 justify-start duration-300 bg-white w-[90%] h-full absolute z-10 ${
                isOpen ? "-translate-y-32 duration-700" : "-translate-y-10 duration-300"}`}
            onClick={onToggle}
        >
          <p className="text-xl font-semibold text-gray-700 text-center">
            {title}
          </p>
          <p className="mt-5 px-3 text-[10px] sm:text-[12px] text-gray-700 text-center">
            {subtitle1}
          </p>
        </div>

        <div
          onClick={onToggle}
          className={`tp absolute w-full h-full bg-[#947536] transition-all -translate-y-full [clip-path:polygon(50%_50%,_0_100%,_100%_100%)]`}
        />
        <div
          className={`lft transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_0_0,_0_100%)] z-30`}
        />
        <div
          className={`rgt transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_100%_0,_100%_100%)] z-30`}
        />
        <div
          className={`btm transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(0%_20%,_100%_20%,_100%_100%,_0%_100%)] z-20`}
        />
        <svg viewBox="0 0 100 100" className="absolute w-full h-full z-30" onClick={onToggle}>
          <polygon
            points="-20,20 120,20 200,75 -100,75"
            fill="none"
            stroke="#947536"
            strokeWidth="3"
          />
        </svg>
        <div
          className={`btm transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(0%_70%,_100%_70%,_100%_100%,_0%_100%)] z-30`}
          onClick={onToggle}
        />
      </div>
    </div>
  );
};
