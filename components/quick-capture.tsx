"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CaptureIcon } from "./icons";

export function QuickCapture() {
  const createMemory = useMutation(api.memories.createMemory);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedTitle = title.trim();
    if (!cleanedTitle || isSaving) return;

    setIsSaving(true);
    setStatus("");
    try {
      await createMemory({
        title: cleanedTitle,
        content: "",
        category: "Life",
        tags: [],
        importance: "medium",
      });
      setTitle("");
      setStatus("Saved to Memory");
    } catch {
      setStatus("Couldn’t save. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="quick-capture">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#eee9ff] text-[#6754ad]">
          <CaptureIcon className="size-5" />
        </div>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Quick capture</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setStatus("");
            }}
            placeholder="What do you want to remember?"
            className="w-full bg-transparent text-[16px] text-[#25242a] outline-none placeholder:text-[#99969f]"
          />
        </label>
        <button
          type="submit"
          disabled={!title.trim() || isSaving}
          className="rounded-full bg-[#29282e] px-4 py-2 text-[13px] font-semibold text-white transition-opacity disabled:opacity-35"
        >
          {isSaving ? "Saving" : "Save"}
        </button>
      </form>
      <p className="mt-2 min-h-5 px-2 text-[12px] font-medium text-[#77747d]" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
