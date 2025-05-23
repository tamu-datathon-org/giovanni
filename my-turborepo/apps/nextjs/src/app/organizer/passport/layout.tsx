import React from "react";

export default async function PassportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
