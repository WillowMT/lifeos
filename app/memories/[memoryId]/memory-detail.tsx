"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { BackIcon, StarIcon } from "@/components/icons";
import { CategoryPill } from "@/components/category-pill";
import { EmptyState } from "@/components/empty-state";
import { MemoryForm } from "@/components/memory-form";
import type { MemoryInput } from "@/lib/memory";

export function MemoryDetail({
  memoryId,
}: {
  memoryId: Id<"memories">;
}) {
  const router = useRouter();
  const memory = useQuery(api.memories.getMemory, { memoryId });
  const updateMemory = useMutation(api.memories.updateMemory);
  const deleteMemory = useMutation(api.memories.deleteMemory);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (memory === undefined) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-28 rounded-xl bg-white/70 motion-safe:animate-pulse" />
        <div className="glass-card h-80 motion-safe:animate-pulse bg-white/50" />
      </div>
    );
  }

  if (memory === null) {
    return (
      <div className="space-y-6">
        <Link href="/memories" className="back-link">
          <BackIcon className="size-4" /> Memory
        </Link>
        <EmptyState
          title="Memory not found"
          description="It may have been deleted or the link is no longer valid."
        />
      </div>
    );
  }

  async function handleUpdate(input: MemoryInput) {
    await updateMemory({ memoryId, ...input });
    setIsEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm("Delete this memory? This can’t be undone.")) return;
    setIsDeleting(true);
    try {
      await deleteMemory({ memoryId });
      router.replace("/memories");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-7">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => setIsEditing(false)} className="back-link">
            <BackIcon className="size-4" /> Cancel
          </button>
          <p className="text-[13px] font-semibold text-[#8a8790]">Editing</p>
        </div>
        <MemoryForm
          initialValue={{
            title: memory.title,
            content: memory.content,
            category: memory.category,
            tags: memory.tags,
            importance: memory.importance,
          }}
          submitLabel="Save changes"
          onSave={handleUpdate}
        />
      </div>
    );
  }

  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(memory.createdAt));

  return (
    <article className="space-y-6 selectable">
      <div className="flex items-center justify-between gap-4">
        <Link href="/memories" className="back-link">
          <BackIcon className="size-4" /> Memory
        </Link>
        <button type="button" onClick={() => setIsEditing(true)} className="quiet-button">
          Edit
        </button>
      </div>

      <div className="glass-card overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <CategoryPill label={memory.category} />
          <span className="text-[13px] font-medium text-[#96939c]">{date}</span>
          {memory.importance === "high" ? (
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#725cb0]">
              <StarIcon className="size-3.5 fill-current" /> Important
            </span>
          ) : null}
        </div>

        <h1 className="mt-6 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] text-[#222127] sm:text-[38px]">
          {memory.title}
        </h1>

        {memory.content ? (
          <p className="mt-6 whitespace-pre-wrap text-[17px] leading-7 text-[#55525b]">
            {memory.content}
          </p>
        ) : (
          <p className="mt-6 text-[15px] italic text-[#99969e]">No additional notes.</p>
        )}

        {memory.tags.length ? (
          <div className="mt-8 flex flex-wrap gap-2 border-t border-black/[0.06] pt-5">
            {memory.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f0eef4] px-3 py-1.5 text-[12px] font-semibold text-[#716d79]">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="danger-button"
      >
        {isDeleting ? "Deleting…" : "Delete memory"}
      </button>
    </article>
  );
}
