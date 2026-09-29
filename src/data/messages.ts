import type { Message } from "@/types/chat";
import { createId } from "@/lib/id";

export function buildUserMessage(content: string): Message {
  return {
    id: createId("msg"),
    role: "user",
    content,
    createdAt: Date.now(),
    status: "complete",
  };
}

export function buildAssistantMessage(
  content: string,
  model?: string,
): Message {
  return {
    id: createId("msg"),
    role: "assistant",
    content,
    model,
    createdAt: Date.now(),
    status: "complete",
  };
}

export const SEED_MESSAGES: ReadonlyArray<Message> = [];
