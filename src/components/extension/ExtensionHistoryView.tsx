import { ExtensionPopupLayout } from "@/components/extension/ExtensionPopupLayout";
import { ExtensionBackBar } from "@/components/extension/ExtensionBackBar";
import { ExtensionViewSwitcher } from "@/components/extension/ExtensionViewSwitcher";
import { HistoryView } from "@/components/history/HistoryView";

/**
 * /extension/history — the popup's history page. Composes the shared
 * HistoryView in narrow variant inside the popup layout, with the
 * view switcher under the back bar so the user can jump to Settings
 * or back to Prompt.
 */
export function ExtensionHistoryView() {
  return (
    <ExtensionPopupLayout
      header={
        <>
          <ExtensionBackBar title="History" backHref="/extension" />
          <ExtensionViewSwitcher />
        </>
      }
    >
      <HistoryView variant="narrow" />
    </ExtensionPopupLayout>
  );
}