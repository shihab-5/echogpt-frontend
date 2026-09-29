"use client";

import { ChevronDown } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import type { DropdownItem } from "@/components/ui/Dropdown";
import { cn } from "@/lib/cn";
import { MODELS, getModel } from "@/data/models";
import { ModelIcon } from "@/components/shared/ModelIcon";
import type { ModelId } from "@/types/chat";

interface ModelSelectorProps {
  value: ModelId;
  onChange: (next: ModelId) => void;
  size?: "sm" | "md";
  className?: string;
}

export function ModelSelector({
  value,
  onChange,
  size = "md",
  className,
}: ModelSelectorProps) {
  const model = getModel(value);

  const items: DropdownItem[] = MODELS.map((m) => ({
    id: m.id,
    label: m.name,
    description: m.description,
    selected: m.id === value,
    icon: <ModelIcon iconKey={m.iconKey} size="sm" ariaLabel={m.name} />,
  }));

  const trigger = (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-control border border-border-strong bg-bg-elevated px-2.5 text-sm font-medium text-fg-primary transition-colors duration-fast hover:border-fg-muted",
        size === "sm" ? "h-7" : "h-9",
        className,
      )}
    >
      <ModelIcon iconKey={model.iconKey} size="xs" ariaLabel={model.name} />
      <span className="max-w-[140px] truncate">{model.name}</span>
      <ChevronDown size={14} aria-hidden="true" className="text-fg-muted" />
    </span>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      ariaLabel="Select model"
      onSelect={(id) => onChange(id as ModelId)}
    />
  );
}