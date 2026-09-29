import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Visually hide label while keeping it accessible. */
  visuallyHidden?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, visuallyHidden, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-fg-primary",
        visuallyHidden && "sr-only",
        className,
      )}
      {...rest}
    />
  );
});
