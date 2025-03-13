'use client';

import { useState } from 'react';

type FAQProps = {
    faqData: { question: string; answer: string }[];
};

export default function FAQComponent({ faqData }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">FAQ</h2>
            <div className="flex flex-wrap gap-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="w-full md:w-[calc(50%-0.5rem)] border rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-medium"
                        >
                            {faq.question}
                        </button>
                        <div
                            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                                openIndex === index ? 'max-h-40' : 'max-h-0'
                            }`}
                        >
                            <div className="p-4 bg-white border-t">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
