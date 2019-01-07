export const CLASSES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard"
];

export const LEVELS = Array(20)
  .join(",")
  .split(",")
  .map((v, i) => i + 1);

export const VALID_STAT_VALUES = Array(30)
  .join(",")
  .split(",")
  .map((v, i) => i + 1);
