"use client";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { ModelSwitchedNotice } from "@/components/chat/ModelSwitchedNotice";
import { useActiveModel } from "@/hooks/use-active-model";

interface ChatHeaderProps {
  /** Conversation title shown at the top of the chat surface. */
  title: string;
  /** Whether to render the model selector and switched-notice UI. */
  showModelControls?: boolean;
  className?: string;
}

/**
 * Top bar of the chat view. Lives between <AppHeader /> (the global
 * header with the mobile hamburger) and the messages list.
 *
 * - Conversation title (truncated, plain text).
 * - Model selector — mirrors the one in <AppHeader /> so it's reachable
 *   when the conversation is the focus of the page.
 * - <ModelSwitchedNotice /> — self-contained, auto-dismiss 4 s.
 * - Reserved "compare" slot on the right (empty for now, deferred per
 *   plan.md §13). Rendered as an IconButton so P9 can hook it up
 *   without restructuring this header.
 *
 * The model selector and notice only mount when `showModelControls`
 * is true — `/app` (empty workspace) sets it to false so the empty
 * state isn't crowded with chrome.
 */
export function ChatHeader({
  title,
  showModelControls = true,
  className,
}: ChatHeaderProps) {
  const { model, setModel } = useActiveModel();

  return (
    <header
      className={cn(
        "flex h-12 items-center gap-3 border-b border-border bg-bg-base px-4",
        className,
      )}
    >
      <h1
        className="min-w-0 flex-1 truncate text-sm font-medium text-fg-primary"
        title={title}
      >
        {title}
      </h1>

      {showModelControls && (
        <div className="flex items-center gap-3">
          <ModelSwitchedNotice />
          <ModelSelector value={model} onChange={setModel} size="sm" />

          {/* Reserved compare slot — P9 will mount <CompareModeTrigger />
              here. Kept as a real button (a11y) but disabled with no
              handler so it can't be clicked by accident. */}
          <IconButton
            aria-label="Compare models (coming soon)"
            size="sm"
            disabled
            mobileTapTarget={false}
            className="text-fg-muted"
          >
            <MoreHorizontal size={14} aria-hidden="true" />
          </IconButton>
        </div>
      )}
    </header>
  );
}
