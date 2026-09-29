"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/hooks/use-hydrated";
import type { Theme } from "@/lib/theme";

const OPTIONS: ReadonlyArray<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const h = size === "sm" ? "h-8" : "h-9";
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-control border border-border-strong bg-bg-elevated p-0.5",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = hydrated && theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            tabIndex={active || (!hydrated && opt.value === "system") ? 0 : -1}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "inline-flex items-center justify-center rounded-[5px] px-2 transition-colors duration-fast",
              h,
              active
                ? "bg-bg-active text-fg-primary"
                : "text-fg-secondary hover:text-fg-primary",
            )}
          >
            <Icon size={iconSize} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
