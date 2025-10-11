"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Settings, UserPlus } from "lucide-react";

export default function SignupsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [urlCopied, setUrlCopied] = React.useState(false);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(
      `https://getwaitlist.com/waitlist/${id}`,
    );
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <UserPlus className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Signups Yet</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Get started by building your widget or sharing your waitlist.
      </p>

      <div className="flex gap-3">
        <Button asChild>
          <Link href={`/dashboard/waitlists/${id}/widget`}>
            <Settings className="h-4 w-4 mr-2" />
            Widget Builder
          </Link>
        </Button>
        <Button variant="outline" onClick={handleCopyUrl}>
          <Copy className="h-4 w-4 mr-2" />
          {urlCopied ? "Copied!" : "Copy URL"}
        </Button>
      </div>
    </div>
  );
}
