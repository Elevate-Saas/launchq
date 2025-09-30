import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChartContainer, AreaChart, BarChart } from "@/components/ui/chart";
import { BackButton } from "@/components/back-button";

const mockGlobal = [
  { label: "W1", value: 1200 },
  { label: "W2", value: 1500 },
  { label: "W3", value: 1400 },
  { label: "W4", value: 1800 },
  { label: "W5", value: 2200 },
  { label: "W6", value: 2600 },
];

const mockWaitlistPerf = [
  { label: "A", value: 10000 },
  { label: "B", value: 5000 },
  { label: "C", value: 3200 },
  { label: "D", value: 2800 },
  { label: "E", value: 2400 },
];

const mockWaitlists = [
  { id: "wl_A", name: "Product A", users: 10000, createdAt: "2025-08-01" },
  { id: "wl_B", name: "Product B", users: 5000, createdAt: "2025-08-12" },
  { id: "wl_C", name: "Product C", users: 3200, createdAt: "2025-09-02" },
  { id: "wl_D", name: "Product D", users: 2800, createdAt: "2025-09-11" },
  { id: "wl_E", name: "Product E", users: 2400, createdAt: "2025-09-19" },
];

export default function OrganizationAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const top4 = [...mockWaitlists].sort((a, b) => b.users - a.users).slice(0, 4);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <BackButton className="w-fit justify-start" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Organization Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Global and waitlist performance for{" "}
            <span className="font-mono text-xs">{id}</span>.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/dashboard/organizations/${id}/members`}>
            Manage Members
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">
            Global Performance (signups)
          </h2>
          <ChartContainer height={260} className="mt-2">
            <AreaChart data={mockGlobal} />
          </ChartContainer>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">
            Waitlist Performance (users)
          </h2>
          <ChartContainer height={260} className="mt-2">
            <BarChart data={mockWaitlistPerf} />
          </ChartContainer>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border p-4 lg:col-span-2">
          <h2 className="text-base font-medium">All Waitlists</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">ID</th>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Users</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Date Created
                  </th>
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
                    <td className="px-4 py-2">{w.users.toLocaleString()}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {w.createdAt}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="inline-flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/dashboard/waitlists/${w.id}`}>
                            Settings
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/dashboard/waitlists/${w.id}/analytics`}>
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

        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">Top Performers (this month)</h2>
          <div className="mt-3 grid gap-3">
            {top4.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="grid">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.id}</span>
                </div>
                <span className="text-sm font-semibold">
                  {t.users.toLocaleString()} users
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
