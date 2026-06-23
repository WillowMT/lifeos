import Link from "next/link";
import type { Doc } from "@/convex/_generated/dataModel";
import { ArrowIcon, StarIcon } from "./icons";
import { CategoryPill } from "./category-pill";

export function MemoryCard({
  memory,
  compact = false,
}: {
  memory: Doc<"memories">;
  compact?: boolean;
}) {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(memory.createdAt));

  return (
    <Link
      href={`/memories/${memory._id}`}
      className="memory-card group"
      aria-label={`Open memory: ${memory.title}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryPill label={memory.category} />
          <span className="text-[12px] font-medium text-[#99969e]">{date}</span>
          {memory.importance === "high" ? (
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#7660b5]">
              <StarIcon className="size-3.5 fill-current" /> Important
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 truncate text-[17px] font-semibold tracking-[-0.015em] text-[#242329]">
          {memory.title}
        </h3>
        {!compact && memory.content ? (
          <p className="mt-1 line-clamp-2 text-[14px] leading-[1.45] text-[#77747d]">
            {memory.content}
          </p>
        ) : null}
        {memory.tags.length > 0 ? (
          <p className="mt-3 truncate text-[12px] font-medium text-[#8b8792]">
            {memory.tags.map((tag) => `#${tag}`).join("  ")}
          </p>
        ) : null}
      </div>
      <ArrowIcon className="mt-1 size-4 shrink-0 text-[#b1aeb7] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
