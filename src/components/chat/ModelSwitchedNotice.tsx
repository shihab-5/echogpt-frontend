"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useActiveModel } from "@/hooks/use-active-model";
import { getModel } from "@/data/models";
import { EMPTY_COPY } from "@/data/empty-copy";

interface ModelSwitchedNoticeProps {
  /** Auto-dismiss duration in ms. Defaults to 4000. */
  durationMs?: number;
}

/**
 * Inline notice shown when the active model changes mid-thread.
 *
 * Self-contained: reads `useActiveModel()` and tracks its own
 * lifecycle. Auto-dismisses after `durationMs` (default 4 s).
 * Esc dismisses early.
 *
 * aria-live="polite" so it doesn't interrupt other screen-reader
 * output. Visual: a small chip with the brand check + the model
 * name, using --brand-subtle so it reads as informational.
 *
 * The "skip first render" guard via ref avoids showing a notice on
 * mount for the initial model — only subsequent changes count.
 */
export function ModelSwitchedNotice({
  durationMs = 4000,
}: ModelSwitchedNoticeProps) {
  const { model } = useActiveModel();
  const [noticeModel, setNoticeModel] = useState<string | null>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    setNoticeModel(getModel(model).name);
    const id = window.setTimeout(() => setNoticeModel(null), durationMs);
    return () => window.clearTimeout(id);
  }, [model, durationMs]);

  useEffect(() => {
    if (!noticeModel) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNoticeModel(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [noticeModel]);

  if (!noticeModel) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-subtle bg-brand-subtle px-3 py-1 text-xs text-brand",
      )}
    >
      <Check size={12} aria-hidden="true" />
      <span>{EMPTY_COPY.modelSwitched(noticeModel)}</span>
      <button
        type="button"
        onClick={() => setNoticeModel(null)}
        aria-label="Dismiss notice"
        className="ml-1 rounded-full p-0.5 text-brand transition-colors duration-fast hover:bg-brand-subtle focus-visible:outline-none"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
