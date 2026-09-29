"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";
import { ExtensionHeader } from "@/components/extension/ExtensionHeader";
import { ExtensionMessageBubble } from "@/components/extension/ExtensionMessageBubble";

interface ExtensionConversationViewProps {
  /** Conversation id from the ?conversation= query param. */
  conversationId: string;
}

/**
 * Conversation view inside the popup. Renders every message in the
 * active conversation and auto-scrolls to the bottom as messages
 * arrive. Header shows the conversation title; the back chevron
 * returns to /extension (clearing the query param).
 */
export function ExtensionConversationView({
  conversationId,
}: ExtensionConversationViewProps) {
  const conv = useConversations();
  const conversation = useMemo(
    () => conv.conversationById(conversationId),
    [conv, conversationId],
  );
  const messages = useMemo(
    () => conv.messagesFor(conversationId),
    [conv, conversationId],
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Auto-scroll to the bottom whenever messages change.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, conversationId]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ExtensionHeader title={conversation?.title ?? "Conversation"} backHref="/extension" />

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {messages.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-fg-secondary">
              <MessageSquare size={16} aria-hidden="true" />
            </div>
            <p className="text-xs font-medium text-fg-primary">No messages yet</p>
            <p className="mt-1 text-[11px] text-fg-muted">
              Go back and send a prompt to start this thread.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col gap-3">
            {messages.map((m) => (
              <li key={m.id}>
                <ExtensionMessageBubble message={m} />
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="shrink-0 border-t border-border bg-bg-base p-2">
        <Link
          href={`/app/chat/${conversationId}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated px-3 py-1.5 text-xs font-medium text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
        >
          <span>Open in workspace</span>
          <ArrowUpRight size={11} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}