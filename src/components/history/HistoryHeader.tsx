import { History } from "lucide-react";

interface HistoryHeaderProps {
  /** Total conversations (before any filter). */
  total: number;
  className?: string;
}

/**
 * Page header for /app/history. Title, subtitle, and total conversation
 * count. The icon stays in the brand-red "locked" hue so the page is
 * consistent with the rest of the chrome.
 */
export function HistoryHeader({ total, className }: HistoryHeaderProps) {
  const noun = total === 1 ? "conversation" : "conversations";
  return (
    <header className={className}>
      <div className="flex items-center gap-2 text-xs text-fg-muted">
        <History size={14} aria-hidden="true" className="text-fg-secondary" />
        <span>History</span>
      </div>
      <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-fg-primary">
        All conversations
      </h1>
      <p className="mt-1 text-sm text-fg-secondary">
        {total === 0
          ? "Your saved threads will appear here."
          : `${total} ${noun} saved on this device.`}
      </p>
    </header>
  );
}