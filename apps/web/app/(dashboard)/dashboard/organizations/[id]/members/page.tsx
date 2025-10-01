"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Member = {
  email: string;
  role: "SuperAdmin" | "Admin" | "Support Staff" | "Developer";
};

const initialMembers: Member[] = [
  { email: "ceo@launchq.com", role: "SuperAdmin" },
  { email: "admin@launchq.com", role: "Admin" },
  { email: "support@launchq.com", role: "Support Staff" },
  { email: "dev@launchq.com", role: "Developer" },
];

export default function OrganizationMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Member["role"]>("Admin");

  function addMember(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail) return;
    setMembers((prev) => [...prev, { email: newEmail, role: newRole }]);
    setNewEmail("");
    setNewRole("Admin");
  }

  function removeMember(email: string) {
    setMembers((prev) => prev.filter((m) => m.email !== email));
  }

  function updateRole(email: string, role: Member["role"]) {
    setMembers((prev) =>
      prev.map((m) => (m.email === email ? { ...m, role } : m)),
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">
            Add or remove members for{" "}
            <span className="font-mono text-xs">{id}</span>.
          </p>
        </div>
      </div>

      <form onSubmit={addMember} className="rounded-xl border p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
          <Input
            type="email"
            placeholder="email@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as Member["role"])}
          >
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Admin">Admin</option>
            <option value="Support Staff">Support Staff</option>
            <option value="Developer">Developer</option>
          </Select>
          <Button type="submit">Add Member</Button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Role</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email} className="border-t">
                <td className="px-4 py-2">{m.email}</td>
                <td className="px-4 py-2">
                  <Select
                    value={m.role}
                    onChange={(e) =>
                      updateRole(m.email, e.target.value as Member["role"])
                    }
                  >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Support Staff">Support Staff</option>
                    <option value="Developer">Developer</option>
                  </Select>
                </td>
                <td className="px-4 py-2 text-right">
                  <Button
                    variant="destructive"
                    onClick={() => removeMember(m.email)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
