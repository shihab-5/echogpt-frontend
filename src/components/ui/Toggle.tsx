import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Required — every switch must announce what it controls. */
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}

interface SizeStyles {
  track: string;
  knob: string;
  translate: string;
}

const SIZE: Record<"sm" | "md", SizeStyles> = {
  sm: {
    track: "h-5 w-9",
    knob: "h-4 w-4",
    translate: "translate-x-4",
  },
  md: {
    track: "h-6 w-11",
    knob: "h-5 w-5",
    translate: "translate-x-5",
  },
};

/**
 * Switch primitive — used wherever a boolean preference needs an obvious
 * on/off affordance. Renders a real <button role="switch"> so it is
 * keyboard-activable and screen-reader announced.
 *
 * Visual: a pill track with a circular knob that translates when checked.
 * Track uses --brand when checked, --bg-active when not. The knob always
 * sits on --bg-card for contrast.
 *
 * Reduced-motion is handled by the global rule in globals.css: the
 * translate transition is clamped, so the knob simply lands in its
 * target position without animation. Color transitions still apply.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    checked,
    onChange,
    disabled = false,
    ariaLabel,
    size = "md",
    className,
  },
  ref,
) {
  const dims = SIZE[size];

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-fast",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        dims.track,
        checked
          ? "bg-brand border-brand"
          : "bg-bg-active border-border-strong",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block rounded-full bg-bg-card shadow-sm transition-transform duration-fast",
          dims.knob,
          // 2 px inset from the track edge when off (translate-x-0.5);
          // translate-x-full - knob width when on.
          checked ? dims.translate : "translate-x-0.5",
        )}
      />
    </button>
  );
});