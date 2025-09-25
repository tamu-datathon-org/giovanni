"use client";

import React, { useState } from "react";

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  { question: "What is the Datathon?", answer: "A weekend-long event where students build data-driven projects and compete for prizes." },
  { question: "Who can participate?", answer: "Any currently enrolled college/university student—beginners welcome." },
  { question: "How do teams work?", answer: "Teams up to 4. Form ahead of time or join one during the event." },
  { question: "What should I bring?", answer: "Just your laptop and usual peripherals—no special hardware required." },
  { question: "Are there workshops?", answer: "Yes. We host beginner-friendly sessions on data tools and ML all weekend." },
  { question: "How are projects judged?", answer: "Creativity, technical difficulty, impact, and presentation quality." },
  { question: "Is it free to attend?", answer: "Yes—attendance is free. Some meals, snacks, and swag are provided." },
  { question: "What’s the schedule?", answer: "Opening Friday evening; hacking through the weekend; demos Sunday." },
  { question: "Where is it held?", answer: "On campus; exact venue details will be emailed to accepted participants." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently Asked Questions" className="w-full bg-[#322C29]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">FAQ</h2>

        {/* 1/row mobile, 2/row sm, 3/row lg (9 items total makes a 3x3 on desktop) */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  widthClass?: string; // e.g., "w-[300px] sm:w-[350px]"
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
  subtitle2 = "",
  footer = "SMOOKYDEV",
  sealText = "SMKY",
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="card">
      <div
        className={["relative bg-black", widthClass, "transition-all duration-700 aspect-video flex items-center justify-center"].join(
          " "
        )}
      >
        <div
          className={`transition-all flex flex-col items-center py-5 justify-start duration-300 bg-white w-full h-full absolute ${
            isOpen ? "-translate-y-16 duration-700" : "translate-y-0"
          }`}
        >
          <p className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
            {title}
          </p>
          <p className="px-10 text-[10px] sm:text-[12px] text-gray-700">
            {subtitle1}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] transition-all border-4 border-rose-900 ${
            isOpen ? "opacity-0 scale-0 rotate-180 duration-700" : "opacity-100 scale-100 duration-700"
          }`}
        >
          {sealText}
        </button>

        <div
          onClick={onToggle}
          className={`tp transition-all ${isOpen ? "duration-100 [clip-path:polygon(50%_0%,_100%_0,_0_0)] opacity-0" : "duration-1000 [clip-path:polygon(50%_50%,_100%_0,_0_0)] opacity-100"} w-full h-full bg-[#947536] absolute`}
        />
        <div
          onClick={onToggle}
          className={`lft transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_0_0,_0_100%)]`}
        />
        <div
          onClick={onToggle}
          className={`rgt transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]`}
        />
        <div
          onClick={onToggle}
          className={`btm transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]`}
        />
      </div>
    </div>
  );
};
