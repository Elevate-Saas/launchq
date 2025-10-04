"use client";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { DashboardSkeleton } from "@/components/skeletons/page-skeleton";
import { useMultipleQueryLoading } from "@/hooks/use-loading";
import { useGetAuthUser } from "@/lib/api";

// Example of using multiple queries for complex loading
export default function WaitlistDetailsPage() {
  const authUserQuery = useGetAuthUser();
  // const waitlistQuery = useGetWaitlist(id); // Example additional query
  // const membersQuery = useGetWaitlistMembers(id); // Example additional query

  // For now, just using auth query, but this shows how to handle multiple queries
  const { isLoading } = useMultipleQueryLoading(
    [
      authUserQuery,
      // waitlistQuery,
      // membersQuery,
    ],
    {
      requireAny: true, // Any query loading means page is loading
    },
  );

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Waitlist Details
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage waitlist details, members, and analytics.
          </p>
        </div>
      </div>

      <LoadingWrapper
        isLoading={isLoading}
        variant="dashboard"
        skeleton={<DashboardSkeleton />}
      >
        <div className="space-y-6">
          {/* Waitlist details content will go here */}
          <div className="text-center py-12 text-muted-foreground">
            Waitlist details content coming soon...
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
}
