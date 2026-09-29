"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Message, ModelId } from "@/types/chat";
import { generateMockResponse } from "@/lib/mock-ai";
import { buildUserMessage } from "@/data/messages";

export type ChatStatus = "idle" | "pending" | "error";

export interface UseChatStream {
  status: ChatStatus;
  send: (prompt: string, model: ModelId) => Promise<Message | null>;
  regenerate: (
    lastPrompt: string,
    model: ModelId,
  ) => Promise<Message | null>;
  abort: () => void;
  reset: () => void;
  errorMessage: string | null;
}

/**
 * Mock AI stream controller.
 *
 * - Cancels in-flight responses on unmount or when a new send starts.
 * - Returns the assistant message so the caller can persist it.
 */
export function useChatStream(): UseChatStream {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const reset = useCallback(() => {
    abort();
    setStatus("idle");
    setErrorMessage(null);
  }, [abort]);

  useEffect(() => () => abort(), [abort]);

  const send = useCallback(
    async (prompt: string, model: ModelId): Promise<Message | null> => {
      abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setStatus("pending");
      setErrorMessage(null);
      try {
        const result = await generateMockResponse(prompt, model, {
          signal: controller.signal,
        });
        setStatus("idle");
        return result;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") {
          setStatus("idle");
          return null;
        }
        setStatus("error");
        const msg = err instanceof Error ? err.message : "The response failed.";
        setErrorMessage(msg);
        return null;
      }
    },
    [abort],
  );

  const regenerate = useCallback(
    async (lastPrompt: string, model: ModelId): Promise<Message | null> => {
      return send(lastPrompt, model);
    },
    [send],
  );

  return { status, send, regenerate, abort, reset, errorMessage };
}

// Re-export so callers don't need a second import for the user-message helper.
export { buildUserMessage };
