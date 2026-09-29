"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { Textarea } from "@/components/ui/Textarea";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { QuickActions } from "@/components/chat/QuickActions";
import { ToolToggles } from "@/components/chat/ToolToggles";
import { SendButton } from "@/components/chat/SendButton";
import { useTheme } from "@/hooks/use-theme";
import type { ModelId, ToolId } from "@/types/chat";
import type { QuickActionId } from "@/data/quick-actions";

interface PromptComposerProps {
  value: string;
  onChange: (next: string) => void;
  onSend: () => void;
  model: ModelId;
  onModelChange: (next: ModelId) => void;
  /** Disable the send action (e.g. preview-only mode). */
  disabled?: boolean;
  /** When true, shows a placeholder suggesting the action is read-only. */
  placeholder?: string;
  /** Visual density — used by the extension variant. */
  variant?: "default" | "compact";
  /** True while a response is streaming — swaps the send button to "stop". */
  isStreaming?: boolean;
  /** Called when the user invokes the global stop action. */
  onStop?: () => void;
  /** Optional quick-action handler — when provided, QuickActions renders above the composer. */
  onQuickAction?: (id: QuickActionId) => void;
  /** Hide the model selector (used by the extension's compact variant). */
  hideModelSelector?: boolean;
  /**
   * Per-conversation tool toggles. When paired with `onToolsChange`
   * the tool-toggle row renders above the quick-action row. When
   * omitted (e.g. marketing preview, extension popup) the row is hidden.
   */
  tools?: ReadonlyArray<ToolId>;
  /** Required when `tools` is provided. Receives the next tools array. */
  onToolsChange?: (next: ReadonlyArray<ToolId>) => void;
}

/**
 * Prompt composer.
 *
 * - Auto-grow textarea (1 → 6 rows by default, 3 in compact mode).
 * - Send on Enter OR Cmd/Ctrl+Enter; newline on Shift+Enter.
 * - Model selector on the left, send button on the right.
 * - Optional quick-action row above the textarea.
 *
 * The composer is the only place that mounts <QuickActions /> and
 * <ModelSelector /> together — both are reusable elsewhere, but
 * composing them inside the composer keeps the keyboard / focus story
 * in one place.
 */
export function PromptComposer({
  value,
  onChange,
  onSend,
  model,
  onModelChange,
  disabled = false,
  placeholder = "Ask anything…",
  variant = "default",
  isStreaming = false,
  onStop,
  onQuickAction,
  hideModelSelector = false,
  tools,
  onToolsChange,
}: PromptComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { resolvedTheme } = useTheme();

  const canSend = !disabled && !isStreaming && value.trim().length > 0;

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Enter sends (unless Shift is held for a newline).
      // Cmd/Ctrl+Enter also sends — matches the locked keyboard contract.
      if (e.key !== "Enter" || e.shiftKey) return;
      e.preventDefault();
      if (isStreaming) {
        onStop?.();
      } else if (canSend) {
        onSend();
      }
    },
    [canSend, isStreaming, onSend, onStop],
  );

  const handleSendClick = useCallback(() => {
    if (isStreaming) {
      onStop?.();
    } else if (canSend) {
      onSend();
    }
  }, [isStreaming, onStop, canSend, onSend]);

  // Esc cancels a streaming response.
  useEffect(() => {
    if (!isStreaming || !onStop) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onStop?.();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isStreaming, onStop]);

  const padding = variant === "compact" ? "p-2.5" : "p-3";
  const maxRows = variant === "compact" ? 3 : 6;

  return (
    <div className="w-full space-y-2">
      {onToolsChange && (
        <ToolToggles
          enabled={tools ?? []}
          onChange={onToolsChange}
          variant={variant}
        />
      )}
      {onQuickAction && (
        <QuickActions
          onPick={(id) => {
            onQuickAction(id);
            // Focus the textarea so the user can keep typing.
            textareaRef.current?.focus();
          }}
          variant={variant}
        />
      )}

      <div
        className={cn(
          "rounded-lg border border-border-strong bg-bg-elevated transition-colors duration-fast",
          padding,
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        )}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          maxRows={maxRows}
          rows={1}
          readOnly={disabled}
          placeholder={placeholder}
          aria-label="Prompt"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-h-[24px]"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          {hideModelSelector ? (
            <span aria-hidden="true" />
          ) : (
            <ModelSelector value={model} onChange={onModelChange} size="sm" />
          )}
          <SendButton
            canSend={canSend}
            isStreaming={isStreaming}
            onClick={handleSendClick}
          />
        </div>
        {/* Hidden helper for screen readers: theme state is communicated
            through data-theme on <html>; no additional announcement needed. */}
        <span className="sr-only">Theme: {resolvedTheme}</span>
      </div>

      {/* Aria hint while streaming so screen readers know how to cancel. */}
      <span className="sr-only">
        {isStreaming ? "Press Escape or the stop button to cancel." : ""}
      </span>
    </div>
  );
}