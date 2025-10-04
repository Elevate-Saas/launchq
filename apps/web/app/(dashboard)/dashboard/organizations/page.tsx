"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  useGetOrganization,
  useCreateOrganization,
} from "@/lib/api/organization";
import { useUserStore } from "@/lib/stores/user-store";
import { useSingleQueryLoading } from "@/hooks/use-loading";
import { ResponseStateEnum } from "@launchq/core";
import { Loader } from "@/components/ui/loader";

export default function OrganizationsPage() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUserStore();

  // Only query organization if we have user data
  const organizationQuery = useGetOrganization();

  const createOrganizationMutation = useCreateOrganization();
  const { isLoading: orgLoading } = useSingleQueryLoading(organizationQuery);
  const isLoading = userLoading || orgLoading;

  const handleCreateOrganization = () => {
    router.push("/dashboard/organizations/new");
  };

  // Get the first (and only) organization from the array
  const organization =
    organizationQuery.data?.data?.state === ResponseStateEnum.SUCCESS
      ? organizationQuery.data.data.data?.[0] || null
      : null;

  // If no organization exists, show create flow
  if (!isLoading && !organization) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Organization
            </h1>
            <p className="text-sm text-muted-foreground">
              Create your organization to get started.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <svg
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No organization yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Create your organization to start managing waitlists and team
            members.
          </p>
          <Button onClick={handleCreateOrganization}>
            Create Organization
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Organization
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your organization and team members.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/organizations/members">Manage Members</Link>
        </Button>
      </div>

      <LoadingWrapper isLoading={isLoading} variant="card">
        {organization && (
          <Card>
            <CardHeader>
              <CardTitle>{organization.businessName}</CardTitle>
              <CardDescription>{organization.businessEmail}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Organization ID
                  </p>
                  <p className="font-mono text-sm">{organization.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-semibold">
                    {organization.members?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </LoadingWrapper>
    </div>
  );
}
