"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  /** Renders the row with a red dot + 2 px red left edge. */
  selected?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
  /** Optional ARIA label for the trigger button. */
  ariaLabel?: string;
  /** Width in px. Default 320. */
  width?: number;
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  ariaLabel,
  width = 320,
  align = "start",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(
      0,
      items.findIndex((i) => i.selected),
    ),
  );
  const listId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = items[activeIndex];
      if (item && !item.disabled) {
        onSelect(item.id);
        setOpen(false);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(items.length - 1);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="focus-visible:outline-none"
      >
        {trigger}
      </button>
      {open && (
        <div
          id={listId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className={cn(
            "absolute z-50 mt-2 rounded-lg border border-border-strong bg-bg-card p-1.5",
            align === "start" ? "left-0" : "right-0",
          )}
          style={{ width }}
        >
          {items.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={active}
                tabIndex={-1}
                disabled={item.disabled}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  if (item.disabled) return;
                  onSelect(item.id);
                  setOpen(false);
                }}
                className={cn(
                  "relative flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors duration-fast",
                  "focus-visible:outline-none",
                  item.disabled
                    ? "cursor-not-allowed text-fg-muted"
                    : "text-fg-primary hover:bg-bg-hover",
                  item.selected &&
                    "bg-brand-subtle hover:bg-brand-subtle",
                )}
              >
                {item.selected && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-brand"
                    />
                    <span
                      aria-hidden="true"
                      className="ml-1 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                  </>
                )}
                {!item.selected && item.icon && (
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-fg-muted">
                    {item.icon}
                  </span>
                )}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium">{item.label}</span>
                  {item.description && (
                    <span className="truncate text-xs text-fg-muted">
                      {item.description}
                    </span>
                  )}
                </span>
                {item.trailing && (
                  <span className="shrink-0 text-xs text-fg-muted">{item.trailing}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
