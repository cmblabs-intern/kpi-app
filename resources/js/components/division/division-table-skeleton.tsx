import { Skeleton } from "@/components/ui/skeleton";

export default function DivisionTableSkeleton() {
  return (
    <div className="space-y-2 rounded-xl border p-4 shadow-sm">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 py-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
