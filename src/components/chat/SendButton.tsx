"use client";

import { ArrowUp, Square } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";

interface SendButtonProps {
  /** Whether the send action is currently available. */
  canSend: boolean;
  /** Whether a response is streaming — replaces the send arrow with a stop square. */
  isStreaming?: boolean;
  /** Triggered when the user clicks the button (send or stop). */
  onClick: () => void;
  className?: string;
}

/**
 * Primary send button. Sits inside the <PromptComposer />.
 *
 * - When `canSend` is true: red (`bg-brand`) arrow-up.
 * - When disabled (empty composer or pending): muted bg.
 * - When `isStreaming` is true: shows a stop square instead, and is
 *   always enabled (clicking cancels the in-flight response).
 *
 * Kept in its own module so <PromptComposer /> stays focused on layout
 * and so the same button can be reused inside the extension (P7).
 */
export function SendButton({
  canSend,
  isStreaming = false,
  onClick,
  className,
}: SendButtonProps) {
  return (
    <IconButton
      aria-label={isStreaming ? "Stop generating" : canSend ? "Send" : "Send (empty prompt)"}
      onClick={onClick}
      disabled={!isStreaming && !canSend}
      aria-disabled={!isStreaming && !canSend}
      className={cn(
        "transition-colors duration-fast",
        isStreaming
          ? "bg-bg-hover text-fg-primary hover:bg-bg-active"
          : canSend
            ? "bg-brand text-white hover:bg-brand-hover"
            : "bg-bg-hover text-fg-muted",
        className,
      )}
    >
      {isStreaming ? (
        <Square size={14} aria-hidden="true" fill="currentColor" />
      ) : (
        <ArrowUp size={16} aria-hidden="true" />
      )}
    </IconButton>
  );
}