"use client";

import { LayoutGrid } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { CAPABILITIES } from "@/data/capabilities";

/**
 * Capabilities menu — a non-interactive showcase panel surfaced from
 * the app header.
 *
 * Per the locked project rules, this is a frontend-only visual
 * preview of capabilities (image analysis, web search, code execution,
 * etc.) that the product could expose when connected to real
 * services. Nothing here wires up to a backend. Every row is
 * rendered as a disabled `Dropdown` item with a "Concept" badge to
 * keep the prototype honest.
 *
 * The trigger sits at `aria-label="Capabilities"` and exposes a
 * `LayoutGrid` icon at the same visual weight as the model selector.
 */
export function CapabilitiesMenu() {
  const items = CAPABILITIES.map((cap) => {
    const Icon = cap.icon;
    return {
      id: cap.id,
      label: cap.label,
      description: cap.description,
      disabled: true,
      icon: <Icon size={16} aria-hidden="true" />,
      trailing: (
        <Badge variant="outline" className="font-normal">
          Concept
        </Badge>
      ),
    };
  });

  return (
    <Dropdown
      ariaLabel="Capabilities"
      width={320}
      align="end"
      items={items}
      onSelect={() => {
        // Intentionally empty — every item is disabled in this showcase.
        // The Dropdown primitive still calls onSelect when Enter is
        // pressed; the disabled flag prevents the callback from firing
        // and the menu from closing. See src/components/ui/Dropdown.tsx.
      }}
      trigger={
        <IconButton
          aria-label="Show capabilities"
          className="text-fg-secondary hover:text-fg-primary"
        >
          <LayoutGrid size={18} aria-hidden="true" />
        </IconButton>
      }
    />
  );
}