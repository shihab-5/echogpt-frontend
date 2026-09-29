"use client";

import { Check, Copy, RefreshCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/components/shared/ToastProvider";
import { useState } from "react";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  className?: string;
}

export function MessageActions({
  content,
  onRegenerate,
  className,
}: MessageActionsProps) {
  const { pushToast } = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      pushToast({ message: "Copied to clipboard", variant: "success" });
      setTimeout(() => setCopied(false), 1500);
    } else {
      pushToast({ message: "Couldn't copy", variant: "error" });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        "opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100",
        className,
      )}
    >
      <IconButton aria-label="Copy" size="sm" onClick={onCopy}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </IconButton>
      {onRegenerate && (
        <IconButton aria-label="Regenerate" size="sm" onClick={onRegenerate}>
          <RefreshCcw size={14} />
        </IconButton>
      )}
      <IconButton aria-label="Helpful" size="sm">
        <ThumbsUp size={14} />
      </IconButton>
      <IconButton aria-label="Not helpful" size="sm">
        <ThumbsDown size={14} />
      </IconButton>
    </div>
  );
}
