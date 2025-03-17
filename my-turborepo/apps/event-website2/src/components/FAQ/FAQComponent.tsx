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
        <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto p-2">


            <svg width="140" height="63" viewBox="0 0 140 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M54.6809 52.92L68.7234 23.3234L82.3404 52.92H54.6809Z" fill="#E24195"/>
                <path
                    d="M110 27.6128L118.085 42.6255C106.464 43.8139 99.9665 37.0281 99.7874 27.6128C99.6083 18.1974 105.319 12.6 114.255 12.1711C123.191 11.7421 130.228 20.4071 130.426 25.4681C130.624 30.529 129.241 34.1237 125.745 38.3362L119.787 27.6128H110Z"
                    fill="#E24195"/>
                <path d="M50 32.76H22.5V22.68H50V32.76ZM50 2.52V12.6H10V52.92H0V2.52H50Z" fill="white"/>
                <path d="M43.5156 52.92L68.5156 0L93.5156 52.92H82.2656L68.5156 23.94L54.7656 52.92H43.5156Z"
                      fill="white"/>
                <path
                    d="M118.203 42.525L110 27.72H120L125.781 38.2725C128.594 35.3325 130 31.815 130 27.72C130 23.52 128.542 19.95 125.625 17.01C122.708 14.07 119.167 12.6 115 12.6C110.833 12.6 107.292 14.07 104.375 17.01C101.458 19.95 100 23.52 100 27.72C100 31.92 101.458 35.49 104.375 38.43C107.292 41.37 110.833 42.84 115 42.84C116.094 42.84 117.161 42.735 118.203 42.525ZM129.453 63L123.203 51.66C120.651 52.5 117.917 52.92 115 52.92C108.073 52.92 102.161 50.4788 97.2656 45.5963C92.4219 40.6613 90 34.7025 90 27.72C90 20.7375 92.4219 14.805 97.2656 9.9225C102.161 4.9875 108.073 2.52 115 2.52C121.927 2.52 127.813 4.9875 132.656 9.9225C137.552 14.805 140 20.7375 140 27.72C140 34.7025 137.578 40.635 132.734 45.5175C132.109 46.1475 131.458 46.7513 130.781 47.3288L139.453 63H129.453Z"
                    fill="white"/>
            </svg>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                            >


                                <svg width="100%" height="94" viewBox="0 0 447 94" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.5 16.5C0.5 6.2472 29 1 29 1C173.573 17.8333 447.5 57.05 447.5 73.45C447.5 89.85 433 94 429.5 94L199.449 23.95L64.8637 17.45C42.4327 20.7833 0.5 28 0.5 16.5Z"
                                        fill="#CE7728" />
                                    <rect x="24.5" y="0.950012" width="423" height="76" rx="5" fill="#CE7728" />
                                    <rect x="3" y="10.45" width="434" height="81" rx="7.5" fill="#E69C39" stroke="#CE7728"
                                        stroke-width="5" />
                                    <rect x="33" y="21.075" width="32" height="9" rx="4" fill="#EAB43A" />
                                    <rect x="16" y="40.075" width="9" height="37" rx="4" fill="#EAB43A" />
                                    <rect x="82" y="21.075" width="65" height="9" rx="4" fill="#EAB43A" />
                                    <circle cx="53.3002" cy="48.3251" r="4.30015" fill="#E48B2D" />
                                    <circle cx="185.358" cy="34.3251" r="4.30015" fill="#E48B2D" />
                                    <circle cx="403.396" cy="38.3251" r="4.30015" fill="#E48B2D" />
                                    <circle cx="273.914" cy="71.3251" r="4.30015" fill="#E48B2D" />
                                    <circle cx="85.2277" cy="77.9797" r="4.09538" fill="#E48B2D" />
                                    <circle cx="101.833" cy="53.825" r="2.25246" fill="#F6AC49" />
                                    <circle cx="168.753" cy="69.5749" r="2.04769" fill="#E48B2D" />
                                    <circle cx="217.896" cy="55.825" r="2.25246" fill="#F6AC49" />
                                    <circle cx="318.025" cy="28.5322" r="2.45723" fill="#F6AC49" />
                                    <circle cx="184.184" cy="33.575" r="2.04769" fill="#F6AC49" />
                                    <circle cx="272.908" cy="70.825" r="2.25246" fill="#F6AC49" />
                                    <circle cx="417.748" cy="54.825" r="2.25246" fill="#F6AC49" />
                                    <circle cx="335.804" cy="74.5749" r="2.04769" fill="#E48B2D" />
                                    <path d="M377 51.2313H393.022V27.3836H411.871V51.2313H426.95L402.9 74.125L377 51.2313Z"
                                        fill="#E69C39" />
                                    <path d="M393.022 13.075V27.3836M393.022 27.3836V51.2313H377L402.9 74.125L426.95 51.2313H411.871V27.3836H393.022Z" stroke="#CE7728" stroke-width="4" />
                                    <path d="M436.523 14.3725L442.523 7.80524C443.755 6.45742 446 7.3286 446 9.15424V79.7521C446 80.3047 445.771 80.8327 445.368 81.2107L439.368 86.8398C438.091 88.038 436 87.1325 436 85.3812V15.7215C436 15.2223 436.187 14.7411 436.523 14.3725Z" fill="#B26219" />

                                    <text x="45" y="25" font-size="20" fill="#B56119" dy="38" dx="20">{faq.question}</text>
                                </svg>

                            </button>
                            <div
                                className={`transition-[max-height, opacity] duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
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
        </div>
    )
        ;
}
