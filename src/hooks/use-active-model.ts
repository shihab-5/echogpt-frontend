"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { ModelId } from "@/types/chat";
import { DEFAULT_MODEL_ID, MODEL_MAP } from "@/data/models";

/**
 * Read/write the active model via URL ?model=<id>.
 * Falls back to the default if no query param is present.
 */
export function useActiveModel() {
  const sp = useSearchParams();
  const router = useRouter();

  const fromUrl = sp.get("model");
  const model: ModelId =
    fromUrl && MODEL_MAP[fromUrl] ? fromUrl : DEFAULT_MODEL_ID;

  const setModel = useCallback(
    (id: ModelId) => {
      const params = new URLSearchParams(sp.toString());
      if (id === DEFAULT_MODEL_ID) params.delete("model");
      else params.set("model", id);
      const query = params.toString();
      router.replace(query ? `?${query}` : "?", { scroll: false });
    },
    [router, sp],
  );

  return { model, setModel };
}
