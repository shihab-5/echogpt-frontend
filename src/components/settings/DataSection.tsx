"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Button } from "@/components/ui/Button";
import { ResetConfirmModal } from "@/components/settings/ResetConfirmModal";
import { clearAll } from "@/lib/storage";

const STORE_CHANGE = "echogpt:store-change";
const PREFERENCES_CHANGE = "echogpt:preferences-change";
const THEME_CHANGE = "echogpt:theme-change";

interface DataSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
  /**
   * Override the route the user lands on after confirming a reset.
   * The popup sends the user back to /extension (its own root) instead
   * of the workspace.
   */
  resetRedirect?: "/app" | "/extension";
}

/**
 * Data settings — single Reset Workspace CTA that opens the danger
 * confirmation modal. On confirm we:
 *
 *   1. clearAll()  — removes every echogpt:* key from localStorage
 *   2. dispatch the three change events so subscribers refresh without
 *      a reload (clearAll() does not dispatch any events by design)
 *   3. router.replace(resetRedirect) — land on the empty workspace
 *      (web app defaults to /app; extension popup defaults to /extension
 *      so it stays inside its own frame)
 */
export function DataSection({
  variant = "default",
  resetRedirect = "/app",
}: DataSectionProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isNarrow = variant === "narrow";

  const handleConfirm = (): void => {
    clearAll();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(STORE_CHANGE));
      window.dispatchEvent(new Event(PREFERENCES_CHANGE));
      window.dispatchEvent(new Event(THEME_CHANGE));
    }
    setOpen(false);
    router.replace(resetRedirect);
  };

  return (
    <>
      <SettingsSection
        eyebrow="Data"
        title="Workspace data"
        caption="Everything EchoGPT saves lives in this browser. Reset to start fresh."
        variant={variant}
      >
        <div
          className={cn(
            "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className={cn("text-fg-secondary", isNarrow ? "text-xs" : "text-sm")}>
            Wipes conversations, messages, preferences, and theme.
          </p>
          <Button
            variant="danger"
            size={isNarrow ? "sm" : "md"}
            onClick={() => setOpen(true)}
          >
            <Trash2 size={isNarrow ? 12 : 14} aria-hidden="true" />
            <span>Reset workspace&hellip;</span>
          </Button>
        </div>
      </SettingsSection>

      <ResetConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}