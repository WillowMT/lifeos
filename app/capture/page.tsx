"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { MemoryForm } from "@/components/memory-form";
import type { MemoryInput } from "@/lib/memory";

export default function CapturePage() {
  const router = useRouter();
  const createMemory = useMutation(api.memories.createMemory);

  async function handleSave(memory: MemoryInput) {
    const memoryId = await createMemory(memory);
    router.push(`/memories/${memoryId}`);
  }

  return (
    <div className="space-y-7">
      <header className="page-header">
        <div>
          <p className="eyebrow">Save it for later</p>
          <h1>New memory</h1>
        </div>
      </header>
      <MemoryForm onSave={handleSave} />
    </div>
  );
}
