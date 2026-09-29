import { EmptyState } from "@/components/chat/EmptyState";

/**
 * /app — the empty workspace.
 *
 * Renders <EmptyState /> with the example-prompt cards and the
 * composer. Sending from here creates a new conversation and routes
 * to /app/chat/<new-id>.
 */
export default function AppHome() {
  return <EmptyState />;
}
