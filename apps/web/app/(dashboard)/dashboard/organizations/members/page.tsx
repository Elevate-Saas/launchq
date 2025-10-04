"use client";
import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { MembersTableSkeleton } from "@/components/skeletons/page-skeleton";
import { useGetOrganization } from "@/lib/api/organization";
import { useGetAuthUser } from "@/lib/api";
import { useMultipleQueryLoading } from "@/hooks/use-loading";
import {
  ISuccessResponse,
  Organization,
  OrganizationMember,
  ResponseStateEnum,
} from "@launchq/core";

export default function OrganizationMembersPage() {
  const authUserQuery = useGetAuthUser();

  // Only query organization if we have user data
  const organizationQuery = useGetOrganization();

  const { isLoading } = useMultipleQueryLoading(
    [authUserQuery, organizationQuery],
    { requireAny: true },
  );

  const organization =
    organizationQuery.data?.data?.state === ResponseStateEnum.SUCCESS
      ? (
          (organizationQuery.data.data as ISuccessResponse)
            .data as Organization[]
        )?.[0] || null
      : null;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            Manage organization members and permissions.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/organizations/members/invite">
            Invite Member
          </Link>
        </Button>
      </div>

      <LoadingWrapper
        isLoading={isLoading}
        variant="table"
        skeleton={<MembersTableSkeleton />}
      >
        <div className="space-y-6">
          {organization?.members && organization.members.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Name</th>
                    <th className="px-4 py-2 text-left font-medium">Email</th>
                    <th className="px-4 py-2 text-left font-medium">Role</th>
                    <th className="px-4 py-2 text-left font-medium">Joined</th>
                    <th className="px-4 py-2 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {organization.members.map((member: OrganizationMember) => (
                    <tr key={member.id} className="border-t">
                      <td className="px-4 py-2">{member.name || "N/A"}</td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {member.email}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="inline-flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No members found.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/organizations/members/invite">
                  Invite your first member
                </Link>
              </Button>
            </div>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
}
