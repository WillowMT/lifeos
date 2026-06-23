"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptyState } from "@/components/empty-state";
import { LoadingList } from "@/components/loading-list";
import { MemoryCard } from "@/components/memory-card";
import { QuickCapture } from "@/components/quick-capture";
import { ArrowIcon } from "@/components/icons";


export default function TodayPage() {
  const recentMemories = useQuery(api.memories.listRecentMemories, { limit: 5 });
  const importantMemories = useQuery(api.memories.listImportantMemories, {
    limit: 3,
  });
  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-9">
      <header className="page-header">
        <div>
          <p className="eyebrow">Your private space</p>
          <h1>Daybase</h1>
        </div>
        <p suppressHydrationWarning>{today}</p>
      </header>

      <section aria-labelledby="quick-capture-heading">
        <h2 id="quick-capture-heading" className="sr-only">
          Quick capture
        </h2>
        <QuickCapture />
      </section>

      <section aria-labelledby="recent-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest</p>
            <h2 id="recent-heading">Recent memories</h2>
          </div>
          <Link href="/memories" className="section-link">
            See all <ArrowIcon className="size-3.5" />
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {recentMemories === undefined ? (
            <LoadingList count={3} />
          ) : recentMemories.length ? (
            recentMemories.map((memory) => (
              <MemoryCard key={memory._id} memory={memory} />
            ))
          ) : (
            <EmptyState
              title="Your memory bank is ready"
              description="Capture one thought above and it will appear here."
            />
          )}
        </div>
      </section>

      <section aria-labelledby="important-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Keep close</p>
            <h2 id="important-heading">Important</h2>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {importantMemories === undefined ? (
            <LoadingList count={2} />
          ) : importantMemories.length ? (
            importantMemories.map((memory) => (
              <MemoryCard key={memory._id} memory={memory} compact />
            ))
          ) : (
            <EmptyState
              title="Nothing marked important"
              description="High-importance memories will stay within easy reach here."
            />
          )}
        </div>
      </section>
    </div>
  );
}
