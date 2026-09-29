"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ExtensionPopupLayout } from "@/components/extension/ExtensionPopupLayout";
import { ExtensionHeader } from "@/components/extension/ExtensionHeader";
import { ExtensionViewSwitcher } from "@/components/extension/ExtensionViewSwitcher";
import { ExtensionPromptView } from "@/components/extension/ExtensionPromptView";
import { ExtensionConversationView } from "@/components/extension/ExtensionConversationView";

/**
 * /extension — the popup's root. Two states based on the
 * `?conversation=<id>` query param:
 *
 *   - No id → <ExtensionPromptView /> (recent list + composer).
 *   - Id set → <ExtensionConversationView /> (renders the thread).
 *
 * Wrapped in <Suspense> because useSearchParams() requires a boundary
 * in the App Router.
 */
export default function ExtensionPage() {
  return (
    <Suspense fallback={<PopupFallback />}>
      <ExtensionPageInner />
    </Suspense>
  );
}

function ExtensionPageInner() {
  const sp = useSearchParams();
  const conversationId = sp.get("conversation");

  if (conversationId) {
    return (
      <div className="flex h-[560px] w-[380px] overflow-hidden rounded-modal border border-border-strong bg-bg-card">
        <ExtensionConversationView conversationId={conversationId} />
      </div>
    );
  }

  return (
    <ExtensionPopupLayout
      header={
        <>
          <ExtensionHeader title="Ask anything" />
          <ExtensionViewSwitcher />
        </>
      }
    >
      <ExtensionPromptView />
    </ExtensionPopupLayout>
  );
}

function PopupFallback() {
  return (
    <div className="flex h-[560px] w-[380px] items-center justify-center rounded-modal border border-border-strong bg-bg-card text-xs text-fg-muted">
      Loading…
    </div>
  );
}