"use client";

import { useEffect } from "react";

function matchesCombo(e: KeyboardEvent, combo: string[]): boolean {
  const parts = combo.map((p) => p.trim().toLowerCase());
  const key = e.key.toLowerCase();
  if (key !== parts[parts.length - 1]) return false;
  const needMeta = parts.includes("\u2318") || parts.includes("cmd") || parts.includes("meta");
  const needShift = parts.includes("shift");
  const needCtrl = parts.includes("ctrl") || parts.includes("control");
  const needAlt = parts.includes("alt") || parts.includes("option");
  if (needMeta !== e.metaKey) return false;
  if (needShift !== e.shiftKey) return false;
  if (needCtrl !== e.ctrlKey) return false;
  if (needAlt !== e.altKey) return false;
  return true;
}

export function useKeyboardShortcut(
  combo: string[],
  handler: (e: KeyboardEvent) => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    function onKey(e: KeyboardEvent): void {
      if (matchesCombo(e, combo)) handler(e);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [combo, handler, enabled]);
}
