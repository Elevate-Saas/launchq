"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart as RAreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type DataPoint = { label: string; value: number };

export function ChartContainer({
  height = 220,
  className,
  ...props
}: React.ComponentProps<"div"> & { height?: number }) {
  return (
    <div
      className={"rounded-xl border p-4 " + (className ?? "")}
      style={{ height }}
      {...props}
    />
  );
}

export function AreaChart({
  data,
  color = "var(--primary)",
}: {
  data: DataPoint[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RAreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="label"
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={30}
        />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill="url(#area)"
          strokeWidth={2}
        />
      </RAreaChart>
    </ResponsiveContainer>
  );
}

export function BarChart({
  data,
  color = "var(--secondary)",
}: {
  data: DataPoint[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="label"
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={30}
        />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
      </RBarChart>
    </ResponsiveContainer>
  );
}
