import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "brand" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT: Record<BadgeVariant, string> = {
  neutral: "bg-bg-elevated text-fg-secondary border border-border",
  brand:
    "bg-brand-subtle text-[var(--brand)] border border-transparent",
  outline: "bg-transparent text-fg-secondary border border-border-strong",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = "neutral", ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex h-[22px] items-center gap-1 rounded-sm px-2 text-[11px] font-medium",
        VARIANT[variant],
        className,
      )}
      {...rest}
    />
  );
});
