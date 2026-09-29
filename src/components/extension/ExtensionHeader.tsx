"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface ExtensionHeaderProps {
  /** Page title shown center-left. */
  title: string;
  /** Optional back-link target — when set, renders a back chevron. */
  backHref?: string;
}

/**
 * Top bar of an extension popup page. Optional back chevron (when
 * `backHref` is set) + page title on the left, theme toggle on the
 * right.
 */
export function ExtensionHeader({ title, backHref }: ExtensionHeaderProps) {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b border-border bg-bg-base px-3">
      {backHref ? (
        <Link
          href={backHref}
          aria-label="Back"
          className="inline-flex h-7 w-7 items-center justify-center rounded-control text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
        >
          <ChevronLeft size={14} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className="w-1" />
      )}
      <h2 className="flex-1 truncate text-sm font-medium text-fg-primary">{title}</h2>
      <ThemeToggle size="sm" />
    </header>
  );
}