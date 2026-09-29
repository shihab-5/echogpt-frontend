"use client";

import { useEffect, type RefObject } from "react";

/**
 * Trap keyboard focus inside the referenced container while `active`.
 * Restores focus to the previously-focused element on deactivation.
 */
export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    function focusFirst(): void {
      const first = focusable[0];
      if (first) first.focus();
      else if (container) container.focus();
    }

    function onKey(e: KeyboardEvent): void {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    // Focus the first focusable child on the next tick so we don't fight
    // the original click that opened the trap.
    const id = window.setTimeout(focusFirst, 0);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [active, ref]);
}
