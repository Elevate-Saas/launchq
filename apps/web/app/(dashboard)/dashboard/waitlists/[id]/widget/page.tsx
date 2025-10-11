import * as React from "react";
import { WidgetBuilder } from "@/components/widget-builder";

export default function WidgetBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return <WidgetBuilder waitlistId={id} />;
}
