import {
  QUICK_ACTIONS,
  type QuickAction,
  type QuickActionId,
} from "@/data/quick-actions";

export type { QuickAction, QuickActionId };

export const quickActionRegistry: Readonly<Record<QuickActionId, QuickAction>> =
  QUICK_ACTIONS.reduce(
    (acc, a) => {
      acc[a.id] = a;
      return acc;
    },
    {} as Record<QuickActionId, QuickAction>,
  );

export function getQuickAction(id: QuickActionId): QuickAction {
  return quickActionRegistry[id];
}

export function listQuickActions(): ReadonlyArray<QuickAction> {
  return QUICK_ACTIONS;
}
