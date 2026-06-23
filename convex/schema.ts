import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memories: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    importance: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_category_and_createdAt", ["category", "createdAt"])
    .index("by_importance_and_createdAt", ["importance", "createdAt"]),
});
