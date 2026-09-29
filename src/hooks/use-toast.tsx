"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createId } from "@/lib/id";

export type ToastVariant = "info" | "success" | "error";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  pushToast: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3500;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = createId("toast");
      const duration = item.duration ?? DEFAULT_DURATION;
      setToasts((prev) => [...prev, { ...item, id, duration }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, pushToast, dismiss }),
    [toasts, pushToast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

function ToastViewport() {
  const ctx = useContext(ToastContext);
  if (!ctx) return null;
  if (ctx.toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    >
      {ctx.toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => ctx.dismiss(t.id)}
          className={`pointer-events-auto flex items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)] ${
            t.variant === "error"
              ? "border-danger bg-danger-bg text-danger"
              : t.variant === "success"
                ? "border-brand-subtle bg-brand-subtle text-brand"
                : "border-border-strong bg-bg-card text-fg-primary"
          }`}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider />");
  }
  return ctx;
}
