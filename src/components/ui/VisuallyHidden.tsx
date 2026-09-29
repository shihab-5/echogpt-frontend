import { cn } from "@/lib/cn";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function VisuallyHidden({ children, className, ...rest }: VisuallyHiddenProps) {
  return (
    <span className={cn("sr-only", className)} {...rest}>
      {children}
    </span>
  );
}
