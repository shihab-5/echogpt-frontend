"use client";

import { Message } from "@/components/chat/Message";
import { PromptComposer } from "@/components/chat/PromptComposer";
import { QuickActions } from "@/components/chat/QuickActions";
import { ModelPill } from "@/components/shared/ModelPill";
import {
  ProductPreviewProvider,
  useProductPreview,
} from "@/components/landing/ProductPreviewProvider";
import { QUICK_ACTION_MAP } from "@/data/quick-actions";
import type { QuickActionId } from "@/data/quick-actions";

/**
 * Marketing ProductPreview.
 *
 * Built from real, reused chat components — no mirror files.
 * The provider supplies frozen state so the preview never actually
 * sends a prompt.
 */
function PreviewInner() {
  const { messages, composer, setComposer, model, setModel, send } =
    useProductPreview();

  return (
    <div className="flex flex-col gap-3 rounded-modal border border-border-strong bg-bg-card p-4 md:p-5">
      <header className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <ModelPill modelId={model} size="sm" />
          <span className="text-[11px] text-fg-muted">Live preview</span>
        </div>
      </header>

      <div className="flex max-h-[420px] flex-col gap-4 overflow-y-auto py-1">
        {messages.map((m) => (
          <Message key={m.id} message={m} ariaLive="off" />
        ))}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-border pt-3">
        <QuickActions
          onPick={(id: QuickActionId) => setComposer(QUICK_ACTION_MAP[id].prefix(""))}
        />
        <PromptComposer
          value={composer}
          onChange={setComposer}
          onSend={send}
          model={model}
          onModelChange={setModel}
          disabled
          placeholder="Send is disabled in the preview."
        />
      </div>
    </div>
  );
}

export function ProductPreview() {
  return (
    <ProductPreviewProvider>
      <PreviewInner />
    </ProductPreviewProvider>
  );
}
