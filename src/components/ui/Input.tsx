import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-control border bg-bg-elevated px-3 text-sm text-fg-primary",
        "placeholder:text-fg-muted",
        "transition-colors duration-fast",
        "focus-visible:outline-none",
        invalid
          ? "border-danger focus-visible:shadow-[0_0_0_2px_var(--danger-bg)]"
          : "border-border-strong hover:border-fg-muted focus-visible:shadow-[var(--focus-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});
