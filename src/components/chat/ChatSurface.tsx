"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { Message } from "@/components/chat/Message";
import { LoadingState } from "@/components/chat/LoadingState";
import { ErrorState } from "@/components/chat/ErrorState";
import { PromptComposer } from "@/components/chat/PromptComposer";
import { useConversation } from "@/hooks/use-conversation";
import { useChatStream } from "@/hooks/use-chat-stream";
import { useActiveModel } from "@/hooks/use-active-model";
import { buildUserMessage } from "@/data/messages";
import { getQuickAction } from "@/lib/quick-action-registry";
import { EXAMPLE_PROMPTS } from "@/data/example-prompts";
import type { Message as Msg } from "@/types/chat";
import type { QuickActionId } from "@/data/quick-actions";

interface ChatSurfaceProps {
  /** The conversation id from the route. */
  conversationId: string;
  /** Title shown in the chat header (server-resolved). */
  title: string;
  className?: string;
}

const SUGGESTED_PROMPTS = EXAMPLE_PROMPTS.slice(0, 3);

/**
 * Chat surface — the page-level view for a single conversation.
 *
 * Owns:
 *   - composer draft state (cleared on send)
 *   - in-flight assistant-message id (so we can replace it on completion)
 *   - regeneration context (the last user prompt, replayed on Regenerate)
 *
 * Reads everything else from the shared conversation store + the mock
 * AI stream hook. The component never talks to the network directly.
 *
 * Reset behaviour: the local composer state is reset when the
 * conversation id changes (navigating between chats). To keep the
 * reset effect-free (the ESLint rule flags setState in effects),
 * we use a `conversationIdRef` and reset on the render where the id
 * just changed.
 */
export function ChatSurface({
  conversationId,
  title,
  className,
}: ChatSurfaceProps) {
  const conv = useConversation(conversationId);
  const { model, setModel: setActiveModel } = useActiveModel();
  const { status, send, abort, errorMessage } = useChatStream();

  const [composerValue, setComposerValue] = useState("");
  const [pendingAssistantId, setPendingAssistantId] = useState<string | null>(
    null,
  );
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null);

  // Conversation-scoped state is reset by remounting <ChatSurface />
  // with a `key={conversation.id}` from the parent route — see
  // src/app/app/chat/[conversationId]/page.tsx. This is the React
  // pattern for "reset state when a prop changes" and avoids the
  // // react-hooks/set-state-in-effect and react-hooks/refs rules.

  // Memoize the messages array so downstream identity-based work
  // (like the "find last assistant" memo) doesn't churn.
  const messages = useMemo(() => conv?.messages ?? [], [conv?.messages]);
  const conversation = conv?.conversation;
  const isStreaming = status === "pending";

  // Per-conversation tool toggles. Persisted on the conversation record
  // (see `Conversation.tools`) so different threads can run with
  // different capabilities without leaking state across them.
  const tools = useMemo<ReadonlyArray<import("@/types/chat").ToolId>>(
    () => conversation?.tools ?? [],
    [conversation?.tools],
  );
  const handleToolsChange = useCallback(
    (next: ReadonlyArray<import("@/types/chat").ToolId>) => {
      conv?.setTools(next);
    },
    [conv],
  );

  // Find the last assistant message. Used to attach the Regenerate
  // handler to the most-recent assistant bubble only.
  const lastAssistant = useMemo<Msg | null>(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const m = messages[i]!;
      if (m.role === "assistant") return m;
    }
    return null;
  }, [messages]);

  // Send handler. Wraps the mock-AI call with the optimistic
  // user-message + assistant-placeholder bookkeeping.
  const handleSend = useCallback(async () => {
    const text = composerValue.trim();
    if (!text) return;

    const userMsg = buildUserMessage(text);
    conv?.append(userMsg);
    setLastUserPrompt(text);
    setComposerValue("");

    // Optimistic assistant placeholder.
    const placeholder: Msg = {
      id: `pending_${userMsg.id}`,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      status: "streaming",
    };
    conv?.append(placeholder);
    setPendingAssistantId(placeholder.id);

    const result = await send(text, model, { tools });

    if (result) {
      // Replace the placeholder with the real response.
      conv?.replaceLastAssistant(result);
      setPendingAssistantId(null);
    } else if (errorMessage) {
      // Leave the placeholder but flag it as errored.
      conv?.replaceLastAssistant({
        ...placeholder,
        status: "error",
      });
      setPendingAssistantId(null);
    } else {
      // Aborted: mark the placeholder as stopped so the user sees a
      // visible cue instead of a permanently-empty streaming bubble.
      conv?.replaceLastAssistant({
        ...placeholder,
        content: "— stopped —",
        status: "complete",
      });
      setPendingAssistantId(null);
    }
  }, [composerValue, conv, send, model, errorMessage, tools]);

  // Regenerate the last assistant message by replaying the last user prompt.
  const handleRegenerate = useCallback(async () => {
    if (!lastUserPrompt) return;
    const placeholder: Msg = {
      id: `pending_regen_${Date.now()}`,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      status: "streaming",
    };
    conv?.append(placeholder);
    setPendingAssistantId(placeholder.id);

    const result = await send(lastUserPrompt, model, { tools });

    if (result) {
      conv?.replaceLastAssistant(result);
      setPendingAssistantId(null);
    } else if (errorMessage) {
      conv?.replaceLastAssistant({ ...placeholder, status: "error" });
      setPendingAssistantId(null);
    } else {
      setPendingAssistantId(null);
    }
  }, [lastUserPrompt, conv, send, model, errorMessage, tools]);

  // Retry: re-attempt the last assistant message generation.
  const handleRetry = useCallback(async () => {
    if (!lastUserPrompt) return;
    await handleRegenerate();
  }, [lastUserPrompt, handleRegenerate]);

  // Quick-action handler — fills (or prefixes) the composer.
  const handleQuickAction = useCallback(
    (id: QuickActionId) => {
      const action = getQuickAction(id);
      const next = action.prefix(composerValue);
      setComposerValue(next);
    },
    [composerValue],
  );

  // Stop the in-flight stream.
  const handleStop = useCallback(() => {
    abort();
  }, [abort]);

  // Header title: prefer the resolved conversation title, fall back to the
  // server-supplied title, then to "New conversation".
  const headerTitle = conversation?.title || title || "New conversation";

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col bg-bg-base",
        className,
      )}
    >
      <ChatHeader title={headerTitle} />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-[720px] flex-1 px-4 py-6">
          {messages.length === 0 && (
            <EmptyThread
              onPick={(p) => {
                setComposerValue(p);
              }}
            />
          )}

          <ol className="flex flex-col gap-5">
            {messages.map((m) => (
              <li key={m.id}>
                <Message
                  message={m}
                  onRegenerate={
                    m === lastAssistant && !isStreaming
                      ? handleRegenerate
                      : undefined
                  }
                />
                {m.id === pendingAssistantId && m.status === "streaming" && (
                  <LoadingState />
                )}
                {m.id === pendingAssistantId && m.status === "error" && (
                  <ErrorState onRetry={handleRetry} />
                )}
              </li>
            ))}
            {/* Fallback for when status is error but the placeholder
                was already replaced: show a single retry banner at the
                bottom of the thread. */}
            {status === "error" && pendingAssistantId === null && (
              <li>
                <ErrorState
                  message={errorMessage ?? "The response failed."}
                  onRetry={handleRetry}
                />
              </li>
            )}
          </ol>
        </div>
      </div>

      <div className="border-t border-border bg-bg-base px-4 pt-3">
        <div className="mx-auto w-full max-w-[720px] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <PromptComposer
            value={composerValue}
            onChange={setComposerValue}
            onSend={handleSend}
            model={model}
            onModelChange={setActiveModel}
            isStreaming={isStreaming}
            onStop={handleStop}
            onQuickAction={handleQuickAction}
            tools={tools}
            onToolsChange={handleToolsChange}
            placeholder={lastUserPrompt ? "Ask a follow-up…" : "Ask anything…"}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Tiny empty-thread hero shown when a conversation has no messages yet.
 * Three starter prompts the user can click to fill the composer.
 */
function EmptyThread({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="mb-8 mt-4 rounded-lg border border-border-strong bg-bg-elevated p-5">
      <div className="mb-3 inline-flex items-center gap-2 text-xs text-fg-secondary">
        <Sparkles size={14} aria-hidden="true" className="text-fg-secondary" />
        <span>Start the thread</span>
      </div>
      <h2 className="text-balance text-lg font-semibold tracking-tight text-fg-primary">
        What do you want to work on?
      </h2>
      <p className="mt-1 text-sm text-fg-secondary">
        Pick a starter, or write something from scratch below.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {SUGGESTED_PROMPTS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onPick(p.body)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-md border border-border-strong bg-bg-card px-3 py-2 text-left text-sm text-fg-primary",
                "transition-colors duration-fast hover:border-fg-muted hover:bg-bg-hover",
                "focus-visible:outline-none",
              )}
            >
              <span className="flex flex-col">
                <span className="font-medium">{p.title}</span>
                <span className="text-xs text-fg-muted">{p.body}</span>
              </span>
              <ArrowDown
                size={14}
                aria-hidden="true"
                className="shrink-0 rotate-[-90deg] text-fg-muted"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}