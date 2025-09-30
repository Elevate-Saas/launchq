import * as React from "react";

export default function WidgetBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Widget Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Design your custom signup widget for{" "}
          <span className="font-mono text-xs">{id}</span> (UI only).
        </p>
      </div>
      <div className="rounded-xl border p-6 text-sm text-muted-foreground">
        <p>Preview and controls would appear here.</p>
      </div>
    </div>
  );
}
