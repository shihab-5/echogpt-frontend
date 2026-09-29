"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, LogIn, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UserMenu } from "@/components/shared/UserMenu";
import { useUser } from "@/hooks/use-user";

interface SidebarFooterProps {
  /** Render icon-only footer (used by the 64 px collapsed sidebar). */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Sidebar footer. Hosts the secondary nav (Settings, History), the
 * theme toggle, and (when signed in) the user menu — or a sign-in
 * shortcut. The current section is highlighted via the same red-dot /
 * red-edge pattern used for active conversations.
 */
export function SidebarFooter({ iconOnly = false, className }: SidebarFooterProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const isHistory = pathname.startsWith("/app/history");
  const isSettings = pathname.startsWith("/app/settings");

  if (iconOnly) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 border-t border-border py-3",
          className,
        )}
      >
        {user ? (
          <UserMenu />
        ) : (
          <Link
            href="/signin"
            aria-label="Sign in"
            className="inline-flex h-10 w-10 items-center justify-center rounded-control text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
          >
            <LogIn size={16} aria-hidden="true" />
          </Link>
        )}
        <IconButton
          aria-label="History"
          size="md"
          mobileTapTarget={false}
          aria-current={isHistory ? "page" : undefined}
          className={cn(
            isHistory && "bg-brand-subtle text-fg-primary",
          )}
        >
          <Link
            href="/app/history"
            aria-label="History"
            className="flex h-full w-full items-center justify-center"
          >
            <History size={16} aria-hidden="true" />
          </Link>
        </IconButton>
        <IconButton
          aria-label="Settings"
          size="md"
          mobileTapTarget={false}
          aria-current={isSettings ? "page" : undefined}
          className={cn(
            isSettings && "bg-brand-subtle text-fg-primary",
          )}
        >
          <Link
            href="/app/settings"
            aria-label="Settings"
            className="flex h-full w-full items-center justify-center"
          >
            <SettingsIcon size={16} aria-hidden="true" />
          </Link>
        </IconButton>
        <div className="mt-1">
          <ThemeToggle size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-t border-border px-3 py-3",
        className,
      )}
    >
      {user && (
        <div className="mb-1 rounded-md p-1">
          <UserMenu />
        </div>
      )}
      <FooterLink href="/app/history" active={isHistory} icon={<History size={14} />}>
        History
      </FooterLink>
      <FooterLink href="/app/settings" active={isSettings} icon={<SettingsIcon size={14} />}>
        Settings
      </FooterLink>
      {!user && (
        <FooterLink href="/signin" active={false} icon={<LogIn size={14} />}>
          Sign in
        </FooterLink>
      )}
      <div className="mt-1">
        <ThemeToggle size="sm" />
      </div>
    </div>
  );
}

function FooterLink({
  href,
  active,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center gap-2 rounded-md px-2.5 py-2 text-sm",
        "transition-colors duration-fast",
        active
          ? "bg-brand-subtle text-fg-primary"
          : "text-fg-secondary hover:bg-bg-hover hover:text-fg-primary",
      )}
    >
      {active && (
        <>
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand"
          />
          <span
            aria-hidden="true"
            className="ml-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
          />
        </>
      )}
      <span aria-hidden="true" className={cn("shrink-0", active ? "ml-1" : "ml-2")}>
        {icon}
      </span>
      <span className="truncate font-medium">{children}</span>
    </Link>
  );
}