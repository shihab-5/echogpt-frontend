"use client";

import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { DefaultModelSection } from "@/components/settings/DefaultModelSection";
import { InterfaceSection } from "@/components/settings/InterfaceSection";
import { KeyboardShortcutsSection } from "@/components/settings/KeyboardShortcutsSection";
import { DataSection } from "@/components/settings/DataSection";
import { AboutSection } from "@/components/settings/AboutSection";
import { ExtensionPopupLayout } from "@/components/extension/ExtensionPopupLayout";
import { ExtensionBackBar } from "@/components/extension/ExtensionBackBar";
import { ExtensionViewSwitcher } from "@/components/extension/ExtensionViewSwitcher";

/**
 * /extension/settings — all six Settings sections in narrow variant.
 * Wraps each <SettingsSection /> in `variant="narrow"` so they fit
 * inside the 380 × 560 popup.
 *
 * Reset redirects to /extension (stays inside the popup frame) rather
 * than /app (the default the web app uses).
 */
export function ExtensionSettingsView() {
  return (
    <ExtensionPopupLayout
      header={
        <>
          <ExtensionBackBar title="Settings" backHref="/extension" />
          <ExtensionViewSwitcher />
        </>
      }
    >
      <div className="flex flex-col gap-2 p-3">
        <AppearanceSection variant="narrow" />
        <DefaultModelSection variant="narrow" />
        <InterfaceSection variant="narrow" />
        <KeyboardShortcutsSection variant="narrow" />
        <DataSection variant="narrow" resetRedirect="/extension" />
        <AboutSection variant="narrow" />
      </div>
    </ExtensionPopupLayout>
  );
}