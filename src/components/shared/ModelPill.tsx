import { cn } from "@/lib/cn";
import { ModelIcon } from "@/components/shared/ModelIcon";
import { getModel } from "@/data/models";
import type { ModelId } from "@/types/chat";

interface ModelPillProps {
  /** Model id — drives both the icon glyph and the displayed name. */
  modelId: ModelId;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Compact pill with the model icon + name. Used in message bubbles,
 * the live product preview, and anywhere a model needs to be
 * represented in a tight, scannable row.
 *
 * `modelId` is the single source of truth — provider identity comes
 * from `getModel()` so the icon and the name can never disagree.
 */
export function ModelPill({ modelId, size = "md", className }: ModelPillProps) {
  const model = getModel(modelId);
  const iconSize = size === "sm" ? "xs" : "sm";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-2.5 py-1",
        className,
      )}
    >
      <ModelIcon
        iconKey={model.iconKey}
        size={iconSize}
        ariaLabel={`${model.provider} ${model.name}`}
      />
      <span
        className={cn(
          "font-medium text-fg-primary",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        {model.name}
      </span>
    </span>
  );
}