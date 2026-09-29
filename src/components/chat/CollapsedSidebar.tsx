"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/shared/Logo";
import { NewChatButton } from "@/components/chat/NewChatButton";
import { ConversationList } from "@/components/chat/ConversationList";
import { SidebarFooter } from "@/components/chat/SidebarFooter";

interface CollapsedSidebarProps {
  className?: string;
}

/**
 * Tablet sidebar (md → lg, 768–1024 px). 64 px icon-only rail.
 * Shows the logo mark, a square "New chat" icon, the most recent
 * conversations as icons, and a collapsed footer with History /
 * Settings / Theme.
 */
export function CollapsedSidebar({ className }: CollapsedSidebarProps) {
  return (
    <aside
      aria-label="Workspace navigation"
      className={cn(
        "hidden md:flex lg:hidden h-full w-16 shrink-0 flex-col items-center border-r border-border bg-bg-elevated",
        className,
      )}
    >
      <div className="flex h-16 w-full items-center justify-center border-b border-border">
        <Link
          href="/app"
          aria-label="Go to workspace"
          className="flex h-12 w-12 items-center justify-center rounded-control hover:bg-bg-hover"
        >
          <Logo size="sm" hideWordmark />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 py-3">
        <NewChatButton iconOnly />
      </div>

      <ConversationList iconOnly className="mt-1" />

      <SidebarFooter iconOnly className="mt-auto" />
    </aside>
  );
}