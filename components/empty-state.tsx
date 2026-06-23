import { SparkIcon } from "./icons";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card flex flex-col items-center px-8 py-12 text-center">
      <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-[#eee9ff] text-[#6655a8]">
        <SparkIcon className="size-6" />
      </div>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#26252a]">
        {title}
      </h3>
      <p className="mt-1.5 max-w-xs text-[14px] leading-5 text-[#77747d]">
        {description}
      </p>
    </div>
  );
}
