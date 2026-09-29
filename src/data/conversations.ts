import type { Conversation } from "@/types/chat";
import { DEFAULT_MODEL_ID } from "@/data/models";
import { createId } from "@/lib/id";

/**
 * Title derived from the first line of a prompt, trimmed to 64 chars.
 * If the prompt is empty after trimming, "New conversation" is used.
 */
export function titleFromPrompt(prompt: string): string {
  const firstLine = prompt.trim().split("\n")[0] ?? "";
  const trimmed = firstLine.trim();
  if (!trimmed) return "New conversation";
  if (trimmed.length <= 64) return trimmed;
  return `${trimmed.slice(0, 63).trimEnd()}\u2026`;
}

export function createEmptyConversation(prompt?: string): Conversation {
  const now = Date.now();
  return {
    id: createId("conv"),
    title: prompt ? titleFromPrompt(prompt) : "New conversation",
    model: DEFAULT_MODEL_ID,
    createdAt: now,
    updatedAt: now,
    preview: prompt ? prompt.slice(0, 120) : "",
  };
}

const SEED_BASE = [
  {
    title: "Comparing summarization styles",
    preview: "Compare a TL;DR, a bullet list, and an executive summary.",
  },
  {
    title: "Refactor a React component to hooks",
    preview: "Migrate a class component that handles form state to hooks.",
  },
  {
    title: "Brainstorm blog post hooks",
    preview: "Five angles for a post about focused multi-model workspaces.",
  },
  {
    title: "Translate a product blurb into Spanish",
    preview: "Localize the hero subtitle for a Latin American audience.",
  },
  {
    title: "Debug a Next.js hydration warning",
    preview: "Why is the theme flashing on first paint?",
  },
];

export const SEED_CONVERSATIONS: ReadonlyArray<Conversation> = SEED_BASE.map(
  (s, i) => {
    const createdAt = Date.now() - (i + 1) * 1000 * 60 * 60 * 6; // staggered older
    return {
      id: `seed_${i + 1}`,
      title: s.title,
      preview: s.preview,
      model: DEFAULT_MODEL_ID,
      createdAt,
      updatedAt: createdAt + 1000 * 60 * 4,
    };
  },
);
