"use client";

import { cn } from "@/lib/cn";
import {
  Sparkles,
  Sun,
  Moon,
  Compass,
  Anchor,
  Zap,
  Search,
  Rocket,
  Layers,
  Library,
  FileText,
  Terminal,
  Languages,
  MessageSquare,
  FlaskConical,
  ScrollText,
  Lightbulb,
  Cpu,
} from "lucide-react";
import type { ModelIconKey } from "@/types/chat";

/**
 * Single source of truth for per-model visual identity.
 *
 * Renders a rounded tile (`bg-bg-elevated border-border-strong`) with
 * the lucide glyph centered and a small brand-red accent dot in the
 * top-right corner. The glyph itself stays neutral (`text-fg-secondary`)
 * so the brand-red dot is the only red element per icon — preserving
 * the design system's "red in six places only" restraint.
 *
 * Used in:
 *   - Landing ModelsStrip cards (size="sm" / "lg" for featured)
 *   - ModelSelector dropdown items (size="sm") and trigger (size="xs")
 *   - ModelPill in message bubbles + recent lists (size="xs")
 *   - ConversationRow sidebar dots (size="xs")
 *
 * Sizes:
 *   xs = 20×20 tile (12 px glyph), for pills + triggers + inline dots
 *   sm = 32×32 tile (16 px glyph), for dropdown items + landing cards
 *   lg = 48×48 tile (24 px glyph), for the EchoGPT featured card
 */
const ICONS = {
  sparkles: Sparkles,
  sun: Sun,
  moon: Moon,
  compass: Compass,
  anchor: Anchor,
  zap: Zap,
  search: Search,
  rocket: Rocket,
  layers: Layers,
  library: Library,
  "file-text": FileText,
  terminal: Terminal,
  languages: Languages,
  "message-square": MessageSquare,
  "flask-conical": FlaskConical,
  scroll: ScrollText,
  lightbulb: Lightbulb,
  cpu: Cpu,
} as const satisfies Record<ModelIconKey, React.ComponentType<{ size?: number }>>;

export type ModelIconSize = "xs" | "sm" | "lg";

const SIZE: Record<ModelIconSize, { tile: string; dot: string; icon: number }> = {
  xs: { tile: "h-5 w-5", dot: "h-1 w-1", icon: 12 },
  sm: { tile: "h-8 w-8", dot: "h-1.5 w-1.5", icon: 16 },
  lg: { tile: "h-12 w-12", dot: "h-2 w-2", icon: 24 },
};

interface ModelIconProps {
  iconKey: ModelIconKey;
  size?: ModelIconSize;
  className?: string;
  /** ARIA label for screen readers; defaults to "Model icon". */
  ariaLabel?: string;
}

export function ModelIcon({
  iconKey,
  size = "sm",
  className,
  ariaLabel = "Model icon",
}: ModelIconProps) {
  const Glyph = ICONS[iconKey];
  const s = SIZE[size];
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-md border border-border-strong bg-bg-elevated",
        s.tile,
        className,
      )}
    >
      <span className="text-fg-secondary">
        <Glyph size={s.icon} aria-hidden="true" />
      </span>
      <span
        aria-hidden="true"
        className={cn("absolute right-0.5 top-0.5 rounded-full bg-brand", s.dot)}
      />
    </span>
  );
}