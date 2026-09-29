"use client";

import { useConversations } from "@/hooks/use-conversations";
import type { ToolId } from "@/types/chat";

export function useConversation(id: string | undefined) {
  const {
    conversationById,
    messagesFor,
    appendMessage,
    replaceLastAssistant,
    setModel,
    setTools,
  } = useConversations();

  if (!id) return null;

  return {
    conversation: conversationById(id),
    messages: messagesFor(id),
    append: (m: Parameters<typeof appendMessage>[1]) => appendMessage(id, m),
    replaceLastAssistant: (m: Parameters<typeof replaceLastAssistant>[1]) =>
      replaceLastAssistant(id, m),
    setModel: (model: Parameters<typeof setModel>[1]) => setModel(id, model),
    setTools: (tools: ReadonlyArray<ToolId>) => setTools(id, tools),
  };
}
