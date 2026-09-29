"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true once the component has mounted on the client.
 * Uses `useSyncExternalStore` so the value matches server/client without
 * triggering cascading renders.
 */
function subscribe(): () => void {
  return () => {};
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
