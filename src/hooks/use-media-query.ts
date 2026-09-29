"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string, listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

function readMedia(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

/**
 * SSR-safe media query hook. `false` on the server, real value on the client.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (l) => subscribeMedia(query, l),
    () => readMedia(query),
    () => false,
  );
}
