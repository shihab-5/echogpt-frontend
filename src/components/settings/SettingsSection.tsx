import { cn } from "@/lib/cn";

interface SettingsSectionProps {
  /** Small eyebrow label above the title ("Appearance", "Interface", ...). */
  eyebrow?: string;
  /** Section heading. */
  title: string;
  /** Optional caption under the title. */
  caption?: string;
  /** Section body. */
  children: React.ReactNode;
  className?: string;
  /**
   * Visual density. `narrow` is used by the extension popup — tighter
   * padding + smaller title so six sections fit a 380 × 560 frame.
   */
  variant?: "default" | "narrow";
}

/**
 * Generic wrapper for one Settings page section. Provides consistent
 * vertical rhythm and a subtle card surface so adjacent sections read
 * as discrete, scannable groups.
 *
 * Server-renderable; only the section body needs to be a client
 * component (when it reads from a store).
 */
export function SettingsSection({
  eyebrow,
  title,
  caption,
  children,
  className,
  variant = "default",
}: SettingsSectionProps) {
  const isNarrow = variant === "narrow";
  return (
    <section
      className={cn(
        "rounded-card border border-border-strong bg-bg-card",
        isNarrow ? "p-3" : "p-5",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-muted">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-1 font-semibold text-fg-primary",
          isNarrow ? "text-sm" : "text-base",
        )}
      >
        {title}
      </h2>
      {caption && (
        <p
          className={cn(
            "mt-1 text-fg-secondary",
            isNarrow ? "text-xs" : "text-sm",
          )}
        >
          {caption}
        </p>
      )}
      <div className={cn(isNarrow ? "mt-3" : "mt-4")}>{children}</div>
    </section>
  );
}