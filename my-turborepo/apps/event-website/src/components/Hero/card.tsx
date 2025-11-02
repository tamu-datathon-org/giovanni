"use client"
//import { TypingAnimation } from "../ui/typing-animation";
//import SequentialTyping from "./typing";


export default function Card() {
  return (
    <div className="container mx-auto px-4">
      <svg
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background Newspaper Illustration */}
        <image href="/images/elements/card.svg" width="100%" height="100%" />

        {/* Typing Animation inside SVG */}
        <foreignObject x="0%" y="50%" width="100%" height="90%">
            {/* <SequentialTyping /> */}
            <div style={{ background: 'yellow', fontSize: '2rem' }}>Hello, world!</div>
        </foreignObject>


        {/* <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontFamily="KoPub_Batang"
          fontSize="30"
          fill="black"
        >
          NOVEMBER 8–9, 2025 AT MSC
        </text>

        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          fontFamily="KoPub_Batang"
          fontSize="40"
          fontWeight="800"
          fill="black"
        >
          APPLICATIONS CLOSE OCT. 24
        </text>

        <foreignObject x="35%" y="60%" width="30%" height="10%">
          <div className="flex items-center justify-center w-full h-full">
            <a
              href="https://tamudatathon.org/apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-black text-white px-6 py-3 text-lg rounded">
                Apply Now!
              </button>
            </a>
          </div>
        </foreignObject> */}
      </svg>
    </div>
  )
}