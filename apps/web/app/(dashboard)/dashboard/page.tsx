"use client";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChartContainer, AreaChart, BarChart } from "@/components/ui/chart";
import { Select } from "@/components/ui/select";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { useUserStore } from "@/lib/stores/user-store";

const mockStats = {
  totalWaitlists: 2,
  totalSignups: 1342,
  totalReferrals: 578,
  conversionRate: 12.4,
};

const recentActivity = [
  {
    id: 1,
    title: "New signup",
    desc: "ava@example.com joined LaunchQ Early Access",
    at: "2m ago",
  },
  {
    id: 2,
    title: "Referral milestone",
    desc: "jordan@example.com reached 10 referrals",
    at: "1h ago",
  },
  {
    id: 3,
    title: "New waitlist",
    desc: "Created ‘Beta Partners’",
    at: "Yesterday",
  },
];

export default function DashboardOverviewPage() {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const { isLoading } = useUserStore();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">
            High-level performance and quick actions.
          </p>
        </div>
        <div className="inline-flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/waitlists">View Waitlists</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/waitlists/new">Create Waitlist</Link>
          </Button>
        </div>
      </div>

      <LoadingWrapper isLoading={isLoading} variant="dashboard">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">Total Waitlists</div>
            <div className="mt-1 text-2xl font-semibold">
              {mockStats.totalWaitlists}
            </div>
            <ChartContainer height={100} className="mt-3 p-0">
              <AreaChart
                data={[
                  { label: "W1", value: 2 },
                  { label: "W2", value: 4 },
                  { label: "W3", value: 3 },
                  { label: "W4", value: 5 },
                  { label: "W5", value: 6 },
                  { label: "W6", value: 7 },
                  { label: "W7", value: 6 },
                  { label: "W8", value: 8 },
                ]}
              />
            </ChartContainer>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">Total Signups</div>
            <div className="mt-1 text-2xl font-semibold">
              {mockStats.totalSignups.toLocaleString()}
            </div>
            <ChartContainer height={100} className="mt-3 p-0">
              <AreaChart
                data={[120, 180, 160, 220, 240, 260, 280, 320, 340].map(
                  (v, i) => ({ label: `W${i + 1}`, value: v }),
                )}
              />
            </ChartContainer>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">Total Referrals</div>
            <div className="mt-1 text-2xl font-semibold">
              {mockStats.totalReferrals.toLocaleString()}
            </div>
            <ChartContainer height={100} className="mt-3 p-0">
              <AreaChart
                data={[40, 60, 55, 80, 90, 110, 95, 140].map((v, i) => ({
                  label: `W${i + 1}`,
                  value: v,
                }))}
              />
            </ChartContainer>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">Conversion Rate</div>
            <div className="mt-1 text-2xl font-semibold">
              {mockStats.conversionRate}%
            </div>
            <ChartContainer height={100} className="mt-3 p-0">
              <AreaChart
                data={[10, 11, 10.5, 12, 12.4, 12.8, 12.2, 12.9, 13].map(
                  (v, i) => ({ label: `W${i + 1}`, value: v }),
                )}
              />
            </ChartContainer>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border p-4 lg:col-span-2">
            <h2 className="text-base font-medium">Recent Activity</h2>
            <ul className="mt-3 grid gap-3">
              {recentActivity.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="grid gap-0.5">
                    <span className="text-sm">{a.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {a.desc}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.at}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="text-base font-medium">Quick Start</h2>
            <div className="mt-3 grid gap-2 text-sm">
              <Link
                className="underline underline-offset-4"
                href="/dashboard/waitlists/new"
              >
                Create your first waitlist
              </Link>
              <Link
                className="underline underline-offset-4"
                href="/dashboard/waitlists"
              >
                Review waitlists
              </Link>
              <span className="text-muted-foreground">
                Enable email verification and referrals in settings
              </span>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-medium">Signups (last 12d)</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Chart type</span>
                <Select
                  value={chartType}
                  onChange={(e) =>
                    setChartType(e.target.value as "area" | "bar")
                  }
                  className="h-7 px-2 text-xs"
                >
                  <option value="area">Area</option>
                  <option value="bar">Bar</option>
                </Select>
              </div>
            </div>
            <ChartContainer height={260} className="mt-2">
              {chartType === "area" ? (
                <AreaChart
                  data={[
                    { label: "D1", value: 20 },
                    { label: "D2", value: 32 },
                    { label: "D3", value: 28 },
                    { label: "D4", value: 42 },
                    { label: "D5", value: 36 },
                    { label: "D6", value: 40 },
                    { label: "D7", value: 45 },
                    { label: "D8", value: 38 },
                    { label: "D9", value: 52 },
                    { label: "D10", value: 48 },
                    { label: "D11", value: 60 },
                    { label: "D12", value: 55 },
                  ]}
                />
              ) : (
                <BarChart
                  data={[
                    { label: "D1", value: 20 },
                    { label: "D2", value: 32 },
                    { label: "D3", value: 28 },
                    { label: "D4", value: 42 },
                    { label: "D5", value: 36 },
                    { label: "D6", value: 40 },
                    { label: "D7", value: 45 },
                    { label: "D8", value: 38 },
                    { label: "D9", value: 52 },
                    { label: "D10", value: 48 },
                    { label: "D11", value: 60 },
                    { label: "D12", value: 55 },
                  ]}
                />
              )}
            </ChartContainer>
          </div>
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-medium">Referrals (last 12d)</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Chart type</span>
                <Select
                  value={chartType}
                  onChange={(e) =>
                    setChartType(e.target.value as "area" | "bar")
                  }
                  className="h-7 px-2 text-xs"
                >
                  <option value="area">Area</option>
                  <option value="bar">Bar</option>
                </Select>
              </div>
            </div>
            <ChartContainer height={260} className="mt-2">
              {chartType === "area" ? (
                <AreaChart
                  data={[
                    { label: "D1", value: 8 },
                    { label: "D2", value: 12 },
                    { label: "D3", value: 10 },
                    { label: "D4", value: 18 },
                    { label: "D5", value: 16 },
                    { label: "D6", value: 14 },
                    { label: "D7", value: 20 },
                    { label: "D8", value: 15 },
                    { label: "D9", value: 22 },
                    { label: "D10", value: 19 },
                    { label: "D11", value: 24 },
                    { label: "D12", value: 21 },
                  ]}
                />
              ) : (
                <BarChart
                  data={[
                    { label: "D1", value: 8 },
                    { label: "D2", value: 12 },
                    { label: "D3", value: 10 },
                    { label: "D4", value: 18 },
                    { label: "D5", value: 16 },
                    { label: "D6", value: 14 },
                    { label: "D7", value: 20 },
                    { label: "D8", value: 15 },
                    { label: "D9", value: 22 },
                    { label: "D10", value: 19 },
                    { label: "D11", value: 24 },
                    { label: "D12", value: 21 },
                  ]}
                />
              )}
            </ChartContainer>
          </div>
        </section>
      </LoadingWrapper>
    </div>
  );
}
