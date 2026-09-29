"use client";

import { useMemo } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";
import { useConversations } from "@/hooks/use-conversations";
import {
  filterConversations,
  groupConversations,
  type ConversationGroups,
} from "@/lib/group-conversations";
import { ConversationRow } from "@/components/chat/ConversationRow";
import { SidebarSectionLabel } from "@/components/chat/SidebarSectionLabel";
import type { Conversation } from "@/types/chat";

interface ConversationListProps {
  /** Substring filter (case-insensitive) against conversation title. */
  query?: string;
  /** When true, render an icon-only rail (used by the 64 px tablet sidebar). */
  iconOnly?: boolean;
  className?: string;
}

const GROUP_LABELS: ReadonlyArray<{ key: keyof ConversationGroups; label: string }> = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last7", label: "Last 7 days" },
  { key: "last30", label: "Last 30 days" },
  { key: "older", label: "Older" },
];

/**
 * Sidebar conversation list.
 *
 * Server-renderable content but bundled as a client component because
 * (a) it composes <ConversationRow /> which needs usePathname, and
 * (b) it pulls from the conversations store via useConversations().
 *
 * Renders grouped sections (Today / Yesterday / Last 7 / Last 30 / Older).
 * The iconOnly variant is used by the 64 px tablet sidebar — it shows
 * only the active and most-recent icons, no titles or section labels.
 */
export function ConversationList({ query = "", iconOnly = false, className }: ConversationListProps) {
  const { conversations } = useConversations();

  const filtered = useMemo(
    () => filterConversations(conversations, query),
    [conversations, query],
  );

  const groups = useMemo(() => groupConversations(filtered), [filtered]);

  // Icon-only mode: just the most recent 8 conversations, no labels.
  if (iconOnly) {
    const rail = filtered.slice(0, 8);
    return (
      <ul
        aria-label="Recent conversations"
        className={cn("flex flex-col items-center gap-1", className)}
      >
        {rail.length === 0 && (
          <li
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center text-fg-muted"
          >
            <MessageSquare size={16} />
          </li>
        )}
        {rail.map((c: Conversation) => (
          <ConversationRow key={c.id} conversation={c} iconOnly />
        ))}
      </ul>
    );
  }

  // Labeled mode: grouped sections.
  return (
    <nav aria-label="Conversations" className={cn("flex-1 overflow-y-auto px-2 pb-3", className)}>
      {filtered.length === 0 && (
        <p className="px-2 py-6 text-center text-xs text-fg-muted">
          {query ? "No conversations match your search." : "No conversations yet."}
        </p>
      )}
      {GROUP_LABELS.map(({ key, label }) => {
        const items = groups[key];
        if (items.length === 0) return null;
        return (
          <section key={key} aria-label={label}>
            <SidebarSectionLabel>{label}</SidebarSectionLabel>
            <ul className="space-y-0.5">
              {items.map((c) => (
                <ConversationRow key={c.id} conversation={c} />
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}