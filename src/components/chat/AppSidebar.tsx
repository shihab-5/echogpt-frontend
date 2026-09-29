"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/shared/Logo";
import { NewChatButton } from "@/components/chat/NewChatButton";
import { SearchInput } from "@/components/chat/SearchInput";
import { ConversationList } from "@/components/chat/ConversationList";
import { SidebarFooter } from "@/components/chat/SidebarFooter";

interface AppSidebarProps {
  className?: string;
}

/**
 * Desktop sidebar (≥ lg, 1024 px). 260 px wide, right border,
 * logo at top, search + new-chat, scrollable conversation list,
 * pinned footer with Settings + History + Theme toggle.
 *
 * Owns the search-query state and pipes it into <ConversationList />.
 */
export function AppSidebar({ className }: AppSidebarProps) {
  const [query, setQuery] = useState("");

  return (
    <aside
      aria-label="Workspace navigation"
      className={cn(
        "hidden lg:flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-bg-elevated",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-border px-3">
        <Link href="/app" aria-label="Go to workspace" className="inline-flex">
          <Logo size="sm" />
        </Link>
      </div>

      <div className="space-y-2 px-3 py-3">
        <NewChatButton />
        <SearchInput value={query} onChange={setQuery} />
      </div>

      <ConversationList query={query} />

      <SidebarFooter />
    </aside>
  );
}
