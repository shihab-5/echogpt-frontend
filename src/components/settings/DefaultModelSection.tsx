"use client";

import { usePreferences } from "@/hooks/use-preferences";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { ModelSelector } from "@/components/chat/ModelSelector";

interface DefaultModelSectionProps {
  /** Visual density — `narrow` is used by the extension popup. */
  variant?: "default" | "narrow";
}

/**
 * Default model preference. Reuses <ModelSelector /> so the dropdown
 * chrome, search, and provider dot are identical to the in-chat
 * selector.
 *
 * Writes through `preferences.update({ defaultModel })`. The workspace
 * composer's `useActiveModel` hook reads from prefs, so changes take
 * effect on the next composer mount.
 */
export function DefaultModelSection({ variant = "default" }: DefaultModelSectionProps) {
  const { preferences, update } = usePreferences();
  return (
    <SettingsSection
      eyebrow="Models"
      title="Default model"
      caption="Used for new conversations and the workspace composer. You can override per chat."
      variant={variant}
    >
      <div className="max-w-xs">
        <ModelSelector
          value={preferences.defaultModel}
          onChange={(id) => update({ defaultModel: id })}
        />
      </div>
    </SettingsSection>
  );
}