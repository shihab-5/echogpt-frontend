import { SidebarSectionLabel } from "@/components/chat/SidebarSectionLabel";
import { ConversationRow } from "@/components/chat/ConversationRow";
import type { Conversation } from "@/types/chat";

interface HistoryGroupProps {
  /** Section label ("Today", "Yesterday", "Last 7 days", ...). */
  label: string;
  items: Conversation[];
}

/**
 * One date group inside the History list. Same visual as the sidebar
 * section (label + indented list of ConversationRow items), just
 * composed into a dedicated component so HistoryView stays declarative.
 */
export function HistoryGroup({ label, items }: HistoryGroupProps) {
  if (items.length === 0) return null;
  return (
    <section aria-label={label} className="mt-2">
      <SidebarSectionLabel>{label}</SidebarSectionLabel>
      <ul className="space-y-0.5">
        {items.map((c) => (
          <ConversationRow key={c.id} conversation={c} />
        ))}
      </ul>
    </section>
  );
}