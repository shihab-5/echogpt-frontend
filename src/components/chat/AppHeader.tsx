"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { Logo } from "@/components/shared/Logo";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { CapabilitiesMenu } from "@/components/chat/CapabilitiesMenu";
import { useActiveModel } from "@/hooks/use-active-model";

interface AppHeaderProps {
  /** Called when the mobile hamburger is tapped. Ignored on >= md. */
  onOpenMenu: () => void;
  className?: string;
}

/**
 * App header. Lives above the main content area inside the shell.
 *
 * Mobile (< md): hamburger button (opens the drawer) + logo wordmark
 *   + spacer + model selector.
 * Tablet/Desktop (>= md): just the model selector on the right.
 *   The sidebar takes care of the left-side navigation.
 *
 * The model selector slot is rendered at every breakpoint so P5 only
 * has to consume the active model via the shell once.
 *
 * Reads useSearchParams() (via useActiveModel) — fine because the
 * /app/* layout sets `dynamic = "force-dynamic"`.
 */
export function AppHeader({ onOpenMenu, className }: AppHeaderProps) {
  const { model, setModel } = useActiveModel();

  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between gap-3 border-b border-border bg-bg-base px-3 md:px-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 md:hidden">
        <IconButton
          aria-label="Open menu"
          onClick={onOpenMenu}
          className="text-fg-secondary hover:text-fg-primary"
        >
          <Menu size={18} aria-hidden="true" />
        </IconButton>
        <Logo size="sm" />
      </div>

      {/* Spacer for >= md so the model selector pins to the right. */}
      <div className="hidden md:block md:flex-1" />

      <div className="flex items-center gap-2">
        <CapabilitiesMenu />
        <span className="hidden text-xs text-fg-muted md:inline">Model</span>
        <ModelSelector value={model} onChange={setModel} />
      </div>
    </header>
  );
}
