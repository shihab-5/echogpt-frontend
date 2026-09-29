"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";

interface HistorySearchProps {
  /** Current raw value (controlled). */
  value: string;
  /** Fires on every keystroke with the raw input. */
  onChange: (next: string) => void;
  /** Fires after the debounce window expires. */
  onDebouncedChange: (next: string) => void;
  /** Debounce in ms. Default 200. */
  debounceMs?: number;
  className?: string;
  /** Visible label override for the input. */
  ariaLabel?: string;
  /** Placeholder override. */
  placeholder?: string;
}

/**
 * Debounced search input for the History view.
 *
 * Visual chrome mirrors the sidebar <SearchInput /> (search icon prefix,
 * clear button suffix when value is present). The debounce lives here —
 * HistoryView keeps a single source of truth for `query` but renders the
 * list against the debounced value, so each keystroke doesn't churn the
 * memoised filter.
 */
export function HistorySearch({
  value,
  onChange,
  onDebouncedChange,
  debounceMs = 200,
  className,
  ariaLabel = "Search history",
  placeholder = "Search history",
}: HistorySearchProps) {
  // Keep the latest callback in a ref so the timer effect only re-fires
  // when the value or the debounce window changes, not when the parent
  // re-renders with a fresh callback identity.
  const callbackRef = useRef(onDebouncedChange);
  useEffect(() => {
    callbackRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      callbackRef.current?.(value);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [value, debounceMs]);

  return (
    <div className={cn("relative", className)}>
      <Search
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
      />
      <Input
        type="search"
        inputMode="search"
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 pr-9"
      />
      {value && (
        <IconButton
          aria-label="Clear search"
          size="sm"
          mobileTapTarget={false}
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg-primary"
        >
          <X size={14} aria-hidden="true" />
        </IconButton>
      )}
    </div>
  );
}