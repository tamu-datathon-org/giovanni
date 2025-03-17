import type { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export default function Paragraph({ children, className }: ParagraphProps) {
  return (
    <div className={`m-4 mt-2 text-lg text-gray-700 ${className}`}>
      {children}
    </div>
  );
}
