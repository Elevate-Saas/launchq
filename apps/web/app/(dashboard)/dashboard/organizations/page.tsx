import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const mockOrgs = [
  {
    id: "org_001",
    name: "LaunchQ Inc.",
    email: "ops@launchq.com",
    members: 8,
    createdAt: "2025-09-01",
  },
];

export default function OrganizationsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Organizations
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage tenants and members.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/organizations/new">Create Organization</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Members</th>
              <th className="px-4 py-2 text-left font-medium">Date Created</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrgs.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {o.id}
                </td>
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{o.email}</td>
                <td className="px-4 py-2">{o.members}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {o.createdAt}
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="inline-flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/organizations/${o.id}/members`}>
                        Members
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/organizations/${o.id}/analytics`}>
                        Analytics
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
