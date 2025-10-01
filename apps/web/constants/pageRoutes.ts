export type PageRoute = {
  label: string;
  href: string;
};

export const pageRoutes: PageRoute[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Waitlists", href: "/dashboard/waitlists" },
  { label: "Create Waitlist", href: "/dashboard/waitlists/new" },
  { label: "Organizations", href: "/dashboard/organizations" },
  { label: "My Account", href: "/dashboard/account" },
];
