import { ChatSurface } from "@/components/chat/ChatSurface";
import { ConversationNotFoundPanel } from "@/components/chat/ConversationNotFoundPanel";
import { SEED_CONVERSATIONS } from "@/data/conversations";
import type { Conversation } from "@/types/chat";

interface PageProps {
  params: Promise<{ conversationId: string }>;
}

/**
 * /app/chat/[conversationId] — single conversation view.
 *
 * Server component so the URL is the source of truth. The conversation
 * is resolved server-side (seed ids + client-created ids). Unknown ids
 * render an inline not-found panel so the workspace chrome stays
 * usable.
 */
export default async function ChatDetail({ params }: PageProps) {
  const { conversationId } = await params;

  const conversation = resolveConversation(conversationId);

  if (!conversation) {
    return <ConversationNotFoundPanel conversationId={conversationId} />;
  }

  return (
    <ChatSurface
      key={conversation.id}
      conversationId={conversation.id}
      title={conversation.title}
    />
  );
}

/**
 * Server-safe lookup for known conversation ids.
 *
 * - Seed ids ("seed_1" .. "seed_5") resolve to their seeded entry.
 * - Anything that looks like a `createId("conv")` output is accepted
 *   as a stub; the client store will hydrate its real title on mount.
 * - Anything else returns null and triggers the not-found panel.
 */
function resolveConversation(id: string): Conversation | null {
  if (id.startsWith("seed_")) {
    return SEED_CONVERSATIONS.find((c) => c.id === id) ?? null;
  }
  if (id.startsWith("conv_") && id.length > 8) {
    return {
      id,
      title: "New conversation",
      model: "openai-flagship",
      createdAt: 0,
      updatedAt: 0,
      preview: "",
    };
  }
  return null;
}
