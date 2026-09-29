import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive";
  padding?: "sm" | "md" | "lg";
}

const PADDING = {
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "default", padding = "md", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-card border border-border bg-bg-card",
        variant === "interactive" &&
          "transition-colors duration-fast hover:bg-bg-hover cursor-pointer",
        PADDING[padding],
        className,
      )}
      {...rest}
    />
  );
});
