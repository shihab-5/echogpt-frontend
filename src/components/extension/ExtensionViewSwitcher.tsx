"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface ExtensionViewSwitcherProps {
  className?: string;
}

const TABS: ReadonlyArray<{ href: string; label: string; match: string }> = [
  { href: "/extension", label: "Prompt", match: "/extension" },
  { href: "/extension/history", label: "History", match: "/extension/history" },
  { href: "/extension/settings", label: "Settings", match: "/extension/settings" },
];

/**
 * Pill nav with three real <Link> buttons. The "Prompt" tab also
 * matches `?conversation=<id>` since that lives at the same route.
 *
 * The active state uses the same red-dot + red-edge grammar as the
 * sidebar / dropdown selected items — the locked visual language.
 */
export function ExtensionViewSwitcher({ className }: ExtensionViewSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Extension views"
      className={cn(
        "flex shrink-0 items-center gap-1 border-b border-border bg-bg-base px-2 py-2",
        className,
      )}
    >
      {TABS.map((tab) => {
        const active = pathname === tab.match;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-7 flex-1 items-center justify-center rounded-md text-xs font-medium",
              "transition-colors duration-fast focus-visible:outline-none",
              active
                ? "bg-brand-subtle text-fg-primary"
                : "text-fg-secondary hover:bg-bg-hover hover:text-fg-primary",
            )}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute left-1 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-brand"
              />
            )}
            <span className={cn(active && "ml-2")}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}