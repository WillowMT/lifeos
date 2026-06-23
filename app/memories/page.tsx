"use client";

import { useDeferredValue, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CategoryPill } from "@/components/category-pill";
import { EmptyState } from "@/components/empty-state";
import { LoadingList } from "@/components/loading-list";
import { MemoryCard } from "@/components/memory-card";
import { SearchBar } from "@/components/search-bar";
import { MEMORY_CATEGORIES } from "@/lib/memory";

export default function MemoriesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(search.trim());
  const categoryArgs = category ? { category } : {};

  const listedMemories = useQuery(
    api.memories.listMemories,
    deferredSearch ? "skip" : categoryArgs,
  );
  const searchedMemories = useQuery(
    api.memories.searchMemories,
    deferredSearch
      ? {
          searchTerm: deferredSearch,
          ...(category ? { category } : {}),
        }
      : "skip",
  );
  const memories = deferredSearch ? searchedMemories : listedMemories;

  return (
    <div className="space-y-7">
      <header className="page-header items-end">
        <div>
          <p className="eyebrow">Everything saved</p>
          <h1>Memory</h1>
        </div>
        {memories ? (
          <p>{memories.length} {memories.length === 1 ? "memory" : "memories"}</p>
        ) : null}
      </header>

      <div className="space-y-4">
        <SearchBar value={search} onChange={setSearch} />
        <div className="pill-scroller" aria-label="Filter by category">
          <CategoryPill
            label="All"
            selected={category === null}
            onClick={() => setCategory(null)}
          />
          {MEMORY_CATEGORIES.map((item) => (
            <CategoryPill
              key={item}
              label={item}
              selected={category === item}
              onClick={() => setCategory(item)}
            />
          ))}
        </div>
      </div>

      <section aria-label="Memories" className="space-y-3">
        {memories === undefined ? (
          <LoadingList count={4} />
        ) : memories.length ? (
          memories.map((memory) => (
            <MemoryCard key={memory._id} memory={memory} />
          ))
        ) : (
          <EmptyState
            title={search ? "No matching memories" : "No memories here yet"}
            description={
              search
                ? "Try another word or clear a category filter."
                : "Capture something worth keeping and it will appear here."
            }
          />
        )}
      </section>
    </div>
  );
}
