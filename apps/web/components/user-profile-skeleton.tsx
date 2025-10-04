import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg p-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 min-w-0 space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-4 w-4" />
    </div>
  );
}
