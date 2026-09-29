"use client";

import { useState } from "react";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { ModelPill } from "@/components/shared/ModelPill";
import { useToast } from "@/components/shared/ToastProvider";
import { copyToClipboard } from "@/lib/clipboard";
import { timeAgo } from "@/lib/format";
import type { Message as Msg } from "@/types/chat";

interface MessageProps {
  message: Msg;
  /** Show "Regenerate" on the last assistant bubble. */
  onRegenerate?: () => void;
  /** Optional aria-live politeness; default "polite". */
  ariaLive?: "polite" | "assertive" | "off";
  /** Visual density — used by the extension variant. */
  variant?: "default" | "compact";
}

export function Message({
  message,
  onRegenerate,
  ariaLive = "polite",
  variant = "default",
}: MessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";
  const isAssistant = message.role === "assistant";
  const { pushToast } = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyToClipboard(message.content);
    if (ok) {
      setCopied(true);
      pushToast({ message: "Copied to clipboard", variant: "success" });
      setTimeout(() => setCopied(false), 1500);
    } else {
      pushToast({ message: "Couldn't copy", variant: "error" });
    }
  };

  const padding = variant === "compact" ? "px-3 py-2" : "px-4 py-3";
  const radius = variant === "compact" ? "rounded-md" : "rounded-lg";

  return (
    <article
      aria-live={ariaLive}
      className={cn(
        "group flex flex-col gap-2",
        variant === "compact" ? "gap-1.5" : "gap-2",
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isAssistant && message.model && (
            <ModelPill modelId={message.model} size="sm" />
          )}
          {!isAssistant && (
            <span className="text-xs font-medium text-fg-secondary">You</span>
          )}
        </div>
        <span className="time text-[11px] text-fg-muted">
          {timeAgo(message.createdAt)}
        </span>
      </header>

      <div
        className={cn(
          padding,
          radius,
          "relative",
          isUser
            ? "bg-bg-card border-l-2 border-fg-muted"
            : "bg-transparent border-l-2 border-brand",
          isError && "border-danger",
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-fg-primary">
          {message.content}
        </div>
      </div>

      {isAssistant && !isError && (
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100">
          <IconButton aria-label="Copy response" size="sm" onClick={onCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </IconButton>
          {onRegenerate && (
            <IconButton aria-label="Regenerate response" size="sm" onClick={onRegenerate}>
              <RefreshCcw size={14} />
            </IconButton>
          )}
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-2" role="alert">
          <p className="text-xs text-danger">The response failed.</p>
          {onRegenerate && (
            <Button size="sm" variant="secondary" onClick={onRegenerate}>
              Retry
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
