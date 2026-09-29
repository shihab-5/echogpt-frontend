"use client";

import { cn } from "@/lib/cn";
import { Toggle } from "@/components/ui/Toggle";
import { TOOLS } from "@/data/tools";
import type { ToolId } from "@/types/chat";

interface ToolTogglesProps {
  enabled: ReadonlyArray<ToolId>;
  onChange: (next: ReadonlyArray<ToolId>) => void;
  /** Visual density — extension uses "compact". */
  variant?: "default" | "compact";
}

/**
 * Row of toggleable tool chips shown above the quick-action row in the
 * prompt composer. Each chip is a `<label>` so clicking either the icon
 * text or the toggle activates the same switch.
 *
 * These are *visual* toggles — they only affect what the canned reply
 * looks like (a `[Tools active: …]` prefix). They never trigger real
 * tool execution. See `src/lib/mock-ai.ts` and `src/data/tools.ts`.
 */
export function ToolToggles({
  enabled,
  onChange,
  variant = "default",
}: ToolTogglesProps) {
  const isOn = (id: ToolId) => enabled.includes(id);
  const toggle = (id: ToolId) => {
    onChange(isOn(id) ? enabled.filter((t) => t !== id) : [...enabled, id]);
  };

  const pad = variant === "compact" ? "px-1.5 py-0.5" : "px-2 py-1";
  const textSize = variant === "compact" ? "text-[10px]" : "text-xs";
  const iconSize = variant === "compact" ? 10 : 12;

  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="group"
      aria-label="Tools"
    >
      {TOOLS.map((t) => {
        const on = isOn(t.id);
        const Icon = t.lucideIcon;
        return (
          <label
            key={t.id}
            title={t.hint}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-md border bg-bg-elevated transition-colors duration-fast",
              "focus-within:border-fg-muted",
              pad,
              textSize,
              on
                ? "border-border-strong text-fg-primary"
                : "border-border text-fg-secondary",
            )}
          >
            <Icon
              size={iconSize}
              aria-hidden="true"
              className="shrink-0 text-fg-secondary"
            />
            <span>{t.label}</span>
            <Toggle
              size="sm"
              checked={on}
              onChange={() => toggle(t.id)}
              ariaLabel={`Toggle ${t.label}`}
            />
          </label>
        );
      })}
    </div>
  );
}