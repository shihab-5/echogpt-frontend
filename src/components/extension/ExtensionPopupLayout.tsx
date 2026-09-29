import { cn } from "@/lib/cn";

interface ExtensionPopupLayoutProps {
  /** Header slot — typically <ExtensionHeader /> or <ExtensionBackBar />. */
  header?: React.ReactNode;
  /** Body slot. Scrolls independently when content overflows. */
  children: React.ReactNode;
  /** Optional footer slot (e.g. composer). */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Frame for an extension popup page. Renders the fake-window dots at
 * the top (matching <ExtensionFrame />) plus the header slot, a
 * scrollable body, and an optional footer.
 *
 * The frame itself is fixed at 380 × 560 so every page looks like the
 * same popup regardless of its content height.
 */
export function ExtensionPopupLayout({
  header,
  children,
  footer,
  className,
}: ExtensionPopupLayoutProps) {
  return (
    <div
      className={cn(
        "flex h-[560px] w-[380px] flex-col overflow-hidden rounded-modal border border-border-strong bg-bg-card",
        className,
      )}
    >
      {/* Chrome dots — purely decorative */}
      <div className="flex items-center gap-1.5 border-b border-border bg-bg-elevated px-3 py-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span className="ml-2 text-[11px] font-medium text-fg-muted">
          EchoGPT · popup
        </span>
      </div>

      {header}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-bg-base">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="shrink-0 border-t border-border bg-bg-base">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}