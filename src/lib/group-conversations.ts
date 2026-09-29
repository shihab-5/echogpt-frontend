import type { Conversation } from "@/types/chat";

const DAY = 24 * 60 * 60 * 1000;

export interface ConversationGroups {
  today: Conversation[];
  yesterday: Conversation[];
  last7: Conversation[];
  last30: Conversation[];
  older: Conversation[];
}

const EMPTY: ConversationGroups = {
  today: [],
  yesterday: [],
  last7: [],
  last30: [],
  older: [],
};

/**
 * Group conversations into Today / Yesterday / Last 7 days / Last 30 days / Older,
 * sorted newest first within each bucket.
 */
export function groupConversations(
  list: ReadonlyArray<Conversation>,
  now: number = Date.now(),
): ConversationGroups {
  const out: ConversationGroups = {
    today: [],
    yesterday: [],
    last7: [],
    last30: [],
    older: [],
  };
  for (const c of list) {
    const age = now - c.updatedAt;
    if (age < DAY) out.today.push(c);
    else if (age < 2 * DAY) out.yesterday.push(c);
    else if (age < 7 * DAY) out.last7.push(c);
    else if (age < 30 * DAY) out.last30.push(c);
    else out.older.push(c);
  }
  for (const key of Object.keys(out) as Array<keyof ConversationGroups>) {
    out[key].sort((a, b) => b.updatedAt - a.updatedAt);
  }
  return out;
}

export const EMPTY_GROUPS: ConversationGroups = EMPTY;

/**
 * Filter conversations by case-insensitive substring match against title.
 * Returns a shallow copy. An empty / whitespace-only query returns the
 * original list (caller-friendly).
 */
export function filterConversations(
  list: ReadonlyArray<Conversation>,
  query: string,
): Conversation[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...list];
  return list.filter((c) => c.title.toLowerCase().includes(needle));
}
