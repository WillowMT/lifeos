export const MEMORY_CATEGORIES = [
  "Life",
  "Fitness",
  "Finance",
  "Project",
  "Travel",
  "Health",
  "Learning",
  "Idea",
] as const;

export const IMPORTANCE_LEVELS = ["low", "medium", "high"] as const;

export type MemoryCategory = (typeof MEMORY_CATEGORIES)[number];
export type MemoryImportance = (typeof IMPORTANCE_LEVELS)[number];

export type MemoryInput = {
  title: string;
  content: string;
  category: string;
  tags: string[];
  importance: MemoryImportance;
};

export function normalizeTags(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}
