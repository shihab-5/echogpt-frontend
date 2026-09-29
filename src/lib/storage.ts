/**
 * Namespaced typed JSON storage.
 * All keys are prefixed with `echogpt:` to avoid collisions and to make
 * future migrations easier.
 */

const PREFIX = "echogpt:";

function fullKey(key: string): string {
  return key.startsWith(PREFIX) ? key : `${PREFIX}${key}`;
}

function isAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getJSON<T>(key: string, fallback: T): T {
  if (!isAvailable()) return fallback;
  try {
    const raw = window.localStorage.getItem(fullKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setJSON<T>(key: string, value: T): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.setItem(fullKey(key), JSON.stringify(value));
  } catch {
    // Quota exceeded or disabled storage — fail silently.
  }
}

export function remove(key: string): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.removeItem(fullKey(key));
  } catch {
    // Ignore.
  }
}

export function clearAll(): void {
  if (!isAvailable()) return;
  try {
    const removeKeys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) removeKeys.push(k);
    }
    for (const k of removeKeys) window.localStorage.removeItem(k);
  } catch {
    // Ignore.
  }
}
