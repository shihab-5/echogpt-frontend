import { ExtensionSettingsView } from "@/components/extension/ExtensionSettingsView";

/**
 * /extension/settings — the popup's settings page. Server component
 * shell; the view itself is a client component (most sections read
 * from usePreferences / useTheme).
 */
export default function ExtensionSettingsPage() {
  return <ExtensionSettingsView />;
}