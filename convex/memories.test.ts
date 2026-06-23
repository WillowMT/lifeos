/// <reference types="vite/client" />

import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

const firstMemory = {
  title: "Book Kyoto hotel",
  content: "Compare Gion and Arashiyama for the autumn trip.",
  category: "Travel",
  tags: ["japan", "autumn"],
  importance: "high" as const,
};

describe("memories", () => {
  test("creates memories and lists the newest first", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.memories.createMemory, firstMemory);
    await t.mutation(api.memories.createMemory, {
      title: "Evening walk",
      content: "Thirty quiet minutes after dinner.",
      category: "Life",
      tags: ["routine"],
      importance: "low",
    });

    const memories = await t.query(api.memories.listMemories, {});

    expect(memories.map((memory) => memory.title)).toEqual([
      "Evening walk",
      "Book Kyoto hotel",
    ]);
  });

  test("returns recent and high-importance memories", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.memories.createMemory, firstMemory);
    await t.mutation(api.memories.createMemory, {
      title: "Read later",
      content: "An interesting essay.",
      category: "Learning",
      tags: [],
      importance: "low",
    });

    const recent = await t.query(api.memories.listRecentMemories, { limit: 1 });
    const important = await t.query(api.memories.listImportantMemories, {
      limit: 4,
    });

    expect(recent).toHaveLength(1);
    expect(important.map((memory) => memory.title)).toEqual([
      "Book Kyoto hotel",
    ]);
  });

  test("searches title, content, and tags with an optional category", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.memories.createMemory, firstMemory);
    await t.mutation(api.memories.createMemory, {
      title: "Marathon base week",
      content: "Keep the long run easy and add mobility.",
      category: "Fitness",
      tags: ["training", "aerobic"],
      importance: "medium",
    });

    const byContent = await t.query(api.memories.searchMemories, {
      searchTerm: "arashiyama",
    });
    const byTag = await t.query(api.memories.searchMemories, {
      searchTerm: "aerobic",
      category: "Fitness",
    });
    const wrongCategory = await t.query(api.memories.searchMemories, {
      searchTerm: "aerobic",
      category: "Travel",
    });

    expect(byContent.map((memory) => memory.title)).toEqual([
      "Book Kyoto hotel",
    ]);
    expect(byTag.map((memory) => memory.title)).toEqual([
      "Marathon base week",
    ]);
    expect(wrongCategory).toEqual([]);
  });

  test("updates and deletes an existing memory", async () => {
    const t = convexTest(schema, modules);
    const memoryId = await t.mutation(
      api.memories.createMemory,
      firstMemory,
    );

    await t.mutation(api.memories.updateMemory, {
      memoryId,
      ...firstMemory,
      title: "Book Kyoto ryokan",
    });
    const updated = await t.query(api.memories.getMemory, { memoryId });
    expect(updated?.title).toBe("Book Kyoto ryokan");
    expect(updated?.updatedAt).toBeGreaterThanOrEqual(updated?.createdAt ?? 0);

    await t.mutation(api.memories.deleteMemory, { memoryId });
    expect(await t.query(api.memories.getMemory, { memoryId })).toBeNull();
  });
});
