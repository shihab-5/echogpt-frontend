import { Message } from "@/components/chat/Message";
import type { Message as Msg } from "@/types/chat";

interface ExtensionMessageBubbleProps {
  message: Msg;
  onRegenerate?: () => void;
}

/**
 * Thin wrapper that pins the compact variant. Used by the popup's
 * conversation view to render each thread message.
 */
export function ExtensionMessageBubble({
  message,
  onRegenerate,
}: ExtensionMessageBubbleProps) {
  return (
    <Message
      message={message}
      onRegenerate={onRegenerate}
      variant="compact"
    />
  );
}