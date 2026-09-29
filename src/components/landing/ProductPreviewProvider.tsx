"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_MODEL_ID, getModel } from "@/data/models";
import { PREVIEW_MESSAGES } from "@/data/preview-messages";
import type { Message, ModelId } from "@/types/chat";

interface ProductPreviewContext {
  messages: Message[];
  composer: string;
  setComposer: (next: string) => void;
  model: ModelId;
  setModel: (next: ModelId) => void;
  /** No-op for the landing preview. Wired in P5. */
  send: () => void;
  isReadOnly: true;
}

const Ctx = createContext<ProductPreviewContext | null>(null);

/**
 * Frozen-state provider for the marketing ProductPreview.
 * Reuses the real <Message />, <PromptComposer />, <QuickActions /> and
 * <ModelSelector /> components; the only thing it supplies is non-functional
 * state so the landing shows a believable conversation.
 */
export function ProductPreviewProvider({ children }: { children: React.ReactNode }) {
  const [composer, setComposer] = useState("");
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL_ID);

  const value = useMemo<ProductPreviewContext>(
    () => ({
      messages: [...PREVIEW_MESSAGES],
      composer,
      setComposer,
      model,
      setModel,
      send: () => undefined,
      isReadOnly: true as const,
    }),
    [composer, model],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProductPreview(): ProductPreviewContext {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useProductPreview must be used inside <ProductPreviewProvider />",
    );
  }
  return ctx;
}

export function _previewModelName(): string {
  return getModel(DEFAULT_MODEL_ID).name;
}
