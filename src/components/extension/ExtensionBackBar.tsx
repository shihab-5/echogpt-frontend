"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ExtensionBackBarProps {
  /** Page title. */
  title: string;
  /** Back-link target (always required for this component). */
  backHref: string;
}

/**
 * Minimal top bar for a popup sub-route. Just a back chevron and the
 * page title. Used on /extension/history and /extension/settings.
 */
export function ExtensionBackBar({ title, backHref }: ExtensionBackBarProps) {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b border-border bg-bg-base px-3">
      <Link
        href={backHref}
        aria-label="Back"
        className="inline-flex h-7 w-7 items-center justify-center rounded-control text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
      >
        <ChevronLeft size={14} aria-hidden="true" />
      </Link>
      <h2 className="flex-1 truncate text-sm font-medium text-fg-primary">{title}</h2>
    </header>
  );
}