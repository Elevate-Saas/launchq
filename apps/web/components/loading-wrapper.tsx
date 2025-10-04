import { ReactNode } from "react";
import {
  PageSkeleton,
  DashboardSkeleton,
  TableSkeleton,
  CardSkeleton,
} from "./skeletons/page-skeleton";

interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
  variant?: "page" | "dashboard" | "table" | "card";
  skeleton?: ReactNode;
}

export function LoadingWrapper({
  isLoading,
  children,
  variant = "page",
  skeleton,
}: LoadingWrapperProps) {
  if (isLoading) {
    if (skeleton) {
      return <>{skeleton}</>;
    }

    switch (variant) {
      case "dashboard":
        return <DashboardSkeleton />;
      case "table":
        return <TableSkeleton columns={[]} />;
      case "card":
        return <CardSkeleton />;
      default:
        return <PageSkeleton />;
    }
  }

  return <>{children}</>;
}
