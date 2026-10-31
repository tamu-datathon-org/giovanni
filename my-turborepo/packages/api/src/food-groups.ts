// Food groups come from `event.food_groups`, which organizers fill in by hand.
// The first group is the dietary group (vegan, vegetarian or gluten-free);
// everyone else gets a random group from the rest of the list.

// Only these go to the dietary group. Halal, kosher, chicketarian, allergies
// and "no beef/pork" people are served from the regular groups.
const DIETARY_GROUP_KEYWORDS = ["vegan", "vegetarian", "gluten"];

// The application form's multi-select stores "Vegetarian,Halal", "None" or "".
export function needsDietaryGroup(value: string | null | undefined): boolean {
  return (value ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .some((entry) => DIETARY_GROUP_KEYWORDS.some((keyword) => entry.includes(keyword)));
}

// Returns undefined when the event has no food groups, so nothing gets written.
export function pickFoodGroup(
  foodGroups: string[],
  dietaryRestriction: string | null | undefined,
): string | undefined {
  const groups = foodGroups.map((g) => g.trim()).filter((g) => g !== "");
  const [dietaryGroup, ...rest] = groups;
  if (dietaryGroup === undefined) return undefined;

  if (needsDietaryGroup(dietaryRestriction) || rest.length === 0) {
    return dietaryGroup;
  }
  return rest[Math.floor(Math.random() * rest.length)];
}
