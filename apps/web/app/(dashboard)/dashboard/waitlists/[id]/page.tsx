import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function WaitlistSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Waitlist Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage configuration for{" "}
            <span className="font-mono text-xs">{id}</span>.
          </p>
        </div>
        <div className="inline-flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/waitlists/${id}/edit`}>Edit</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/dashboard/waitlists/${id}/widget`}>
              Widget Builder
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Summary of waitlist configuration (UI only).
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">Quick Links</h2>
          <ul className="mt-2 grid gap-2 text-sm">
            <li>
              <Link
                className="underline underline-offset-4"
                href={`/dashboard/waitlists/${id}/data`}
              >
                Waitlist Data
              </Link>
            </li>
            <li>
              <Link
                className="underline underline-offset-4"
                href={`/dashboard/waitlists/${id}/analytics`}
              >
                Analytics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
