interface HistoryResultCountProps {
  /** Items currently shown (after filter). */
  shown: number;
  /** Total items in the underlying list (before filter). */
  total: number;
  className?: string;
}

/**
 * "Showing N of M conversations" line. Only renders when a search query
 * is active — the empty / populated states don't need a counter.
 */
export function HistoryResultCount({
  shown,
  total,
  className,
}: HistoryResultCountProps) {
  if (shown === total) return null;
  return (
    <p
      aria-live="polite"
      className={className ?? "text-xs text-fg-muted"}
    >
      Showing {shown} of {total}
    </p>
  );
}