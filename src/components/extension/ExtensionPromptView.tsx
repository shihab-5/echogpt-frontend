"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useConversations } from "@/hooks/use-conversations";
import { useActiveModel } from "@/hooks/use-active-model";
import { useChatStream } from "@/hooks/use-chat-stream";
import { buildUserMessage } from "@/data/messages";
import { EXAMPLE_PROMPTS } from "@/data/example-prompts";
import { getQuickAction } from "@/lib/quick-action-registry";
import type { Message as Msg } from "@/types/chat";
import type { QuickActionId } from "@/data/quick-actions";
import { ExtensionRecentList } from "@/components/extension/ExtensionRecentList";
import { ExtensionComposer } from "@/components/extension/ExtensionComposer";
import { ExtensionEmptyState } from "@/components/extension/ExtensionEmptyState";

/**
 * Popup's main view — prompt + recent list + composer.
 *
 * Mirrors <ChatSurface />'s send handler so the same send pipeline
 * works in either surface. When the user sends a message we:
 *
 *   1. Create a new conversation via the shared store (so it appears
 *      on /app/history too).
 *   2. Optimistically append the user message + an empty assistant
 *      placeholder to that conversation.
 *   3. Pipe the prompt through <useChatStream> for a realistic mock
 *      response.
 *   4. Replace the placeholder with the real response on completion.
 *
 * On unmount we abort any in-flight stream so leaving the popup
 * cancels the response. On error we leave the placeholder flagged.
 *
 * After a successful send we route to `?conversation=<id>` so the
 * conversation view slides in within the same frame.
 */
export function ExtensionPromptView() {
  const router = useRouter();
  const conv = useConversations();
  const { model, setModel: setActiveModel } = useActiveModel();
  const { status, send, abort, errorMessage } = useChatStream();

  const [composerValue, setComposerValue] = useState("");

  const { conversations } = conv;
  const isStreaming = status === "pending";

  // Cancel any in-flight stream when the popup closes.
  useEffect(() => () => abort(), [abort]);

  const handleSend = useCallback(async () => {
    const text = composerValue.trim();
    if (!text) return;

    const convObj = conv;
    const userMsg = buildUserMessage(text);
    const created = convObj.create(text, model);

    // Optimistic assistant placeholder.
    const placeholder: Msg = {
      id: `pending_${userMsg.id}`,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      status: "streaming",
    };
    convObj.appendMessage(created.id, userMsg);
    convObj.appendMessage(created.id, placeholder);
    setComposerValue("");

    const result = await send(text, model);

    if (result) {
      convObj.replaceLastAssistant(created.id, result);
      // Slide into the conversation view once we have a response so
      // the user can see the result. If they want to send another
      // message they can press Back.
      router.replace(`/extension?conversation=${created.id}`);
    } else if (errorMessage) {
      convObj.replaceLastAssistant(created.id, { ...placeholder, status: "error" });
    } else {
      // Aborted — clean up the placeholder so the conversation doesn't
      // carry an empty assistant bubble.
      convObj.replaceLastAssistant(created.id, {
        ...placeholder,
        content: "— stopped —",
        status: "complete",
      });
    }
  }, [composerValue, conv, send, model, errorMessage, router]);

  const handleQuickAction = useCallback(
    (id: QuickActionId) => {
      const action = getQuickAction(id);
      setComposerValue(action.prefix(composerValue));
    },
    [composerValue],
  );

  // The popup's "empty state" only appears when the store is empty AND
  // we're not mid-send.
  const hasConversations = useMemo(() => conversations.length > 0, [conversations.length]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {hasConversations ? (
          <ExtensionRecentList />
        ) : (
          <ExtensionEmptyState />
        )}
        {/* A tiny list of starter prompts above the composer so the
            user has something to click without having to type. */}
        {hasConversations && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
              Starters
            </p>
            <ul className="space-y-1">
              {EXAMPLE_PROMPTS.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setComposerValue(p.body)}
                    className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs text-fg-secondary transition-colors duration-fast hover:bg-bg-hover hover:text-fg-primary focus-visible:outline-none"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium text-fg-primary">{p.title}</span>
                      <span className="text-[10px] text-fg-muted">{p.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border bg-bg-base p-2.5">
        <ExtensionComposer
          value={composerValue}
          onChange={setComposerValue}
          onSend={handleSend}
          model={model}
          onModelChange={setActiveModel}
          onQuickAction={handleQuickAction}
          isStreaming={isStreaming}
          onStop={abort}
        />
      </div>
    </div>
  );
}