import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      {/* Table/List */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Reusable table skeleton with configurable columns
interface TableSkeletonProps {
  columns: Array<{
    label: string;
    width?: string;
    align?: "left" | "right" | "center";
  }>;
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 font-medium ${
                  column.align === "right"
                    ? "text-right"
                    : column.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-t">
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`px-4 py-3 ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : "text-left"
                  }`}
                >
                  {index === columns.length - 1 &&
                  column.label === "Actions" ? (
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-12" />
                    </div>
                  ) : (
                    <Skeleton className={`h-4 ${column.width || "w-24"}`} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Dashboard specific skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Recent Activity */}
      <CardSkeleton />
    </div>
  );
}

// Waitlists page skeleton
export function WaitlistsTableSkeleton() {
  const columns = [
    { label: "Waitlist ID", width: "w-24" },
    { label: "Name", width: "w-32" },
    { label: "Description", width: "w-40" },
    { label: "Date Created", width: "w-20" },
    { label: "Actions", align: "right" as const },
  ];

  return <TableSkeleton columns={columns} rows={5} />;
}

// Members table skeleton
export function MembersTableSkeleton() {
  const columns = [
    { label: "Name", width: "w-32" },
    { label: "Email", width: "w-40" },
    { label: "Referral Code", width: "w-24" },
    { label: "Referrals", width: "w-16", align: "center" as const },
    { label: "Joined", width: "w-20" },
    { label: "Actions", align: "right" as const },
  ];

  return <TableSkeleton columns={columns} rows={8} />;
}

// Analytics page skeleton
export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Top Referrers Table */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <TableSkeleton
          columns={[
            { label: "Name", width: "w-32" },
            { label: "Email", width: "w-40" },
            { label: "Referrals", width: "w-16", align: "center" as const },
            { label: "Reward", width: "w-20" },
          ]}
          rows={5}
        />
      </div>
    </div>
  );
}

// Settings page skeleton
export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <CardSkeleton />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
