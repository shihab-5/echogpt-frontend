"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { useConversations } from "@/hooks/use-conversations";
import {
  filterConversations,
  groupConversations,
  type ConversationGroups,
} from "@/lib/group-conversations";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistorySearch } from "@/components/history/HistorySearch";
import { HistoryResultCount } from "@/components/history/HistoryResultCount";
import { HistoryGroup } from "@/components/history/HistoryGroup";
import { HistoryEmpty } from "@/components/history/HistoryEmpty";
import { HistoryNoResults } from "@/components/history/HistoryNoResults";

const GROUP_LABELS: ReadonlyArray<{ key: keyof ConversationGroups; label: string }> = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last7", label: "Last 7 days" },
  { key: "last30", label: "Last 30 days" },
  { key: "older", label: "Older" },
];

interface HistoryViewProps {
  /**
   * Visual density. `narrow` is used by the extension popup — drops
   * the page-wide hero, hides the eyebrow, tightens the container.
   */
  variant?: "default" | "narrow";
}

/**
 * History view — the full /app/history page (and /extension/history).
 *
 * Reads the conversation store, applies the search filter against the
 * debounced query (so typing doesn't churn the list), groups the
 * results by date bucket, and renders one <HistoryGroup /> per
 * non-empty bucket.
 *
 * Three terminal states:
 *   - 0 conversations total           → <HistoryEmpty />
 *   - conversations exist, no matches  → <HistoryNoResults />
 *   - conversations exist, matches     → grouped list + result counter
 */
export function HistoryView({ variant = "default" }: HistoryViewProps) {
  const { conversations } = useConversations();
  const isNarrow = variant === "narrow";

  // `query` updates instantly on every keystroke so the input stays
  // responsive; `debouncedQuery` is what the filter runs against.
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const filtered = useMemo(
    () => filterConversations(conversations, debouncedQuery),
    [conversations, debouncedQuery],
  );
  const groups = useMemo(() => groupConversations(filtered), [filtered]);

  const totalCount = conversations.length;
  const hasConversations = totalCount > 0;
  const hasMatches = filtered.length > 0;

  return (
    <div
      className={cn(
        isNarrow ? "w-full p-3" : "mx-auto w-full max-w-[720px] px-4 py-8",
      )}
    >
      {!isNarrow && <HistoryHeader total={totalCount} />}

      {hasConversations && (
        <div className={cn(isNarrow ? "mt-2" : "mt-6")}>
          <HistorySearch
            value={query}
            onChange={setQuery}
            onDebouncedChange={setDebouncedQuery}
          />
        </div>
      )}

      {!hasConversations && <HistoryEmpty />}

      {hasConversations && !hasMatches && (
        <HistoryNoResults
          query={debouncedQuery}
          onClear={() => {
            setQuery("");
            setDebouncedQuery("");
          }}
        />
      )}

      {hasConversations && hasMatches && (
        <>
          <HistoryResultCount
            shown={filtered.length}
            total={totalCount}
            className={cn(
              "text-xs text-fg-muted",
              isNarrow ? "mt-2" : "mt-4",
            )}
          />
          <div className="mt-1">
            {GROUP_LABELS.map(({ key, label }) => (
              <HistoryGroup
                key={key}
                label={label}
                items={groups[key]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}