"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/shared/Logo";
import { NewChatButton } from "@/components/chat/NewChatButton";
import { ConversationList } from "@/components/chat/ConversationList";
import { SidebarFooter } from "@/components/chat/SidebarFooter";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { IconButton } from "@/components/ui/IconButton";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile sidebar drawer (< md, 768 px). Slides in from the left
 * with a backdrop, traps focus, locks body scroll, and closes on
 * Esc or backdrop click. After close, focus is restored to the
 * element that opened it (handled by useFocusTrap's restoration).
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Esc closes — useFocusTrap also handles Esc implicitly via the
  // Tab trap, but the spec explicitly asks for an Esc handler so we
  // attach one separately.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useFocusTrap(panelRef, open);
  useLockBodyScroll(open);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-motion-base",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Workspace navigation"
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 left-0 flex h-full w-[min(86vw,320px)] flex-col bg-bg-elevated outline-none",
          "transition-transform duration-motion-base",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <header className="flex h-14 items-center justify-between border-b border-border px-3">
          <Logo size="sm" />
          <IconButton
            aria-label="Close menu"
            size="sm"
            mobileTapTarget={false}
            onClick={onClose}
            className="text-fg-secondary hover:text-fg-primary"
          >
            <X size={16} aria-hidden="true" />
          </IconButton>
        </header>

        <div className="space-y-2 px-3 py-3">
          <NewChatButton />
        </div>

        <ConversationList />

        <SidebarFooter />
      </div>
    </div>
  );
}
