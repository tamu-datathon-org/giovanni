// app/faq/page.tsx (or `app/page.tsx` for the homepage)

import FAQComponent from '@/components/FAQ/FAQComponent';
3
// Server component to fetch FAQ data
export default async function FAQPage() {
    // Simulate server-side data fetching
    const faqData = [
        { question: 'What is Next.js?', answer: 'Next.js is a React framework for production.' },
        { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for styling.' },
        { question: 'Is TypeScript required for Next.js?', answer: 'No, but it is highly recommended for type safety.' },
        { question: 'How to create a Next.js project?', answer: 'Use the command `npx create-next-app@latest`.' },
        { question: 'What is server-side rendering?', answer: 'It is a technique for rendering pages on the server, improving performance.' },
        { question: 'Can I use Tailwind CSS with Next.js?', answer: 'Yes, you can easily integrate Tailwind with Next.js.' },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Server-Side Rendered FAQ Page</h1>
            <FAQComponent faqData={faqData} />
        </div>
    );
}
