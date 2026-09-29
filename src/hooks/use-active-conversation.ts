"use client";

import { useSearchParams } from "next/navigation";
import { useConversation } from "@/hooks/use-conversation";

/**
 * Reads the conversation id from the route. Used by /app/chat/[id].
 * For the empty workspace (/app) there is no id and `null` is returned.
 */
export function useActiveConversation(id: string | undefined) {
  const sp = useSearchParams();
  // sp is read so React tracks search-params changes for derived state.
  void sp;
  return useConversation(id);
}
