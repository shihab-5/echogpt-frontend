"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown } from "@/components/ui/Dropdown";
import { useUser } from "@/hooks/use-user";

/**
 * Account dropdown rendered in the marketing header + the workspace
 * sidebar once a user is "signed in" (mock — see `src/hooks/use-user.ts`).
 *
 * The avatar trigger is the existing `<Avatar />` primitive so the visual
 * weight matches the rest of the chrome. The dropdown lists a disabled
 * header (name + email), a primary "Open the workspace" item, and a
 * destructive-flavored "Sign out" item.
 */
export function UserMenu() {
  const { user, signOut } = useUser();
  const router = useRouter();
  if (!user) return null;

  return (
    <Dropdown
      align="end"
      ariaLabel={`Account menu for ${user.name}`}
      width={280}
      trigger={<Avatar name={user.name} size="sm" />}
      items={[
        {
          id: "header",
          label: user.name,
          description: user.email,
          disabled: true,
        },
        {
          id: "workspace",
          label: "Open the workspace",
          icon: <ArrowRight size={14} aria-hidden="true" />,
        },
        {
          id: "signout",
          label: "Sign out",
          description: "Wipes the mock user from this device.",
          icon: <LogOut size={14} aria-hidden="true" />,
        },
      ]}
      onSelect={(id) => {
        if (id === "workspace") router.push("/app");
        else if (id === "signout") signOut();
      }}
    />
  );
}