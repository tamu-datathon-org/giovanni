/**
 * Slot machine icons for food groups, in public/slot-machine-icons/<group>_icon.png
 */

const FOOD_GROUP_ICONS = [
  "cherry",
  "bell",
  "horseshoe",
  "lemon",
  "diamond",
  "seven",
] as const;

/** Food groups are free-form strings set per event, so unknown names get no icon. */
export function getFoodGroupIcon(name: string | null | undefined) {
  const key = name?.trim().toLowerCase();
  const icon = FOOD_GROUP_ICONS.find((group) => group === key);
  return icon ? `/slot-machine-icons/${icon}_icon.png` : null;
}
