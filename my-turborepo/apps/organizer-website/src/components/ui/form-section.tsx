import type React from "react";

export function Asterisk() {
  return <span className="text-red-500">*</span>;
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group mb-6 overflow-hidden rounded-xl border-2 border-[#4b5563] bg-[#1f2937] shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="border-b border-[#374151] bg-[#111827] px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
