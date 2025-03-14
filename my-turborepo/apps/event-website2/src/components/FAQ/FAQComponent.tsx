'use client';

import { useState } from 'react';

type FAQProps = {
    faqData: { question: string; answer: string }[];
};

export default function FAQComponent({ faqData }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Close current if same, open new if different
    };

    return (
        <div className="max-w-4xl mx-auto p-4 text-dalgonatext">
            <h2 className="text-2xl font-bold text-center mb-6">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                        >

                            <svg width="590" height="94" viewBox="0 0 830 60" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">

                                <path d="M17 93L4 84L580.5 5L589.5 20L205 83.5L17 93Z" fill="#CE7728"/>
                                <rect x="13" y="17.15" width="577" height="76" rx="5" fill="#CE7728"/>
                                <rect x="2.5" y="2.65002" width="577" height="81" rx="7.5" fill="#E69C39"
                                      stroke="#CE7728" stroke-width="5"/>
                                <rect x="30" y="13" width="32" height="9" rx="4" fill="#EAB43A"/>
                                <rect x="13" y="32" width="9" height="37" rx="4" fill="#EAB43A"/>

                                <rect x="79" y="13" width="65" height="9" rx="4" fill="#EAB43A"/>
                                <path d="M514.1 43.1562H530.122V19.3086H548.971V43.1562H564.05L540 66.05L514.1 43.1562Z"
                                      fill="#E69C39"/>
                                <path
                                    d="M530.122 5V19.3086M530.122 19.3086V43.1562H514.1L540 66.05L564.05 43.1562H548.971V19.3086H530.122Z"
                                    stroke="#CE7728" stroke-width="4"/>
                                <circle cx="50.5" cy="40.5" r="4.5" fill="#E48B2D"/>
                                <circle cx="206.5" cy="26.5" r="4.5" fill="#E48B2D"/>
                                <circle cx="464.5" cy="30.5" r="4.5" fill="#E48B2D"/>
                                <circle cx="311.5" cy="63.5" r="4.5" fill="#E48B2D"/>
                                <circle cx="88.5" cy="69.5" r="4.5" fill="#E48B2D"/>
                                <circle cx="108.5" cy="45.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="187.5" cy="61.5" r="2.5" fill="#E48B2D"/>
                                <circle cx="245.5" cy="47.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="363.5" cy="20.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="205.5" cy="25.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="310.5" cy="62.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="481.5" cy="46.5" r="2.5" fill="#F6AC49"/>
                                <circle cx="384.5" cy="66.5" r="2.5" fill="#E48B2D"/>
                                <text x="5" y="15" font-size="28" fill="#9A5C24" dy="38" dx="7">{faq.question}</text>
                            </svg>

                        </button>
                        <div
                            className={`transition-[max-height, opacity] duration-300 ease-in-out overflow-hidden ${
                                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-4 bg-dalgonabase border-t-4 border-dalgonatext">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
