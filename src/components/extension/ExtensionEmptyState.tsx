import { EmptyState } from "@/components/chat/EmptyState";

/**
 * Popup's empty state — wraps the workspace EmptyState in compact mode.
 * Triggering send from here creates a conversation and navigates to
 * /app/chat/<id> (the full web surface); the popup's own
 * ExtensionPromptView handles in-popup conversation creation.
 *
 * This component is used by /extension when the store is completely
 * empty AND the user has no active conversation — i.e. they navigated
 * here directly without having sent anything yet.
 */
export function ExtensionEmptyState() {
  return <EmptyState variant="compact" />;
}