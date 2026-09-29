"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  /** Custom message override. Defaults to a generic "response failed" line. */
  message?: string;
  /** Called when the user clicks Retry. */
  onRetry?: () => void;
}

/**
 * Error state rendered inside an assistant bubble when generation fails.
 *
 * role="alert" so screen readers announce the failure immediately.
 * The Retry button is a real <button /> with a visible focus ring —
 * keyboard users get the same affordance as mouse users.
 */
export function ErrorState({
  message = "The response failed.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex items-center gap-3 px-4 py-3">
      <span aria-hidden="true" className="text-danger">
        <AlertCircle size={14} />
      </span>
      <p className="text-sm text-danger">{message}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
