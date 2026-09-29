"use client";

import { Sparkles } from "lucide-react";
import { StreamingIndicator } from "@/components/chat/StreamingIndicator";

/**
 * Loading state rendered inside the assistant bubble while the mock AI
 * is "thinking". Mirrors the bubble's left-edge red accent so the
 * streaming thread reads as a continuation of the assistant turn.
 *
 * Plain server-friendly component — no client state. The aria-live
 * region lives on the parent <article /> so we don't double-announce.
 */
export function LoadingState() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-sm text-fg-secondary">
      <Sparkles size={14} aria-hidden="true" className="text-brand" />
      <span>Generating</span>
      <StreamingIndicator className="text-brand" />
    </div>
  );
}