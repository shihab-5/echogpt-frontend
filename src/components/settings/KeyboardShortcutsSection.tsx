import { KEYBOARD_SHORTCUTS } from "@/data/keyboard-shortcuts";
import { Kbd } from "@/components/ui/Kbd";
import { SettingsSection } from "@/components/settings/SettingsSection";

interface KeyboardShortcutsSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
}

/**
 * Reference list of keyboard shortcuts. The handler logic is not
 * wired in P6 — the spec defers real keyboard handling — but the
 * affordances are listed so users know what to expect.
 */
export function KeyboardShortcutsSection({
  variant = "default",
}: KeyboardShortcutsSectionProps) {
  return (
    <SettingsSection
      eyebrow="Reference"
      title="Keyboard shortcuts"
      caption="Listed for reference. Real handler wiring ships in a later phase."
      variant={variant}
    >
      <ul className="flex flex-col gap-1.5">
        {KEYBOARD_SHORTCUTS.map((sc) => (
          <li
            key={sc.id}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg-elevated px-2.5 py-1.5"
          >
            <span className="text-xs text-fg-primary">{sc.description}</span>
            <Kbd combo={sc.combo} />
          </li>
        ))}
      </ul>
    </SettingsSection>
  );
}