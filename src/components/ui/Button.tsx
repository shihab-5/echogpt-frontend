import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-transparent text-fg-primary border border-border-strong hover:bg-bg-hover active:bg-bg-active disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-fg-secondary hover:text-fg-primary hover:bg-bg-hover active:bg-bg-active disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-danger text-white hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
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
        "inline-flex items-center justify-center gap-2 rounded-control font-medium",
        "transition-colors duration-fast",
        "focus-visible:outline-none",
        "disabled:pointer-events-none",
        VARIANT[variant],
        SIZE[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    />
  );
});
