import { describe, expect, test } from "vitest";
import * as memory from "./memory";

describe("memory input", () => {
  test("offers only the eight MVP categories", () => {
    expect(memory.MEMORY_CATEGORIES).toEqual([
      "Life",
      "Fitness",
      "Finance",
      "Project",
      "Travel",
      "Health",
      "Learning",
      "Idea",
    ]);
  });

  test("normalizes comma-separated tags into unique lowercase values", () => {
    expect(memory.normalizeTags(" Health, sleep, health , ")).toEqual([
      "health",
      "sleep",
    ]);
  });
});
