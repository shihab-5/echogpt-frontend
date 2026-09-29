import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "prose" | "narrow";
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  const widths = {
    default: "max-w-container",
    prose: "max-w-prose",
    narrow: "max-w-[640px]",
  } as const;

  return (
    <div className={cn("mx-auto w-full px-4 md:px-8", widths[size], className)}>
      {children}
    </div>
  );
}
