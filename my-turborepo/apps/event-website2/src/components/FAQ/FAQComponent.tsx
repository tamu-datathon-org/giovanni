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
        <div className="max-w-4xl mx-auto p-2">
            <h2 className="text-2xl font-bold text-center mb-3">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                        >


                            <svg width="439" height="90" viewBox="0 0 443 94" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.4082 93.4C9.70986 93.4 4.5 81.8372 4.5 81.8372L432.825 1.40002C432.825 1.40002 442.5 10.9519 442.5 21.0066C442.5 31.0612 155.958 83.8481 155.958 83.8481L33.1542 93.4H16.4082Z"
                                    fill="#CE7728"/>
                                <rect x="11.5" y="17.4" width="431" height="76" rx="5" fill="#CE7728"/>
                                <rect x="3" y="2.90002" width="432" height="81" rx="7.5" fill="#E69C39" stroke="#CE7728"
                                      stroke-width="5"/>
                                <rect x="33" y="13.075" width="32" height="9" rx="4" fill="#EAB43A"/>
                                <rect x="16" y="32.075" width="9" height="37" rx="4" fill="#EAB43A"/>
                                <rect x="82" y="13.075" width="65" height="9" rx="4" fill="#EAB43A"/>
                                <circle cx="53.3002" cy="40.3251" r="4.30015" fill="#E48B2D"/>
                                <circle cx="185.358" cy="26.3251" r="4.30015" fill="#E48B2D"/>
                                <circle cx="403.396" cy="30.3251" r="4.30015" fill="#E48B2D"/>
                                <circle cx="273.914" cy="63.3251" r="4.30015" fill="#E48B2D"/>
                                <circle cx="85.2277" cy="69.9797" r="4.09538" fill="#E48B2D"/>
                                <circle cx="101.833" cy="45.825" r="2.25246" fill="#F6AC49"/>
                                <circle cx="168.753" cy="61.5749" r="2.04769" fill="#E48B2D"/>
                                <circle cx="217.896" cy="47.825" r="2.25246" fill="#F6AC49"/>
                                <circle cx="318.025" cy="20.5322" r="2.45723" fill="#F6AC49"/>
                                <circle cx="184.184" cy="25.575" r="2.04769" fill="#F6AC49"/>
                                <circle cx="272.908" cy="62.825" r="2.25246" fill="#F6AC49"/>
                                <circle cx="417.748" cy="46.825" r="2.25246" fill="#F6AC49"/>
                                <circle cx="335.804" cy="66.5749" r="2.04769" fill="#E48B2D"/>
                                <path d="M370 43.2313H386.022V19.3836H404.871V43.2313H419.95L395.9 66.125L370 43.2313Z"
                                      fill="#E69C39"/>
                                <path
                                    d="M386.022 5.07501V19.3836M386.022 19.3836V43.2313H370L395.9 66.125L419.95 43.2313H404.871V19.3836H386.022Z"
                                    stroke="#CE7728" stroke-width="4"/>

                                <text x="5" y="15" font-size="20" fill="#9A5C24" dy="38" dx="20">{faq.question}</text>
                            </svg>

                        </button>
                        <div
                            className={`transition-[max-height, opacity] duration-300 ease-in-out overflow-hidden ${
                                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-4 bg-dalgonabase border-t-4 border-dalgonatext text-dalgonatext">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
        ;
}
