"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { User } from "@/types/chat";
import { getJSON, setJSON, remove } from "@/lib/storage";
import { createId } from "@/lib/id";

const KEY = "echogpt:user:v1";
const CHANGE_EVENT = "echogpt:user-change";

function computeInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]!.charAt(0).toUpperCase();
  const last =
    parts.length > 1
      ? parts[parts.length - 1]!.charAt(0).toUpperCase()
      : "";
  return `${first}${last}` || "?";
}

function read(): User | null {
  return getJSON<User | null>(KEY, null);
}

/**
 * Cached snapshot pattern — same shape as `use-preferences.ts` and
 * `use-conversations.ts`. `read()` returns a freshly-parsed object on
 * every call, so we cache the parsed value and invalidate it from the
 * subscribe listener whenever the user changes. Without the cache,
 * React 19 warns "The result of getSnapshot should be cached to avoid an
 * infinite loop" and re-renders forever.
 */
let cachedUser: User | null | undefined = undefined;

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => {
    cachedUser = undefined;
    listener();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): User | null {
  if (cachedUser === undefined) cachedUser = read();
  return cachedUser;
}

function getServerSnapshot(): User | null {
  return null;
}

/**
 * Mock-only user hook. Drives the sign-in form, the nav avatar, and
 * the user dropdown. There is no real auth: credentials are persisted
 * verbatim in localStorage and never leave the browser.
 */
export function useUser() {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((email: string, name?: string): User => {
    const cleanEmail = email.trim();
    const fallbackName =
      cleanEmail.split("@")[0]?.replace(/[._-]+/g, " ").trim() ||
      cleanEmail;
    const finalName = (name ?? fallbackName).trim() || cleanEmail;
    const next: User = {
      id: createId("user"),
      email: cleanEmail,
      name: finalName,
      initials: computeInitials(finalName),
      createdAt: Date.now(),
    };
    setJSON(KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return next;
  }, []);

  const signOut = useCallback((): void => {
    remove(KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { user, signIn, signOut };
}