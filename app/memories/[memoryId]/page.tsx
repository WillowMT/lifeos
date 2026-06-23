import type { Id } from "@/convex/_generated/dataModel";
import { MemoryDetail } from "./memory-detail";

export default async function MemoryDetailPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const { memoryId } = await params;
  return <MemoryDetail memoryId={memoryId as Id<"memories">} />;
}
