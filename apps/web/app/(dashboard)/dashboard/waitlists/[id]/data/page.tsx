import * as React from "react";

const mockSignups = [
  { email: "alice@example.com", joinedAt: "2025-09-10", referrals: 3 },
  { email: "bob@example.com", joinedAt: "2025-09-11", referrals: 0 },
  { email: "cara@example.com", joinedAt: "2025-09-12", referrals: 7 },
];

export default function WaitlistDataPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Waitlist Data</h1>
        <p className="text-sm text-muted-foreground">
          Signups for <span className="font-mono text-xs">{id}</span>.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Joined</th>
              <th className="px-4 py-2 text-left font-medium">Referrals</th>
            </tr>
          </thead>
          <tbody>
            {mockSignups.map((s) => (
              <tr key={s.email} className="border-t">
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {s.joinedAt}
                </td>
                <td className="px-4 py-2">{s.referrals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
