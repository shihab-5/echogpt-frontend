import { cn } from "@/lib/cn";

interface ExtensionFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Logical width. Defaults to 380 (Chrome popup). */
  width?: number;
}

/**
 * Visual chrome wrapper that mimics a Chrome extension popup.
 * Used on the marketing landing page to embed a live popup preview.
 */
export function ExtensionFrame({ children, className, width = 380 }: ExtensionFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-modal border border-border-strong bg-bg-card",
        className,
      )}
      style={{ width, boxShadow: "var(--chrome-shadow)" }}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-bg-elevated px-3 py-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-chrome-dot" />
        <span className="ml-2 text-[11px] font-medium text-fg-muted">
          EchoGPT · popup
        </span>
      </div>
      <div className="bg-bg-base">{children}</div>
    </div>
  );
}
