"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";
import { getModel } from "@/data/models";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { timeAgo } from "@/lib/format";
import type { Conversation } from "@/types/chat";

interface ConversationRowProps {
  conversation: Conversation;
  /**
   * When true, render an icon-only row (used in the 64 px tablet sidebar).
   */
  iconOnly?: boolean;
  /**
   * Visual density. `compact` is used by the extension popup and shows
   * a single-line title with no subtitle — perfect for a 380 px popup
   * where vertical real estate is precious.
   */
  variant?: "default" | "compact";
}

/**
 * Single conversation entry in the sidebar.
 *
 * Active state uses the locked "red dot + 2 px red left edge + brand-subtle
 * background" pattern — same visual grammar as <Dropdown />'s selected row.
 *
 * Client component because we read the current pathname to detect the active
 * route. The actual link is a normal Next.js <Link />.
 */
export function ConversationRow({
  conversation,
  iconOnly = false,
  variant = "default",
}: ConversationRowProps) {
  const pathname = usePathname();
  const href = `/app/chat/${conversation.id}`;
  const isActive = pathname === href;
  const model = getModel(conversation.model);
  const isCompact = variant === "compact";

  if (iconOnly) {
    return (
      <li>
        <Link
          href={href}
          aria-label={conversation.title}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-control",
            "transition-colors duration-fast",
            isActive
              ? "bg-brand-subtle text-fg-primary"
              : "text-fg-secondary hover:bg-bg-hover hover:text-fg-primary",
          )}
        >
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-brand"
            />
          )}
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand"
            />
          )}
          <MessageSquare size={16} aria-hidden="true" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative flex items-start gap-2 rounded-md text-sm",
          "transition-colors duration-fast",
          isCompact ? "px-2 py-1.5" : "px-2.5 py-2",
          isActive
            ? "bg-brand-subtle text-fg-primary"
            : "text-fg-secondary hover:bg-bg-hover hover:text-fg-primary",
        )}
      >
        {isActive && (
          <>
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand"
            />
            <span
              aria-hidden="true"
              className="ml-1 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
          </>
        )}
        <span className="flex min-w-0 flex-1 items-center gap-1.5">
          {!isCompact && (
            <ModelIcon
              iconKey={model.iconKey}
              size="xs"
              ariaLabel={`${model.provider} ${model.name}`}
            />
          )}
          <span className={cn("truncate", isCompact ? "text-xs" : "font-medium")}>
            {conversation.title}
          </span>
        </span>
        {!isCompact && (
          <span className="time shrink-0 text-[11px] text-fg-muted">
            {timeAgo(conversation.updatedAt)}
          </span>
        )}
      </Link>
    </li>
  );
}
