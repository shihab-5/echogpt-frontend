/**
 * Quick actions available in the prompt composer.
 * Single source of truth — used by both web app and extension.
 */

export type QuickActionId = "summarize" | "explain" | "rewrite" | "translate" | "debug";

export interface QuickAction {
  id: QuickActionId;
  label: string;
  hint: string;
  /** Returns the placeholder text for the composer. */
  placeholder: string;
  /** Returns the prompt prefix that the action injects. */
  prefix(text: string): string;
}

export const QUICK_ACTIONS: ReadonlyArray<QuickAction> = [
  {
    id: "summarize",
    label: "Summarize",
    hint: "Condense long text into a brief.",
    placeholder: "Paste text to summarize…",
    prefix: (text) =>
      text
        ? `Summarize this in three bullet points:\n\n${text}`
        : "Summarize this in three bullet points:\n\n",
  },
  {
    id: "explain",
    label: "Explain",
    hint: "Walk through how something works.",
    placeholder: "Paste something to explain…",
    prefix: (text) =>
      text
        ? `Explain this step by step, in plain language:\n\n${text}`
        : "Explain this step by step, in plain language:\n\n",
  },
  {
    id: "rewrite",
    label: "Rewrite",
    hint: "Improve clarity or tone.",
    placeholder: "Paste text to rewrite…",
    prefix: (text) =>
      text
        ? `Rewrite this for clarity and a direct, neutral tone:\n\n${text}`
        : "Rewrite this for clarity and a direct, neutral tone:\n\n",
  },
  {
    id: "translate",
    label: "Translate",
    hint: "Translate text to another language.",
    placeholder: "Paste text and add a target language…",
    prefix: (text) =>
      text
        ? `Translate this to Spanish (Latin American), keeping technical terms intact:\n\n${text}`
        : "Translate this to Spanish (Latin American), keeping technical terms intact:\n\n",
  },
  {
    id: "debug",
    label: "Debug code",
    hint: "Find and fix a bug in code.",
    placeholder: "Paste code and any error message…",
    prefix: (text) =>
      text
        ? `Find the bug, explain why it happens, and give a minimal fix:\n\n\`\`\`\n${text}\n\`\`\``
        : "Find the bug, explain why it happens, and give a minimal fix:\n\n",
  },
];

export const QUICK_ACTION_MAP: Readonly<Record<QuickActionId, QuickAction>> =
  QUICK_ACTIONS.reduce(
    (acc, a) => {
      acc[a.id] = a;
      return acc;
    },
    {} as Record<QuickActionId, QuickAction>,
  );
