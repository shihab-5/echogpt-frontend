import { HistoryView } from "@/components/history/HistoryView";

/**
 * /app/history — saved conversation list with search and grouping.
 *
 * Server component shell so the URL is the source of truth. The view
 * itself is a client component because it reads from the conversations
 * store via `useConversations()`.
 */
export default function HistoryPage() {
  return <HistoryView />;
}