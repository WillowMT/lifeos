"use client";

import { useState, type FormEvent } from "react";
import {
  IMPORTANCE_LEVELS,
  MEMORY_CATEGORIES,
  normalizeTags,
  type MemoryInput,
} from "@/lib/memory";

const emptyMemory: MemoryInput = {
  title: "",
  content: "",
  category: "Life",
  tags: [],
  importance: "medium",
};

export function MemoryForm({
  initialValue = emptyMemory,
  submitLabel = "Save memory",
  onSave,
}: {
  initialValue?: MemoryInput;
  submitLabel?: string;
  onSave: (memory: MemoryInput) => Promise<void>;
}) {
  const [title, setTitle] = useState(initialValue.title);
  const [content, setContent] = useState(initialValue.content);
  const [category, setCategory] = useState(initialValue.category);
  const [tags, setTags] = useState(initialValue.tags.join(", "));
  const [importance, setImportance] = useState(initialValue.importance);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Add a title before saving.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        category,
        tags: normalizeTags(tags),
        importance,
      });
    } catch {
      setError("The memory couldn’t be saved. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="glass-card space-y-5 p-5 sm:p-6">
        <label className="form-field">
          <span className="form-label">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="A clear, memorable title"
            className="form-input"
            maxLength={120}
          />
        </label>

        <label className="form-field">
          <span className="form-label">Notes</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Add the details you’ll want later…"
            className="form-input min-h-36 resize-y leading-6"
            rows={6}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-field">
            <span className="form-label">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="form-input appearance-none"
            >
              {MEMORY_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">Tags</span>
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="family, routine"
              className="form-input"
            />
          </label>
        </div>

        <fieldset className="form-field">
          <legend className="form-label">Importance</legend>
          <div className="segmented-control">
            {IMPORTANCE_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setImportance(level)}
                aria-pressed={importance === level}
                className={importance === level ? "is-selected" : ""}
              >
                {level}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {error ? (
        <p className="px-1 text-[13px] font-medium text-[#b54456]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSaving}
        className="primary-button w-full"
      >
        {isSaving ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
