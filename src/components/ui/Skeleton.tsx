import { cn } from "@/lib/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full";
}

/**
 * Loading state primitive.
 * Uses the token-driven shimmer animation defined in globals.css (`.echogpt-skeleton`),
 * NOT Tailwind's animate-pulse (reserved for the typing indicator).
 */
export function Skeleton({
  width,
  height,
  rounded = "md",
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "echogpt-skeleton bg-bg-hover",
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-lg",
        rounded === "full" && "rounded-full",
        className,
      )}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
