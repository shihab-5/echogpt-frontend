"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/IconButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  tone?: "default" | "danger";
  size?: "sm" | "md" | "lg";
  /** Where the primary action button lives. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const SIZE = {
  sm: "max-w-[480px]",
  md: "max-w-[640px]",
  lg: "max-w-[800px]",
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  tone = "default",
  size = "sm",
  footer,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus the dialog on open
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role={tone === "danger" ? "alertdialog" : "dialog"}
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-desc" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-modal border border-border-strong bg-bg-card p-6 md:p-8",
          SIZE[size],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-title"
              className={cn(
                "text-lg font-semibold",
                tone === "danger" ? "text-danger" : "text-fg-primary",
              )}
            >
              {title}
            </h2>
            {description && (
              <p id="modal-desc" className="mt-1 text-sm text-fg-secondary">
                {description}
              </p>
            )}
          </div>
          <IconButton
            aria-label="Close dialog"
            size="sm"
            onClick={onClose}
            className="-mt-1 -mr-1"
          >
            <X size={16} aria-hidden="true" />
          </IconButton>
        </div>
        {children && <div className="mt-4 text-sm text-fg-secondary">{children}</div>}
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
