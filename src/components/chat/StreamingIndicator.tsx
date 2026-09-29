"use client";

import { cn } from "@/lib/cn";

interface StreamingIndicatorProps {
  /** Optional class for the outer wrapper. */
  className?: string;
}

/**
 * Three-dot streaming indicator. Used while the mock AI is "thinking".
 *
 * - Uses CSS keyframes (not Tailwind's animate-pulse, which is on the
 *   forbidden class list). Each dot staggers its fade via a CSS variable
 *   so the ripple reads left-to-right.
 * - role="status" + aria-label so screen readers announce the state.
 * - Respects prefers-reduced-motion: in reduce mode the keyframes are
 *   disabled and the dots render at full opacity.
 */
export function StreamingIndicator({ className }: StreamingIndicatorProps) {
  return (
    <span
      role="status"
      aria-label="Generating response"
      className={cn("inline-flex items-center gap-1", className)}
    >
      <span className="streaming-dot" />
      <span className="streaming-dot streaming-dot--delay-1" />
      <span className="streaming-dot streaming-dot--delay-2" />
    </span>
  );
}
