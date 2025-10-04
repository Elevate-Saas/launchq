"use client";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { SettingsSkeleton } from "@/components/skeletons/page-skeleton";
import { useUserStore } from "@/lib/stores/user-store";

export default function SettingsPage() {
  const { isLoading } = useUserStore();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and application preferences.
          </p>
        </div>
      </div>

      <LoadingWrapper
        isLoading={isLoading}
        variant="page"
        skeleton={<SettingsSkeleton />}
      >
        <div className="space-y-6">
          {/* Settings content will go here */}
          <div className="text-center py-12 text-muted-foreground">
            Settings content coming soon...
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
}
