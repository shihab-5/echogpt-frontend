"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Preferences } from "@/types/chat";
import { DEFAULT_MODEL_ID } from "@/data/models";
import { getJSON, setJSON } from "@/lib/storage";

const KEY = "echogpt:preferences:v1";

const DEFAULTS: Preferences = {
  defaultModel: DEFAULT_MODEL_ID,
  density: "comfortable",
  showModelBadge: true,
  sendOnEnter: true,
  streamReplies: true,
};

const CHANGE_EVENT = "echogpt:preferences-change";

function read(): Preferences {
  const stored = getJSON<Preferences | null>(KEY, null);
  return stored ? { ...DEFAULTS, ...stored } : DEFAULTS;
}

/**
 * Cached snapshot. `getSnapshot` must return the same reference between
 * calls unless the store actually changed; otherwise React 19 warns
 * "The result of getSnapshot should be cached to avoid an infinite loop"
 * and re-renders forever. `read()` returns `{...DEFAULTS, ...stored}`
 * — a fresh object literal every call once `stored` is non-null — so we
 * cache the parsed shape here and invalidate it from the subscribe
 * listener whenever preferences change.
 */
let cachedPreferences: Preferences | null = null;

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => {
    cachedPreferences = null;
    listener();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Preferences {
  if (cachedPreferences === null) cachedPreferences = read();
  return cachedPreferences;
}

function getServerSnapshot(): Preferences {
  return DEFAULTS;
}

export function usePreferences() {
  const preferences = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const update = useCallback(
    (patch: Partial<Preferences>): void => {
      const next = { ...read(), ...patch };
      setJSON(KEY, next);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [],
  );

  const reset = useCallback((): void => {
    setJSON(KEY, DEFAULTS);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { preferences, update, reset };
}
