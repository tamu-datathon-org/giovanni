import React from "react";
import { format, parseISO } from "date-fns";

export default function Date({ dateString }: { dateString: string }) {
  if (dateString == null || typeof dateString !== "string" || dateString === "") {
    return null;
  }
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
