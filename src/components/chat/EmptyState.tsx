"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { PromptComposer } from "@/components/chat/PromptComposer";
import { useConversations } from "@/hooks/use-conversations";
import { useActiveModel } from "@/hooks/use-active-model";
import { EXAMPLE_PROMPTS } from "@/data/example-prompts";
import type { QuickActionId } from "@/data/quick-actions";
import { getQuickAction } from "@/lib/quick-action-registry";

interface EmptyStateProps {
  /**
   * Visual density. `compact` is used by the extension popup — tighter
   * hero copy, fewer prompts, no eyebrow pill.
   */
  variant?: "default" | "compact";
}

/**
 * Empty workspace view shown at `/app`.
 *
 * - Three example prompts the user can click to pre-fill the composer.
 * - A free-form composer underneath.
 * - Sending either a typed prompt or a clicked example creates a new
 *   conversation and routes to its chat view.
 */
export function EmptyState({ variant = "default" }: EmptyStateProps) {
  const router = useRouter();
  const { create } = useConversations();
  const { model, setModel } = useActiveModel();

  const [value, setValue] = useState("");

  const submit = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const conv = create(trimmed, model);
      router.push(`/app/chat/${conv.id}`);
    },
    [create, model, router],
  );

  const onSend = useCallback(() => submit(value), [submit, value]);

  const onPickPrompt = useCallback((text: string) => {
    setValue(text);
  }, []);

  const onQuickAction = useCallback(
    (id: QuickActionId) => {
      const action = getQuickAction(id);
      setValue(action.prefix(value));
    },
    [value],
  );

  const isCompact = variant === "compact";
  const prompts = isCompact ? EXAMPLE_PROMPTS.slice(0, 2) : EXAMPLE_PROMPTS;

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center",
        isCompact ? "px-3 py-6" : "px-4 py-10 md:py-16",
      )}
    >
      <div className="w-full">
        {!isCompact && (
          <div className="mb-5 inline-flex h-9 items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-3 text-xs text-fg-secondary">
            <Sparkles size={14} aria-hidden="true" className="text-fg-secondary" />
            <span>EchoGPT — a focused multi-model workspace</span>
          </div>
        )}

        <h1
          className={cn(
            "text-balance font-semibold tracking-tight text-fg-primary",
            isCompact ? "text-base" : "text-2xl md:text-3xl",
          )}
        >
          {isCompact ? "Start a conversation" : "Welcome to the workspace"}
        </h1>
        <p
          className={cn(
            "mt-1 text-fg-secondary",
            isCompact ? "text-xs" : "mt-2 max-w-prose text-sm md:text-base",
          )}
        >
          {isCompact
            ? "Pick a starter or write something below."
            : "Pick a starter, type your own, or pick a quick action below."}
        </p>

        <ul
          className={cn(
            "grid gap-2",
            isCompact ? "mt-3" : "mt-6 md:grid-cols-2",
          )}
        >
          {prompts.map((prompt) => (
            <li key={prompt.id}>
              <button
                type="button"
                onClick={() => onPickPrompt(prompt.body)}
                className={cn(
                  "flex w-full items-start justify-between gap-3 rounded-lg border border-border-strong bg-bg-elevated text-left text-fg-primary",
                  "transition-colors duration-fast hover:border-fg-muted hover:bg-bg-hover",
                  "focus-visible:outline-none",
                  isCompact ? "p-2 text-xs" : "p-3 text-sm",
                )}
              >
                <span className="flex flex-col gap-1">
                  <span className="font-medium">{prompt.title}</span>
                  {!isCompact && (
                    <span className="text-xs text-fg-muted">{prompt.body}</span>
                  )}
                </span>
                <ArrowRight
                  size={isCompact ? 12 : 16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-fg-muted"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={cn(isCompact ? "mt-3" : "mt-6")}>
          <PromptComposer
            value={value}
            onChange={setValue}
            onSend={onSend}
            model={model}
            onModelChange={setModel}
            onQuickAction={onQuickAction}
            placeholder="Ask anything…"
            variant={isCompact ? "compact" : "default"}
          />
        </div>
      </div>
    </div>
  );
}