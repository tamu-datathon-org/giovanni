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
                        className="relative border-4 border-dalgonatext rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex flex-row text-left p-4 bg-dalgonabase hover:dalgonahover font-medium"
                        >
                            {faq.question}
                            <div className="right-4 top-0 absolute">
                                <svg width="49.95" height="61.05" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    className={`w-3 h-3 inline-block mr-2 transition-transform duration-300 ${
                                        openIndex === index ? 'transform rotate-180' : ''
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"

                                    <path
                                        d="M23.1218 0V14.3086M23.1218 14.3086V38.1563H7.1001L33.0001 61.05L57.0501 38.1563H41.9709V14.3086H23.1218Z"
                                        stroke="#9B5C24" stroke-width="5"/>
                                </svg>
                            </div>
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
