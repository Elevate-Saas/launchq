"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const waitlistTabs = [
  { href: "signups", label: "Signups" },
  { href: "widget", label: "Widget Builder" },
  { href: "settings", label: "Settings" },
  { href: "analytics", label: "Analytics" },
];

export default function WaitlistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const { id } = React.use(params);

  function isActive(href: string) {
    return pathname?.includes(`/waitlists/${id}/${href}`);
  }

  return (
    <div className="space-y-6">
      {/* Waitlist Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">LaunchQ</h1>
            <p className="text-sm text-muted-foreground">
              Manage your waitlist settings and widgets
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-4">
          <div className="flex space-x-8 border-b">
            {waitlistTabs.map((tab) => (
              <Link
                key={tab.href}
                href={`/dashboard/waitlists/${id}/${tab.href}`}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  isActive(tab.href)
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
