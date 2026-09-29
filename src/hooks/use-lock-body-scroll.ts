"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while `active` is true. Restores the previous
 * overflow value on deactivation so a downstream component can stack
 * multiple locks safely.
 */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
