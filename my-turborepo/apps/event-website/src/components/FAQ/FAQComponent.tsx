'use client';

import { useState } from 'react';
import FAQButtonSVG from './FAQButtonSVG';
import FAQTitle from './FAQTitle';

type FAQProps = {
    faqData: { question: string; answer: string }[];
};

export default function FAQComponent({ faqData }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Close current if same, open new if different
    };

    return (
        <div id="FAQ" className="flex flex-col items-center gap-10 max-w-4xl mx-auto p-2">
            <FAQTitle/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="font-[FAQ] relative shadow-sm overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => toggleFAQ(index)} className="text-3xl">

                            <FAQButtonSVG question={faq.question}/>

                        </button>
                        <div
                            className={`rounded-lg transition-[max-height, opacity] duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                            <div className="text-center p-16 bg-dalgonabase border-t-4 border-dalgonatext text-dalgonatext">
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
