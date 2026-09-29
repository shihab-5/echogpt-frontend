"use client";

import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { DefaultModelSection } from "@/components/settings/DefaultModelSection";
import { InterfaceSection } from "@/components/settings/InterfaceSection";
import { KeyboardShortcutsSection } from "@/components/settings/KeyboardShortcutsSection";
import { DataSection } from "@/components/settings/DataSection";
import { AboutSection } from "@/components/settings/AboutSection";

/**
 * /app/settings page. Composes the six Settings sections in order.
 *
 * Most sections are client components because they read from
 * `usePreferences` / `useTheme`. The page itself stays a single
 * client wrapper for symmetry — there's no benefit to splitting
 * since all sections need the client boundary anyway.
 */
export function SettingsView() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-8">
      <header>
        <p className="text-xs text-fg-muted">Settings</p>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-fg-primary">
          Preferences
        </h1>
        <p className="mt-1 text-sm text-fg-secondary">
          Settings save automatically and stay on this device.
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-4">
        <AppearanceSection />
        <DefaultModelSection />
        <InterfaceSection />
        <KeyboardShortcutsSection />
        <DataSection />
        <AboutSection />
      </div>
    </div>
  );
}