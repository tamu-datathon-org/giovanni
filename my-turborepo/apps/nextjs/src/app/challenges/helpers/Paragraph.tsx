import type { ReactNode } from 'react';

interface ParagraphProps {
    children: ReactNode;
    className?: string;
}

export default function Paragraph({ children, className }: ParagraphProps) {
    return (
        <p className={`text-lg text-gray-700 mt-2 m-4 ${className}`}>
            {children}
        </p>
    );
}
