// Each clears 4.5:1 on the cream ticket. Red is left out on purpose: the ticket
// already uses it for featured events.
const CATEGORY_COLORS: Record<string, string> = {
  workshop: "#1f5fae",
  activity: "#7b3fb3", // mini events
  food: "#b84a05",
  ceremony: "#8f6200",
  milestone: "#0f7a4f",
  judging: "#b0276f",
  logistics: "#4a5568",
};

/** A category that isn't listed above keeps the ticket's ink. */
export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category.trim().toLowerCase()] ?? "var(--sched-ink)";
}
