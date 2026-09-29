import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EMPTY_COPY } from "@/data/empty-copy";

interface HistoryNoResultsProps {
  /** The query that produced zero matches. */
  query: string;
  /** Resets the search input. */
  onClear: () => void;
}

/**
 * No-results state for the History search. Echoes the active query so
 * the user knows what was searched, and offers a one-click clear.
 */
export function HistoryNoResults({ query, onClear }: HistoryNoResultsProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-card border border-border-strong bg-bg-card px-6 py-12 text-center">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-fg-secondary">
        <SearchX size={18} aria-hidden="true" />
      </div>
      <h2 className="text-balance text-base font-semibold text-fg-primary">
        {EMPTY_COPY.search.title.replace(".", "")} for &ldquo;{query}&rdquo;
      </h2>
      <p className="mt-1 max-w-sm text-sm text-fg-secondary">
        {EMPTY_COPY.search.body}
      </p>
      <Button
        variant="secondary"
        size="md"
        onClick={onClear}
        className="mt-5"
      >
        {EMPTY_COPY.search.cta}
      </Button>
    </div>
  );
}