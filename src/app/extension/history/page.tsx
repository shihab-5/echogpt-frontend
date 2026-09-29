import { ExtensionHistoryView } from "@/components/extension/ExtensionHistoryView";

/**
 * /extension/history — the popup's history page. Server component
 * shell so the URL is the source of truth; the view itself is a
 * client component (reads from the conversations store).
 */
export default function ExtensionHistoryPage() {
  return <ExtensionHistoryView />;
}