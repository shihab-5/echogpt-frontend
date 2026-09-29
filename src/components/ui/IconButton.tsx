import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "ghost" | "solid";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  "aria-label": string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  /** If true, enforces 44×44 on mobile (default true). */
  mobileTapTarget?: boolean;
}

const SIZE: Record<IconButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      className,
      size = "md",
      variant = "ghost",
      mobileTapTarget = true,
      type = "button",
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-control",
          "transition-colors duration-fast",
          "focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "ghost" &&
            "text-fg-secondary hover:text-fg-primary hover:bg-bg-hover active:bg-bg-active",
          variant === "solid" &&
            "bg-bg-elevated text-fg-primary border border-border-strong hover:bg-bg-hover",
          SIZE[size],
          // Mobile slot: minimum 44×44 tap target.
          mobileTapTarget && "min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
          size === "sm" && mobileTapTarget && "min-h-[44px] min-w-[44px]",
          size === "md" && mobileTapTarget && "min-h-[44px] min-w-[44px]",
          className,
        )}
        {...rest}
      />
    );
  },
);
