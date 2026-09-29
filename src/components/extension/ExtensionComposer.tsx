"use client";

import { PromptComposer } from "@/components/chat/PromptComposer";
import type { ModelId } from "@/types/chat";

interface ExtensionComposerProps {
  value: string;
  onChange: (next: string) => void;
  onSend: () => void;
  model: ModelId;
  onModelChange: (next: ModelId) => void;
  onQuickAction?: (id: import("@/data/quick-actions").QuickActionId) => void;
  isStreaming?: boolean;
  onStop?: () => void;
}

/**
 * Thin wrapper around <PromptComposer /> that pins the extension's
 * compact + model-hidden variant. Reusing the real composer keeps the
 * keyboard story (Enter to send, Shift+Enter newline, Esc to stop),
 * auto-grow, and send-button-disabled logic in one place.
 */
export function ExtensionComposer({
  value,
  onChange,
  onSend,
  model,
  onModelChange,
  onQuickAction,
  isStreaming = false,
  onStop,
}: ExtensionComposerProps) {
  return (
    <PromptComposer
      value={value}
      onChange={onChange}
      onSend={onSend}
      model={model}
      onModelChange={onModelChange}
      onQuickAction={onQuickAction}
      variant="compact"
      hideModelSelector
      placeholder="Ask anything…"
      isStreaming={isStreaming}
      onStop={onStop}
    />
  );
}