"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { QUICK_ACTIONS } from "@/data/quick-actions";
import type { QuickActionId } from "@/data/quick-actions";

interface QuickActionsProps {
  onPick: (id: QuickActionId) => void;
  /** Visual density — extension uses "compact". */
  variant?: "default" | "compact";
  className?: string;
}

export function QuickActions({
  onPick,
  variant = "default",
  className,
}: QuickActionsProps) {
  const size = variant === "compact" ? "text-xs" : "text-sm";
  const buttonPad = variant === "compact" ? "px-2 py-1" : "px-2.5 py-1.5";

  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label="Quick actions"
    >
      {QUICK_ACTIONS.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => onPick(a.id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated text-fg-secondary transition-colors duration-fast",
            "hover:border-fg-muted hover:text-fg-primary",
            "focus-visible:outline-none",
            buttonPad,
            size,
          )}
          aria-label={a.hint}
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>{a.label}</span>
        </button>
      ))}
    </div>
  );
}
