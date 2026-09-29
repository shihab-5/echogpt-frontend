/**
 * All empty-state strings. EchoGPT-voiced.
 */

export const EMPTY_COPY = {
  conversations: {
    title: "No conversations yet.",
    body: "Send a prompt to start a new thread. Switch models any time from the composer.",
    cta: "Open an example prompt",
  },
  search: {
    title: "No matches.",
    body: "Try a shorter query, or clear the search to see every conversation.",
    cta: "Clear search",
  },
  history: {
    title: "Nothing in your history yet.",
    body: "Your past conversations will appear here once you start a thread.",
  },
  modelSwitched: (name: string) => `Switched to ${name}.`,
  extension: {
    title: "Ask anything.",
    body: "Type a prompt below. EchoGPT runs locally — no round trip to a backend.",
  },
  chatNotFound: {
    title: "Conversation not found.",
    body: "The thread you opened doesn't exist on this device.",
    cta: "Start a new conversation",
  },
  reset: {
    title: "Reset everything?",
    body: "This deletes every conversation, your preferences, and your theme. The action cannot be undone.",
    confirm: "Reset",
    cancel: "Cancel",
  },
} as const;
