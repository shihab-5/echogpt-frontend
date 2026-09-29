"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";

interface SearchInputProps {
  /**
   * Debounce window in milliseconds. Defaults to 200 ms which feels
   * instant without thrashing the list on every keystroke.
   */
  debounceMs?: number;
  className?: string;
  /** Current query value (controlled). */
  value: string;
  /** Called with the raw input value on every keystroke (instant). */
  onChange: (next: string) => void;
  /** Called with the debounced value (after the user pauses). */
  onDebouncedChange?: (next: string) => void;
}

/**
 * Debounced search field for the sidebar. Filters the conversation
 * list by case-insensitive substring match against the conversation
 * title.
 *
 * Implementation notes:
 * - The input is fully controlled — the parent owns the current value
 *   so it can pipe it straight into <ConversationList /> for filtering.
 * - An optional onDebouncedChange fires after the parent-debounce
 *   window so heavier consumers (analytics, network) don't fire on
 *   every keystroke.
 * - The debounce effect uses a ref to read the latest callback without
 *   retriggering the timer when only the callback identity changes.
 */
export function SearchInput({
  debounceMs = 200,
  className,
  value,
  onChange,
  onDebouncedChange,
}: SearchInputProps) {
  // Keep the latest callback in a ref so the timer effect only
  // re-fires when the debounce window expires, not when the parent
  // re-renders with a fresh callback identity.
  const callbackRef = useRef(onDebouncedChange);
  useEffect(() => {
    callbackRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  useEffect(() => {
    if (!callbackRef.current) return;
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
        aria-label="Search conversations"
        placeholder="Search conversations"
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
