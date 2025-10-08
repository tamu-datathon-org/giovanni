"use client";

import React, { useState } from "react";

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  { question: "What is the Datathon?", answer: "A weekend-long event where students build data-driven projects and compete for prizes." },
  { question: "Who can participate?", answer: "Any currently enrolled college/university student—beginners welcome." },
  { question: "How do teams work?", answer: "Teams up to 4. Form ahead of time or join one during the event." },
  { question: "What should I bring?", answer: "Just your laptop—no special hardware required." },
  { question: "Are there workshops?", answer: "Yes. We host beginner-friendly workshops on data tools and ML all weekend." },
  { question: "How are projects judged?", answer: "Creativity, technical difficulty, impact, and presentation quality." },
  { question: "Is it free to attend?", answer: "Yes attendance is free. Meals, snacks, and swag are provided." },
  { question: "What’s the schedule?", answer: "Opening Saturday morning hacking through the weekend with judging Sunday." },
  { question: "Where is it held?", answer: "Exact venue details will be emailed to accepted participants." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently Asked Questions" className="w-full bg-gradient-to-b from-[#322C29] to-[#1B0706] pb-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-5xl font-bold mb-40 text-center text-white ">FAQ</h2>

        {/* 1/row mobile, 2/row sm, 3/row lg (9 items total makes a 3x3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40 justify-items-center">
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

type CardProps = {
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
        className={["relative bg-black", widthClass, "transition-all duration-700 aspect-[21/9] flex items-center justify-center"].join(
          " "
        )}
      >
        <div
            className={`transition-all flex flex-col items-center py-5 justify-start duration-300 bg-white w-[90%] h-full absolute z-10 ${
                isOpen ? "-translate-y-24 duration-700" : "-translate-y-10 duration-300"}`}
            onClick={onToggle}
        >
          <p className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
            {title}
          </p>
          <p className="mt-5 px-10 text-[10px] sm:text-[12px] text-gray-700">
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
