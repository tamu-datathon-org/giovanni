import React from "react";

export default function ScheduleManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-h-screen-sm overflow-hidden">{children}</div>
    </>
  );
}
