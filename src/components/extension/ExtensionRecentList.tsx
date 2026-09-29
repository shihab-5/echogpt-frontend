"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConversations } from "@/hooks/use-conversations";
import { getModel } from "@/data/models";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { timeAgo } from "@/lib/format";

const MAX_RECENT = 5;

interface ExtensionRecentListProps {
  /** Maximum number of rows. Defaults to 5 per the spec. */
  max?: number;
  className?: string;
}

/**
 * Recent-conversation list for the popup. Caps at `max` rows. Each row
 * links to `?conversation=<id>` on /extension so the conversation view
 * slides in within the same frame.
 *
 * Renders nothing when the store is empty (the parent view already
 * shows the empty state).
 */
export function ExtensionRecentList({
  max = MAX_RECENT,
  className,
}: ExtensionRecentListProps) {
  const { conversations } = useConversations();
  const recent = conversations.slice(0, max);
  const router = useRouter();

  if (recent.length === 0) return null;

  return (
    <div className={className}>
      <p className="px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
        Recent
      </p>
      <ul className="space-y-0.5">
        {recent.map((c) => {
          const model = getModel(c.model);
          return (
            <li key={c.id}>
              <Link
                href={`/extension?conversation=${c.id}`}
                onClick={(e) => {
                  // Use client-side navigation so the popup doesn't
                  // reload — we want the slide-over transition to feel
                  // native. Middle-click / cmd-click still falls through
                  // to the regular <Link> behaviour.
                  if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.button === 1
                  ) {
                    return;
                  }
                  e.preventDefault();
                  router.push(`/extension?conversation=${c.id}`);
                }}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
              >
                <span className="flex min-w-0 flex-1 items-center gap-1.5">
                  <ModelIcon
                    iconKey={model.iconKey}
                    size="xs"
                    ariaLabel={model.name}
                  />
                  <span className="truncate">{c.title}</span>
                </span>
                <span className="time shrink-0 text-[10px] text-fg-muted">
                  {timeAgo(c.updatedAt)} · {model.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}