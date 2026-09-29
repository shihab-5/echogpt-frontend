/**
 * Mock tool registry. Parallel to `quick-actions.ts`.
 *
 * These are *visual* tool toggles — there is no real tool execution
 * (no fetch, no sandbox, no Web Worker). When a tool is active the
 * canned assistant reply simply acknowledges it via a `[Tools active: …]`
 * prefix line; see `src/lib/mock-ai.ts`.
 *
 * The icons stay neutral (`text-fg-secondary` per §5.2 "neutral icons")
 * because tools are a configuration affordance, not a primary action.
 */

import {
  Calculator,
  Globe,
  Image as ImageIcon,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ToolId } from "@/types/chat";

export interface Tool {
  id: ToolId;
  label: string;
  /** Short helper text shown in the chip's `title` attribute. */
  hint: string;
  /** Lucide icon. Imported statically so the chip renders without a dynamic import. */
  lucideIcon: LucideIcon;
}

export const TOOLS: ReadonlyArray<Tool> = [
  {
    id: "web-search",
    label: "Web search",
    hint: "Let the model pull live context.",
    lucideIcon: Globe,
  },
  {
    id: "code-interpreter",
    label: "Code interpreter",
    hint: "Run snippets in a sandbox.",
    lucideIcon: Terminal,
  },
  {
    id: "image-generation",
    label: "Image generation",
    hint: "Attach generated images to the response.",
    lucideIcon: ImageIcon,
  },
  {
    id: "calculator",
    label: "Calculator",
    hint: "Compute exact arithmetic when needed.",
    lucideIcon: Calculator,
  },
];

export const TOOL_MAP: Readonly<Record<ToolId, Tool>> = TOOLS.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<ToolId, Tool>,
);

export function getTool(id: ToolId): Tool {
  return TOOL_MAP[id];
}
