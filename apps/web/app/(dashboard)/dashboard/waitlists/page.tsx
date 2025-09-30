import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const mockWaitlists = [
  {
    id: "wl_001",
    name: "LaunchQ Early Access",
    description: "Main waitlist for early users",
    createdAt: "2025-09-01",
  },
  {
    id: "wl_002",
    name: "Beta Partners",
    description: "Partners and integrations",
    createdAt: "2025-09-05",
  },
];

export default function WaitlistsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Waitlists</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your waitlists.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/waitlists/new">Create Waitlist</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Waitlist ID</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Description</th>
              <th className="px-4 py-2 text-left font-medium">Date Created</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockWaitlists.map((w) => (
              <tr key={w.id} className="border-t">
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {w.id}
                </td>
                <td className="px-4 py-2">{w.name}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {w.description}
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {w.createdAt}
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="inline-flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/waitlists/${w.id}`}>
                        Settings
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/waitlists/${w.id}/edit`}>
                        Edit
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
