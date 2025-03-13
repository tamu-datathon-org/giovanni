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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="border rounded-2xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-medium"
                        >
                            {faq.question}
                        </button>
                        {openIndex === index && (
                            <div className="p-4 bg-white border-t">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
