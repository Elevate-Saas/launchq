export type PageRoute = {
  label: string;
  href: string;
};

export const pageRoutes: PageRoute[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Waitlists", href: "/dashboard/waitlists" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Organization", href: "/dashboard/organizations" },
  { label: "Settings", href: "/dashboard/settings" },
];
