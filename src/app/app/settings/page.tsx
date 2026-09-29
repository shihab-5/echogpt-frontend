import { SettingsView } from "@/components/settings/SettingsView";

/**
 * /app/settings — preferences for theme, default model, density,
 * keyboard reference, and the reset-workspace confirmation.
 *
 * Server component shell. The view is a client component because most
 * sections subscribe to `usePreferences()` / `useTheme()`.
 */
export default function SettingsPage() {
  return <SettingsView />;
}