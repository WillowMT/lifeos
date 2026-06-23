export function LoadingList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-label="Loading memories">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="glass-card h-32 motion-safe:animate-pulse bg-white/50"
        />
      ))}
    </div>
  );
}
