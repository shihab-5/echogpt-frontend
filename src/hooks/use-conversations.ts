"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Conversation, Message, ModelId, ToolId } from "@/types/chat";
import { getJSON, setJSON } from "@/lib/storage";
import {
  createEmptyConversation,
  SEED_CONVERSATIONS,
} from "@/data/conversations";
import { createId } from "@/lib/id";

const KEY = "echogpt:conversations:v1";

interface StoredShape {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
}

function readStore(): StoredShape {
  const stored = getJSON<StoredShape | null>(KEY, null);
  if (stored && Array.isArray(stored.conversations)) return stored;
  // First run: seed the store so the empty workspace never feels empty.
  const seed: StoredShape = {
    conversations: [...SEED_CONVERSATIONS],
    messages: {},
  };
  setJSON(KEY, seed);
  return seed;
}

function writeStore(next: StoredShape): void {
  setJSON(KEY, next);
  window.dispatchEvent(new Event("echogpt:store-change"));
}

/**
 * Cached snapshot. `getSnapshot` must return the same reference between
 * calls unless the store actually changed; otherwise React 19 warns
 * "The result of getSnapshot should be cached to avoid an infinite loop"
 * and re-renders forever. `readStore()` would return a fresh
 * `{conversations, messages}` object on every call (JSON.parse produces
 * a new top-level value, and the seed branch returns a fresh literal),
 * so we cache the parsed shape here and invalidate it from the
 * subscribe listener whenever the store changes.
 */
let cachedSnapshot: StoredShape | null = null;

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => {
    cachedSnapshot = null;
    listener();
  };
  window.addEventListener("echogpt:store-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("echogpt:store-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): StoredShape {
  if (cachedSnapshot === null) cachedSnapshot = readStore();
  return cachedSnapshot;
}

function getServerSnapshot(): StoredShape {
  return { conversations: [], messages: {} };
}

export function useConversations() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const create = useCallback(
    (prompt?: string, model?: ModelId): Conversation => {
      const conv = createEmptyConversation(prompt);
      if (model) conv.model = model;
      const current = readStore();
      writeStore({
        conversations: [conv, ...current.conversations],
        messages: { ...current.messages, [conv.id]: [] },
      });
      return conv;
    },
    [],
  );

  const remove = useCallback((id: string): void => {
    const current = readStore();
    const nextMessages = { ...current.messages };
    delete nextMessages[id];
    writeStore({
      conversations: current.conversations.filter((c) => c.id !== id),
      messages: nextMessages,
    });
  }, []);

  const setTitle = useCallback((id: string, title: string): void => {
    const current = readStore();
    writeStore({
      conversations: current.conversations.map((c) =>
        c.id === id ? { ...c, title, updatedAt: Date.now() } : c,
      ),
      messages: current.messages,
    });
  }, []);

  const setModel = useCallback((id: string, model: ModelId): void => {
    const current = readStore();
    writeStore({
      conversations: current.conversations.map((c) =>
        c.id === id ? { ...c, model, updatedAt: Date.now() } : c,
      ),
      messages: current.messages,
    });
  }, []);

  const setTools = useCallback(
    (id: string, tools: ReadonlyArray<ToolId>): void => {
      const current = readStore();
      writeStore({
        conversations: current.conversations.map((c) =>
          c.id === id
            ? { ...c, tools: [...tools], updatedAt: Date.now() }
            : c,
        ),
        messages: current.messages,
      });
    },
    [],
  );

  const appendMessage = useCallback(
    (conversationId: string, message: Message): void => {
      const current = readStore();
      const list = current.messages[conversationId] ?? [];
      const preview = message.content.slice(0, 120);
      writeStore({
        conversations: current.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                updatedAt: Date.now(),
                preview: message.role === "user" ? preview : c.preview,
              }
            : c,
        ),
        messages: {
          ...current.messages,
          [conversationId]: [...list, message],
        },
      });
    },
    [],
  );

  const replaceLastAssistant = useCallback(
    (conversationId: string, message: Message): void => {
      const current = readStore();
      const list = [...(current.messages[conversationId] ?? [])];
      for (let i = list.length - 1; i >= 0; i -= 1) {
        if (list[i]!.role === "assistant") {
          list[i] = message;
          break;
        }
      }
      writeStore({
        conversations: current.conversations.map((c) =>
          c.id === conversationId ? { ...c, updatedAt: Date.now() } : c,
        ),
        messages: { ...current.messages, [conversationId]: list },
      });
    },
    [],
  );

  const reset = useCallback((): void => {
    setJSON(KEY, {
      conversations: [...SEED_CONVERSATIONS],
      messages: {},
    });
    window.dispatchEvent(new Event("echogpt:store-change"));
  }, []);

  const messagesFor = useCallback(
    (conversationId: string): Message[] => {
      return store.messages[conversationId] ?? [];
    },
    [store.messages],
  );

  const conversationById = useCallback(
    (id: string): Conversation | undefined => {
      return store.conversations.find((c) => c.id === id);
    },
    [store.conversations],
  );

  return {
    conversations: store.conversations,
    create,
    remove,
    setTitle,
    setModel,
    setTools,
    appendMessage,
    replaceLastAssistant,
    reset,
    messagesFor,
    conversationById,
  };
}

// Helper used outside React (e.g. use-active-conversation).
export function messagesFor(conversationId: string): Message[] {
  return readStore().messages[conversationId] ?? [];
}

export function newConversationId(): string {
  return createId("conv");
}
