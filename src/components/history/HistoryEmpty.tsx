import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EMPTY_COPY } from "@/data/empty-copy";

/**
 * Empty state for /app/history. Shown when the conversation store is
 * empty (e.g. after a reset or on a fresh device before the first
 * send). The CTA routes back to the workspace, which renders
 * <EmptyState /> with its own starter prompts.
 */
export function HistoryEmpty() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-card border border-border-strong bg-bg-card px-6 py-12 text-center">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-fg-secondary">
        <MessageSquare size={18} aria-hidden="true" />
      </div>
      <h2 className="text-balance text-base font-semibold text-fg-primary">
        {EMPTY_COPY.history.title}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-fg-secondary">
        {EMPTY_COPY.history.body}
      </p>
      <Link href="/app" className="mt-5">
        <Button variant="primary" size="md">
          <Plus size={14} aria-hidden="true" />
          <span>Start a conversation</span>
        </Button>
      </Link>
    </div>
  );
}