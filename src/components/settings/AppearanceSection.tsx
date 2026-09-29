"use client";

import { SettingsSection } from "@/components/settings/SettingsSection";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface AppearanceSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
}

/**
 * Appearance settings — Light / Dark / System theme selector.
 *
 * Reuses <ThemeToggle /> from the shared chrome so the segmented
 * control has identical behaviour and a11y semantics as the sidebar
 * version. Writes flow into the theme provider / hook, not into
 * preferences.
 */
export function AppearanceSection({ variant = "default" }: AppearanceSectionProps) {
  return (
    <SettingsSection
      eyebrow="Appearance"
      title="Theme"
      caption="Light, dark, or follow your system. Changes apply instantly."
      variant={variant}
    >
      <ThemeToggle size="md" />
    </SettingsSection>
  );
}