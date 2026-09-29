import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";

interface FieldProps {
  id: string;
  label: string;
  /** Optional helper / hint text. */
  hint?: string;
  /** Optional error text. Replaces hint when present. */
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ id, label, hint, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {(hint || error) && (
        <p
          className={cn(
            "text-xs",
            error ? "text-danger" : "text-fg-muted",
          )}
          role={error ? "alert" : undefined}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
