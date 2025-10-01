import * as React from "react";
import { BackButton } from "@/components/back-button";
import { ChartContainer, AreaChart, BarChart } from "@/components/ui/chart";

const signups = [
  { label: "W1", value: 120 },
  { label: "W2", value: 180 },
  { label: "W3", value: 160 },
  { label: "W4", value: 220 },
  { label: "W5", value: 260 },
  { label: "W6", value: 280 },
];

const referrals = [
  { label: "W1", value: 40 },
  { label: "W2", value: 55 },
  { label: "W3", value: 60 },
  { label: "W4", value: 75 },
  { label: "W5", value: 90 },
  { label: "W6", value: 95 },
];

export default function WaitlistAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <BackButton className="w-fit justify-start" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Waitlist Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Performance for <span className="font-mono text-xs">{id}</span>.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">Signups Trend</h2>
          <ChartContainer height={260} className="mt-2">
            <AreaChart data={signups} />
          </ChartContainer>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="text-base font-medium">Referrals Trend</h2>
          <ChartContainer height={260} className="mt-2">
            <BarChart data={referrals} />
          </ChartContainer>
        </div>
      </section>
    </div>
  );
}
