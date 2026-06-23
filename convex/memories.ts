import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const importanceValidator = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
);

const memoryFields = {
  title: v.string(),
  content: v.string(),
  category: v.string(),
  tags: v.array(v.string()),
  importance: importanceValidator,
};

function cleanText(value: string) {
  return value.trim();
}

function validateTitle(title: string) {
  const cleanedTitle = cleanText(title);
  if (!cleanedTitle) {
    throw new ConvexError("A title is required.");
  }
  return cleanedTitle;
}

function cleanTags(tags: string[]) {
  return Array.from(
    new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)),
  );
}

export const createMemory = mutation({
  args: memoryFields,
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("memories", {
      title: validateTitle(args.title),
      content: cleanText(args.content),
      category: args.category,
      tags: cleanTags(args.tags),
      importance: args.importance,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateMemory = mutation({
  args: {
    memoryId: v.id("memories"),
    ...memoryFields,
  },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get("memories", args.memoryId);
    if (!memory) {
      throw new ConvexError("Memory not found.");
    }

    await ctx.db.patch("memories", args.memoryId, {
      title: validateTitle(args.title),
      content: cleanText(args.content),
      category: args.category,
      tags: cleanTags(args.tags),
      importance: args.importance,
      updatedAt: Date.now(),
    });

    return args.memoryId;
  },
});

export const deleteMemory = mutation({
  args: { memoryId: v.id("memories") },
  handler: async (ctx, args) => {
    const memory = await ctx.db.get("memories", args.memoryId);
    if (!memory) {
      throw new ConvexError("Memory not found.");
    }
    await ctx.db.delete("memories", args.memoryId);
    return args.memoryId;
  },
});

export const getMemory = query({
  args: { memoryId: v.id("memories") },
  handler: async (ctx, args) => {
    return await ctx.db.get("memories", args.memoryId);
  },
});

export const listMemories = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const category = args.category;
    if (category) {
      return await ctx.db
        .query("memories")
        .withIndex("by_category_and_createdAt", (q) =>
          q.eq("category", category),
        )
        .order("desc")
        .take(100);
    }

    return await ctx.db
      .query("memories")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});

export const listRecentMemories = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 5, 1), 20);
    return await ctx.db
      .query("memories")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit);
  },
});

export const listImportantMemories = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 4, 1), 20);
    return await ctx.db
      .query("memories")
      .withIndex("by_importance_and_createdAt", (q) =>
        q.eq("importance", "high"),
      )
      .order("desc")
      .take(limit);
  },
});

export const searchMemories = query({
  args: {
    searchTerm: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const category = args.category;
    const memories = category
      ? await ctx.db
          .query("memories")
          .withIndex("by_category_and_createdAt", (q) =>
            q.eq("category", category),
          )
          .order("desc")
          .take(100)
      : await ctx.db
          .query("memories")
          .withIndex("by_createdAt")
          .order("desc")
          .take(100);

    const searchTerm = args.searchTerm.trim().toLowerCase();
    if (!searchTerm) return memories;

    const matches = [];
    for (const memory of memories) {
      const searchableText = [
        memory.title,
        memory.content,
        memory.category,
        ...memory.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (searchableText.includes(searchTerm)) matches.push(memory);
    }
    return matches;
  },
});
