import { cn } from "@/lib/cn";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
