import React from "react";

export default async function PassportLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-400">
            {children}
        </div>
    );
}