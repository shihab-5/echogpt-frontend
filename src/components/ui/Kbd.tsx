import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  combo: string | string[];
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { combo, className, ...rest },
  ref,
) {
  const parts = Array.isArray(combo) ? combo : combo.split("+");
  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-1", className)}
      {...rest}
    >
      {parts.map((p, i) => (
        <kbd
          key={`${p}-${i}`}
          className="inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-sm border border-border bg-bg-hover px-1.5 font-mono text-[10px] font-medium text-fg-secondary"
        >
          {p.trim()}
        </kbd>
      ))}
    </span>
  );
});
