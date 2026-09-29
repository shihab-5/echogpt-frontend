/**
 * Small uppercase section label used between conversation groups
 * (Today, Yesterday, Last 7 days, Last 30 days, Older).
 *
 * Server-safe. The label uses 11px tracking-wide text in fg-muted
 * with vertical padding to match the rhythm of <ConversationRow />.
 */
export interface SidebarSectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarSectionLabel({ children, className }: SidebarSectionLabelProps) {
  return (
    <h3
      className={
        "px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted " +
        (className ?? "")
      }
    >
      {children}
    </h3>
  );
}
