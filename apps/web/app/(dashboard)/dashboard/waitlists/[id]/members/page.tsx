"use client";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { MembersTableSkeleton } from "@/components/skeletons/page-skeleton";
import { useUserStore } from "@/lib/stores/user-store";

export default function WaitlistMembersPage() {
  const { isLoading } = useUserStore();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            View and manage waitlist members and their referrals.
          </p>
        </div>
      </div>

      <LoadingWrapper
        isLoading={isLoading}
        variant="table"
        skeleton={<MembersTableSkeleton />}
      >
        <div className="space-y-6">
          {/* Members table content will go here */}
          <div className="text-center py-12 text-muted-foreground">
            Members table coming soon...
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
}
