"use client";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { AnalyticsSkeleton } from "@/components/skeletons/page-skeleton";
import { useUserStore } from "@/lib/stores/user-store";

export default function AnalyticsPage() {
  const { isLoading } = useUserStore();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Track performance and insights across all waitlists.
          </p>
        </div>
      </div>

      <LoadingWrapper
        isLoading={isLoading}
        variant="dashboard"
        skeleton={<AnalyticsSkeleton />}
      >
        <div className="space-y-6">
          {/* Analytics content will go here */}
          <div className="text-center py-12 text-muted-foreground">
            Analytics content coming soon...
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
}
