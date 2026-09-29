import type { Message } from "@/types/chat";

/**
 * Frozen messages used by the landing-page ProductPreview.
 * Built from real <Message /> components — no mirror files.
 */
export const PREVIEW_MESSAGES: ReadonlyArray<Message> = [
  {
    id: "prev_user_1",
    role: "user",
    content: "Refactor this class component to hooks without losing behaviour.",
    createdAt: Date.now() - 60_000,
    status: "complete",
  },
  {
    id: "prev_assistant_1",
    role: "assistant",
    content:
      "Sure. The migration has three parts: lift state into useState or useReducer, replace lifecycle methods with useEffect, and convert refs with useRef. Here is the same component using hooks, with a short note on each change.",
    model: "anthropic-flagship",
    createdAt: Date.now() - 30_000,
    status: "complete",
  },
  {
    id: "prev_user_2",
    role: "user",
    content: "Add a unit-test idea at the end.",
    createdAt: Date.now() - 20_000,
    status: "complete",
  },
  {
    id: "prev_assistant_2",
    role: "assistant",
    content:
      "Test that submitting the form calls onSubmit once with the trimmed payload, that an empty field keeps the submit button disabled, and that pressing Enter sends while Shift+Enter adds a newline.",
    model: "anthropic-flagship",
    createdAt: Date.now() - 5_000,
    status: "complete",
  },
];
