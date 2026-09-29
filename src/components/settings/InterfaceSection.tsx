"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { usePreferences } from "@/hooks/use-preferences";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Toggle } from "@/components/ui/Toggle";
import type { Density } from "@/types/chat";

const DENSITY_OPTIONS: ReadonlyArray<{ value: Density; label: string }> = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

interface InterfaceSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
}

/**
 * Interface preferences — density + three boolean toggles. Each row
 * shows the control on the right and a label + caption on the left,
 * matching the visual rhythm of the rest of the settings page.
 */
export function InterfaceSection({ variant = "default" }: InterfaceSectionProps) {
  const { preferences, update } = usePreferences();
  const densityGroupId = useId();
  const isNarrow = variant === "narrow";

  return (
    <SettingsSection
      eyebrow="Interface"
      title="Comfort & controls"
      caption="Density affects composer + message list spacing. Toggles apply app-wide."
      variant={variant}
    >
      <ul className={cn("flex flex-col", isNarrow ? "gap-2.5" : "gap-4")}>
        {/* Density — segmented control */}
        <li className={cn("flex items-start justify-between", isNarrow ? "gap-3" : "gap-6")}>
          <div className="min-w-0">
            <label
              htmlFor={`${densityGroupId}-label`}
              className={cn("font-medium text-fg-primary", isNarrow ? "text-xs" : "text-sm")}
            >
              Density
            </label>
            <p
              id={`${densityGroupId}-label`}
              className="mt-0.5 text-[11px] text-fg-secondary"
            >
              Comfortable gives messages more breathing room.
            </p>
          </div>
          <div
            role="radiogroup"
            aria-labelledby={`${densityGroupId}-label`}
            className={cn(
              "inline-flex shrink-0 items-center gap-0.5 rounded-control border border-border-strong bg-bg-elevated p-0.5",
              isNarrow ? "h-8" : "h-9",
            )}
          >
            {DENSITY_OPTIONS.map((opt) => {
              const active = preferences.density === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => update({ density: opt.value })}
                  className={cn(
                    "inline-flex items-center justify-center rounded-[5px] px-2.5 text-[11px] font-medium transition-colors duration-fast",
                    "focus-visible:outline-none",
                    isNarrow ? "h-7" : "h-8",
                    active
                      ? "bg-bg-active text-fg-primary"
                      : "text-fg-secondary hover:text-fg-primary",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </li>

        <Divider />

        <ToggleRow
          label="Show model badge"
          caption="Display which model produced each assistant message."
          checked={preferences.showModelBadge}
          onChange={(v) => update({ showModelBadge: v })}
          isNarrow={isNarrow}
        />

        <Divider />

        <ToggleRow
          label="Send on Enter"
          caption="When off, Enter inserts a newline and a button is required to send."
          checked={preferences.sendOnEnter}
          onChange={(v) => update({ sendOnEnter: v })}
          isNarrow={isNarrow}
        />

        <Divider />

        <ToggleRow
          label="Stream replies"
          caption="When off, replies appear in a single block once the model is finished."
          checked={preferences.streamReplies}
          onChange={(v) => update({ streamReplies: v })}
          isNarrow={isNarrow}
        />
      </ul>
    </SettingsSection>
  );
}

function Divider() {
  return <li aria-hidden="true" className="h-px w-full bg-border" />;
}

interface ToggleRowProps {
  label: string;
  caption: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  isNarrow?: boolean;
}

/**
 * One labelled switch row. The <label> + <Toggle> pairing uses
 * `aria-labelledby` via the wrapping <div> so the switch announces the
 * row label + caption to screen readers.
 */
function ToggleRow({ label, caption, checked, onChange, isNarrow = false }: ToggleRowProps) {
  const labelId = useId();
  const captionId = useId();
  return (
    <li className={cn("flex items-start justify-between", isNarrow ? "gap-3" : "gap-6")}>
      <div className="min-w-0">
        <span
          id={labelId}
          className={cn(
            "font-medium text-fg-primary",
            isNarrow ? "text-xs" : "text-sm",
          )}
        >
          {label}
        </span>
        <p
          id={captionId}
          className="mt-0.5 text-[11px] text-fg-secondary"
        >
          {caption}
        </p>
      </div>
      <div className="shrink-0 pt-0.5">
        <Toggle
          ariaLabel={`${label}. ${caption}`}
          checked={checked}
          onChange={onChange}
          size={isNarrow ? "sm" : "md"}
        />
      </div>
    </li>
  );
}